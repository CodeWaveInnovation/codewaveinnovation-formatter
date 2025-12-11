import { IPlugin } from '../interfaces/IPlugin';
import { IRuleRegistry } from '../interfaces/IRuleRegistry';

/**
 * Plugin manager to handle plugin loading and registration
 */
export class PluginManager {
  constructor(private ruleRegistry: IRuleRegistry) {}

  /**
   * Load and register a plugin
   */
  loadPlugin(plugin: IPlugin): void {
    const rules = plugin.getRules();
    rules.forEach(rule => this.ruleRegistry.register(rule));
  }

  /**
   * Load multiple plugins
   */
  loadPlugins(plugins: IPlugin[]): void {
    plugins.forEach(plugin => this.loadPlugin(plugin));
  }
}
