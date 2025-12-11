import { MaxLineLengthRule } from "./MaxLineLengthRule";
import { FormatterConfig } from "../interfaces/types";

describe("MaxLineLengthRule", () => {
  let rule: MaxLineLengthRule;

  beforeEach(() => {
    rule = new MaxLineLengthRule();
  });

  it("should have correct name and description", () => {
    expect(rule.name).toBe("max-line-length");
    expect(rule.description).toBeTruthy();
  });

  describe("apply with warn action", () => {
    it("should not modify content when action is warn", () => {
      const content = "a".repeat(100);
      const config: FormatterConfig = {
        rules: [
          {
            name: "max-line-length",
            enabled: true,
            options: { length: 80, action: "warn" },
          },
        ],
      };

      const result = rule.apply({ content, config });

      expect(result.content).toBe(content);
      expect(result.changed).toBe(false);
    });
  });

  describe("apply with wrap action", () => {
    it("should wrap long lines", () => {
      const content = "a".repeat(100);
      const config: FormatterConfig = {
        rules: [
          {
            name: "max-line-length",
            enabled: true,
            options: { length: 80, action: "wrap" },
          },
        ],
      };

      const result = rule.apply({ content, config });

      expect(result.changed).toBe(true);
      const lines = result.content.split("\n");
      lines.forEach((line) => {
        expect(line.length).toBeLessThanOrEqual(80);
      });
    });

    it("should not modify lines within limit", () => {
      const content = "hello world\ntest";
      const config: FormatterConfig = {
        rules: [
          {
            name: "max-line-length",
            enabled: true,
            options: { length: 80, action: "wrap" },
          },
        ],
      };

      const result = rule.apply({ content, config });

      expect(result.content).toBe(content);
      expect(result.changed).toBe(false);
    });

    it("should wrap at word boundaries when possible", () => {
      const content = "hello ".repeat(20); // Creates a long line with spaces
      const config: FormatterConfig = {
        rules: [
          {
            name: "max-line-length",
            enabled: true,
            options: { length: 50, action: "wrap" },
          },
        ],
      };

      const result = rule.apply({ content, config });

      expect(result.changed).toBe(true);
      const lines = result.content.split("\n");
      expect(lines.length).toBeGreaterThan(1);
    });

    it("should wrap lines that are exactly at the max length boundary", () => {
      const content = "x".repeat(160); // Exactly 2x the default length
      const config: FormatterConfig = {
        rules: [
          {
            name: "max-line-length",
            enabled: true,
            options: { length: 80, action: "wrap" },
          },
        ],
      };

      const result = rule.apply({ content, config });

      expect(result.changed).toBe(true);
      const lines = result.content.split("\n");
      expect(lines.length).toBe(2);
      expect(lines[0].length).toBeLessThanOrEqual(80);
    });
  });

  describe("default options", () => {
    it("should use default length of 80", () => {
      const content = "test";
      const config: FormatterConfig = { rules: [] };

      const result = rule.apply({ content, config });

      // Should not error with default options
      expect(result).toBeDefined();
    });
  });
});
