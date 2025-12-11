#!/usr/bin/env node

import { Command } from 'commander';
import inquirer from 'inquirer';
import chalk from 'chalk';
import * as fs from 'fs';
import * as path from 'path';
import { createFormatter, getDefaultConfig, FormatterConfig } from './index';

const program = new Command();

program
  .name('cwf')
  .description('CodeWave Innovation Formatter - Language-agnostic code formatter')
  .version('1.0.0');

program
  .command('format <file>')
  .description('Format a file')
  .option('-c, --config <path>', 'Path to configuration file')
  .option('-i, --interactive', 'Use interactive mode to configure rules')
  .action(async (file: string, options) => {
    try {
      let config = getDefaultConfig();

      // Load custom config if provided
      if (options.config) {
        const configPath = path.resolve(options.config);
        if (fs.existsSync(configPath)) {
          const configContent = fs.readFileSync(configPath, 'utf-8');
          config = JSON.parse(configContent);
        } else {
          console.error(chalk.red(`Config file not found: ${configPath}`));
          process.exit(1);
        }
      }

      // Interactive mode
      if (options.interactive) {
        config = await interactiveConfig(config);
      }

      // Read file
      const filePath = path.resolve(file);
      if (!fs.existsSync(filePath)) {
        console.error(chalk.red(`File not found: ${filePath}`));
        process.exit(1);
      }

      const content = fs.readFileSync(filePath, 'utf-8');
      
      // Format
      const formatter = createFormatter();
      const result = await formatter.format(content, config);

      if (result.changed) {
        // Write back
        fs.writeFileSync(filePath, result.content, 'utf-8');
        console.log(chalk.green(`✓ Formatted ${file}`));
        console.log(chalk.gray(`Applied rules: ${result.appliedRules.join(', ')}`));
      } else {
        console.log(chalk.blue(`✓ ${file} is already formatted`));
      }
    } catch (error) {
      console.error(chalk.red(`Error: ${error}`));
      process.exit(1);
    }
  });

program
  .command('check <file>')
  .description('Check if a file is formatted')
  .option('-c, --config <path>', 'Path to configuration file')
  .action(async (file: string, options) => {
    try {
      let config = getDefaultConfig();

      if (options.config) {
        const configPath = path.resolve(options.config);
        if (fs.existsSync(configPath)) {
          const configContent = fs.readFileSync(configPath, 'utf-8');
          config = JSON.parse(configContent);
        }
      }

      const filePath = path.resolve(file);
      if (!fs.existsSync(filePath)) {
        console.error(chalk.red(`File not found: ${filePath}`));
        process.exit(1);
      }

      const content = fs.readFileSync(filePath, 'utf-8');
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
  .command('init')
  .description('Create a default configuration file')
  .action(async () => {
    const config = getDefaultConfig();
    const configPath = path.resolve('.cwfrc.json');

    if (fs.existsSync(configPath)) {
      const { overwrite } = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'overwrite',
          message: 'Configuration file already exists. Overwrite?',
          default: false,
        },
      ]);

      if (!overwrite) {
        console.log(chalk.blue('Configuration not created.'));
        return;
      }
    }

    fs.writeFileSync(configPath, JSON.stringify(config, null, 2), 'utf-8');
    console.log(chalk.green(`✓ Created configuration file: ${configPath}`));
  });

async function interactiveConfig(baseConfig: FormatterConfig): Promise<FormatterConfig> {
  console.log(chalk.cyan('\n🔧 Interactive Configuration\n'));

  const answers = await inquirer.prompt([
    {
      type: 'list',
      name: 'indentStyle',
      message: 'Indentation style:',
      choices: ['space', 'tab'],
      default: 'space',
    },
    {
      type: 'number',
      name: 'indentSize',
      message: 'Indentation size (spaces):',
      default: 2,
      when: (answers) => answers.indentStyle === 'space',
    },
    {
      type: 'list',
      name: 'lineEnding',
      message: 'Line ending style:',
      choices: ['lf', 'crlf', 'cr'],
      default: 'lf',
    },
    {
      type: 'confirm',
      name: 'trailingWhitespace',
      message: 'Remove trailing whitespace?',
      default: true,
    },
    {
      type: 'confirm',
      name: 'finalNewline',
      message: 'Insert final newline?',
      default: true,
    },
    {
      type: 'confirm',
      name: 'maxLineLength',
      message: 'Enable max line length check?',
      default: false,
    },
    {
      type: 'number',
      name: 'maxLineLengthValue',
      message: 'Max line length:',
      default: 80,
      when: (answers) => answers.maxLineLength,
    },
  ]);

  const config: FormatterConfig = {
    rules: [
      {
        name: 'indentation',
        enabled: true,
        options: {
          style: answers.indentStyle,
          size: answers.indentSize || 2,
        },
      },
      {
        name: 'line-ending',
        enabled: true,
        options: { style: answers.lineEnding },
      },
      {
        name: 'trailing-whitespace',
        enabled: answers.trailingWhitespace,
      },
      {
        name: 'final-newline',
        enabled: answers.finalNewline,
        options: { insert: answers.finalNewline },
      },
      {
        name: 'max-line-length',
        enabled: answers.maxLineLength,
        options: {
          length: answers.maxLineLengthValue || 80,
          action: 'warn',
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
