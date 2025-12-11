import { IFormattingRule } from '../interfaces/IFormattingRule';
import { IRuleRegistry } from '../interfaces/IRuleRegistry';

/**
 * Rule registry implementation (Single Responsibility Principle)
 * Responsible only for managing the collection of rules
 */
export class RuleRegistry implements IRuleRegistry {
  private rules: Map<string, IFormattingRule> = new Map();

  register(rule: IFormattingRule): void {
    this.rules.set(rule.name, rule);
  }

  getRule(name: string): IFormattingRule | undefined {
    return this.rules.get(name);
  }

  getAllRules(): IFormattingRule[] {
    return Array.from(this.rules.values());
  }
}
