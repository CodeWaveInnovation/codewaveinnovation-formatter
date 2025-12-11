# Reglas

CWF viene con un conjunto de reglas de formato integradas que pueden combinarse para aplicar un estilo de código consistente en tus proyectos.

## Reglas Principales

### indentation

**Propósito:** Normaliza la indentación del código a espacios o tabuladores con tamaño configurable.

**Opciones:**

- `style`: `"space"` | `"tab"` (por defecto: `"space"`)
- `size`: number (por defecto: `2`, solo aplicable cuando `style` es `"space"`)

**Cómo funciona:**

- Detecta patrones de indentación existentes en el código
- Convierte toda la indentación al estilo especificado
- Mantiene los niveles de indentación relativos
- Preserva las líneas vacías

**Ejemplos:**

```typescript
// Entrada (indentación mixta)
function hello() {
   if (true) {
    console.log('world');
 }
}

// Salida con { style: 'space', size: 2 }
function hello() {
  if (true) {
    console.log('world');
  }
}

// Salida con { style: 'tab' }
function hello() {
 if (true) {
  console.log('world');
 }
}
```

**Configuración:**

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

**Propósito:** Normaliza los finales de línea a un formato consistente (LF, CRLF, o CR).

**Opciones:**

- `style`: `"lf"` | `"crlf"` | `"cr"` (por defecto: `"lf"`)

**Cómo funciona:**

- Escanea el archivo en busca de todos los caracteres de final de línea
- Reemplaza todos los finales de línea con el estilo especificado
- Maneja finales de línea mixtos en el mismo archivo

**Ejemplos:**

```typescript
// Entrada (finales de línea mixtos)
line1\r\n
line2\n
line3\r

// Salida con { style: 'lf' } (Unix)
line1\n
line2\n
line3\n

// Salida con { style: 'crlf' } (Windows)
line1\r\n
line2\r\n
line3\r\n
```

**Configuración:**

```json
{
  "name": "line-ending",
  "enabled": true,
  "options": {
    "style": "lf"
  }
}
```

**Casos de uso:**

- Proyectos multiplataforma (normalizar a LF para git)
- Proyectos específicos de Windows (usar CRLF)
- Proyectos legacy de Mac (usar CR, rara vez necesario)

---

### trailing-whitespace

**Propósito:** Elimina caracteres de espacios en blanco al final de las líneas.

**Opciones:** Ninguna

**Cómo funciona:**

- Procesa cada línea independientemente
- Elimina todos los caracteres de espacio y tabulador de los finales de línea
- Preserva líneas vacías intencionalmente
- No afecta espacios en blanco dentro de las líneas

**Ejemplos:**

```typescript
// Entrada (• representa espacios)
const name = 'John';••
const age = 30;•••••

// Salida
const name = 'John';
const age = 30;
```

**Configuración:**

```json
{
  "name": "trailing-whitespace",
  "enabled": true
}
```

**Beneficios:**

- Diffs más limpios en control de versiones
- Reduce el tamaño del archivo
- Previene advertencias del editor
- Mejor práctica de la industria

---

### final-newline

**Propósito:** Asegura que los archivos terminen con exactamente un carácter de nueva línea (o lo elimina).

**Opciones:**

- `insert`: boolean (por defecto: `true`)

**Cómo funciona:**

- Verifica si el archivo termina con una nueva línea
- Agrega o elimina la nueva línea final basándose en la opción `insert`
- Elimina múltiples nuevas líneas finales cuando `insert: true`
- Asegura un final de archivo limpio

**Ejemplos:**

```typescript
// Entrada (sin nueva línea final)
const name = 'John';[EOF]

// Salida con { insert: true }
const name = 'John';
[EOF]

// Entrada (múltiples nuevas líneas finales)
const name = 'John';


[EOF]

// Salida con { insert: true }
const name = 'John';
[EOF]
```

**Configuración:**

```json
{
  "name": "final-newline",
  "enabled": true,
  "options": {
    "insert": true
  }
}
```

**Estándares:**

- El estándar POSIX requiere nueva línea final
- Muchos linters y editores lo aplican
- Previene problemas con herramientas que leen archivos línea por línea

---

### max-line-length

**Propósito:** Valida o envuelve líneas que exceden una longitud máxima.

**Opciones:**

- `length`: number (por defecto: `80`)
- `action`: `"warn"` | `"wrap"` (por defecto: `"warn"`)

**Cómo funciona:**

- Mide el conteo de caracteres de cada línea
- Con `action: "warn"`: Registra advertencias pero no modifica el contenido
- Con `action: "wrap"`: Intenta romper líneas largas en espacios

**Ejemplos:**

```typescript
// Entrada (línea larga)
const message = 'Este es un string muy largo que excede la longitud máxima de línea configurada en el formateador';

// Salida con { length: 80, action: 'warn' }
// ⚠️ Advertencia: La línea 1 excede 80 caracteres (95)
// (contenido sin cambios)

// Salida con { length: 80, action: 'wrap' }
const message = 'Este es un string muy largo que excede la longitud máxima 
de línea configurada en el formateador';
```

**Configuración:**

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

**Notas:**

- El modo `wrap` es básico y puede no funcionar bien con todas las estructuras de código
- Usa el modo `warn` para linting, el modo `wrap` con precaución
- Longitudes comunes: 80 (clásico), 100 (moderno), 120 (pantalla ancha)

---

## Orden de Aplicación de Reglas

Las reglas se aplican **secuencialmente** en el orden en que aparecen en tu configuración. Cada regla recibe como entrada la salida de la regla anterior.

**Ejemplo de flujo de ejecución:**

```
Contenido Original
      ↓
Regla de Indentación (normaliza espacios)
      ↓
Regla de Final de Línea (normaliza a LF)
      ↓
Regla de Espacios al Final (elimina)
      ↓
Regla de Nueva Línea Final (inserta)
      ↓
Regla de Longitud Máxima (valida/envuelve)
      ↓
Contenido Final Formateado
```

**Mejor Práctica:** Ordena las reglas de más a menos invasivas:

1. `indentation` - Afecta la estructura
2. `line-ending` - Afecta los saltos de línea
3. `trailing-whitespace` - Limpieza
4. `final-newline` - Toque final
5. `max-line-length` - Validación al final

---

## Creando Reglas Personalizadas

El sistema de plugins de CWF te permite crear reglas de formato personalizadas.

### Interfaz de Regla

```typescript
import { BaseFormattingRule } from '@codewaveinnovation/formatter';
import { FormatContext } from '@codewaveinnovation/formatter';

export class MiReglaPersonalizada extends BaseFormattingRule {
  readonly name = 'mi-regla-personalizada';
  readonly description = 'Descripción de lo que hace esta regla';

  protected format(context: FormatContext): string {
    // Acceder al contenido actual
    const { content } = context;
    
    // Acceder a la configuración de esta regla
    const ruleConfig = context.config.rules.find(r => r.name === this.name);
    const options = ruleConfig?.options || {};
    
    // Transformar contenido
    const transformed = content; // Tu lógica de transformación
    
    // Retornar nuevo contenido (inmutable)
    return transformed;
  }
}
```

### Creando un Plugin

```typescript
import { BasePlugin } from '@codewaveinnovation/formatter';
import { IFormattingRule } from '@codewaveinnovation/formatter';
import { MiReglaPersonalizada } from './MiReglaPersonalizada';

export class MiPlugin extends BasePlugin {
  readonly name = 'mi-plugin';
  readonly version = '1.0.0';

  getRules(): IFormattingRule[] {
    return [
      new MiReglaPersonalizada()
    ];
  }
}
```

### Usando Plugin Personalizado

```typescript
import { createFormatter, RuleRegistry } from '@codewaveinnovation/formatter';
import { PluginManager } from '@codewaveinnovation/formatter';
import { MiPlugin } from './MiPlugin';

const registry = new RuleRegistry();
const pluginManager = new PluginManager(registry);

// Cargar plugin personalizado
pluginManager.loadPlugin(new MiPlugin());

// Crear formateador
const formatter = new CodeFormatter(registry);

// Usar con configuración
const config = {
  rules: [
    { name: 'mi-regla-personalizada', enabled: true, options: {} }
  ]
};

const result = await formatter.format(content, config);
```

---

## Mejores Prácticas de Reglas

### 1. Mantén las Reglas Simples

Cada regla debe hacer una cosa bien. Evita combinar múltiples responsabilidades.

```typescript
// ✅ Bueno - Responsabilidad única
export class TrailingWhitespaceRule extends BaseFormattingRule {
  protected format(context: FormatContext): string {
    return context.content
      .split('\n')
      .map(line => line.replace(/\s+$/, ''))
      .join('\n');
  }
}

// ❌ Malo - Múltiples responsabilidades
export class WhitespaceRule extends BaseFormattingRule {
  protected format(context: FormatContext): string {
    // Elimina espacios al final Y normaliza espacios Y corrige indentación
    // ¡Demasiado en una regla!
  }
}
```

### 2. Haz las Reglas Inmutables

Siempre retorna nuevo contenido en lugar de modificar la entrada.

```typescript
// ✅ Bueno - Inmutable
protected format(context: FormatContext): string {
  return context.content.replace(/foo/g, 'bar');
}

// ❌ Malo - Muta la entrada
protected format(context: FormatContext): string {
  context.content = context.content.replace(/foo/g, 'bar'); // ¡Nunca hagas esto!
  return context.content;
}
```

### 3. Maneja Casos Extremos

```typescript
protected format(context: FormatContext): string {
  const { content } = context;
  
  // Manejar contenido vacío
  if (!content || content.length === 0) {
    return content;
  }
  
  // Manejar línea única
  if (!content.includes('\n')) {
    return this.processLine(content);
  }
  
  // Procesar múltiples líneas
  return content
    .split('\n')
    .map(line => this.processLine(line))
    .join('\n');
}
```

### 4. Documenta las Opciones

```typescript
/**
 * Controla el estilo de comillas en el código
 * 
 * @options
 * - style: 'single' | 'double' - Tipo de comillas a usar (por defecto: 'single')
 * - avoidEscape: boolean - Preferir comillas que minimicen escapes (por defecto: true)
 * 
 * @example
 * // Entrada con comillas dobles
 * const name = "John";
 * 
 * // Salida con { style: 'single' }
 * const name = 'John';
 */
export class QuoteStyleRule extends BaseFormattingRule {
  // Implementación
}
```

---

## Próximos Pasos

- [Guía de Configuración](/es/guide/configuration) - Aprende cómo configurar reglas
- [Referencia de API](/es/api/) - Uso programático
- [Ejemplos](/es/examples) - Ejemplos de configuración del mundo real
