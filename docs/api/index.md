---
outline: deep
---

# API Reference

Complete API documentation for **@codewaveinnovation/formatter**. This reference is auto-generated from source code using TypeDoc.

## Quick Links

::: tip Common Use Cases

- **[Getting Started](#getting-started)** - Create and use a formatter
- **[Creating Custom Rules](#creating-custom-rules)** - Extend with your own rules
- **[Plugin System](#plugin-system)** - Build and load plugins
- **[Configuration](#configuration)** - Configure formatting rules
:::

## Getting Started

### Basic Usage

```typescript
import { createFormatter, getDefaultConfig } from '@codewaveinnovation/formatter';

// Create formatter instance
const formatter = createFormatter();

// Format code with default config
const result = await formatter.format(sourceCode);

// Format with custom config
const config = getDefaultConfig();
const result = await formatter.format(sourceCode, config);
```

### Key Exports

| Export | Type | Description |
|--------|------|-------------|
| `createFormatter()` | Function | Creates a formatter with CorePlugin loaded |
| `getDefaultConfig()` | Function | Returns default configuration object |
| `CodeFormatter` | Class | Main formatter class |
| `RuleRegistry` | Class | Registry for formatting rules |
| `PluginManager` | Class | Manages plugin loading |
| `BaseFormattingRule` | Class | Abstract base for creating rules |
| `BasePlugin` | Class | Abstract base for creating plugins |
| `CorePlugin` | Class | Built-in plugin with standard rules |

## Core Classes

### CodeFormatter

Main formatter class that applies rules to content.

```typescript
import { CodeFormatter, RuleRegistry } from '@codewaveinnovation/formatter';

const registry = new RuleRegistry();
const formatter = new CodeFormatter(registry);

const result = await formatter.format(content, config);
// result: { content: string, changed: boolean, appliedRules: string[] }
```

**Methods:**

- `format(content: string, config?: FormatterConfig): Promise<FormatResult>` - Formats content with given configuration

### RuleRegistry

Central registry for all formatting rules.

```typescript
import { RuleRegistry } from '@codewaveinnovation/formatter';

const registry = new RuleRegistry();

// Register a rule
registry.register(new MyCustomRule());

// Get a rule by name
const rule = registry.get('my-rule');

// Check if rule exists
const exists = registry.has('my-rule');

// Get all rules
const allRules = registry.getAll();
```

**Methods:**

- `register(rule: IFormattingRule): void` - Registers a new rule
- `get(name: string): IFormattingRule | undefined` - Gets rule by name
- `has(name: string): boolean` - Checks if rule exists
- `getAll(): IFormattingRule[]` - Returns all registered rules

### PluginManager

Manages loading plugins and registering their rules.

```typescript
import { PluginManager, RuleRegistry } from '@codewaveinnovation/formatter';

const registry = new RuleRegistry();
const manager = new PluginManager(registry);

// Load a plugin
manager.loadPlugin(new MyPlugin());

// Get loaded plugin names
const plugins = manager.getLoadedPlugins();
```

**Methods:**

- `loadPlugin(plugin: IPlugin): void` - Loads plugin and registers its rules
- `getLoadedPlugins(): string[]` - Returns names of loaded plugins

## Creating Custom Rules

### BaseFormattingRule

Abstract base class for implementing custom formatting rules.

```typescript
import { BaseFormattingRule, FormatContext } from '@codewaveinnovation/formatter';

export class MyRule extends BaseFormattingRule {
  readonly name = 'my-rule';
  readonly description = 'Does something cool';

  protected format(context: FormatContext): string {
    const { content, config } = context;
    
    // Get rule configuration
    const ruleConfig = config.rules.find(r => r.name === this.name);
    const options = ruleConfig?.options || {};
    
    // Transform content
    return transformedContent;
  }
}
```

**Required Properties:**

- `name: string` - Unique rule identifier
- `description: string` - Human-readable description

**Required Methods:**

- `format(context: FormatContext): string` - Transforms content

**Inherited Methods:**

- `apply(context: FormatContext): FormatResult` - Applies rule and returns result

## Plugin System

### BasePlugin

Abstract base class for creating plugins.

```typescript
import { BasePlugin, IFormattingRule } from '@codewaveinnovation/formatter';

export class MyPlugin extends BasePlugin {
  readonly name = 'my-plugin';
  readonly version = '1.0.0';

  getRules(): IFormattingRule[] {
    return [
      new MyFirstRule(),
      new MySecondRule(),
    ];
  }
}
```

**Required Properties:**

- `name: string` - Unique plugin identifier
- `version: string` - Semantic version string

**Required Methods:**

- `getRules(): IFormattingRule[]` - Returns array of rules provided by plugin

### CorePlugin

Built-in plugin containing standard formatting rules.

**Included Rules:**

- `indentation` - Normalize indentation (spaces/tabs)
- `line-ending` - Normalize line endings (LF/CRLF/CR)
- `trailing-whitespace` - Remove trailing whitespace
- `final-newline` - Ensure final newline
- `max-line-length` - Validate or wrap long lines

```typescript
import { CorePlugin } from '@codewaveinnovation/formatter';

const corePlugin = new CorePlugin();
const rules = corePlugin.getRules(); // Returns 5 built-in rules
```

## Configuration

### FormatterConfig

Configuration object defining which rules to apply.

```typescript
interface FormatterConfig {
  rules: RuleConfig[];
}
```

### RuleConfig

Configuration for individual rules.

```typescript
interface RuleConfig {
  name: string;      // Rule identifier
  enabled: boolean;  // Whether to apply this rule
  options?: Record<string, any>; // Rule-specific options
}
```

**Example:**

```typescript
const config: FormatterConfig = {
  rules: [
    {
      name: 'indentation',
      enabled: true,
      options: { style: 'space', size: 2 }
    },
    {
      name: 'line-ending',
      enabled: true,
      options: { style: 'lf' }
    }
  ]
};
```

## Types & Interfaces

### FormatContext

Context passed to rules during formatting.

```typescript
interface FormatContext {
  content: string;           // Current content to format
  config: FormatterConfig;   // Full configuration
  filePath?: string;         // Optional file path
}
```

### FormatResult

Result returned after formatting.

```typescript
interface FormatResult {
  content: string;        // Formatted content
  changed: boolean;       // Whether content was modified
  appliedRules: string[]; // Names of rules that made changes
}
```

### IFormattingRule

Interface for formatting rules.

```typescript
interface IFormattingRule {
  readonly name: string;
  readonly description: string;
  apply(context: FormatContext): FormatResult;
}
```

### IPlugin

Interface for plugins.

```typescript
interface IPlugin {
  readonly name: string;
  readonly version: string;
  getRules(): IFormattingRule[];
}
```

### IFormatter

Interface for formatters.

```typescript
interface IFormatter {
  format(content: string, config?: FormatterConfig): Promise<FormatResult>;
}
```

### IRuleRegistry

Interface for rule registries.

```typescript
interface IRuleRegistry {
  register(rule: IFormattingRule): void;
  get(name: string): IFormattingRule | undefined;
  has(name: string): boolean;
  getAll(): IFormattingRule[];
}
```

## Built-in Rules

### IndentationRule

Normalizes code indentation to spaces or tabs.

**Options:**

- `style: 'space' | 'tab'` - Indentation style (default: 'space')
- `size: number` - Number of spaces per level (default: 2)

### LineEndingRule

Normalizes line endings.

**Options:**

- `style: 'lf' | 'crlf' | 'cr'` - Line ending style (default: 'lf')

### TrailingWhitespaceRule

Removes trailing whitespace from lines.

**Options:** None

### FinalNewlineRule

Ensures files end with a newline.

**Options:**

- `insert: boolean` - Whether to insert final newline (default: true)

### MaxLineLengthRule

Validates or wraps long lines.

**Options:**

- `length: number` - Maximum line length (default: 80)
- `action: 'warn' | 'wrap'` - Action to take (default: 'warn')

## Advanced Usage

### Custom Registry Setup

```typescript
import { 
  CodeFormatter, 
  RuleRegistry, 
  PluginManager,
  CorePlugin 
} from '@codewaveinnovation/formatter';

// Create custom setup
const registry = new RuleRegistry();
const pluginManager = new PluginManager(registry);

// Load plugins
pluginManager.loadPlugin(new CorePlugin());
pluginManager.loadPlugin(new MyCustomPlugin());

// Create formatter
const formatter = new CodeFormatter(registry);
```

### Error Handling

```typescript
try {
  const result = await formatter.format(content, config);
  
  if (result.changed) {
    console.log('Applied rules:', result.appliedRules);
    // Save or use result.content
  }
} catch (error) {
  console.error('Formatting failed:', error);
}
```

## See Also

- [Guide](/guide/getting-started) - User guide and tutorials
- [Configuration](/guide/configuration) - Configuration options
- [Rules](/guide/rules) - Built-in rules documentation
- [Plugins](/guide/plugins) - Plugin development guide
