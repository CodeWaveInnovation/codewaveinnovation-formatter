import { IFormattingRule } from '../interfaces/IFormattingRule';
import { FormatContext, FormatResult } from '../interfaces/types';

/**
 * Abstract base class for rules (Template Method Pattern)
 * Reduces code duplication
 */
export abstract class BaseFormattingRule implements IFormattingRule {
  abstract readonly name: string;
  abstract readonly description: string;

  apply(context: FormatContext): FormatResult {
    const originalContent = context.content;
    const formattedContent = this.format(context);
    
    return {
      content: formattedContent,
      changed: originalContent !== formattedContent,
      appliedRules: originalContent !== formattedContent ? [this.name] : [],
    };
  }

  protected abstract format(context: FormatContext): string;
}
