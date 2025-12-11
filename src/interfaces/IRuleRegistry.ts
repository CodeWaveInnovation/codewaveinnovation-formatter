import { IFormattingRule } from './IFormattingRule';

/**
 * Interface for rule registry (Single Responsibility Principle)
 */
export interface IRuleRegistry {
  /**
   * Register a new rule
   */
  register(rule: IFormattingRule): void;

  /**
   * Get a rule by name
   */
  getRule(name: string): IFormattingRule | undefined;

  /**
   * Get all registered rules
   */
  getAllRules(): IFormattingRule[];
}
