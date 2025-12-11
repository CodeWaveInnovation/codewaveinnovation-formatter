import { createFormatter, getDefaultConfig } from './index';

describe('Integration Tests', () => {
  describe('createFormatter', () => {
    it('should create a formatter with core rules loaded', () => {
      const formatter = createFormatter();
      expect(formatter).toBeDefined();
    });

    it('should format content with default configuration', async () => {
      const formatter = createFormatter();
      const config = getDefaultConfig();

      const content = '  hello   \n    world  ';
      const result = await formatter.format(content, config);

      expect(result).toBeDefined();
      expect(result.content).toBeTruthy();
      expect(result.changed).toBeDefined();
      expect(result.appliedRules).toBeDefined();
    });
  });

  describe('getDefaultConfig', () => {
    it('should return a valid default configuration', () => {
      const config = getDefaultConfig();

      expect(config).toBeDefined();
      expect(config.rules).toBeInstanceOf(Array);
      expect(config.rules.length).toBeGreaterThan(0);
    });

    it('should have indentation rule enabled', () => {
      const config = getDefaultConfig();
      const indentRule = config.rules.find(r => r.name === 'indentation');

      expect(indentRule).toBeDefined();
      expect(indentRule?.enabled).toBe(true);
    });

    it('should have line-ending rule enabled', () => {
      const config = getDefaultConfig();
      const lineEndingRule = config.rules.find(r => r.name === 'line-ending');

      expect(lineEndingRule).toBeDefined();
      expect(lineEndingRule?.enabled).toBe(true);
    });
  });

  describe('End-to-end formatting', () => {
    it('should format code with multiple rules applied', async () => {
      const formatter = createFormatter();
      const config = getDefaultConfig();

      const messyCode = '    hello world   \r\n  test  ';
      const result = await formatter.format(messyCode, config);

      // Should remove trailing whitespace (check each line except last)
      const lines = result.content.split('\n');
      lines.slice(0, -1).forEach(line => {
        expect(line).not.toMatch(/\s+$/);
      });
      // Should normalize line endings to LF
      expect(result.content).not.toContain('\r\n');
      // Should end with newline
      expect(result.content).toMatch(/\n$/);
    });

    it('should report which rules were applied', async () => {
      const formatter = createFormatter();
      const config = getDefaultConfig();

      const messyCode = 'hello world   ';
      const result = await formatter.format(messyCode, config);

      if (result.changed) {
        expect(result.appliedRules.length).toBeGreaterThan(0);
      }
    });

    it('should handle already formatted code', async () => {
      const formatter = createFormatter();
      const config = getDefaultConfig();

      const cleanCode = 'hello world\n';
      const result = await formatter.format(cleanCode, config);

      expect(result.changed).toBe(false);
      expect(result.appliedRules).toEqual([]);
    });
  });
});
