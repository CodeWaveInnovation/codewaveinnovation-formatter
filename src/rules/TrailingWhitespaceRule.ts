import { BaseFormattingRule } from './BaseFormattingRule';
import { FormatContext } from '../interfaces/types';

/**
 * Rule to trim trailing whitespace
 */
export class TrailingWhitespaceRule extends BaseFormattingRule {
  readonly name = 'trailing-whitespace';
  readonly description = 'Removes trailing whitespace from lines';

  protected format(context: FormatContext): string {
    const lines = context.content.split('\n');
    const trimmedLines = lines.map(line => line.replace(/\s+$/, ''));
    return trimmedLines.join('\n');
  }
}
