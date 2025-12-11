import { BaseFormattingRule } from './BaseFormattingRule';
import { FormatContext } from '../interfaces/types';

/**
 * Rule to normalize max line length
 */
export class MaxLineLengthRule extends BaseFormattingRule {
  readonly name = 'max-line-length';
  readonly description = 'Warns or wraps lines exceeding maximum length';

  protected format(context: FormatContext): string {
    const ruleConfig = context.config.rules.find(r => r.name === this.name);
    const options = ruleConfig?.options || {};
    const maxLength = options.length || 80;
    const action = options.action || 'warn'; // 'warn' or 'wrap'

    if (action === 'warn') {
      // Just return as-is (actual warning would be in a linter context)
      return context.content;
    }

    // Basic line wrapping (simplified)
    const lines = context.content.split('\n');
    const wrappedLines: string[] = [];

    for (const line of lines) {
      if (line.length <= maxLength) {
        wrappedLines.push(line);
      } else {
        // Simple word-wrap
        let remaining = line;
        while (remaining.length > maxLength) {
          let breakPoint = maxLength;
          // Try to break at a space
          const spaceIndex = remaining.lastIndexOf(' ', maxLength);
          if (spaceIndex > maxLength * 0.6) {
            breakPoint = spaceIndex;
          }
          
          wrappedLines.push(remaining.substring(0, breakPoint));
          remaining = remaining.substring(breakPoint).trim();
        }
        if (remaining.length > 0) {
          wrappedLines.push(remaining);
        }
      }
    }

    return wrappedLines.join('\n');
  }
}
