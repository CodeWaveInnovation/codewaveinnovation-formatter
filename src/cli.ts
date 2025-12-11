#!/usr/bin/env node

import { Command } from "commander";
import inquirer from "inquirer";
import chalk from "chalk";
import * as fs from "fs";
import * as path from "path";
import fg from "fast-glob";
import { createFormatter, getDefaultConfig, FormatterConfig } from "./index";

const program = new Command();

/**
 * Find configuration file in current directory
 */
function findConfig(): FormatterConfig | null {
  const configFiles = [".cwfrc.json", ".cwfrc"];

  for (const file of configFiles) {
    const configPath = path.resolve(process.cwd(), file);
    if (fs.existsSync(configPath)) {
      try {
        const configContent = fs.readFileSync(configPath, "utf-8");
        return JSON.parse(configContent);
      } catch (error) {
        console.warn(chalk.yellow(`Warning: Failed to parse ${file}`));
      }
    }
  }

  // Check package.json
  const pkgPath = path.resolve(process.cwd(), "package.json");
  if (fs.existsSync(pkgPath)) {
    try {
      const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"));
      if (pkg.formatter) {
        return pkg.formatter;
      }
    } catch (error) {
      // Ignore package.json parsing errors
    }
  }

  return null;
}

program
  .name("cwf")
  .description(
    "CodeWave Innovation Formatter - Language-agnostic code formatter"
  )
  .version("1.0.0");

program
  .command("format <files...>")
  .description("Format file(s) - supports glob patterns")
  .option("-c, --config <path>", "Path to configuration file")
  .option("-i, --interactive", "Use interactive mode to configure rules")
  .action(async (files: string[], options) => {
    try {
      let config = getDefaultConfig();

      // Load custom config if provided
      if (options.config) {
        const configPath = path.resolve(options.config);
        if (fs.existsSync(configPath)) {
          const configContent = fs.readFileSync(configPath, "utf-8");
          config = JSON.parse(configContent);
        } else {
          console.error(chalk.red(`Config file not found: ${configPath}`));
          process.exit(1);
        }
      } else {
        // Auto-discover config file
        const foundConfig = findConfig();
        if (foundConfig) {
          config = foundConfig;
        }
      }

      // Interactive mode
      if (options.interactive) {
        config = await interactiveConfig(config);
      }

      // Expand glob patterns
      const expandedFiles = await fg(files, {
        dot: false,
        onlyFiles: true,
        ignore: ["node_modules/**", "dist/**", ".git/**"],
      });

      if (expandedFiles.length === 0) {
        console.error(chalk.yellow("No files found matching the pattern"));
        process.exit(1);
      }

      const formatter = createFormatter();
      let formattedCount = 0;
      let unchangedCount = 0;

      for (const filePath of expandedFiles) {
        const absolutePath = path.resolve(filePath);

        if (!fs.existsSync(absolutePath)) {
          console.warn(chalk.yellow(`File not found: ${filePath}`));
          continue;
        }

        const content = fs.readFileSync(absolutePath, "utf-8");
        const result = await formatter.format(content, config);

        if (result.changed) {
          fs.writeFileSync(absolutePath, result.content, "utf-8");
          console.log(chalk.green(`✓ Formatted ${filePath}`));
          formattedCount++;
        } else {
          unchangedCount++;
        }
      }

      // Summary
      console.log(
        chalk.cyan(
          `\n${formattedCount} file(s) formatted, ${unchangedCount} file(s) unchanged`
        )
      );
    } catch (error) {
      console.error(chalk.red(`Error: ${error}`));
      process.exit(1);
    }
  });

program
  .command("check <file>")
  .description("Check if a file is formatted")
  .option("-c, --config <path>", "Path to configuration file")
  .action(async (file: string, options) => {
    try {
      let config = getDefaultConfig();

      if (options.config) {
        const configPath = path.resolve(options.config);
        if (fs.existsSync(configPath)) {
          const configContent = fs.readFileSync(configPath, "utf-8");
          config = JSON.parse(configContent);
        }
      } else {
        // Auto-discover config file
        const foundConfig = findConfig();
        if (foundConfig) {
          config = foundConfig;
        }
      }

      const filePath = path.resolve(file);
      if (!fs.existsSync(filePath)) {
        console.error(chalk.red(`File not found: ${filePath}`));
        process.exit(1);
      }

      const content = fs.readFileSync(filePath, "utf-8");
      const formatter = createFormatter();
      const result = await formatter.format(content, config);

      if (result.changed) {
        console.log(chalk.yellow(`✗ ${file} needs formatting`));
        process.exit(1);
      } else {
        console.log(chalk.green(`✓ ${file} is formatted correctly`));
      }
    } catch (error) {
      console.error(chalk.red(`Error: ${error}`));
      process.exit(1);
    }
  });

program
  .command("init")
  .description("Create a default configuration file")
  .action(async () => {
    const config = getDefaultConfig();
    const configPath = path.resolve(".cwfrc.json");

    if (fs.existsSync(configPath)) {
      const { overwrite } = await inquirer.prompt([
        {
          type: "confirm",
          name: "overwrite",
          message: "Configuration file already exists. Overwrite?",
          default: false,
        },
      ]);

      if (!overwrite) {
        console.log(chalk.blue("Configuration not created."));
        return;
      }
    }

    fs.writeFileSync(configPath, JSON.stringify(config, null, 2), "utf-8");
    console.log(chalk.green(`✓ Created configuration file: ${configPath}`));
  });

async function interactiveConfig(
  baseConfig: FormatterConfig
): Promise<FormatterConfig> {
  console.log(chalk.cyan("\n🔧 Interactive Configuration\n"));

  const answers = await inquirer.prompt([
    {
      type: "list",
      name: "indentStyle",
      message: "Indentation style:",
      choices: ["space", "tab"],
      default: "space",
    },
    {
      type: "number",
      name: "indentSize",
      message: "Indentation size (spaces):",
      default: 2,
      when: (answers) => answers.indentStyle === "space",
    },
    {
      type: "list",
      name: "lineEnding",
      message: "Line ending style:",
      choices: ["lf", "crlf", "cr"],
      default: "lf",
    },
    {
      type: "confirm",
      name: "trailingWhitespace",
      message: "Remove trailing whitespace?",
      default: true,
    },
    {
      type: "confirm",
      name: "finalNewline",
      message: "Insert final newline?",
      default: true,
    },
    {
      type: "confirm",
      name: "maxLineLength",
      message: "Enable max line length check?",
      default: false,
    },
    {
      type: "number",
      name: "maxLineLengthValue",
      message: "Max line length:",
      default: 80,
      when: (answers) => answers.maxLineLength,
    },
  ]);

  const config: FormatterConfig = {
    rules: [
      {
        name: "indentation",
        enabled: true,
        options: {
          style: answers.indentStyle,
          size: answers.indentSize || 2,
        },
      },
      {
        name: "line-ending",
        enabled: true,
        options: { style: answers.lineEnding },
      },
      {
        name: "trailing-whitespace",
        enabled: answers.trailingWhitespace,
      },
      {
        name: "final-newline",
        enabled: answers.finalNewline,
        options: { insert: answers.finalNewline },
      },
      {
        name: "max-line-length",
        enabled: answers.maxLineLength,
        options: {
          length: answers.maxLineLengthValue || 80,
          action: "warn",
        },
      },
    ],
  };

  return config;
}

program.parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp();
}
