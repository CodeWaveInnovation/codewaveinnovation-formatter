# Contributing to @codewaveinnovation/formatter

Thank you for your interest in contributing! 🎉

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Coding Standards](#coding-standards)
- [Testing](#testing)

## 📜 Code of Conduct

This project follows a Code of Conduct. By participating, you are expected to uphold this code. Please report unacceptable behavior to the maintainers.

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18.0.0
- npm, yarn, or pnpm
- Git

### Setup

1. Fork the repository
2. Clone your fork:

   ```bash
   git clone https://github.com/YOUR_USERNAME/codewaveinnovation-formatter.git
   cd codewaveinnovation-formatter
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Create a branch:

   ```bash
   git checkout -b feat/your-feature-name
   ```

## 🔧 Development Workflow

### Build

```bash
npm run build
```

### Run Tests

```bash
npm test                 # Run all tests
npm run test:coverage    # Run tests with coverage report
```

### Lint

```bash
npm run lint
```

### Test CLI Locally

```bash
npm run build
node dist/cli.js format <file>
```

## 📝 Commit Guidelines

This project uses [Conventional Commits](https://www.conventionalcommits.org/). Your commit messages must follow this format:

```
<type>: <description>

[optional body]

[optional footer]
```

### Types

- `feat:` - New feature (bumps MINOR version)
- `fix:` - Bug fix (bumps PATCH version)
- `docs:` - Documentation only
- `style:` - Code style changes (formatting, semicolons, etc)
- `refactor:` - Code refactoring
- `perf:` - Performance improvements
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks
- `ci:` - CI/CD changes

### Examples

```bash
feat: add glob pattern support for formatting multiple files
fix: correct indentation calculation for mixed tabs/spaces
docs: update README with new CLI options
```

### Breaking Changes

For breaking changes, add `!` or `BREAKING CHANGE:` in footer:

```bash
feat!: remove deprecated API method

BREAKING CHANGE: The old format() method has been removed.
Use createFormatter().format() instead.
```

## 🔄 Pull Request Process

1. **Update documentation** - If you're adding features, update the README
2. **Add tests** - Maintain 80%+ code coverage
3. **Follow commit conventions** - Use Conventional Commits format
4. **Run tests locally** - Ensure all tests pass before submitting
5. **Create PR** - Use the PR template and fill it completely
6. **Respond to feedback** - Address reviewer comments promptly

### PR Checklist

- [ ] Tests added/updated and passing
- [ ] Documentation updated
- [ ] Code follows project style (linted)
- [ ] Commits follow Conventional Commits
- [ ] No breaking changes (or properly documented)

## 🎨 Coding Standards

### TypeScript

- Use strict mode
- Prefer interfaces over types
- Use explicit return types for public APIs
- Follow SOLID principles

### Architecture

- **Rules** extend `BaseFormattingRule`
- **Plugins** extend `BasePlugin`
- All components depend on interfaces, not implementations
- Rules must be **pure functions** (no side effects)
- Rules must be **immutable** (return new content, never mutate)

### Example Rule

```typescript
export class MyRule extends BaseFormattingRule {
  readonly name = 'my-rule';
  readonly description = 'Description of what this rule does';

  protected format(context: FormatContext): string {
    // Pure function - no mutations
    return context.content.replace(/pattern/, 'replacement');
  }
}
```

## ✅ Testing

- Write tests for all new features
- Tests should be co-located with source files (`*.test.ts`)
- Maintain 80% coverage threshold
- Test edge cases and error conditions

### Test Example

```typescript
describe('MyRule', () => {
  it('should format correctly', () => {
    const rule = new MyRule();
    const context = {
      content: 'input',
      config: getDefaultConfig()
    };
    const result = rule.apply(context);
    expect(result.content).toBe('expected output');
    expect(result.changed).toBe(true);
  });
});
```

## 🐛 Reporting Bugs

Use the [Bug Report template](.github/ISSUE_TEMPLATE/bug_report.md) and include:

- Clear description
- Steps to reproduce
- Expected vs actual behavior
- Your environment (OS, Node version, package version)
- Code samples and configuration

## 💡 Suggesting Features

Use the [Feature Request template](.github/ISSUE_TEMPLATE/feature_request.md) and explain:

- The problem you're trying to solve
- Your proposed solution
- Alternative approaches considered
- Why this aligns with the project's goals

## 📬 Questions?

- Open a [Discussion](https://github.com/CodeWaveInnovation/codewaveinnovation-formatter/discussions)
- Check existing [Issues](https://github.com/CodeWaveInnovation/codewaveinnovation-formatter/issues)

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing! 🙏
