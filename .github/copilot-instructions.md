# Copilot Instructions for @codewaveinnovation/formatter

## Project Architecture

This is a **language-agnostic code formatter** built with TypeScript following **strict SOLID principles**. The architecture consists of four core layers:

### Core Components

1. **Formatters Layer** ([src/formatters](../src/formatters/))

   - `CodeFormatter`: Main entry point that applies rules sequentially from config
   - `RuleRegistry`: Central registry managing all available formatting rules
   - Uses Dependency Inversion - `CodeFormatter` depends on `IRuleRegistry` interface, not concrete implementation

2. **Rules Layer** ([src/rules](../src/rules/))

   - All rules extend `BaseFormattingRule` (Template Method Pattern)
   - Built-in rules: `IndentationRule`, `LineEndingRule`, `TrailingWhitespaceRule`, `FinalNewlineRule`, `MaxLineLengthRule`
   - Each rule implements `format(context: FormatContext): string` method
   - Rules are **immutable** - they return new content, never modify input

3. **Plugin System** ([src/plugins](../src/plugins/))

   - `PluginManager`: Loads plugins and registers their rules into `RuleRegistry`
   - `CorePlugin`: Bundles all built-in formatting rules
   - Extend via `BasePlugin` class - implement `getRules()` to return custom rules

4. **Interfaces** ([src/interfaces](../src/interfaces/))
   - Small, focused interfaces following ISP
   - Key types: `FormatContext`, `FormatResult`, `RuleConfig`, `FormatterConfig`
   - All components depend on abstractions, never concrete classes

### Data Flow

```
createFormatter() → PluginManager.loadPlugin(CorePlugin) → RuleRegistry.register()
                 ↓
User calls format(content, config) → CodeFormatter iterates enabled rules
                                   ↓
Each rule.apply() → returns FormatResult → content accumulates changes
                                         ↓
Final FormatResult with applied rule names
```

## Development Workflow

### Testing

- **Jest** with ts-jest preset
- Run: `npm test` or `npm run test:coverage`
- **80% coverage threshold** enforced (branches, functions, lines, statements)
- Test files use `.test.ts` suffix, located alongside source files
- CLI tests excluded from coverage ([jest.config.js](../jest.config.js))
- **CI/CD**: GitHub Actions runs tests on Node 18.x, 20.x, 22.x ([.github/workflows/test.yml](workflows/test.yml))

### Building

- TypeScript compiles to `dist/` directory
- Run: `npm run build`
- Generates `.d.ts` type definitions and source maps
- Excludes `*.test.ts` files from compilation ([tsconfig.json](../tsconfig.json))

### CLI Testing

- Binary: `cwf` (built from [src/cli.ts](../src/cli.ts))
- Uses Commander for argument parsing, Inquirer for interactive mode, Chalk for colored output
- Test locally: `npm run build && node dist/cli.js format <file>`

### Commit Conventions

- **Conventional Commits** enforced via commitlint + husky
- Commits validated before acceptance ([commitlint.config.js](../commitlint.config.js))
- Valid prefixes:
  - `feat:` - New feature → MINOR version bump (1.0.0 → 1.1.0)
  - `fix:` - Bug fix → PATCH version bump (1.0.0 → 1.0.1)
  - `docs:` - Documentation only → no version bump
  - `refactor:` - Code refactoring → no version bump
  - `test:` - Adding tests → no version bump
  - `chore:` - Maintenance tasks → no version bump
  - `ci:` - CI/CD changes → no version bump
  - `perf:` - Performance improvements → PATCH version bump
  - `feat!:` or `BREAKING CHANGE:` → MAJOR version bump (1.0.0 → 2.0.0)

Example:

```bash
git commit -m "feat: add semicolon formatting rule"  # ✅ Valid
git commit -m "added new feature"                     # ❌ Rejected by commitlint
```

### Release Process

- **Automated via release-please** ([.github/workflows/release-please.yml](workflows/release-please.yml))
- Workflow:
  1. Push commits with conventional format to `main`
  2. release-please creates/updates a PR with version bump and CHANGELOG
  3. Review PR (can edit CHANGELOG before merge)
  4. Merge PR → automatic GitHub release + npm publish
- Version tracking: [.release-please-manifest.json](../.release-please-manifest.json)
- Configuration: [release-please-config.json](../release-please-config.json)

## Project Conventions

### Rule Implementation Pattern

When creating new rules:

1. Extend `BaseFormattingRule` from [src/rules/BaseFormattingRule.ts](../src/rules/BaseFormattingRule.ts)
2. Define `name`, `description` properties
3. Implement `format(context: FormatContext): string` - pure function
4. Extract options from `context.config.rules.find(r => r.name === this.name)?.options`
5. Add tests in co-located `.test.ts` file

Example from [src/rules/TrailingWhitespaceRule.ts](../src/rules/TrailingWhitespaceRule.ts):

```typescript
export class TrailingWhitespaceRule extends BaseFormattingRule {
  readonly name = "trailing-whitespace";
  readonly description = "Remove trailing whitespace";

  protected format(context: FormatContext): string {
    return context.content
      .split("\n")
      .map((line) => line.replace(/\s+$/, ""))
      .join("\n");
  }
}
```

### Plugin Pattern

Plugins bundle related rules. See [src/plugins/CorePlugin.ts](../src/plugins/CorePlugin.ts):

- Extend `BasePlugin`
- Override `getRules()` to return rule instances
- Register via `PluginManager.loadPlugin()`

### Configuration Structure

Config defines enabled rules with options:

```typescript
{
  rules: [
    {
      name: "indentation",
      enabled: true,
      options: { style: "space", size: 2 },
    },
    { name: "line-ending", enabled: true, options: { style: "lf" } },
  ];
}
```

## Key Principles

- **No language assumptions**: Rules operate on text content only
- **Immutability**: Rules return new content, never mutate input
- **Sequential application**: Rules run in config order, each receives output from previous
- **Interface-based**: All dependencies use interfaces ([src/interfaces](../src/interfaces/))
- **Test-driven**: Every rule/component has comprehensive tests

## Entry Points

- Programmatic: `createFormatter()` from [src/index.ts](../src/index.ts)
- CLI: `cwf` binary from [src/cli.ts](../src/cli.ts)
- Default config: `getDefaultConfig()` from [src/index.ts](../src/index.ts)
