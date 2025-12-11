# Rules

CWF comes with a set of built-in formatting rules that can be combined to enforce consistent code style across your projects.

## Core Rules

### indentation

**Purpose:** Normalizes code indentation to either spaces or tabs with configurable size.

**Options:**

- `style`: `"space"` | `"tab"` (default: `"space"`)
- `size`: number (default: `2`, only applicable when `style` is `"space"`)

**How it works:**

- Detects existing indentation patterns in the code
- Converts all indentation to the specified style
- Maintains relative indentation levels
- Preserves empty lines

**Examples:**

```typescript
// Input (mixed indentation)
function hello() {
   if (true) {
    console.log('world');
 }
}

// Output with { style: 'space', size: 2 }
function hello() {
  if (true) {
    console.log('world');
  }
}

// Output with { style: 'tab' }
function hello() {
 if (true) {
  console.log('world');
 }
}
```

**Configuration:**

```json
{
  "name": "indentation",
  "enabled": true,
  "options": {
    "style": "space",
    "size": 2
  }
}
```

---

### line-ending

**Purpose:** Normalizes line endings to a consistent format (LF, CRLF, or CR).

**Options:**

- `style`: `"lf"` | `"crlf"` | `"cr"` (default: `"lf"`)

**How it works:**

- Scans file for all line ending characters
- Replaces all line endings with the specified style
- Handles mixed line endings in the same file

**Examples:**

```typescript
// Input (mixed line endings)
line1\r\n
line2\n
line3\r

// Output with { style: 'lf' } (Unix)
line1\n
line2\n
line3\n

// Output with { style: 'crlf' } (Windows)
line1\r\n
line2\r\n
line3\r\n
```

**Configuration:**

```json
{
  "name": "line-ending",
  "enabled": true,
  "options": {
    "style": "lf"
  }
}
```

**Use cases:**

- Cross-platform projects (normalize to LF for git)
- Windows-specific projects (use CRLF)
- Legacy Mac projects (use CR, rarely needed)

---

### trailing-whitespace

**Purpose:** Removes whitespace characters at the end of lines.

**Options:** None

**How it works:**

- Processes each line independently
- Removes all space and tab characters from line endings
- Preserves intentional empty lines
- Does not affect whitespace within lines

**Examples:**

```typescript
// Input (• represents spaces)
const name = 'John';••
const age = 30;•••••

// Output
const name = 'John';
const age = 30;
```

**Configuration:**

```json
{
  "name": "trailing-whitespace",
  "enabled": true
}
```

**Benefits:**

- Cleaner diffs in version control
- Reduces file size
- Prevents editor warnings
- Industry best practice

---

### final-newline

**Purpose:** Ensures files end with exactly one newline character (or removes it).

**Options:**

- `insert`: boolean (default: `true`)

**How it works:**

- Checks if file ends with a newline
- Adds or removes final newline based on `insert` option
- Removes multiple trailing newlines when `insert: true`
- Ensures clean file ending

**Examples:**

```typescript
// Input (no final newline)
const name = 'John';[EOF]

// Output with { insert: true }
const name = 'John';
[EOF]

// Input (multiple final newlines)
const name = 'John';


[EOF]

// Output with { insert: true }
const name = 'John';
[EOF]
```

**Configuration:**

```json
{
  "name": "final-newline",
  "enabled": true,
  "options": {
    "insert": true
  }
}
```

**Standards:**

- POSIX standard requires final newline
- Many linters and editors enforce this
- Prevents issues with tools that read files line-by-line

---

### max-line-length

**Purpose:** Validates or wraps lines exceeding a maximum length.

**Options:**

- `length`: number (default: `80`)
- `action`: `"warn"` | `"wrap"` (default: `"warn"`)

**How it works:**

- Measures each line's character count
- With `action: "warn"`: Logs warnings but doesn't modify content
- With `action: "wrap"`: Attempts to break long lines at spaces

**Examples:**

```typescript
// Input (long line)
const message = 'This is a very long string that exceeds the maximum line length configured in the formatter';

// Output with { length: 80, action: 'warn' }
// ⚠️ Warning: Line 1 exceeds 80 characters (90)
// (content unchanged)

// Output with { length: 80, action: 'wrap' }
const message = 'This is a very long string that exceeds the maximum line 
length configured in the formatter';
```

**Configuration:**

```json
{
  "name": "max-line-length",
  "enabled": true,
  "options": {
    "length": 80,
    "action": "warn"
  }
}
```

**Notes:**

- `wrap` mode is basic and may not work well with all code structures
- Use `warn` mode for linting, `wrap` mode with caution
- Common lengths: 80 (classic), 100 (modern), 120 (widescreen)

---

## Rule Application Order

Rules are applied **sequentially** in the order they appear in your configuration. Each rule receives the output of the previous rule as input.

**Example execution flow:**

```
Original Content
      ↓
Indentation Rule (normalize spaces)
      ↓
Line Ending Rule (normalize to LF)
      ↓
Trailing Whitespace Rule (remove)
      ↓
Final Newline Rule (insert)
      ↓
Max Line Length Rule (validate/wrap)
      ↓
Final Formatted Content
```

**Best Practice:** Order rules from most to least invasive:

1. `indentation` - Affects structure
2. `line-ending` - Affects line breaks
3. `trailing-whitespace` - Cleanup
4. `final-newline` - Final touch
5. `max-line-length` - Validation last

---

## Creating Custom Rules

CWF's plugin system allows you to create custom formatting rules.

### Rule Interface

```typescript
import { BaseFormattingRule } from '@codewaveinnovation/formatter';
import { FormatContext } from '@codewaveinnovation/formatter';

export class MyCustomRule extends BaseFormattingRule {
  readonly name = 'my-custom-rule';
  readonly description = 'Description of what this rule does';

  protected format(context: FormatContext): string {
    // Access current content
    const { content } = context;
    
    // Access configuration for this rule
    const ruleConfig = context.config.rules.find(r => r.name === this.name);
    const options = ruleConfig?.options || {};
    
    // Transform content
    const transformed = content; // Your transformation logic
    
    // Return new content (immutable)
    return transformed;
  }
}
```

### Creating a Plugin

```typescript
import { BasePlugin } from '@codewaveinnovation/formatter';
import { IFormattingRule } from '@codewaveinnovation/formatter';
import { MyCustomRule } from './MyCustomRule';

export class MyPlugin extends BasePlugin {
  readonly name = 'my-plugin';
  readonly version = '1.0.0';

  getRules(): IFormattingRule[] {
    return [
      new MyCustomRule()
    ];
  }
}
```

### Using Custom Plugin

```typescript
import { createFormatter, RuleRegistry } from '@codewaveinnovation/formatter';
import { PluginManager } from '@codewaveinnovation/formatter';
import { MyPlugin } from './MyPlugin';

const registry = new RuleRegistry();
const pluginManager = new PluginManager(registry);

// Load custom plugin
pluginManager.loadPlugin(new MyPlugin());

// Create formatter
const formatter = new CodeFormatter(registry);

// Use with configuration
const config = {
  rules: [
    { name: 'my-custom-rule', enabled: true, options: {} }
  ]
};

const result = await formatter.format(content, config);
```

---

## Rule Best Practices

### 1. Keep Rules Simple

Each rule should do one thing well. Avoid combining multiple concerns.

```typescript
// ✅ Good - Single responsibility
export class TrailingWhitespaceRule extends BaseFormattingRule {
  protected format(context: FormatContext): string {
    return context.content
      .split('\n')
      .map(line => line.replace(/\s+$/, ''))
      .join('\n');
  }
}

// ❌ Bad - Multiple responsibilities
export class WhitespaceRule extends BaseFormattingRule {
  protected format(context: FormatContext): string {
    // Removes trailing whitespace AND normalizes spaces AND fixes indentation
    // Too much in one rule!
  }
}
```

### 2. Make Rules Immutable

Always return new content instead of modifying the input.

```typescript
// ✅ Good - Immutable
protected format(context: FormatContext): string {
  return context.content.replace(/foo/g, 'bar');
}

// ❌ Bad - Mutates input
protected format(context: FormatContext): string {
  context.content = context.content.replace(/foo/g, 'bar'); // Never do this!
  return context.content;
}
```

### 3. Handle Edge Cases

```typescript
protected format(context: FormatContext): string {
  const { content } = context;
  
  // Handle empty content
  if (!content || content.length === 0) {
    return content;
  }
  
  // Handle single line
  if (!content.includes('\n')) {
    return this.processLine(content);
  }
  
  // Process multiple lines
  return content
    .split('\n')
    .map(line => this.processLine(line))
    .join('\n');
}
```

### 4. Document Options

```typescript
/**
 * Controls quote style in code
 * 
 * @options
 * - style: 'single' | 'double' - Type of quotes to use (default: 'single')
 * - avoidEscape: boolean - Prefer quotes that minimize escaping (default: true)
 * 
 * @example
 * // Input with double quotes
 * const name = "John";
 * 
 * // Output with { style: 'single' }
 * const name = 'John';
 */
export class QuoteStyleRule extends BaseFormattingRule {
  // Implementation
}
```

---

## Next Steps

- [Configuration Guide](/guide/configuration) - Learn how to configure rules
- [API Reference](/api/) - Programmatic usage
- [Getting Started](/guide/getting-started) - Quick start guide
- [Plugins](/guide/plugins) - Create custom rules with plugins
