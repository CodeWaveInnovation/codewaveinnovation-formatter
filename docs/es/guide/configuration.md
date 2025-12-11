# Configuración

CWF utiliza un sistema de configuración flexible que te permite personalizar las reglas de formato según las necesidades de tu proyecto.

## Archivos de Configuración

CWF busca automáticamente la configuración en el siguiente orden:

1. `.cwfrc.json` - Archivo de configuración dedicado
2. `.cwfrc` - Archivo de configuración alternativo
3. `package.json` - Bajo la clave `"formatter"`

También puedes especificar un archivo de configuración personalizado usando el flag `--config`.

## Estructura de Configuración

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
    },
    {
      "name": "max-line-length",
      "enabled": false,
      "options": {
        "length": 80,
        "action": "warn"
      }
    }
  ]
}
```

## Configuración de Reglas

Cada regla en el array de configuración tiene la siguiente estructura:

### Propiedades Comunes

- **`name`** (string, requerido): El identificador único de la regla
- **`enabled`** (boolean, requerido): Si la regla debe aplicarse
- **`options`** (object, opcional): Opciones de configuración específicas de la regla

### Reglas Disponibles

#### `indentation`

Controla el estilo de indentación del código.

**Opciones:**

- `style` (string): `"space"` o `"tab"` - Por defecto: `"space"`
- `size` (number): Número de espacios por nivel de indentación (solo para `style: "space"`) - Por defecto: `2`

**Ejemplos:**

```json
// 2 espacios
{
  "name": "indentation",
  "enabled": true,
  "options": { "style": "space", "size": 2 }
}

// 4 espacios
{
  "name": "indentation",
  "enabled": true,
  "options": { "style": "space", "size": 4 }
}

// Tabuladores
{
  "name": "indentation",
  "enabled": true,
  "options": { "style": "tab" }
}
```

#### `line-ending`

Normaliza los finales de línea en los archivos.

**Opciones:**

- `style` (string): `"lf"` (Unix), `"crlf"` (Windows), o `"cr"` (Mac) - Por defecto: `"lf"`

**Ejemplos:**

```json
// Unix (LF)
{
  "name": "line-ending",
  "enabled": true,
  "options": { "style": "lf" }
}

// Windows (CRLF)
{
  "name": "line-ending",
  "enabled": true,
  "options": { "style": "crlf" }
}
```

#### `trailing-whitespace`

Elimina espacios en blanco al final de las líneas.

**Opciones:** Ninguna (esta regla no tiene opciones configurables)

**Ejemplo:**

```json
{
  "name": "trailing-whitespace",
  "enabled": true
}
```

#### `final-newline`

Asegura que los archivos terminen con un carácter de nueva línea.

**Opciones:**

- `insert` (boolean): Si se debe insertar una nueva línea final - Por defecto: `true`

**Ejemplos:**

```json
// Insertar nueva línea final
{
  "name": "final-newline",
  "enabled": true,
  "options": { "insert": true }
}

// Remover nueva línea final
{
  "name": "final-newline",
  "enabled": true,
  "options": { "insert": false }
}
```

#### `max-line-length`

Valida o envuelve líneas largas.

**Opciones:**

- `length` (number): Longitud máxima de línea - Por defecto: `80`
- `action` (string): `"warn"` (solo reportar) o `"wrap"` (intentar romper líneas) - Por defecto: `"warn"`

**Ejemplos:**

```json
// Advertir sobre líneas de más de 100 caracteres
{
  "name": "max-line-length",
  "enabled": true,
  "options": {
    "length": 100,
    "action": "warn"
  }
}

// Envolver líneas de más de 120 caracteres
{
  "name": "max-line-length",
  "enabled": true,
  "options": {
    "length": 120,
    "action": "wrap"
  }
}
```

## Ejemplos de Configuración

### Configuración Mínima

```json
{
  "rules": [
    { "name": "indentation", "enabled": true, "options": { "style": "space", "size": 2 } },
    { "name": "trailing-whitespace", "enabled": true }
  ]
}
```

### Desarrollo Web (2 espacios, LF)

```json
{
  "rules": [
    { "name": "indentation", "enabled": true, "options": { "style": "space", "size": 2 } },
    { "name": "line-ending", "enabled": true, "options": { "style": "lf" } },
    { "name": "trailing-whitespace", "enabled": true },
    { "name": "final-newline", "enabled": true, "options": { "insert": true } },
    { "name": "max-line-length", "enabled": true, "options": { "length": 100, "action": "warn" } }
  ]
}
```

### Estilo Python (4 espacios, LF, estricto)

```json
{
  "rules": [
    { "name": "indentation", "enabled": true, "options": { "style": "space", "size": 4 } },
    { "name": "line-ending", "enabled": true, "options": { "style": "lf" } },
    { "name": "trailing-whitespace", "enabled": true },
    { "name": "final-newline", "enabled": true, "options": { "insert": true } },
    { "name": "max-line-length", "enabled": true, "options": { "length": 79, "action": "warn" } }
  ]
}
```

### Desarrollo Windows (Tabuladores, CRLF)

```json
{
  "rules": [
    { "name": "indentation", "enabled": true, "options": { "style": "tab" } },
    { "name": "line-ending", "enabled": true, "options": { "style": "crlf" } },
    { "name": "trailing-whitespace", "enabled": true },
    { "name": "final-newline", "enabled": true, "options": { "insert": true } }
  ]
}
```

## Usando Archivo de Configuración

### Crear Configuración

```bash
# Modo interactivo (genera .cwfrc.json)
cwf init

# Creación manual
echo '{
  "rules": [
    { "name": "indentation", "enabled": true, "options": { "style": "space", "size": 2 } },
    { "name": "trailing-whitespace", "enabled": true }
  ]
}' > .cwfrc.json
```

### Usar Configuración Personalizada

```bash
# Auto-descubrimiento (busca .cwfrc.json, .cwfrc, package.json)
cwf format src/**/*.ts

# Archivo de configuración explícito
cwf format src/**/*.ts --config ./config/formatter.json
```

## Configuración en package.json

También puedes almacenar la configuración en tu `package.json`:

```json
{
  "name": "mi-proyecto",
  "version": "1.0.0",
  "formatter": {
    "rules": [
      { "name": "indentation", "enabled": true, "options": { "style": "space", "size": 2 } },
      { "name": "trailing-whitespace", "enabled": true }
    ]
  }
}
```

## Configuración Programática

Cuando usas CWF programáticamente, pasa la configuración directamente:

```typescript
import { createFormatter, FormatterConfig } from '@codewaveinnovation/formatter';

const config: FormatterConfig = {
  rules: [
    { name: 'indentation', enabled: true, options: { style: 'space', size: 2 } },
    { name: 'trailing-whitespace', enabled: true }
  ]
};

const formatter = createFormatter();
const result = await formatter.format(code, config);
```

## Próximos Pasos

- [Aprende sobre las Reglas](/es/guide/rules) - Documentación detallada de cada regla
- [Referencia de API](/es/api/) - Guía de uso programático
