---
outline: deep
---

# Referencia de API

Documentación completa de la API para **@codewaveinnovation/formatter**. Esta referencia se genera automáticamente desde el código fuente usando TypeDoc.

## Enlaces Rápidos

::: tip Casos de Uso Comunes

- **[Primeros Pasos](#primeros-pasos)** - Crear y usar un formateador
- **[Creando Reglas Personalizadas](#creando-reglas)** - Extender con tus propias reglas
- **[Sistema de Plugins](#plugins)** - Construir y cargar plugins
- **[Configuración](#configuracion)** - Configurar reglas de formato
:::

## Primeros Pasos

### Uso Básico

```typescript
import { createFormatter, getDefaultConfig } from '@codewaveinnovation/formatter';

// Crear instancia del formateador
const formatter = createFormatter();

// Formatear código con configuración por defecto
const result = await formatter.format(sourceCode);

// Formatear con configuración personalizada
const config = getDefaultConfig();
const result = await formatter.format(sourceCode, config);
```

### Exportaciones Principales

| Exportación | Tipo | Descripción |
|-------------|------|-------------|
| `createFormatter()` | Función | Crea un formateador con CorePlugin cargado |
| `getDefaultConfig()` | Función | Retorna objeto de configuración por defecto |
| `CodeFormatter` | Clase | Clase principal del formateador |
| `RuleRegistry` | Clase | Registro de reglas de formato |
| `PluginManager` | Clase | Administra la carga de plugins |
| `BaseFormattingRule` | Clase | Base abstracta para crear reglas |
| `BasePlugin` | Clase | Base abstracta para crear plugins |
| `CorePlugin` | Clase | Plugin integrado con reglas estándar |

## Clases Principales

### CodeFormatter

Clase principal del formateador que aplica reglas al contenido.

```typescript
import { CodeFormatter, RuleRegistry } from '@codewaveinnovation/formatter';

const registry = new RuleRegistry();
const formatter = new CodeFormatter(registry);

const result = await formatter.format(content, config);
// result: { content: string, changed: boolean, appliedRules: string[] }
```

**Métodos:**

- `format(content: string, config?: FormatterConfig): Promise<FormatResult>` - Formatea contenido con la configuración dada

### RuleRegistry

Registro central para todas las reglas de formato.

```typescript
import { RuleRegistry } from '@codewaveinnovation/formatter';

const registry = new RuleRegistry();

// Registrar una regla
registry.register(new MiReglaPersonalizada());

// Obtener una regla por nombre
const rule = registry.get('mi-regla');

// Verificar si existe una regla
const exists = registry.has('mi-regla');

// Obtener todas las reglas
const allRules = registry.getAll();
```

**Métodos:**

- `register(rule: IFormattingRule): void` - Registra una nueva regla
- `get(name: string): IFormattingRule | undefined` - Obtiene regla por nombre
- `has(name: string): boolean` - Verifica si existe la regla
- `getAll(): IFormattingRule[]` - Retorna todas las reglas registradas

### PluginManager

Administra la carga de plugins y el registro de sus reglas.

```typescript
import { PluginManager, RuleRegistry } from '@codewaveinnovation/formatter';

const registry = new RuleRegistry();
const manager = new PluginManager(registry);

// Cargar un plugin
manager.loadPlugin(new MiPlugin());

// Obtener nombres de plugins cargados
const plugins = manager.getLoadedPlugins();
```

**Métodos:**

- `loadPlugin(plugin: IPlugin): void` - Carga plugin y registra sus reglas
- `getLoadedPlugins(): string[]` - Retorna nombres de plugins cargados

## Creando Reglas

### BaseFormattingRule

Clase base abstracta para implementar reglas de formato personalizadas.

```typescript
import { BaseFormattingRule, FormatContext } from '@codewaveinnovation/formatter';

export class MiRegla extends BaseFormattingRule {
  readonly name = 'mi-regla';
  readonly description = 'Hace algo genial';

  protected format(context: FormatContext): string {
    const { content, config } = context;
    
    // Obtener configuración de la regla
    const ruleConfig = config.rules.find(r => r.name === this.name);
    const options = ruleConfig?.options || {};
    
    // Transformar contenido
    return contenidoTransformado;
  }
}
```

**Propiedades Requeridas:**

- `name: string` - Identificador único de la regla
- `description: string` - Descripción legible

**Métodos Requeridos:**

- `format(context: FormatContext): string` - Transforma el contenido

**Métodos Heredados:**

- `apply(context: FormatContext): FormatResult` - Aplica regla y retorna resultado

## Plugins

### BasePlugin

Clase base abstracta para crear plugins.

```typescript
import { BasePlugin, IFormattingRule } from '@codewaveinnovation/formatter';

export class MiPlugin extends BasePlugin {
  readonly name = 'mi-plugin';
  readonly version = '1.0.0';

  getRules(): IFormattingRule[] {
    return [
      new MiPrimeraRegla(),
      new MiSegundaRegla(),
    ];
  }
}
```

**Propiedades Requeridas:**

- `name: string` - Identificador único del plugin
- `version: string` - Cadena de versión semántica

**Métodos Requeridos:**

- `getRules(): IFormattingRule[]` - Retorna array de reglas proporcionadas por el plugin

### CorePlugin

Plugin integrado que contiene reglas de formato estándar.

**Reglas Incluidas:**

- `indentation` - Normaliza indentación (espacios/tabs)
- `line-ending` - Normaliza finales de línea (LF/CRLF/CR)
- `trailing-whitespace` - Elimina espacios al final
- `final-newline` - Asegura nueva línea final
- `max-line-length` - Valida o envuelve líneas largas

```typescript
import { CorePlugin } from '@codewaveinnovation/formatter';

const corePlugin = new CorePlugin();
const rules = corePlugin.getRules(); // Retorna 5 reglas integradas
```

## Configuración

### FormatterConfig

Objeto de configuración que define qué reglas aplicar.

```typescript
interface FormatterConfig {
  rules: RuleConfig[];
}
```

### RuleConfig

Configuración para reglas individuales.

```typescript
interface RuleConfig {
  name: string;      // Identificador de la regla
  enabled: boolean;  // Si se debe aplicar esta regla
  options?: Record<string, any>; // Opciones específicas de la regla
}
```

**Ejemplo:**

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

## Tipos e Interfaces

### FormatContext

Contexto pasado a las reglas durante el formato.

```typescript
interface FormatContext {
  content: string;           // Contenido actual a formatear
  config: FormatterConfig;   // Configuración completa
  filePath?: string;         // Ruta del archivo opcional
}
```

### FormatResult

Resultado retornado después del formato.

```typescript
interface FormatResult {
  content: string;        // Contenido formateado
  changed: boolean;       // Si el contenido fue modificado
  appliedRules: string[]; // Nombres de reglas que hicieron cambios
}
```

### IFormattingRule

Interfaz para reglas de formato.

```typescript
interface IFormattingRule {
  readonly name: string;
  readonly description: string;
  apply(context: FormatContext): FormatResult;
}
```

### IPlugin

Interfaz para plugins.

```typescript
interface IPlugin {
  readonly name: string;
  readonly version: string;
  getRules(): IFormattingRule[];
}
```

### IFormatter

Interfaz para formateadores.

```typescript
interface IFormatter {
  format(content: string, config?: FormatterConfig): Promise<FormatResult>;
}
```

### IRuleRegistry

Interfaz para registros de reglas.

```typescript
interface IRuleRegistry {
  register(rule: IFormattingRule): void;
  get(name: string): IFormattingRule | undefined;
  has(name: string): boolean;
  getAll(): IFormattingRule[];
}
```

## Reglas Integradas

### IndentationRule

Normaliza la indentación del código a espacios o tabs.

**Opciones:**

- `style: 'space' | 'tab'` - Estilo de indentación (por defecto: 'space')
- `size: number` - Número de espacios por nivel (por defecto: 2)

### LineEndingRule

Normaliza los finales de línea.

**Opciones:**

- `style: 'lf' | 'crlf' | 'cr'` - Estilo de final de línea (por defecto: 'lf')

### TrailingWhitespaceRule

Elimina espacios en blanco al final de las líneas.

**Opciones:** Ninguna

### FinalNewlineRule

Asegura que los archivos terminen con una nueva línea.

**Opciones:**

- `insert: boolean` - Si insertar nueva línea final (por defecto: true)

### MaxLineLengthRule

Valida o envuelve líneas largas.

**Opciones:**

- `length: number` - Longitud máxima de línea (por defecto: 80)
- `action: 'warn' | 'wrap'` - Acción a tomar (por defecto: 'warn')

## Uso Avanzado

### Configuración de Registry Personalizado

```typescript
import { 
  CodeFormatter, 
  RuleRegistry, 
  PluginManager,
  CorePlugin 
} from '@codewaveinnovation/formatter';

// Crear configuración personalizada
const registry = new RuleRegistry();
const pluginManager = new PluginManager(registry);

// Cargar plugins
pluginManager.loadPlugin(new CorePlugin());
pluginManager.loadPlugin(new MiPluginPersonalizado());

// Crear formateador
const formatter = new CodeFormatter(registry);
```

### Manejo de Errores

```typescript
try {
  const result = await formatter.format(content, config);
  
  if (result.changed) {
    console.log('Reglas aplicadas:', result.appliedRules);
    // Guardar o usar result.content
  }
} catch (error) {
  console.error('Formato falló:', error);
}
```

## Referencia Completa de TypeDoc

Para documentación completa de la API incluyendo todos los tipos internos y detalles de implementación, consulta la [referencia TypeDoc autogenerada](./README).

## Ver También

- [Guía](/es/guide/getting-started) - Guía de usuario y tutoriales
- [Configuración](/es/guide/configuration) - Opciones de configuración
- [Reglas](/es/guide/rules) - Documentación de reglas integradas
- [Plugins](/es/guide/plugins) - Guía de desarrollo de plugins
