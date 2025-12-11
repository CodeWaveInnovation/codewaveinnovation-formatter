import { BaseFormattingRule } from './BaseFormattingRule';
import { FormatContext } from '../interfaces/types';

/**
 * Rule to normalize line endings
 */
export class LineEndingRule extends BaseFormattingRule {
  readonly name = 'line-ending';
  readonly description = 'Normalizes line endings (LF, CRLF, or CR)';

  protected format(context: FormatContext): string {
    const ruleConfig = context.config.rules.find(r => r.name === this.name);
    const options = ruleConfig?.options || {};
    const lineEnding = options.style || 'lf';

    let endingChar: string;
    switch (lineEnding) {
      case 'crlf':
        endingChar = '\r\n';
        break;
      case 'cr':
        endingChar = '\r';
        break;
      case 'lf':
      default:
        endingChar = '\n';
        break;
    }

    // Normalize all line endings
    return context.content
      .replace(/\r\n/g, '\n')
      .replace(/\r/g, '\n')
      .replace(/\n/g, endingChar);
  }
}
