# Getting Started

## Installation

### Global Installation

Install CWF globally to use it from anywhere:

```bash
npm install -g @codewaveinnovation/formatter
```

### Project Installation

Install as a dev dependency in your project:

```bash
npm install --save-dev @codewaveinnovation/formatter
```

## Basic Usage

### Format a Single File

```bash
cwf format myfile.txt
```

### Format Multiple Files

Using glob patterns:

```bash
cwf format "src/**/*.ts"
cwf format "*.js" "*.ts"
```

### Interactive Mode

Configure rules interactively:

```bash
cwf format myfile.txt --interactive
```

### Check Formatting

Check if files are formatted without modifying them:

```bash
cwf check myfile.txt
```

## Configuration

### Auto-Discovery

CWF automatically searches for configuration files in the current directory:

- `.cwfrc.json`
- `.cwfrc`
- `package.json` (under `"formatter"` key)

### Create Default Config

Generate a default configuration file:

```bash
cwf init
```

This creates a `.cwfrc.json` file with default settings:

```json
{
  "rules": [
    {
      "name": "indentation",
      "enabled": true,
      "options": { "style": "space", "size": 2 }
    },
    {
      "name": "line-ending",
      "enabled": true,
      "options": { "style": "lf" }
    },
    {
      "name": "trailing-whitespace",
      "enabled": true
    },
    {
      "name": "final-newline",
      "enabled": true,
      "options": { "insert": true }
    }
  ]
}
```

## Programmatic Usage

Use CWF in your Node.js applications:

```typescript
import { createFormatter, getDefaultConfig } from '@codewaveinnovation/formatter';

const formatter = createFormatter();
const config = getDefaultConfig();

const result = await formatter.format('  hello world  ', config);

console.log(result.content);       // 'hello world\n'
console.log(result.changed);       // true
console.log(result.appliedRules);  // ['trailing-whitespace', 'final-newline']
```

## Next Steps

- Learn about [Configuration](./configuration) options
- Explore available [Rules](./rules)
- Check the [API documentation](../api/README.md)
