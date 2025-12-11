import { PluginManager } from './PluginManager';
import { RuleRegistry } from '../formatters/RuleRegistry';
import { CorePlugin } from './CorePlugin';
import { BasePlugin } from './BasePlugin';
import { IFormattingRule } from '../interfaces/IFormattingRule';
import { FormatContext, FormatResult } from '../interfaces/types';

class MockRule implements IFormattingRule {
  readonly name = 'mock-rule';
  readonly description = 'Mock rule for testing';

  apply(context: FormatContext): FormatResult {
    return {
      content: context.content,
      changed: false,
      appliedRules: [],
    };
  }
}

class MockPlugin extends BasePlugin {
  readonly name = 'mock-plugin';
  readonly version = '1.0.0';

  getRules(): IFormattingRule[] {
    return [new MockRule()];
  }
}

describe('PluginManager', () => {
  let registry: RuleRegistry;
  let manager: PluginManager;

  beforeEach(() => {
    registry = new RuleRegistry();
    manager = new PluginManager(registry);
  });

  describe('loadPlugin', () => {
    it('should load plugin and register its rules', () => {
      const plugin = new MockPlugin();
      manager.loadPlugin(plugin);

      const rule = registry.getRule('mock-rule');
      expect(rule).toBeDefined();
      expect(rule?.name).toBe('mock-rule');
    });

    it('should load core plugin with default rules', () => {
      const plugin = new CorePlugin();
      manager.loadPlugin(plugin);

      const indentRule = registry.getRule('indentation');
      expect(indentRule).toBeDefined();

      const lineEndingRule = registry.getRule('line-ending');
      expect(lineEndingRule).toBeDefined();
    });
  });

  describe('loadPlugins', () => {
    it('should load multiple plugins', () => {
      const plugin1 = new MockPlugin();
      const plugin2 = new CorePlugin();

      manager.loadPlugins([plugin1, plugin2]);

      const mockRule = registry.getRule('mock-rule');
      expect(mockRule).toBeDefined();

      const indentRule = registry.getRule('indentation');
      expect(indentRule).toBeDefined();
    });

    it('should handle empty plugin array', () => {
      expect(() => manager.loadPlugins([])).not.toThrow();
      expect(registry.getAllRules()).toEqual([]);
    });
  });
});
