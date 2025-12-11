import { FormatterConfig, FormatResult } from './types';

/**
 * Interface for the main formatter (Dependency Inversion Principle)
 */
export interface IFormatter {
  /**
   * Format content according to the configured rules
   */
  format(content: string, config?: FormatterConfig): Promise<FormatResult>;
}
