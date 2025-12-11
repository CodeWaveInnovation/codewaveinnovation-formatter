import { FinalNewlineRule } from './FinalNewlineRule';
import { FormatterConfig } from '../interfaces/types';

describe('FinalNewlineRule', () => {
  let rule: FinalNewlineRule;

  beforeEach(() => {
    rule = new FinalNewlineRule();
  });

  it('should have correct name and description', () => {
    expect(rule.name).toBe('final-newline');
    expect(rule.description).toBeTruthy();
  });

  describe('apply', () => {
    it('should add final newline when missing', () => {
      const content = 'hello world';
      const config: FormatterConfig = {
        rules: [{ name: 'final-newline', enabled: true, options: { insert: true } }],
      };

      const result = rule.apply({ content, config });

      expect(result.content).toBe('hello world\n');
      expect(result.changed).toBe(true);
    });

    it('should not add newline if already present', () => {
      const content = 'hello world\n';
      const config: FormatterConfig = {
        rules: [{ name: 'final-newline', enabled: true, options: { insert: true } }],
      };

      const result = rule.apply({ content, config });

      expect(result.content).toBe(content);
      expect(result.changed).toBe(false);
    });

    it('should not add newline when insert is false', () => {
      const content = 'hello world';
      const config: FormatterConfig = {
        rules: [{ name: 'final-newline', enabled: true, options: { insert: false } }],
      };

      const result = rule.apply({ content, config });

      expect(result.content).toBe(content);
      expect(result.changed).toBe(false);
    });

    it('should handle empty content', () => {
      const content = '';
      const config: FormatterConfig = {
        rules: [{ name: 'final-newline', enabled: true, options: { insert: true } }],
      };

      const result = rule.apply({ content, config });

      expect(result.content).toBe('');
      expect(result.changed).toBe(false);
    });

    it('should use insert:true as default', () => {
      const content = 'hello';
      const config: FormatterConfig = {
        rules: [{ name: 'final-newline', enabled: true }],
      };

      const result = rule.apply({ content, config });

      expect(result.content).toBe('hello\n');
      expect(result.changed).toBe(true);
    });
  });
});
