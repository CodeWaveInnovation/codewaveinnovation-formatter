import { TrailingWhitespaceRule } from './TrailingWhitespaceRule';
import { FormatterConfig } from '../interfaces/types';

describe('TrailingWhitespaceRule', () => {
  let rule: TrailingWhitespaceRule;

  beforeEach(() => {
    rule = new TrailingWhitespaceRule();
  });

  it('should have correct name and description', () => {
    expect(rule.name).toBe('trailing-whitespace');
    expect(rule.description).toBeTruthy();
  });

  describe('apply', () => {
    it('should remove trailing spaces', () => {
      const content = 'hello   \nworld  ';
      const config: FormatterConfig = { rules: [] };

      const result = rule.apply({ content, config });

      expect(result.content).toBe('hello\nworld');
      expect(result.changed).toBe(true);
    });

    it('should remove trailing tabs', () => {
      const content = 'hello\t\t\nworld\t';
      const config: FormatterConfig = { rules: [] };

      const result = rule.apply({ content, config });

      expect(result.content).toBe('hello\nworld');
      expect(result.changed).toBe(true);
    });

    it('should handle mixed trailing whitespace', () => {
      const content = 'hello \t \nworld';
      const config: FormatterConfig = { rules: [] };

      const result = rule.apply({ content, config });

      expect(result.content).toBe('hello\nworld');
      expect(result.changed).toBe(true);
    });

    it('should not change content without trailing whitespace', () => {
      const content = 'hello\nworld';
      const config: FormatterConfig = { rules: [] };

      const result = rule.apply({ content, config });

      expect(result.content).toBe(content);
      expect(result.changed).toBe(false);
    });

    it('should preserve leading whitespace', () => {
      const content = '  hello  \n    world  ';
      const config: FormatterConfig = { rules: [] };

      const result = rule.apply({ content, config });

      expect(result.content).toBe('  hello\n    world');
      expect(result.changed).toBe(true);
    });
  });
});
