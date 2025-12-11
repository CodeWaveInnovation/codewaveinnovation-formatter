<div align="center">
  <img src="docs/public/banner.png" width="100%" style="max-width: 800px;" alt="CWF Banner">
  <h1>@codewaveinnovation/formatter</h1>
</div>

<div align="center">

[![npm version](https://img.shields.io/npm/v/@codewaveinnovation/formatter)](https://www.npmjs.com/package/@codewaveinnovation/formatter)
[![npm downloads](https://img.shields.io/npm/dt/@codewaveinnovation/formatter)](https://www.npmjs.com/package/@codewaveinnovation/formatter)
[![Tests](https://github.com/CodeWaveInnovation/codewaveinnovation-formatter/actions/workflows/test.yml/badge.svg)](https://github.com/CodeWaveInnovation/codewaveinnovation-formatter/actions/workflows/test.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)](https://nodejs.org)

**Language-agnostic code formatter with configurable rules and plugin support**

[📚 Documentation](https://codewaveinnovation.github.io/codewaveinnovation-formatter/) • [🚀 Getting Started](https://codewaveinnovation.github.io/codewaveinnovation-formatter/guide/getting-started) • [🔌 Plugins](https://codewaveinnovation.github.io/codewaveinnovation-formatter/guide/plugins) • [📖 API Reference](https://codewaveinnovation.github.io/codewaveinnovation-formatter/api/)

</div>

---

## 🚀 Features

- **Language-agnostic**: Works with any kind of text file
- **SOLID architecture**: Modular and extensible design
- **Plugin system**: Extend functionality without changing the core code
- **Interactive CLI**: Command-line interface with interactive mode
- **Configurable rules**: Customize formatting to fit your needs
- **High test coverage**: Over 80% code coverage

## 📦 Installation

```bash
npm install @codewaveinnovation/formatter
```

For global CLI usage:

```bash
npm install -g @codewaveinnovation/formatter
```

## 🎯 Usage

### CLI

#### Format files

Format a single file:

```bash
cwf format file.txt
```

Format multiple files with glob patterns:

```bash
cwf format "src/**/*.ts"        # All TypeScript files in src/
cwf format "*.js" "*.ts"        # All JS and TS files in current dir
cwf format src/ test/           # All files in src/ and test/ directories
```

#### Interactive mode

```bash
cwf format file.txt --interactive
```

#### Use a configuration file

```bash
cwf format file.txt --config .cwfrc.json
```

#### Auto-discovery of configuration

The CLI automatically searches for configuration files in the current directory:

```bash
cwf format file.txt
# Looks for .cwfrc.json, .cwfrc, or package.json (formatter key)
```

Supported config locations (in order of priority):

- `.cwfrc.json`
- `.cwfrc`
- `package.json` under `"formatter"` key

#### Check formatting without modifying

```bash
cwf check file.txt
```

#### Create a default configuration file

```bash
cwf init
```

### Programmatic API

```typescript
import { createFormatter, getDefaultConfig } from '@codewaveinnovation/formatter';

// Create a formatter with default rules
const formatter = createFormatter();
const config = getDefaultConfig();

// Format content
const result = await formatter.format('  hello world  ', config);
console.log(result.content); // 'hello world\n'
console.log(result.changed); // true
console.log(result.appliedRules); // ['trailing-whitespace', 'final-newline']
```

### Custom configuration

```typescript
import { createFormatter, FormatterConfig } from '@codewaveinnovation/formatter';

const formatter = createFormatter();

const customConfig: FormatterConfig = {
  rules: [
    { 
      name: 'indentation', 
      enabled: true, 
      options: { style: 'space', size: 4 } 
    },
    { 
      name: 'line-ending', 
      enabled: true, 
      options: { style: 'lf' } 
    },
    { 
      name: 'trailing-whitespace', 
      enabled: true 
    },
    { 
      name: 'final-newline', 
      enabled: true, 
      options: { insert: true } 
    },
  ],
};

const result = await formatter.format(code, customConfig);
```

## 📋 Available Rules

### `indentation`

Normalizes indentation to spaces or tabs.

**Options:**

- `style`: `'space'` | `'tab'` (default: `'space'`)
- `size`: number of spaces per level (default: `2`)

### `line-ending`

Normalizes line endings.

**Options:**

- `style`: `'lf'` | `'crlf'` | `'cr'` (default: `'lf'`)

### `trailing-whitespace`

Removes trailing whitespace at the end of lines.

### `final-newline`

Ensures the file ends with a newline.

**Options:**

- `insert`: `boolean` (default: `true`)

### `max-line-length`

Controls the maximum length of lines.

**Options:**

- `length`: number of characters (default: `80`)
- `action`: `'warn'` | `'wrap'` (default: `'warn'`)

## 🔌 Plugin System

Create your own plugin to extend functionality:

```typescript
import { BasePlugin, IFormattingRule } from '@codewaveinnovation/formatter';
import { MyCustomRule } from './my-custom-rule';

export class MyPlugin extends BasePlugin {
  readonly name = 'my-plugin';
  readonly version = '1.0.0';

  getRules(): IFormattingRule[] {
    return [new MyCustomRule()];
  }
}
```

Load the plugin:

```typescript
import { RuleRegistry, PluginManager, CodeFormatter } from '@codewaveinnovation/formatter';
import { MyPlugin } from './my-plugin';

const registry = new RuleRegistry();
const pluginManager = new PluginManager(registry);
const myPlugin = new MyPlugin();

pluginManager.loadPlugin(myPlugin);

const formatter = new CodeFormatter(registry);
```

## 🏗️ SOLID Architecture

The project follows the SOLID principles:

- **S**ingle Responsibility: Each class has a single responsibility
- **O**pen/Closed: Open for extension (plugins), closed for modification
- **L**iskov Substitution: Implementations can be substituted by their interfaces
- **I**nterface Segregation: Specific interfaces instead of general ones
- **D**ependency Inversion: Depend on abstractions, not concretions

## 🧪 Tests

Run tests:

```bash
npm test
```

View coverage:

```bash
npm run test:coverage
```

## 🛠️ Development

```bash
# Install dependencies
npm install

# Build
npm run build

# Run linter
npm run lint

# Run tests
npm test
```

## 📄 License

MIT © CodeWave Innovation

## 🤝 Contributing

Contributions are welcome. Please open an issue or pull request for suggestions or improvements.

## 📚 Additional documentation

### Configuration file (.cwfrc.json)

```json
{
  "rules": [
    {
      "name": "indentation",
      "enabled": true,
      "options": {
        "style": "space",
        "size": 2
      }
    },
    {
      "name": "line-ending",
      "enabled": true,
      "options": {
        "style": "lf"
      }
    },
    {
      "name": "trailing-whitespace",
      "enabled": true
    },
    {
      "name": "final-newline",
      "enabled": true,
      "options": {
        "insert": true
      }
    }
  ]
}
```
