# Configuration

CWF uses a flexible configuration system that allows you to customize the formatting rules according to your project's needs.

## Configuration Files

CWF automatically searches for configuration in the following order:

1. `.cwfrc.json` - Dedicated configuration file
2. `.cwfrc` - Alternative configuration file
3. `package.json` - Under the `"formatter"` key

You can also specify a custom configuration file using the `--config` flag.

## Configuration Structure

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
    },
    {
      "name": "max-line-length",
      "enabled": false,
      "options": {
        "length": 80,
        "action": "warn"
      }
    }
  ]
}
```

## Rule Configuration

Each rule in the configuration array has the following structure:

### Common Properties

- **`name`** (string, required): The unique identifier of the rule
- **`enabled`** (boolean, required): Whether the rule should be applied
- **`options`** (object, optional): Rule-specific configuration options

### Available Rules

#### `indentation`

Controls code indentation style.

**Options:**

- `style` (string): `"space"` or `"tab"` - Default: `"space"`
- `size` (number): Number of spaces per indentation level (only for `style: "space"`) - Default: `2`

**Examples:**

```json
// 2 spaces
{
  "name": "indentation",
  "enabled": true,
  "options": { "style": "space", "size": 2 }
}

// 4 spaces
{
  "name": "indentation",
  "enabled": true,
  "options": { "style": "space", "size": 4 }
}

// Tabs
{
  "name": "indentation",
  "enabled": true,
  "options": { "style": "tab" }
}
```

#### `line-ending`

Normalizes line endings across files.

**Options:**

- `style` (string): `"lf"` (Unix), `"crlf"` (Windows), or `"cr"` (Mac) - Default: `"lf"`

**Examples:**

```json
// Unix (LF)
{
  "name": "line-ending",
  "enabled": true,
  "options": { "style": "lf" }
}

// Windows (CRLF)
{
  "name": "line-ending",
  "enabled": true,
  "options": { "style": "crlf" }
}
```

#### `trailing-whitespace`

Removes whitespace at the end of lines.

**Options:** None (this rule has no configurable options)

**Example:**

```json
{
  "name": "trailing-whitespace",
  "enabled": true
}
```

#### `final-newline`

Ensures files end with a newline character.

**Options:**

- `insert` (boolean): Whether to insert a final newline - Default: `true`

**Examples:**

```json
// Insert final newline
{
  "name": "final-newline",
  "enabled": true,
  "options": { "insert": true }
}

// Remove final newline
{
  "name": "final-newline",
  "enabled": true,
  "options": { "insert": false }
}
```

#### `max-line-length`

Validates or wraps long lines.

**Options:**

- `length` (number): Maximum line length - Default: `80`
- `action` (string): `"warn"` (only report) or `"wrap"` (attempt to break lines) - Default: `"warn"`

**Examples:**

```json
// Warn about lines over 100 characters
{
  "name": "max-line-length",
  "enabled": true,
  "options": {
    "length": 100,
    "action": "warn"
  }
}

// Wrap lines over 120 characters
{
  "name": "max-line-length",
  "enabled": true,
  "options": {
    "length": 120,
    "action": "wrap"
  }
}
```

## Configuration Examples

### Minimal Configuration

```json
{
  "rules": [
    { "name": "indentation", "enabled": true, "options": { "style": "space", "size": 2 } },
    { "name": "trailing-whitespace", "enabled": true }
  ]
}
```

### Web Development (2 spaces, LF)

```json
{
  "rules": [
    { "name": "indentation", "enabled": true, "options": { "style": "space", "size": 2 } },
    { "name": "line-ending", "enabled": true, "options": { "style": "lf" } },
    { "name": "trailing-whitespace", "enabled": true },
    { "name": "final-newline", "enabled": true, "options": { "insert": true } },
    { "name": "max-line-length", "enabled": true, "options": { "length": 100, "action": "warn" } }
  ]
}
```

### Python Style (4 spaces, LF, strict)

```json
{
  "rules": [
    { "name": "indentation", "enabled": true, "options": { "style": "space", "size": 4 } },
    { "name": "line-ending", "enabled": true, "options": { "style": "lf" } },
    { "name": "trailing-whitespace", "enabled": true },
    { "name": "final-newline", "enabled": true, "options": { "insert": true } },
    { "name": "max-line-length", "enabled": true, "options": { "length": 79, "action": "warn" } }
  ]
}
```

### Windows Development (Tabs, CRLF)

```json
{
  "rules": [
    { "name": "indentation", "enabled": true, "options": { "style": "tab" } },
    { "name": "line-ending", "enabled": true, "options": { "style": "crlf" } },
    { "name": "trailing-whitespace", "enabled": true },
    { "name": "final-newline", "enabled": true, "options": { "insert": true } }
  ]
}
```

## Using Configuration File

### Create Configuration

```bash
# Interactive mode (generates .cwfrc.json)
cwf init

# Manual creation
echo '{
  "rules": [
    { "name": "indentation", "enabled": true, "options": { "style": "space", "size": 2 } },
    { "name": "trailing-whitespace", "enabled": true }
  ]
}' > .cwfrc.json
```

### Use Custom Configuration

```bash
# Auto-discovery (searches .cwfrc.json, .cwfrc, package.json)
cwf format src/**/*.ts

# Explicit configuration file
cwf format src/**/*.ts --config ./config/formatter.json
```

## Configuration in package.json

You can also store configuration in your `package.json`:

```json
{
  "name": "my-project",
  "version": "1.0.0",
  "formatter": {
    "rules": [
      { "name": "indentation", "enabled": true, "options": { "style": "space", "size": 2 } },
      { "name": "trailing-whitespace", "enabled": true }
    ]
  }
}
```

## Programmatic Configuration

When using CWF programmatically, pass configuration directly:

```typescript
import { createFormatter, FormatterConfig } from '@codewaveinnovation/formatter';

const config: FormatterConfig = {
  rules: [
    { name: 'indentation', enabled: true, options: { style: 'space', size: 2 } },
    { name: 'trailing-whitespace', enabled: true }
  ]
};

const formatter = createFormatter();
const result = await formatter.format(code, config);
```

## Next Steps

- [Learn about Rules](/guide/rules) - Detailed documentation for each rule
- [API Reference](./../api/README.md) - Programmatic usage guide
