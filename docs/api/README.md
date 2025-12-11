**@codewaveinnovation/formatter**

***

# @codewaveinnovation/formatter

## Classes

### `abstract` BaseFormattingRule

Defined in: [rules/BaseFormattingRule.ts:8](https://github.com/CodeWaveInnovation/codewaveinnovation-formatter/blob/234996c10ff06d47d3540e76819df7b81b4e47bb/src/rules/BaseFormattingRule.ts#L8)

Abstract base class for rules (Template Method Pattern)
Reduces code duplication

#### Extended by

- [`IndentationRule`](#indentationrule)
- [`LineEndingRule`](#lineendingrule)
- [`TrailingWhitespaceRule`](#trailingwhitespacerule)
- [`FinalNewlineRule`](#finalnewlinerule)
- [`MaxLineLengthRule`](#maxlinelengthrule)

#### Implements

- [`IFormattingRule`](#iformattingrule)

#### Constructors

##### Constructor

> **new BaseFormattingRule**(): [`BaseFormattingRule`](#baseformattingrule)

###### Returns

[`BaseFormattingRule`](#baseformattingrule)

#### Properties

##### description

> `abstract` `readonly` **description**: `string`

Defined in: [rules/BaseFormattingRule.ts:10](https://github.com/CodeWaveInnovation/codewaveinnovation-formatter/blob/234996c10ff06d47d3540e76819df7b81b4e47bb/src/rules/BaseFormattingRule.ts#L10)

Description of what the rule does

###### Implementation of

[`IFormattingRule`](#iformattingrule).[`description`](#description-6)

##### name

> `abstract` `readonly` **name**: `string`

Defined in: [rules/BaseFormattingRule.ts:9](https://github.com/CodeWaveInnovation/codewaveinnovation-formatter/blob/234996c10ff06d47d3540e76819df7b81b4e47bb/src/rules/BaseFormattingRule.ts#L9)

Unique name of the rule

###### Implementation of

[`IFormattingRule`](#iformattingrule).[`name`](#name-8)

#### Methods

##### apply()

> **apply**(`context`): [`FormatResult`](#formatresult)

Defined in: [rules/BaseFormattingRule.ts:12](https://github.com/CodeWaveInnovation/codewaveinnovation-formatter/blob/234996c10ff06d47d3540e76819df7b81b4e47bb/src/rules/BaseFormattingRule.ts#L12)

Apply the formatting rule to the content

###### Parameters

###### context

[`FormatContext`](#formatcontext)

###### Returns

[`FormatResult`](#formatresult)

###### Implementation of

[`IFormattingRule`](#iformattingrule).[`apply`](#apply-12)

##### format()

> `abstract` `protected` **format**(`context`): `string`

Defined in: [rules/BaseFormattingRule.ts:23](https://github.com/CodeWaveInnovation/codewaveinnovation-formatter/blob/234996c10ff06d47d3540e76819df7b81b4e47bb/src/rules/BaseFormattingRule.ts#L23)

###### Parameters

###### context

[`FormatContext`](#formatcontext)

###### Returns

`string`

***

### `abstract` BasePlugin

Defined in: [plugins/BasePlugin.ts:8](https://github.com/CodeWaveInnovation/codewaveinnovation-formatter/blob/234996c10ff06d47d3540e76819df7b81b4e47bb/src/plugins/BasePlugin.ts#L8)

Abstract base plugin class
Follows Open/Closed Principle - plugins extend without modifying core

#### Extended by

- [`CorePlugin`](#coreplugin)

#### Implements

- [`IPlugin`](#iplugin)

#### Constructors

##### Constructor

> **new BasePlugin**(): [`BasePlugin`](#baseplugin)

###### Returns

[`BasePlugin`](#baseplugin)

#### Properties

##### name

> `abstract` `readonly` **name**: `string`

Defined in: [plugins/BasePlugin.ts:9](https://github.com/CodeWaveInnovation/codewaveinnovation-formatter/blob/234996c10ff06d47d3540e76819df7b81b4e47bb/src/plugins/BasePlugin.ts#L9)

Plugin name

###### Implementation of

[`IPlugin`](#iplugin).[`name`](#name-9)

##### version

> `abstract` `readonly` **version**: `string`

Defined in: [plugins/BasePlugin.ts:10](https://github.com/CodeWaveInnovation/codewaveinnovation-formatter/blob/234996c10ff06d47d3540e76819df7b81b4e47bb/src/plugins/BasePlugin.ts#L10)

Plugin version

###### Implementation of

[`IPlugin`](#iplugin).[`version`](#version-2)

#### Methods

##### getRules()

> `abstract` **getRules**(): [`IFormattingRule`](#iformattingrule)[]

Defined in: [plugins/BasePlugin.ts:12](https://github.com/CodeWaveInnovation/codewaveinnovation-formatter/blob/234996c10ff06d47d3540e76819df7b81b4e47bb/src/plugins/BasePlugin.ts#L12)

Get the rules provided by this plugin

###### Returns

[`IFormattingRule`](#iformattingrule)[]

###### Implementation of

[`IPlugin`](#iplugin).[`getRules`](#getrules-4)

***

### CodeFormatter

Defined in: [formatters/CodeFormatter.ts:9](https://github.com/CodeWaveInnovation/codewaveinnovation-formatter/blob/234996c10ff06d47d3540e76819df7b81b4e47bb/src/formatters/CodeFormatter.ts#L9)

Main formatter implementation (Dependency Inversion Principle)
Depends on abstractions (IRuleRegistry) not concretions

#### Implements

- [`IFormatter`](#iformatter)

#### Constructors

##### Constructor

> **new CodeFormatter**(`ruleRegistry`): [`CodeFormatter`](#codeformatter)

Defined in: [formatters/CodeFormatter.ts:10](https://github.com/CodeWaveInnovation/codewaveinnovation-formatter/blob/234996c10ff06d47d3540e76819df7b81b4e47bb/src/formatters/CodeFormatter.ts#L10)

###### Parameters

###### ruleRegistry

[`IRuleRegistry`](#iruleregistry)

###### Returns

[`CodeFormatter`](#codeformatter)

#### Methods

##### format()

> **format**(`content`, `config?`): `Promise`\<[`FormatResult`](#formatresult)\>

Defined in: [formatters/CodeFormatter.ts:12](https://github.com/CodeWaveInnovation/codewaveinnovation-formatter/blob/234996c10ff06d47d3540e76819df7b81b4e47bb/src/formatters/CodeFormatter.ts#L12)

Format content according to the configured rules

###### Parameters

###### content

`string`

###### config?

[`FormatterConfig`](#formatterconfig)

###### Returns

`Promise`\<[`FormatResult`](#formatresult)\>

###### Implementation of

[`IFormatter`](#iformatter).[`format`](#format-14)

***

### CorePlugin

Defined in: [plugins/CorePlugin.ts:14](https://github.com/CodeWaveInnovation/codewaveinnovation-formatter/blob/234996c10ff06d47d3540e76819df7b81b4e47bb/src/plugins/CorePlugin.ts#L14)

Default plugin with core formatting rules

#### Extends

- [`BasePlugin`](#baseplugin)

#### Constructors

##### Constructor

> **new CorePlugin**(): [`CorePlugin`](#coreplugin)

###### Returns

[`CorePlugin`](#coreplugin)

###### Inherited from

[`BasePlugin`](#baseplugin).[`constructor`](#constructor-1)

#### Properties

##### name

> `readonly` **name**: `"core"` = `'core'`

Defined in: [plugins/CorePlugin.ts:15](https://github.com/CodeWaveInnovation/codewaveinnovation-formatter/blob/234996c10ff06d47d3540e76819df7b81b4e47bb/src/plugins/CorePlugin.ts#L15)

Plugin name

###### Overrides

[`BasePlugin`](#baseplugin).[`name`](#name-1)

##### version

> `readonly` **version**: `"1.0.0"` = `'1.0.0'`

Defined in: [plugins/CorePlugin.ts:16](https://github.com/CodeWaveInnovation/codewaveinnovation-formatter/blob/234996c10ff06d47d3540e76819df7b81b4e47bb/src/plugins/CorePlugin.ts#L16)

Plugin version

###### Overrides

[`BasePlugin`](#baseplugin).[`version`](#version)

#### Methods

##### getRules()

> **getRules**(): [`IFormattingRule`](#iformattingrule)[]

Defined in: [plugins/CorePlugin.ts:18](https://github.com/CodeWaveInnovation/codewaveinnovation-formatter/blob/234996c10ff06d47d3540e76819df7b81b4e47bb/src/plugins/CorePlugin.ts#L18)

Get the rules provided by this plugin

###### Returns

[`IFormattingRule`](#iformattingrule)[]

###### Overrides

[`BasePlugin`](#baseplugin).[`getRules`](#getrules)

***

### FinalNewlineRule

Defined in: [rules/FinalNewlineRule.ts:7](https://github.com/CodeWaveInnovation/codewaveinnovation-formatter/blob/234996c10ff06d47d3540e76819df7b81b4e47bb/src/rules/FinalNewlineRule.ts#L7)

Rule to ensure final newline

#### Extends

- [`BaseFormattingRule`](#baseformattingrule)

#### Constructors

##### Constructor

> **new FinalNewlineRule**(): [`FinalNewlineRule`](#finalnewlinerule)

###### Returns

[`FinalNewlineRule`](#finalnewlinerule)

###### Inherited from

[`BaseFormattingRule`](#baseformattingrule).[`constructor`](#constructor)

#### Properties

##### description

> `readonly` **description**: `"Ensures file ends with a newline"` = `'Ensures file ends with a newline'`

Defined in: [rules/FinalNewlineRule.ts:9](https://github.com/CodeWaveInnovation/codewaveinnovation-formatter/blob/234996c10ff06d47d3540e76819df7b81b4e47bb/src/rules/FinalNewlineRule.ts#L9)

Description of what the rule does

###### Overrides

[`BaseFormattingRule`](#baseformattingrule).[`description`](#description)

##### name

> `readonly` **name**: `"final-newline"` = `'final-newline'`

Defined in: [rules/FinalNewlineRule.ts:8](https://github.com/CodeWaveInnovation/codewaveinnovation-formatter/blob/234996c10ff06d47d3540e76819df7b81b4e47bb/src/rules/FinalNewlineRule.ts#L8)

Unique name of the rule

###### Overrides

[`BaseFormattingRule`](#baseformattingrule).[`name`](#name)

#### Methods

##### apply()

> **apply**(`context`): [`FormatResult`](#formatresult)

Defined in: [rules/BaseFormattingRule.ts:12](https://github.com/CodeWaveInnovation/codewaveinnovation-formatter/blob/234996c10ff06d47d3540e76819df7b81b4e47bb/src/rules/BaseFormattingRule.ts#L12)

Apply the formatting rule to the content

###### Parameters

###### context

[`FormatContext`](#formatcontext)

###### Returns

[`FormatResult`](#formatresult)

###### Inherited from

[`BaseFormattingRule`](#baseformattingrule).[`apply`](#apply)

##### format()

> `protected` **format**(`context`): `string`

Defined in: [rules/FinalNewlineRule.ts:11](https://github.com/CodeWaveInnovation/codewaveinnovation-formatter/blob/234996c10ff06d47d3540e76819df7b81b4e47bb/src/rules/FinalNewlineRule.ts#L11)

###### Parameters

###### context

[`FormatContext`](#formatcontext)

###### Returns

`string`

###### Overrides

[`BaseFormattingRule`](#baseformattingrule).[`format`](#format)

***

### IndentationRule

Defined in: [rules/IndentationRule.ts:7](https://github.com/CodeWaveInnovation/codewaveinnovation-formatter/blob/234996c10ff06d47d3540e76819df7b81b4e47bb/src/rules/IndentationRule.ts#L7)

Rule to normalize indentation

#### Extends

- [`BaseFormattingRule`](#baseformattingrule)

#### Constructors

##### Constructor

> **new IndentationRule**(): [`IndentationRule`](#indentationrule)

###### Returns

[`IndentationRule`](#indentationrule)

###### Inherited from

[`BaseFormattingRule`](#baseformattingrule).[`constructor`](#constructor)

#### Properties

##### description

> `readonly` **description**: `"Normalizes indentation to spaces or tabs"` = `"Normalizes indentation to spaces or tabs"`

Defined in: [rules/IndentationRule.ts:9](https://github.com/CodeWaveInnovation/codewaveinnovation-formatter/blob/234996c10ff06d47d3540e76819df7b81b4e47bb/src/rules/IndentationRule.ts#L9)

Description of what the rule does

###### Overrides

[`BaseFormattingRule`](#baseformattingrule).[`description`](#description)

##### name

> `readonly` **name**: `"indentation"` = `"indentation"`

Defined in: [rules/IndentationRule.ts:8](https://github.com/CodeWaveInnovation/codewaveinnovation-formatter/blob/234996c10ff06d47d3540e76819df7b81b4e47bb/src/rules/IndentationRule.ts#L8)

Unique name of the rule

###### Overrides

[`BaseFormattingRule`](#baseformattingrule).[`name`](#name)

#### Methods

##### apply()

> **apply**(`context`): [`FormatResult`](#formatresult)

Defined in: [rules/BaseFormattingRule.ts:12](https://github.com/CodeWaveInnovation/codewaveinnovation-formatter/blob/234996c10ff06d47d3540e76819df7b81b4e47bb/src/rules/BaseFormattingRule.ts#L12)

Apply the formatting rule to the content

###### Parameters

###### context

[`FormatContext`](#formatcontext)

###### Returns

[`FormatResult`](#formatresult)

###### Inherited from

[`BaseFormattingRule`](#baseformattingrule).[`apply`](#apply)

##### format()

> `protected` **format**(`context`): `string`

Defined in: [rules/IndentationRule.ts:11](https://github.com/CodeWaveInnovation/codewaveinnovation-formatter/blob/234996c10ff06d47d3540e76819df7b81b4e47bb/src/rules/IndentationRule.ts#L11)

###### Parameters

###### context

[`FormatContext`](#formatcontext)

###### Returns

`string`

###### Overrides

[`BaseFormattingRule`](#baseformattingrule).[`format`](#format)

***

### LineEndingRule

Defined in: [rules/LineEndingRule.ts:7](https://github.com/CodeWaveInnovation/codewaveinnovation-formatter/blob/234996c10ff06d47d3540e76819df7b81b4e47bb/src/rules/LineEndingRule.ts#L7)

Rule to normalize line endings

#### Extends

- [`BaseFormattingRule`](#baseformattingrule)

#### Constructors

##### Constructor

> **new LineEndingRule**(): [`LineEndingRule`](#lineendingrule)

###### Returns

[`LineEndingRule`](#lineendingrule)

###### Inherited from

[`BaseFormattingRule`](#baseformattingrule).[`constructor`](#constructor)

#### Properties

##### description

> `readonly` **description**: `"Normalizes line endings (LF, CRLF, or CR)"` = `'Normalizes line endings (LF, CRLF, or CR)'`

Defined in: [rules/LineEndingRule.ts:9](https://github.com/CodeWaveInnovation/codewaveinnovation-formatter/blob/234996c10ff06d47d3540e76819df7b81b4e47bb/src/rules/LineEndingRule.ts#L9)

Description of what the rule does

###### Overrides

[`BaseFormattingRule`](#baseformattingrule).[`description`](#description)

##### name

> `readonly` **name**: `"line-ending"` = `'line-ending'`

Defined in: [rules/LineEndingRule.ts:8](https://github.com/CodeWaveInnovation/codewaveinnovation-formatter/blob/234996c10ff06d47d3540e76819df7b81b4e47bb/src/rules/LineEndingRule.ts#L8)

Unique name of the rule

###### Overrides

[`BaseFormattingRule`](#baseformattingrule).[`name`](#name)

#### Methods

##### apply()

> **apply**(`context`): [`FormatResult`](#formatresult)

Defined in: [rules/BaseFormattingRule.ts:12](https://github.com/CodeWaveInnovation/codewaveinnovation-formatter/blob/234996c10ff06d47d3540e76819df7b81b4e47bb/src/rules/BaseFormattingRule.ts#L12)

Apply the formatting rule to the content

###### Parameters

###### context

[`FormatContext`](#formatcontext)

###### Returns

[`FormatResult`](#formatresult)

###### Inherited from

[`BaseFormattingRule`](#baseformattingrule).[`apply`](#apply)

##### format()

> `protected` **format**(`context`): `string`

Defined in: [rules/LineEndingRule.ts:11](https://github.com/CodeWaveInnovation/codewaveinnovation-formatter/blob/234996c10ff06d47d3540e76819df7b81b4e47bb/src/rules/LineEndingRule.ts#L11)

###### Parameters

###### context

[`FormatContext`](#formatcontext)

###### Returns

`string`

###### Overrides

[`BaseFormattingRule`](#baseformattingrule).[`format`](#format)

***

### MaxLineLengthRule

Defined in: [rules/MaxLineLengthRule.ts:7](https://github.com/CodeWaveInnovation/codewaveinnovation-formatter/blob/234996c10ff06d47d3540e76819df7b81b4e47bb/src/rules/MaxLineLengthRule.ts#L7)

Rule to normalize max line length

#### Extends

- [`BaseFormattingRule`](#baseformattingrule)

#### Constructors

##### Constructor

> **new MaxLineLengthRule**(): [`MaxLineLengthRule`](#maxlinelengthrule)

###### Returns

[`MaxLineLengthRule`](#maxlinelengthrule)

###### Inherited from

[`BaseFormattingRule`](#baseformattingrule).[`constructor`](#constructor)

#### Properties

##### description

> `readonly` **description**: `"Warns or wraps lines exceeding maximum length"` = `"Warns or wraps lines exceeding maximum length"`

Defined in: [rules/MaxLineLengthRule.ts:9](https://github.com/CodeWaveInnovation/codewaveinnovation-formatter/blob/234996c10ff06d47d3540e76819df7b81b4e47bb/src/rules/MaxLineLengthRule.ts#L9)

Description of what the rule does

###### Overrides

[`BaseFormattingRule`](#baseformattingrule).[`description`](#description)

##### name

> `readonly` **name**: `"max-line-length"` = `"max-line-length"`

Defined in: [rules/MaxLineLengthRule.ts:8](https://github.com/CodeWaveInnovation/codewaveinnovation-formatter/blob/234996c10ff06d47d3540e76819df7b81b4e47bb/src/rules/MaxLineLengthRule.ts#L8)

Unique name of the rule

###### Overrides

[`BaseFormattingRule`](#baseformattingrule).[`name`](#name)

#### Methods

##### apply()

> **apply**(`context`): [`FormatResult`](#formatresult)

Defined in: [rules/BaseFormattingRule.ts:12](https://github.com/CodeWaveInnovation/codewaveinnovation-formatter/blob/234996c10ff06d47d3540e76819df7b81b4e47bb/src/rules/BaseFormattingRule.ts#L12)

Apply the formatting rule to the content

###### Parameters

###### context

[`FormatContext`](#formatcontext)

###### Returns

[`FormatResult`](#formatresult)

###### Inherited from

[`BaseFormattingRule`](#baseformattingrule).[`apply`](#apply)

##### format()

> `protected` **format**(`context`): `string`

Defined in: [rules/MaxLineLengthRule.ts:11](https://github.com/CodeWaveInnovation/codewaveinnovation-formatter/blob/234996c10ff06d47d3540e76819df7b81b4e47bb/src/rules/MaxLineLengthRule.ts#L11)

###### Parameters

###### context

[`FormatContext`](#formatcontext)

###### Returns

`string`

###### Overrides

[`BaseFormattingRule`](#baseformattingrule).[`format`](#format)

***

### PluginManager

Defined in: [plugins/PluginManager.ts:7](https://github.com/CodeWaveInnovation/codewaveinnovation-formatter/blob/234996c10ff06d47d3540e76819df7b81b4e47bb/src/plugins/PluginManager.ts#L7)

Plugin manager to handle plugin loading and registration

#### Constructors

##### Constructor

> **new PluginManager**(`ruleRegistry`): [`PluginManager`](#pluginmanager)

Defined in: [plugins/PluginManager.ts:8](https://github.com/CodeWaveInnovation/codewaveinnovation-formatter/blob/234996c10ff06d47d3540e76819df7b81b4e47bb/src/plugins/PluginManager.ts#L8)

###### Parameters

###### ruleRegistry

[`IRuleRegistry`](#iruleregistry)

###### Returns

[`PluginManager`](#pluginmanager)

#### Methods

##### loadPlugin()

> **loadPlugin**(`plugin`): `void`

Defined in: [plugins/PluginManager.ts:13](https://github.com/CodeWaveInnovation/codewaveinnovation-formatter/blob/234996c10ff06d47d3540e76819df7b81b4e47bb/src/plugins/PluginManager.ts#L13)

Load and register a plugin

###### Parameters

###### plugin

[`IPlugin`](#iplugin)

###### Returns

`void`

##### loadPlugins()

> **loadPlugins**(`plugins`): `void`

Defined in: [plugins/PluginManager.ts:21](https://github.com/CodeWaveInnovation/codewaveinnovation-formatter/blob/234996c10ff06d47d3540e76819df7b81b4e47bb/src/plugins/PluginManager.ts#L21)

Load multiple plugins

###### Parameters

###### plugins

[`IPlugin`](#iplugin)[]

###### Returns

`void`

***

### RuleRegistry

Defined in: [formatters/RuleRegistry.ts:8](https://github.com/CodeWaveInnovation/codewaveinnovation-formatter/blob/234996c10ff06d47d3540e76819df7b81b4e47bb/src/formatters/RuleRegistry.ts#L8)

Rule registry implementation (Single Responsibility Principle)
Responsible only for managing the collection of rules

#### Implements

- [`IRuleRegistry`](#iruleregistry)

#### Constructors

##### Constructor

> **new RuleRegistry**(): [`RuleRegistry`](#ruleregistry)

###### Returns

[`RuleRegistry`](#ruleregistry)

#### Methods

##### getAllRules()

> **getAllRules**(): [`IFormattingRule`](#iformattingrule)[]

Defined in: [formatters/RuleRegistry.ts:19](https://github.com/CodeWaveInnovation/codewaveinnovation-formatter/blob/234996c10ff06d47d3540e76819df7b81b4e47bb/src/formatters/RuleRegistry.ts#L19)

Get all registered rules

###### Returns

[`IFormattingRule`](#iformattingrule)[]

###### Implementation of

[`IRuleRegistry`](#iruleregistry).[`getAllRules`](#getallrules-2)

##### getRule()

> **getRule**(`name`): [`IFormattingRule`](#iformattingrule) \| `undefined`

Defined in: [formatters/RuleRegistry.ts:15](https://github.com/CodeWaveInnovation/codewaveinnovation-formatter/blob/234996c10ff06d47d3540e76819df7b81b4e47bb/src/formatters/RuleRegistry.ts#L15)

Get a rule by name

###### Parameters

###### name

`string`

###### Returns

[`IFormattingRule`](#iformattingrule) \| `undefined`

###### Implementation of

[`IRuleRegistry`](#iruleregistry).[`getRule`](#getrule-2)

##### register()

> **register**(`rule`): `void`

Defined in: [formatters/RuleRegistry.ts:11](https://github.com/CodeWaveInnovation/codewaveinnovation-formatter/blob/234996c10ff06d47d3540e76819df7b81b4e47bb/src/formatters/RuleRegistry.ts#L11)

Register a new rule

###### Parameters

###### rule

[`IFormattingRule`](#iformattingrule)

###### Returns

`void`

###### Implementation of

[`IRuleRegistry`](#iruleregistry).[`register`](#register-2)

***

### TrailingWhitespaceRule

Defined in: [rules/TrailingWhitespaceRule.ts:7](https://github.com/CodeWaveInnovation/codewaveinnovation-formatter/blob/234996c10ff06d47d3540e76819df7b81b4e47bb/src/rules/TrailingWhitespaceRule.ts#L7)

Rule to trim trailing whitespace

#### Extends

- [`BaseFormattingRule`](#baseformattingrule)

#### Constructors

##### Constructor

> **new TrailingWhitespaceRule**(): [`TrailingWhitespaceRule`](#trailingwhitespacerule)

###### Returns

[`TrailingWhitespaceRule`](#trailingwhitespacerule)

###### Inherited from

[`BaseFormattingRule`](#baseformattingrule).[`constructor`](#constructor)

#### Properties

##### description

> `readonly` **description**: `"Removes trailing whitespace from lines"` = `'Removes trailing whitespace from lines'`

Defined in: [rules/TrailingWhitespaceRule.ts:9](https://github.com/CodeWaveInnovation/codewaveinnovation-formatter/blob/234996c10ff06d47d3540e76819df7b81b4e47bb/src/rules/TrailingWhitespaceRule.ts#L9)

Description of what the rule does

###### Overrides

[`BaseFormattingRule`](#baseformattingrule).[`description`](#description)

##### name

> `readonly` **name**: `"trailing-whitespace"` = `'trailing-whitespace'`

Defined in: [rules/TrailingWhitespaceRule.ts:8](https://github.com/CodeWaveInnovation/codewaveinnovation-formatter/blob/234996c10ff06d47d3540e76819df7b81b4e47bb/src/rules/TrailingWhitespaceRule.ts#L8)

Unique name of the rule

###### Overrides

[`BaseFormattingRule`](#baseformattingrule).[`name`](#name)

#### Methods

##### apply()

> **apply**(`context`): [`FormatResult`](#formatresult)

Defined in: [rules/BaseFormattingRule.ts:12](https://github.com/CodeWaveInnovation/codewaveinnovation-formatter/blob/234996c10ff06d47d3540e76819df7b81b4e47bb/src/rules/BaseFormattingRule.ts#L12)

Apply the formatting rule to the content

###### Parameters

###### context

[`FormatContext`](#formatcontext)

###### Returns

[`FormatResult`](#formatresult)

###### Inherited from

[`BaseFormattingRule`](#baseformattingrule).[`apply`](#apply)

##### format()

> `protected` **format**(`context`): `string`

Defined in: [rules/TrailingWhitespaceRule.ts:11](https://github.com/CodeWaveInnovation/codewaveinnovation-formatter/blob/234996c10ff06d47d3540e76819df7b81b4e47bb/src/rules/TrailingWhitespaceRule.ts#L11)

###### Parameters

###### context

[`FormatContext`](#formatcontext)

###### Returns

`string`

###### Overrides

[`BaseFormattingRule`](#baseformattingrule).[`format`](#format)

## Interfaces

### FormatContext

Defined in: [interfaces/types.ts:30](https://github.com/CodeWaveInnovation/codewaveinnovation-formatter/blob/234996c10ff06d47d3540e76819df7b81b4e47bb/src/interfaces/types.ts#L30)

Context passed to rules during formatting

#### Properties

##### config

> **config**: [`FormatterConfig`](#formatterconfig)

Defined in: [interfaces/types.ts:32](https://github.com/CodeWaveInnovation/codewaveinnovation-formatter/blob/234996c10ff06d47d3540e76819df7b81b4e47bb/src/interfaces/types.ts#L32)

##### content

> **content**: `string`

Defined in: [interfaces/types.ts:31](https://github.com/CodeWaveInnovation/codewaveinnovation-formatter/blob/234996c10ff06d47d3540e76819df7b81b4e47bb/src/interfaces/types.ts#L31)

##### filePath?

> `optional` **filePath**: `string`

Defined in: [interfaces/types.ts:33](https://github.com/CodeWaveInnovation/codewaveinnovation-formatter/blob/234996c10ff06d47d3540e76819df7b81b4e47bb/src/interfaces/types.ts#L33)

***

### FormatResult

Defined in: [interfaces/types.ts:4](https://github.com/CodeWaveInnovation/codewaveinnovation-formatter/blob/234996c10ff06d47d3540e76819df7b81b4e47bb/src/interfaces/types.ts#L4)

Represents the result of a formatting operation

#### Properties

##### appliedRules

> **appliedRules**: `string`[]

Defined in: [interfaces/types.ts:7](https://github.com/CodeWaveInnovation/codewaveinnovation-formatter/blob/234996c10ff06d47d3540e76819df7b81b4e47bb/src/interfaces/types.ts#L7)

##### changed

> **changed**: `boolean`

Defined in: [interfaces/types.ts:6](https://github.com/CodeWaveInnovation/codewaveinnovation-formatter/blob/234996c10ff06d47d3540e76819df7b81b4e47bb/src/interfaces/types.ts#L6)

##### content

> **content**: `string`

Defined in: [interfaces/types.ts:5](https://github.com/CodeWaveInnovation/codewaveinnovation-formatter/blob/234996c10ff06d47d3540e76819df7b81b4e47bb/src/interfaces/types.ts#L5)

***

### FormatterConfig

Defined in: [interfaces/types.ts:22](https://github.com/CodeWaveInnovation/codewaveinnovation-formatter/blob/234996c10ff06d47d3540e76819df7b81b4e47bb/src/interfaces/types.ts#L22)

Represents the formatter configuration

#### Properties

##### plugins?

> `optional` **plugins**: `string`[]

Defined in: [interfaces/types.ts:24](https://github.com/CodeWaveInnovation/codewaveinnovation-formatter/blob/234996c10ff06d47d3540e76819df7b81b4e47bb/src/interfaces/types.ts#L24)

##### rules

> **rules**: [`RuleConfig`](#ruleconfig)[]

Defined in: [interfaces/types.ts:23](https://github.com/CodeWaveInnovation/codewaveinnovation-formatter/blob/234996c10ff06d47d3540e76819df7b81b4e47bb/src/interfaces/types.ts#L23)

***

### IFormatter

Defined in: [interfaces/IFormatter.ts:6](https://github.com/CodeWaveInnovation/codewaveinnovation-formatter/blob/234996c10ff06d47d3540e76819df7b81b4e47bb/src/interfaces/IFormatter.ts#L6)

Interface for the main formatter (Dependency Inversion Principle)

#### Methods

##### format()

> **format**(`content`, `config?`): `Promise`\<[`FormatResult`](#formatresult)\>

Defined in: [interfaces/IFormatter.ts:10](https://github.com/CodeWaveInnovation/codewaveinnovation-formatter/blob/234996c10ff06d47d3540e76819df7b81b4e47bb/src/interfaces/IFormatter.ts#L10)

Format content according to the configured rules

###### Parameters

###### content

`string`

###### config?

[`FormatterConfig`](#formatterconfig)

###### Returns

`Promise`\<[`FormatResult`](#formatresult)\>

***

### IFormattingRule

Defined in: [interfaces/IFormattingRule.ts:6](https://github.com/CodeWaveInnovation/codewaveinnovation-formatter/blob/234996c10ff06d47d3540e76819df7b81b4e47bb/src/interfaces/IFormattingRule.ts#L6)

Interface for formatting rules (Interface Segregation Principle)

#### Properties

##### description

> `readonly` **description**: `string`

Defined in: [interfaces/IFormattingRule.ts:15](https://github.com/CodeWaveInnovation/codewaveinnovation-formatter/blob/234996c10ff06d47d3540e76819df7b81b4e47bb/src/interfaces/IFormattingRule.ts#L15)

Description of what the rule does

##### name

> `readonly` **name**: `string`

Defined in: [interfaces/IFormattingRule.ts:10](https://github.com/CodeWaveInnovation/codewaveinnovation-formatter/blob/234996c10ff06d47d3540e76819df7b81b4e47bb/src/interfaces/IFormattingRule.ts#L10)

Unique name of the rule

#### Methods

##### apply()

> **apply**(`context`): [`FormatResult`](#formatresult)

Defined in: [interfaces/IFormattingRule.ts:20](https://github.com/CodeWaveInnovation/codewaveinnovation-formatter/blob/234996c10ff06d47d3540e76819df7b81b4e47bb/src/interfaces/IFormattingRule.ts#L20)

Apply the formatting rule to the content

###### Parameters

###### context

[`FormatContext`](#formatcontext)

###### Returns

[`FormatResult`](#formatresult)

***

### IPlugin

Defined in: [interfaces/IPlugin.ts:6](https://github.com/CodeWaveInnovation/codewaveinnovation-formatter/blob/234996c10ff06d47d3540e76819df7b81b4e47bb/src/interfaces/IPlugin.ts#L6)

Interface for plugin system (Open/Closed Principle)

#### Properties

##### name

> `readonly` **name**: `string`

Defined in: [interfaces/IPlugin.ts:10](https://github.com/CodeWaveInnovation/codewaveinnovation-formatter/blob/234996c10ff06d47d3540e76819df7b81b4e47bb/src/interfaces/IPlugin.ts#L10)

Plugin name

##### version

> `readonly` **version**: `string`

Defined in: [interfaces/IPlugin.ts:15](https://github.com/CodeWaveInnovation/codewaveinnovation-formatter/blob/234996c10ff06d47d3540e76819df7b81b4e47bb/src/interfaces/IPlugin.ts#L15)

Plugin version

#### Methods

##### getRules()

> **getRules**(): [`IFormattingRule`](#iformattingrule)[]

Defined in: [interfaces/IPlugin.ts:20](https://github.com/CodeWaveInnovation/codewaveinnovation-formatter/blob/234996c10ff06d47d3540e76819df7b81b4e47bb/src/interfaces/IPlugin.ts#L20)

Get the rules provided by this plugin

###### Returns

[`IFormattingRule`](#iformattingrule)[]

***

### IRuleRegistry

Defined in: [interfaces/IRuleRegistry.ts:6](https://github.com/CodeWaveInnovation/codewaveinnovation-formatter/blob/234996c10ff06d47d3540e76819df7b81b4e47bb/src/interfaces/IRuleRegistry.ts#L6)

Interface for rule registry (Single Responsibility Principle)

#### Methods

##### getAllRules()

> **getAllRules**(): [`IFormattingRule`](#iformattingrule)[]

Defined in: [interfaces/IRuleRegistry.ts:20](https://github.com/CodeWaveInnovation/codewaveinnovation-formatter/blob/234996c10ff06d47d3540e76819df7b81b4e47bb/src/interfaces/IRuleRegistry.ts#L20)

Get all registered rules

###### Returns

[`IFormattingRule`](#iformattingrule)[]

##### getRule()

> **getRule**(`name`): [`IFormattingRule`](#iformattingrule) \| `undefined`

Defined in: [interfaces/IRuleRegistry.ts:15](https://github.com/CodeWaveInnovation/codewaveinnovation-formatter/blob/234996c10ff06d47d3540e76819df7b81b4e47bb/src/interfaces/IRuleRegistry.ts#L15)

Get a rule by name

###### Parameters

###### name

`string`

###### Returns

[`IFormattingRule`](#iformattingrule) \| `undefined`

##### register()

> **register**(`rule`): `void`

Defined in: [interfaces/IRuleRegistry.ts:10](https://github.com/CodeWaveInnovation/codewaveinnovation-formatter/blob/234996c10ff06d47d3540e76819df7b81b4e47bb/src/interfaces/IRuleRegistry.ts#L10)

Register a new rule

###### Parameters

###### rule

[`IFormattingRule`](#iformattingrule)

###### Returns

`void`

***

### RuleConfig

Defined in: [interfaces/types.ts:13](https://github.com/CodeWaveInnovation/codewaveinnovation-formatter/blob/234996c10ff06d47d3540e76819df7b81b4e47bb/src/interfaces/types.ts#L13)

Represents a formatting rule configuration

#### Properties

##### enabled

> **enabled**: `boolean`

Defined in: [interfaces/types.ts:15](https://github.com/CodeWaveInnovation/codewaveinnovation-formatter/blob/234996c10ff06d47d3540e76819df7b81b4e47bb/src/interfaces/types.ts#L15)

##### name

> **name**: `string`

Defined in: [interfaces/types.ts:14](https://github.com/CodeWaveInnovation/codewaveinnovation-formatter/blob/234996c10ff06d47d3540e76819df7b81b4e47bb/src/interfaces/types.ts#L14)

##### options?

> `optional` **options**: `Record`\<`string`, `unknown`\>

Defined in: [interfaces/types.ts:16](https://github.com/CodeWaveInnovation/codewaveinnovation-formatter/blob/234996c10ff06d47d3540e76819df7b81b4e47bb/src/interfaces/types.ts#L16)

## Functions

### createFormatter()

> **createFormatter**(): [`CodeFormatter`](#codeformatter)

Defined in: [index.ts:24](https://github.com/CodeWaveInnovation/codewaveinnovation-formatter/blob/234996c10ff06d47d3540e76819df7b81b4e47bb/src/index.ts#L24)

Create a formatter instance with core rules loaded

#### Returns

[`CodeFormatter`](#codeformatter)

***

### getDefaultConfig()

> **getDefaultConfig**(): [`FormatterConfig`](#formatterconfig)

Defined in: [index.ts:37](https://github.com/CodeWaveInnovation/codewaveinnovation-formatter/blob/234996c10ff06d47d3540e76819df7b81b4e47bb/src/index.ts#L37)

Default configuration

#### Returns

[`FormatterConfig`](#formatterconfig)
