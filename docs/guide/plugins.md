# Plugins & Extensions

CWF's plugin system allows you to extend the formatter with custom rules and functionality. This modular architecture makes it easy to create, share, and reuse formatting rules across projects.

## Understanding Plugins

A **plugin** is a bundle of formatting rules that can be loaded into CWF. The plugin system follows the **Open/Closed Principle** - the formatter is open for extension but closed for modification.

### Core Plugin

CWF includes a built-in `CorePlugin` that provides all standard formatting rules:

- `indentation` - Normalize spaces/tabs
- `line-ending` - Normalize line endings (LF/CRLF/CR)
- `trailing-whitespace` - Remove trailing whitespace
- `final-newline` - Ensure final newline
- `max-line-length` - Validate/wrap long lines

The core plugin is **automatically loaded** when you use `createFormatter()`.

## Creating Custom Plugins

### Basic Plugin Structure

```typescript
import { BasePlugin, IFormattingRule } from '@codewaveinnovation/formatter';

export class MyPlugin extends BasePlugin {
  readonly name = 'my-plugin';
  readonly version = '1.0.0';

  getRules(): IFormattingRule[] {
    return [
      new MyCustomRule(),
      new AnotherCustomRule(),
    ];
  }
}
```

### Creating a Custom Rule

Rules must extend `BaseFormattingRule`:

```typescript
import { BaseFormattingRule, FormatContext } from '@codewaveinnovation/formatter';

export class SemicolonRule extends BaseFormattingRule {
  readonly name = 'semicolon';
  readonly description = 'Enforces semicolon usage at end of statements';

  protected format(context: FormatContext): string {
    const { content, config } = context;
    
    // Get rule configuration
    const ruleConfig = config.rules.find(r => r.name === this.name);
    const options = ruleConfig?.options || { enforce: true };

    if (options.enforce) {
      // Add semicolons where missing
      return this.addSemicolons(content);
    } else {
      // Remove semicolons
      return this.removeSemicolons(content);
    }
  }

  private addSemicolons(content: string): string {
    // Implementation details...
    return content;
  }

  private removeSemicolons(content: string): string {
    // Implementation details...
    return content;
  }
}
```

## Plugin Examples

### Example 1: Quote Style Plugin

```typescript
import { BasePlugin, BaseFormattingRule, FormatContext } from '@codewaveinnovation/formatter';

class QuoteStyleRule extends BaseFormattingRule {
  readonly name = 'quote-style';
  readonly description = 'Normalize quote style (single/double)';

  protected format(context: FormatContext): string {
    const ruleConfig = context.config.rules.find(r => r.name === this.name);
    const style = ruleConfig?.options?.style || 'single';
    
    if (style === 'single') {
      // Convert double quotes to single
      return context.content.replace(/"([^"]*)"/g, "'$1'");
    } else {
      // Convert single quotes to double
      return context.content.replace(/'([^']*)'/g, '"$1"');
    }
  }
}

export class StringFormattingPlugin extends BasePlugin {
  readonly name = 'string-formatting';
  readonly version = '1.0.0';

  getRules(): IFormattingRule[] {
    return [new QuoteStyleRule()];
  }
}
```

**Usage:**

```typescript
import { createFormatter, RuleRegistry, PluginManager } from '@codewaveinnovation/formatter';
import { StringFormattingPlugin } from './StringFormattingPlugin';

const registry = new RuleRegistry();
const pluginManager = new PluginManager(registry);

// Load custom plugin
pluginManager.loadPlugin(new StringFormattingPlugin());

const formatter = new CodeFormatter(registry);

const config = {
  rules: [
    { name: 'quote-style', enabled: true, options: { style: 'single' } }
  ]
};

const result = await formatter.format(code, config);
```

### Example 2: Multi-Rule Plugin

```typescript
import { BasePlugin } from '@codewaveinnovation/formatter';

class CommentFormatRule extends BaseFormattingRule {
  readonly name = 'comment-format';
  readonly description = 'Formats comments consistently';

  protected format(context: FormatContext): string {
    // Ensure space after // in single-line comments
    return context.content.replace(/\/\/([^\s])/g, '// $1');
  }
}

class BracketSpacingRule extends BaseFormattingRule {
  readonly name = 'bracket-spacing';
  readonly description = 'Controls spacing inside brackets';

  protected format(context: FormatContext): string {
    const ruleConfig = context.config.rules.find(r => r.name === this.name);
    const spacing = ruleConfig?.options?.spacing !== false;
    
    if (spacing) {
      // Add space inside brackets: { key: value }
      return context.content
        .replace(/\{([^\s{])/g, '{ $1')
        .replace(/([^\s}])\}/g, '$1 }');
    } else {
      // Remove space inside brackets: {key: value}
      return context.content
        .replace(/\{\s+/g, '{')
        .replace(/\s+\}/g, '}');
    }
  }
}

export class StyleGuidePlugin extends BasePlugin {
  readonly name = 'style-guide';
  readonly version = '1.0.0';

  getRules(): IFormattingRule[] {
    return [
      new CommentFormatRule(),
      new BracketSpacingRule(),
    ];
  }
}
```

## Loading Plugins

### Method 1: Programmatic Loading

```typescript
import { RuleRegistry, PluginManager, CodeFormatter } from '@codewaveinnovation/formatter';
import { MyPlugin } from './MyPlugin';

const registry = new RuleRegistry();
const pluginManager = new PluginManager(registry);

// Load plugins
pluginManager.loadPlugin(new MyPlugin());

// Create formatter
const formatter = new CodeFormatter(registry);
```

### Method 2: Using createFormatter with Custom Registry

```typescript
import { createFormatter, RuleRegistry, PluginManager } from '@codewaveinnovation/formatter';
import { CorePlugin } from '@codewaveinnovation/formatter';
import { MyPlugin } from './MyPlugin';

// Create custom setup
const registry = new RuleRegistry();
const pluginManager = new PluginManager(registry);

// Load core plugin (required for standard rules)
pluginManager.loadPlugin(new CorePlugin());

// Load custom plugins
pluginManager.loadPlugin(new MyPlugin());

// Create formatter with custom registry
const formatter = new CodeFormatter(registry);
```

## Plugin Best Practices

### 1. Single Responsibility

Each plugin should have a clear, focused purpose:

```typescript
// ✅ Good - Focused purpose
export class StringFormattingPlugin extends BasePlugin {
  // Only string-related rules
}

// ❌ Bad - Too broad
export class EverythingPlugin extends BasePlugin {
  // 50 different unrelated rules
}
```

### 2. Versioning

Always version your plugins:

```typescript
export class MyPlugin extends BasePlugin {
  readonly name = 'my-plugin';
  readonly version = '1.2.0'; // Follow semantic versioning
}
```

### 3. Documentation

Document your rules with clear examples:

```typescript
/**
 * Enforces consistent spacing around operators
 * 
 * @example
 * // Before
 * let x=1+2;
 * 
 * // After
 * let x = 1 + 2;
 */
export class OperatorSpacingRule extends BaseFormattingRule {
  // ...
}
```

### 4. Configuration Options

Make rules configurable:

```typescript
protected format(context: FormatContext): string {
  const ruleConfig = context.config.rules.find(r => r.name === this.name);
  const options = ruleConfig?.options || {
    // Default options
    style: 'single',
    avoidEscape: true,
  };
  
  // Use options in your logic
}
```

### 5. Error Handling

Handle edge cases gracefully:

```typescript
protected format(context: FormatContext): string {
  const { content } = context;
  
  // Handle empty content
  if (!content || content.length === 0) {
    return content;
  }
  
  try {
    return this.transformContent(content);
  } catch (error) {
    // Log error but don't crash
    console.warn(`Rule ${this.name} failed:`, error);
    return content; // Return original content
  }
}
```

## Publishing Plugins

### Package Structure

```
my-cwf-plugin/
├── src/
│   ├── rules/
│   │   ├── MyRule.ts
│   │   └── AnotherRule.ts
│   ├── MyPlugin.ts
│   └── index.ts
├── package.json
├── tsconfig.json
└── README.md
```

### package.json

```json
{
  "name": "@yourorg/cwf-plugin-name",
  "version": "1.0.0",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "peerDependencies": {
    "@codewaveinnovation/formatter": "^1.0.0"
  },
  "keywords": ["cwf", "formatter", "plugin"]
}
```

### index.ts

```typescript
// Export plugin and rules
export { MyPlugin } from './MyPlugin';
export { MyRule } from './rules/MyRule';
```

### Publishing to npm

```bash
npm login
npm publish --access public
```

## Community Plugins

Want to share your plugin? Submit a PR to add it to this list!

### Official Extensions

- **@codewaveinnovation/formatter-eslint** _(coming soon)_ - Bridge between CWF and ESLint rules
- **@codewaveinnovation/formatter-prettier** _(coming soon)_ - Prettier-compatible rules

### Community Plugins

_No community plugins yet - be the first to create one!_

To add your plugin:

1. Fork the repository
2. Add your plugin to this section
3. Include: name, description, npm link, GitHub link
4. Submit a PR

## Plugin API Reference

### BasePlugin

Abstract class for creating plugins.

**Required Properties:**

- `name: string` - Unique plugin identifier
- `version: string` - Semver version

**Required Methods:**

- `getRules(): IFormattingRule[]` - Returns array of rules

### PluginManager

Manages plugin loading and rule registration.

**Methods:**

- `loadPlugin(plugin: IPlugin): void` - Loads a plugin and registers its rules
- `getLoadedPlugins(): string[]` - Returns names of loaded plugins

### RuleRegistry

Central registry for all formatting rules.

**Methods:**

- `register(rule: IFormattingRule): void` - Registers a rule
- `get(name: string): IFormattingRule | undefined` - Gets a rule by name
- `getAll(): IFormattingRule[]` - Gets all registered rules
- `has(name: string): boolean` - Checks if a rule exists

## Next Steps

- [Rules Guide](/guide/rules) - Learn about built-in rules
- [Configuration](/guide/configuration) - Configure your formatter
- [API Reference](/api/) - Full API documentation

## Need Help?

- 💬 [Discussions](https://github.com/CodeWaveInnovation/codewaveinnovation-formatter/discussions) - Ask questions
- 🐛 [Issues](https://github.com/CodeWaveInnovation/codewaveinnovation-formatter/issues) - Report bugs
- 📧 Contact: [support@codewaveinnovation.com](mailto:support@codewaveinnovation.com)
