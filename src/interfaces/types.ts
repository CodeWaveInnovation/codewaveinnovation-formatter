/**
 * Represents the result of a formatting operation
 */
export interface FormatResult {
  content: string;
  changed: boolean;
  appliedRules: string[];
}

/**
 * Represents a formatting rule configuration
 */
export interface RuleConfig {
  name: string;
  enabled: boolean;
  options?: Record<string, any>;
}

/**
 * Represents the formatter configuration
 */
export interface FormatterConfig {
  rules: RuleConfig[];
  plugins?: string[];
}

/**
 * Context passed to rules during formatting
 */
export interface FormatContext {
  content: string;
  config: FormatterConfig;
  filePath?: string;
}
