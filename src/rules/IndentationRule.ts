import { BaseFormattingRule } from "./BaseFormattingRule";
import { FormatContext } from "../interfaces/types";

/**
 * Rule to normalize indentation
 */
export class IndentationRule extends BaseFormattingRule {
  readonly name = "indentation";
  readonly description = "Normalizes indentation to spaces or tabs";

  protected format(context: FormatContext): string {
    const ruleConfig = context.config.rules.find((r) => r.name === this.name);
    const options = ruleConfig?.options || {};
    const indentStyle = options.style || "space";
    const indentSize = options.size || 2;

    const indentChar =
      indentStyle === "tab" ? "\t" : " ".repeat(indentSize as number);

    // Split into lines and normalize indentation
    const lines = context.content.split("\n");
    const formattedLines = lines.map((line) => {
      // Count leading whitespace
      const match = line.match(/^[\s]*/);
      if (!match) return line;

      const leadingSpace = match[0];
      // Count approximate indentation level (assuming 2 or 4 spaces = 1 level)
      const level = Math.floor(
        leadingSpace.replace(/\t/g, "  ").length /
          (indentStyle === "tab" ? 2 : (indentSize as number))
      );
      const restOfLine = line.substring(leadingSpace.length as number);

      return level > 0 ? indentChar.repeat(level) + restOfLine : restOfLine;
    });

    return formattedLines.join("\n");
  }
}
