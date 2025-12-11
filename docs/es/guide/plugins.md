# Plugins y Extensiones

El sistema de plugins de CWF te permite extender el formateador con reglas y funcionalidad personalizadas. Esta arquitectura modular facilita la creación, compartición y reutilización de reglas de formato entre proyectos.

## Entendiendo los Plugins

Un **plugin** es un conjunto de reglas de formato que se pueden cargar en CWF. El sistema de plugins sigue el **Principio Abierto/Cerrado** - el formateador está abierto para extensión pero cerrado para modificación.

### Plugin Core

CWF incluye un `CorePlugin` integrado que proporciona todas las reglas de formato estándar:

- `indentation` - Normaliza espacios/tabuladores
- `line-ending` - Normaliza finales de línea (LF/CRLF/CR)
- `trailing-whitespace` - Elimina espacios al final
- `final-newline` - Asegura nueva línea final
- `max-line-length` - Valida/envuelve líneas largas

El plugin core se **carga automáticamente** cuando usas `createFormatter()`.

## Creando Plugins Personalizados

### Estructura Básica de Plugin

```typescript
import { BasePlugin, IFormattingRule } from '@codewaveinnovation/formatter';

export class MiPlugin extends BasePlugin {
  readonly name = 'mi-plugin';
  readonly version = '1.0.0';

  getRules(): IFormattingRule[] {
    return [
      new MiReglaPersonalizada(),
      new OtraReglaPersonalizada(),
    ];
  }
}
```

### Creando una Regla Personalizada

Las reglas deben extender `BaseFormattingRule`:

```typescript
import { BaseFormattingRule, FormatContext } from '@codewaveinnovation/formatter';

export class ReglaPuntoYComa extends BaseFormattingRule {
  readonly name = 'semicolon';
  readonly description = 'Aplica uso de punto y coma al final de declaraciones';

  protected format(context: FormatContext): string {
    const { content, config } = context;
    
    // Obtener configuración de la regla
    const ruleConfig = config.rules.find(r => r.name === this.name);
    const options = ruleConfig?.options || { enforce: true };

    if (options.enforce) {
      // Agregar punto y coma donde falte
      return this.addSemicolons(content);
    } else {
      // Eliminar punto y coma
      return this.removeSemicolons(content);
    }
  }

  private addSemicolons(content: string): string {
    // Detalles de implementación...
    return content;
  }

  private removeSemicolons(content: string): string {
    // Detalles de implementación...
    return content;
  }
}
```

## Ejemplos de Plugins

### Ejemplo 1: Plugin de Estilo de Comillas

```typescript
import { BasePlugin, BaseFormattingRule, FormatContext } from '@codewaveinnovation/formatter';

class ReglaEstiloComillas extends BaseFormattingRule {
  readonly name = 'quote-style';
  readonly description = 'Normaliza estilo de comillas (simples/dobles)';

  protected format(context: FormatContext): string {
    const ruleConfig = context.config.rules.find(r => r.name === this.name);
    const style = ruleConfig?.options?.style || 'single';
    
    if (style === 'single') {
      // Convertir comillas dobles a simples
      return context.content.replace(/"([^"]*)"/g, "'$1'");
    } else {
      // Convertir comillas simples a dobles
      return context.content.replace(/'([^']*)'/g, '"$1"');
    }
  }
}

export class PluginFormatoStrings extends BasePlugin {
  readonly name = 'string-formatting';
  readonly version = '1.0.0';

  getRules(): IFormattingRule[] {
    return [new ReglaEstiloComillas()];
  }
}
```

**Uso:**

```typescript
import { createFormatter, RuleRegistry, PluginManager } from '@codewaveinnovation/formatter';
import { PluginFormatoStrings } from './PluginFormatoStrings';

const registry = new RuleRegistry();
const pluginManager = new PluginManager(registry);

// Cargar plugin personalizado
pluginManager.loadPlugin(new PluginFormatoStrings());

const formatter = new CodeFormatter(registry);

const config = {
  rules: [
    { name: 'quote-style', enabled: true, options: { style: 'single' } }
  ]
};

const result = await formatter.format(code, config);
```

### Ejemplo 2: Plugin Multi-Regla

```typescript
import { BasePlugin } from '@codewaveinnovation/formatter';

class ReglaFormatoComentario extends BaseFormattingRule {
  readonly name = 'comment-format';
  readonly description = 'Formatea comentarios consistentemente';

  protected format(context: FormatContext): string {
    // Asegurar espacio después de // en comentarios de línea única
    return context.content.replace(/\/\/([^\s])/g, '// $1');
  }
}

class ReglaEspaciadoCorchetes extends BaseFormattingRule {
  readonly name = 'bracket-spacing';
  readonly description = 'Controla espaciado dentro de corchetes';

  protected format(context: FormatContext): string {
    const ruleConfig = context.config.rules.find(r => r.name === this.name);
    const spacing = ruleConfig?.options?.spacing !== false;
    
    if (spacing) {
      // Agregar espacio dentro de corchetes: { key: value }
      return context.content
        .replace(/\{([^\s{])/g, '{ $1')
        .replace(/([^\s}])\}/g, '$1 }');
    } else {
      // Eliminar espacio dentro de corchetes: {key: value}
      return context.content
        .replace(/\{\s+/g, '{')
        .replace(/\s+\}/g, '}');
    }
  }
}

export class PluginGuiaEstilo extends BasePlugin {
  readonly name = 'style-guide';
  readonly version = '1.0.0';

  getRules(): IFormattingRule[] {
    return [
      new ReglaFormatoComentario(),
      new ReglaEspaciadoCorchetes(),
    ];
  }
}
```

## Cargando Plugins

### Método 1: Carga Programática

```typescript
import { RuleRegistry, PluginManager, CodeFormatter } from '@codewaveinnovation/formatter';
import { MiPlugin } from './MiPlugin';

const registry = new RuleRegistry();
const pluginManager = new PluginManager(registry);

// Cargar plugins
pluginManager.loadPlugin(new MiPlugin());

// Crear formateador
const formatter = new CodeFormatter(registry);
```

### Método 2: Usando createFormatter con Registry Personalizado

```typescript
import { createFormatter, RuleRegistry, PluginManager } from '@codewaveinnovation/formatter';
import { CorePlugin } from '@codewaveinnovation/formatter';
import { MiPlugin } from './MiPlugin';

// Crear configuración personalizada
const registry = new RuleRegistry();
const pluginManager = new PluginManager(registry);

// Cargar plugin core (requerido para reglas estándar)
pluginManager.loadPlugin(new CorePlugin());

// Cargar plugins personalizados
pluginManager.loadPlugin(new MiPlugin());

// Crear formateador con registry personalizado
const formatter = new CodeFormatter(registry);
```

## Mejores Prácticas de Plugins

### 1. Responsabilidad Única

Cada plugin debe tener un propósito claro y enfocado:

```typescript
// ✅ Bueno - Propósito enfocado
export class PluginFormatoStrings extends BasePlugin {
  // Solo reglas relacionadas con strings
}

// ❌ Malo - Demasiado amplio
export class PluginTodo extends BasePlugin {
  // 50 reglas diferentes no relacionadas
}
```

### 2. Versionado

Siempre versiona tus plugins:

```typescript
export class MiPlugin extends BasePlugin {
  readonly name = 'mi-plugin';
  readonly version = '1.2.0'; // Sigue versionado semántico
}
```

### 3. Documentación

Documenta tus reglas con ejemplos claros:

```typescript
/**
 * Aplica espaciado consistente alrededor de operadores
 * 
 * @example
 * // Antes
 * let x=1+2;
 * 
 * // Después
 * let x = 1 + 2;
 */
export class ReglaEspaciadoOperadores extends BaseFormattingRule {
  // ...
}
```

### 4. Opciones de Configuración

Haz las reglas configurables:

```typescript
protected format(context: FormatContext): string {
  const ruleConfig = context.config.rules.find(r => r.name === this.name);
  const options = ruleConfig?.options || {
    // Opciones por defecto
    style: 'single',
    avoidEscape: true,
  };
  
  // Usar opciones en tu lógica
}
```

### 5. Manejo de Errores

Maneja casos extremos con gracia:

```typescript
protected format(context: FormatContext): string {
  const { content } = context;
  
  // Manejar contenido vacío
  if (!content || content.length === 0) {
    return content;
  }
  
  try {
    return this.transformContent(content);
  } catch (error) {
    // Registrar error pero no fallar
    console.warn(`Regla ${this.name} falló:`, error);
    return content; // Retornar contenido original
  }
}
```

## Publicando Plugins

### Estructura del Paquete

```
my-cwf-plugin/
├── src/
│   ├── rules/
│   │   ├── MiRegla.ts
│   │   └── OtraRegla.ts
│   ├── MiPlugin.ts
│   └── index.ts
├── package.json
├── tsconfig.json
└── README.md
```

### package.json

```json
{
  "name": "@tuorg/cwf-plugin-nombre",
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
// Exportar plugin y reglas
export { MiPlugin } from './MiPlugin';
export { MiRegla } from './rules/MiRegla';
```

### Publicando en npm

```bash
npm login
npm publish --access public
```

## Plugins de la Comunidad

¿Quieres compartir tu plugin? ¡Envía un PR para agregarlo a esta lista!

### Extensiones Oficiales

- **@codewaveinnovation/formatter-eslint** _(próximamente)_ - Puente entre CWF y reglas de ESLint
- **@codewaveinnovation/formatter-prettier** _(próximamente)_ - Reglas compatibles con Prettier

### Plugins de la Comunidad

_Aún no hay plugins de la comunidad - ¡sé el primero en crear uno!_

Para agregar tu plugin:

1. Haz fork del repositorio
2. Agrega tu plugin a esta sección
3. Incluye: nombre, descripción, link npm, link GitHub
4. Envía un PR

## Referencia de API de Plugins

### BasePlugin

Clase abstracta para crear plugins.

**Propiedades Requeridas:**

- `name: string` - Identificador único del plugin
- `version: string` - Versión semver

**Métodos Requeridos:**

- `getRules(): IFormattingRule[]` - Retorna array de reglas

### PluginManager

Administra la carga de plugins y registro de reglas.

**Métodos:**

- `loadPlugin(plugin: IPlugin): void` - Carga un plugin y registra sus reglas
- `getLoadedPlugins(): string[]` - Retorna nombres de plugins cargados

### RuleRegistry

Registro central para todas las reglas de formato.

**Métodos:**

- `register(rule: IFormattingRule): void` - Registra una regla
- `get(name: string): IFormattingRule | undefined` - Obtiene una regla por nombre
- `getAll(): IFormattingRule[]` - Obtiene todas las reglas registradas
- `has(name: string): boolean` - Verifica si existe una regla

## Próximos Pasos

- [Guía de Reglas](/es/guide/rules) - Aprende sobre las reglas integradas
- [Configuración](/es/guide/configuration) - Configura tu formateador
- [Referencia de API](/es/api/) - Documentación completa de la API

## ¿Necesitas Ayuda?

- 💬 [Discusiones](https://github.com/CodeWaveInnovation/codewaveinnovation-formatter/discussions) - Haz preguntas
- 🐛 [Issues](https://github.com/CodeWaveInnovation/codewaveinnovation-formatter/issues) - Reporta bugs
- 📧 Contacto: [support@codewaveinnovation.com](mailto:support@codewaveinnovation.com)
