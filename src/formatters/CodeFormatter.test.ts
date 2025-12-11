import { CodeFormatter } from "../formatters/CodeFormatter";
import { RuleRegistry } from "../formatters/RuleRegistry";
import { IndentationRule } from "../rules/IndentationRule";
import { TrailingWhitespaceRule } from "../rules/TrailingWhitespaceRule";
import { FormatterConfig } from "../interfaces/types";

describe("CodeFormatter", () => {
  let registry: RuleRegistry;
  let formatter: CodeFormatter;

  beforeEach(() => {
    registry = new RuleRegistry();
    formatter = new CodeFormatter(registry);
  });

  describe("format", () => {
    it("should return unchanged content when no rules are configured", async () => {
      const content = "hello world";
      const config: FormatterConfig = { rules: [] };

      const result = await formatter.format(content, config);

      expect(result.content).toBe(content);
      expect(result.changed).toBe(false);
      expect(result.appliedRules).toEqual([]);
    });

    it("should apply enabled rules", async () => {
      registry.register(new TrailingWhitespaceRule());

      const content = "hello world   \n";
      const config: FormatterConfig = {
        rules: [{ name: "trailing-whitespace", enabled: true }],
      };

      const result = await formatter.format(content, config);

      expect(result.content).toBe("hello world\n");
      expect(result.changed).toBe(true);
      expect(result.appliedRules).toContain("trailing-whitespace");
    });

    it("should handle formatting without config (use empty rules)", async () => {
      const content = "hello world   ";

      const result = await formatter.format(content);

      expect(result.content).toBe(content);
      expect(result.changed).toBe(false);
      expect(result.appliedRules).toEqual([]);
    });

    it("should skip disabled rules", async () => {
      registry.register(new TrailingWhitespaceRule());

      const content = "hello world   ";
      const config: FormatterConfig = {
        rules: [{ name: "trailing-whitespace", enabled: false }],
      };

      const result = await formatter.format(content, config);

      expect(result.content).toBe(content);
      expect(result.changed).toBe(false);
      expect(result.appliedRules).toEqual([]);
    });

    it("should apply multiple rules in order", async () => {
      registry.register(new TrailingWhitespaceRule());
      registry.register(new IndentationRule());

      const content = "    hello   \n  world   ";
      const config: FormatterConfig = {
        rules: [
          {
            name: "indentation",
            enabled: true,
            options: { style: "space", size: 2 },
          },
          { name: "trailing-whitespace", enabled: true },
        ],
      };

      const result = await formatter.format(content, config);

      expect(result.changed).toBe(true);
      expect(result.appliedRules.length).toBeGreaterThan(0);
    });

    it("should handle non-existent rules gracefully", async () => {
      const content = "hello world";
      const config: FormatterConfig = {
        rules: [{ name: "non-existent-rule", enabled: true }],
      };

      const result = await formatter.format(content, config);

      expect(result.content).toBe(content);
      expect(result.changed).toBe(false);
    });
  });
});
