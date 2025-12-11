import { IndentationRule } from './IndentationRule';
import { FormatterConfig } from '../interfaces/types';

describe('IndentationRule', () => {
  let rule: IndentationRule;

  beforeEach(() => {
    rule = new IndentationRule();
  });

  it('should have correct name and description', () => {
    expect(rule.name).toBe('indentation');
    expect(rule.description).toBeTruthy();
  });

  describe('apply', () => {
    it('should normalize spaces to configured size', () => {
      const content = '    hello\n  world';
      const config: FormatterConfig = {
        rules: [
          { name: 'indentation', enabled: true, options: { style: 'space', size: 2 } },
        ],
      };

      const result = rule.apply({ content, config });

      expect(result.content).toBe('    hello\n  world');
      expect(result.changed).toBe(false); // Already normalized
    });

    it('should convert tabs to spaces when style is space', () => {
      const content = '\t\thello\n\tworld';
      const config: FormatterConfig = {
        rules: [
          { name: 'indentation', enabled: true, options: { style: 'space', size: 2 } },
        ],
      };

      const result = rule.apply({ content, config });

      expect(result.content).toContain('  '); // Tabs converted to spaces
      expect(result.changed).toBe(true);
    });

    it('should use tabs when style is tab', () => {
      const content = '    hello\n  world';
      const config: FormatterConfig = {
        rules: [
          { name: 'indentation', enabled: true, options: { style: 'tab' } },
        ],
      };

      const result = rule.apply({ content, config });

      expect(result.content).toContain('\t');
      expect(result.changed).toBe(true);
    });

    it('should use default options when not provided', () => {
      const content = '    hello';
      const config: FormatterConfig = { rules: [] };

      const result = rule.apply({ content, config });

      expect(result.content).toBeTruthy();
    });

    it('should preserve content without leading whitespace', () => {
      const content = 'hello\nworld';
      const config: FormatterConfig = {
        rules: [
          { name: 'indentation', enabled: true, options: { style: 'space', size: 2 } },
        ],
      };

      const result = rule.apply({ content, config });

      expect(result.content).toBe('hello\nworld');
      expect(result.changed).toBe(false);
    });
  });
});
