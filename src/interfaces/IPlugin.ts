import { IFormattingRule } from './IFormattingRule';

/**
 * Interface for plugin system (Open/Closed Principle)
 */
export interface IPlugin {
  /**
   * Plugin name
   */
  readonly name: string;

  /**
   * Plugin version
   */
  readonly version: string;

  /**
   * Get the rules provided by this plugin
   */
  getRules(): IFormattingRule[];
}
