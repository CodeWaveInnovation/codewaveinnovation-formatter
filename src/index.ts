// Interfaces
export * from './interfaces';

// Rules
export * from './rules';

// Formatters
export { RuleRegistry } from './formatters/RuleRegistry';
export { CodeFormatter } from './formatters/CodeFormatter';

// Plugins
export * from './plugins';

// Convenience function to create a formatter with default configuration
import { CodeFormatter } from './formatters/CodeFormatter';
import { RuleRegistry } from './formatters/RuleRegistry';
import { CorePlugin } from './plugins/CorePlugin';
import { PluginManager } from './plugins/PluginManager';
import { FormatterConfig } from './interfaces/types';

/**
 * Create a formatter instance with core rules loaded
 */
export function createFormatter(): CodeFormatter {
  const registry = new RuleRegistry();
  const pluginManager = new PluginManager(registry);
  const corePlugin = new CorePlugin();
  
  pluginManager.loadPlugin(corePlugin);
  
  return new CodeFormatter(registry);
}

/**
 * Default configuration
 */
export function getDefaultConfig(): FormatterConfig {
  return {
    rules: [
      { name: 'indentation', enabled: true, options: { style: 'space', size: 2 } },
      { name: 'line-ending', enabled: true, options: { style: 'lf' } },
      { name: 'trailing-whitespace', enabled: true },
      { name: 'final-newline', enabled: true, options: { insert: true } },
      { name: 'max-line-length', enabled: false, options: { length: 80, action: 'warn' } },
    ],
  };
}
