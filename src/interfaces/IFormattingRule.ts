import { FormatContext, FormatResult } from './types';

/**
 * Interface for formatting rules (Interface Segregation Principle)
 */
export interface IFormattingRule {
  /**
   * Unique name of the rule
   */
  readonly name: string;

  /**
   * Description of what the rule does
   */
  readonly description: string;

  /**
   * Apply the formatting rule to the content
   */
  apply(context: FormatContext): FormatResult;
}
