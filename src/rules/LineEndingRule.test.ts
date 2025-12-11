import { LineEndingRule } from './LineEndingRule';
import { FormatterConfig } from '../interfaces/types';

describe('LineEndingRule', () => {
  let rule: LineEndingRule;

  beforeEach(() => {
    rule = new LineEndingRule();
  });

  it('should have correct name and description', () => {
    expect(rule.name).toBe('line-ending');
    expect(rule.description).toBeTruthy();
  });

  describe('apply', () => {
    it('should normalize to LF by default', () => {
      const content = 'hello\r\nworld\rtest';
      const config: FormatterConfig = {
        rules: [{ name: 'line-ending', enabled: true, options: { style: 'lf' } }],
      };

      const result = rule.apply({ content, config });

      expect(result.content).toBe('hello\nworld\ntest');
      expect(result.changed).toBe(true);
    });

    it('should convert to CRLF when specified', () => {
      const content = 'hello\nworld';
      const config: FormatterConfig = {
        rules: [{ name: 'line-ending', enabled: true, options: { style: 'crlf' } }],
      };

      const result = rule.apply({ content, config });

      expect(result.content).toBe('hello\r\nworld');
      expect(result.changed).toBe(true);
    });

    it('should convert to CR when specified', () => {
      const content = 'hello\nworld';
      const config: FormatterConfig = {
        rules: [{ name: 'line-ending', enabled: true, options: { style: 'cr' } }],
      };

      const result = rule.apply({ content, config });

      expect(result.content).toBe('hello\rworld');
      expect(result.changed).toBe(true);
    });

    it('should not change content if already in correct format', () => {
      const content = 'hello\nworld';
      const config: FormatterConfig = {
        rules: [{ name: 'line-ending', enabled: true, options: { style: 'lf' } }],
      };

      const result = rule.apply({ content, config });

      expect(result.content).toBe(content);
      expect(result.changed).toBe(false);
    });
  });
});
