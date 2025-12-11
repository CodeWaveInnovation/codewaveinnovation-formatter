# @codewaveinnovation/formatter

[![npm version](https://badge.fury.io/js/@codewaveinnovation%2Fformatter.svg)](https://www.npmjs.com/package/@codewaveinnovation/formatter)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Formateador de código agnóstico al lenguaje con reglas configurables y soporte para plugins.

## 🚀 Características

- **Agnóstico al lenguaje**: Funciona con cualquier tipo de archivo de texto
- **Arquitectura SOLID**: Diseño modular y extensible
- **Sistema de plugins**: Extiende funcionalidad sin modificar el código base
- **CLI interactiva**: Interfaz de línea de comandos con modo interactivo
- **Reglas configurables**: Personaliza el formateo según tus necesidades
- **Alta cobertura de pruebas**: Más del 80% de cobertura de código

## 📦 Instalación

```bash
npm install @codewaveinnovation/formatter
```

Para uso global del CLI:

```bash
npm install -g @codewaveinnovation/formatter
```

## 🎯 Uso

### CLI

#### Formatear un archivo

```bash
cwf format archivo.txt
```

#### Modo interactivo

```bash
cwf format archivo.txt --interactive
```

#### Usar archivo de configuración

```bash
cwf format archivo.txt --config .cwfrc.json
```

#### Verificar formato sin modificar

```bash
cwf check archivo.txt
```

#### Crear archivo de configuración por defecto

```bash
cwf init
```

### API Programática

```typescript
import { createFormatter, getDefaultConfig } from '@codewaveinnovation/formatter';

// Crear formateador con reglas por defecto
const formatter = createFormatter();
const config = getDefaultConfig();

// Formatear contenido
const result = await formatter.format('  hello world  ', config);
console.log(result.content); // 'hello world\n'
console.log(result.changed); // true
console.log(result.appliedRules); // ['trailing-whitespace', 'final-newline']
```

### Configuración personalizada

```typescript
import { createFormatter, FormatterConfig } from '@codewaveinnovation/formatter';

const formatter = createFormatter();

const customConfig: FormatterConfig = {
  rules: [
    { 
      name: 'indentation', 
      enabled: true, 
      options: { style: 'space', size: 4 } 
    },
    { 
      name: 'line-ending', 
      enabled: true, 
      options: { style: 'lf' } 
    },
    { 
      name: 'trailing-whitespace', 
      enabled: true 
    },
    { 
      name: 'final-newline', 
      enabled: true, 
      options: { insert: true } 
    },
  ],
};

const result = await formatter.format(code, customConfig);
```

## 📋 Reglas disponibles

### `indentation`

Normaliza la indentación a espacios o tabulaciones.

**Opciones:**
- `style`: `'space'` | `'tab'` (default: `'space'`)
- `size`: número de espacios por nivel (default: `2`)

### `line-ending`

Normaliza los finales de línea.

**Opciones:**
- `style`: `'lf'` | `'crlf'` | `'cr'` (default: `'lf'`)

### `trailing-whitespace`

Elimina espacios en blanco al final de las líneas.

### `final-newline`

Asegura que el archivo termine con una nueva línea.

**Opciones:**
- `insert`: `boolean` (default: `true`)

### `max-line-length`

Controla la longitud máxima de las líneas.

**Opciones:**
- `length`: número de caracteres (default: `80`)
- `action`: `'warn'` | `'wrap'` (default: `'warn'`)

## 🔌 Sistema de Plugins

Crea tu propio plugin para extender la funcionalidad:

```typescript
import { BasePlugin, IFormattingRule } from '@codewaveinnovation/formatter';
import { MyCustomRule } from './my-custom-rule';

export class MyPlugin extends BasePlugin {
  readonly name = 'my-plugin';
  readonly version = '1.0.0';

  getRules(): IFormattingRule[] {
    return [new MyCustomRule()];
  }
}
```

Cargar el plugin:

```typescript
import { RuleRegistry, PluginManager, CodeFormatter } from '@codewaveinnovation/formatter';
import { MyPlugin } from './my-plugin';

const registry = new RuleRegistry();
const pluginManager = new PluginManager(registry);
const myPlugin = new MyPlugin();

pluginManager.loadPlugin(myPlugin);

const formatter = new CodeFormatter(registry);
```

## 🏗️ Arquitectura SOLID

El proyecto sigue los principios SOLID:

- **S**ingle Responsibility: Cada clase tiene una única responsabilidad
- **O**pen/Closed: Abierto para extensión (plugins), cerrado para modificación
- **L**iskov Substitution: Las implementaciones pueden sustituirse por sus interfaces
- **I**nterface Segregation: Interfaces específicas en lugar de generales
- **D**ependency Inversion: Dependencias en abstracciones, no en concreciones

## 🧪 Pruebas

Ejecutar pruebas:

```bash
npm test
```

Ver cobertura:

```bash
npm run test:coverage
```

## 🛠️ Desarrollo

```bash
# Instalar dependencias
npm install

# Compilar
npm run build

# Ejecutar linter
npm run lint

# Ejecutar pruebas
npm test
```

## 📄 Licencia

MIT © CodeWave Innovation

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor, abre un issue o pull request para sugerencias o mejoras.

## 📚 Documentación adicional

### Archivo de configuración (.cwfrc.json)

```json
{
  "rules": [
    {
      "name": "indentation",
      "enabled": true,
      "options": {
        "style": "space",
        "size": 2
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
    }
  ]
}
```
