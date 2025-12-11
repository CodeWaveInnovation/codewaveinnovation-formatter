import { RuleRegistry } from '../formatters/RuleRegistry';
import { IndentationRule } from '../rules/IndentationRule';
import { LineEndingRule } from '../rules/LineEndingRule';

describe('RuleRegistry', () => {
  let registry: RuleRegistry;

  beforeEach(() => {
    registry = new RuleRegistry();
  });

  describe('register', () => {
    it('should register a rule', () => {
      const rule = new IndentationRule();
      registry.register(rule);

      const retrievedRule = registry.getRule('indentation');
      expect(retrievedRule).toBe(rule);
    });

    it('should overwrite existing rule with same name', () => {
      const rule1 = new IndentationRule();
      const rule2 = new IndentationRule();
      
      registry.register(rule1);
      registry.register(rule2);

      const retrievedRule = registry.getRule('indentation');
      expect(retrievedRule).toBe(rule2);
    });
  });

  describe('getRule', () => {
    it('should return undefined for non-existent rule', () => {
      const rule = registry.getRule('non-existent');
      expect(rule).toBeUndefined();
    });

    it('should return registered rule', () => {
      const rule = new LineEndingRule();
      registry.register(rule);

      const retrievedRule = registry.getRule('line-ending');
      expect(retrievedRule).toBe(rule);
    });
  });

  describe('getAllRules', () => {
    it('should return empty array when no rules registered', () => {
      const rules = registry.getAllRules();
      expect(rules).toEqual([]);
    });

    it('should return all registered rules', () => {
      const rule1 = new IndentationRule();
      const rule2 = new LineEndingRule();
      
      registry.register(rule1);
      registry.register(rule2);

      const rules = registry.getAllRules();
      expect(rules).toHaveLength(2);
      expect(rules).toContain(rule1);
      expect(rules).toContain(rule2);
    });
  });
});
