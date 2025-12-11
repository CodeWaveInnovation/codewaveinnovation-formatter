# Examples

## Basic Usage Example

```typescript
import { createFormatter, getDefaultConfig } from '@codewaveinnovation/formatter';

const formatter = createFormatter();
const config = getDefaultConfig();

const messyCode = `  function hello() {  
    return "world";  
}`;

const result = await formatter.format(messyCode, config);
console.log(result.content);
// Output: function hello() {\n  return "world";\n}\n
```

## Creating a Custom Plugin

```typescript
import { BasePlugin, IFormattingRule, BaseFormattingRule } from '@codewaveinnovation/formatter';

class UppercaseRule extends BaseFormattingRule {
  readonly name = 'uppercase';
  readonly description = 'Converts all text to uppercase';

  protected format(context): string {
    return context.content.toUpperCase();
  }
}

class CustomPlugin extends BasePlugin {
  readonly name = 'custom-plugin';
  readonly version = '1.0.0';

  getRules(): IFormattingRule[] {
    return [new UppercaseRule()];
  }
}

// Use the custom plugin
import { RuleRegistry, PluginManager, CodeFormatter } from '@codewaveinnovation/formatter';

const registry = new RuleRegistry();
const pluginManager = new PluginManager(registry);
const customPlugin = new CustomPlugin();

pluginManager.loadPlugin(customPlugin);

const formatter = new CodeFormatter(registry);
const result = await formatter.format('hello', {
  rules: [{ name: 'uppercase', enabled: true }]
});

console.log(result.content); // HELLO
```

## CLI Examples

### Format a file
```bash
cwf format myfile.txt
```

### Check if a file is formatted
```bash
cwf check myfile.txt
```

### Use interactive mode
```bash
cwf format myfile.txt --interactive
```

### Use custom configuration
```bash
cwf format myfile.txt --config .cwfrc.json
```

### Create a configuration file
```bash
cwf init
```

## Configuration Example

Create a `.cwfrc.json` file:

```json
{
  "rules": [
    {
      "name": "indentation",
      "enabled": true,
      "options": {
        "style": "space",
        "size": 4
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
      "enabled": true,
      "options": {
        "length": 100,
        "action": "wrap"
      }
    }
  ]
}
```

## Programmatic Configuration

```typescript
import { createFormatter, FormatterConfig } from '@codewaveinnovation/formatter';

const formatter = createFormatter();

const customConfig: FormatterConfig = {
  rules: [
    { 
      name: 'indentation', 
      enabled: true, 
      options: { style: 'tab' } 
    },
    { 
      name: 'trailing-whitespace', 
      enabled: true 
    },
  ],
};

const result = await formatter.format(code, customConfig);
```
