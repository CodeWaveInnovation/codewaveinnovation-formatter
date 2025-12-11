---
layout: home

hero:
  name: "CWF"
  text: "Language-Agnostic Formatter"
  tagline: "A powerful, extensible code formatter with configurable rules and plugin support"
  actions:
    - theme: brand
      text: Get Started
      link: /guide/getting-started
    - theme: alt
      text: View on GitHub
      link: https://github.com/CodeWaveInnovation/codewaveinnovation-formatter
  image:
    src: /logo.svg
    alt: CWF

features:
  - icon: 🌍
    title: Language-Agnostic
    details: Works with any text file format. No language-specific assumptions.
  
  - icon: 🔧
    title: Highly Configurable
    details: Customize formatting rules to fit your project's needs with flexible options.
  
  - icon: 🧩
    title: Plugin System
    details: Extend functionality without modifying core code. Create custom rules easily.
  
  - icon: 🎯
    title: SOLID Architecture
    details: Built following SOLID principles for maintainability and extensibility.
  
  - icon: ⚡
    title: Fast & Efficient
    details: Optimized performance with smart caching and batch processing.
  
  - icon: ✅
    title: Well Tested
    details: Over 80% test coverage ensuring reliability and stability.
---

## Quick Start

Install globally:

```bash
npm install -g @codewaveinnovation/formatter
```

Format a file:

```bash
cwf format myfile.txt
```

Format multiple files:

```bash
cwf format "src/**/*.ts"
```

## Why CWF?

CWF (CodeWave Formatter) is designed to be a universal formatting solution that works with any programming language or text file. Unlike language-specific formatters, CWF provides a consistent formatting experience across your entire codebase.

### Key Benefits

- **Universal**: One formatter for all your files
- **Extensible**: Create custom rules for your specific needs
- **Consistent**: Enforce coding standards across your team
- **Automated**: Integrate with CI/CD pipelines
- **Developer-Friendly**: Interactive CLI and comprehensive documentation
