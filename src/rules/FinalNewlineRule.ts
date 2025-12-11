import { BaseFormattingRule } from './BaseFormattingRule';
import { FormatContext } from '../interfaces/types';

/**
 * Rule to ensure final newline
 */
export class FinalNewlineRule extends BaseFormattingRule {
  readonly name = 'final-newline';
  readonly description = 'Ensures file ends with a newline';

  protected format(context: FormatContext): string {
    const ruleConfig = context.config.rules.find(r => r.name === this.name);
    const options = ruleConfig?.options || {};
    const insert = options.insert !== false; // Default to true

    if (insert && context.content.length > 0 && !context.content.endsWith('\n')) {
      return context.content + '\n';
    }

    return context.content;
  }
}
