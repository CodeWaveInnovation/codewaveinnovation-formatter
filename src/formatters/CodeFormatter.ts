import { IFormatter } from '../interfaces/IFormatter';
import { IRuleRegistry } from '../interfaces/IRuleRegistry';
import { FormatterConfig, FormatResult } from '../interfaces/types';

/**
 * Main formatter implementation (Dependency Inversion Principle)
 * Depends on abstractions (IRuleRegistry) not concretions
 */
export class CodeFormatter implements IFormatter {
  constructor(private ruleRegistry: IRuleRegistry) {}

  async format(content: string, config?: FormatterConfig): Promise<FormatResult> {
    const effectiveConfig = config || { rules: [] };
    const appliedRules: string[] = [];
    let currentContent = content;
    let changed = false;

    // Get enabled rules from config
    const enabledRules = effectiveConfig.rules.filter(r => r.enabled);

    for (const ruleConfig of enabledRules) {
      const rule = this.ruleRegistry.getRule(ruleConfig.name);
      
      if (rule) {
        const result = rule.apply({
          content: currentContent,
          config: effectiveConfig,
        });

        if (result.changed) {
          currentContent = result.content;
          changed = true;
          appliedRules.push(rule.name);
        }
      }
    }

    return {
      content: currentContent,
      changed,
      appliedRules,
    };
  }
}
