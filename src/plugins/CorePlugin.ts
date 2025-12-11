import { BasePlugin } from './BasePlugin';
import { IFormattingRule } from '../interfaces/IFormattingRule';
import { 
  IndentationRule, 
  LineEndingRule, 
  TrailingWhitespaceRule,
  FinalNewlineRule,
  MaxLineLengthRule 
} from '../rules';

/**
 * Default plugin with core formatting rules
 */
export class CorePlugin extends BasePlugin {
  readonly name = 'core';
  readonly version = '1.0.0';

  getRules(): IFormattingRule[] {
    return [
      new IndentationRule(),
      new LineEndingRule(),
      new TrailingWhitespaceRule(),
      new FinalNewlineRule(),
      new MaxLineLengthRule(),
    ];
  }
}
