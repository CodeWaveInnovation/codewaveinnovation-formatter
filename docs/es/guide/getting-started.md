# Empezando

## Instalación

### Instalación Global

Instala CWF globalmente para usarlo desde cualquier lugar:

```bash
npm install -g @codewaveinnovation/formatter
```

### Instalación en Proyecto

Instala como dependencia de desarrollo en tu proyecto:

```bash
npm install --save-dev @codewaveinnovation/formatter
```

## Uso Básico

### Formatear un Archivo Individual

```bash
cwf format miarchivo.txt
```

### Formatear Múltiples Archivos

Usando patrones glob:

```bash
cwf format "src/**/*.ts"
cwf format "*.js" "*.ts"
```

### Modo Interactivo

Configura las reglas de forma interactiva:

```bash
cwf format miarchivo.txt --interactive
```

### Verificar Formato

Verifica si los archivos están formateados sin modificarlos:

```bash
cwf check miarchivo.txt
```

## Configuración

### Auto-Descubrimiento

CWF busca automáticamente archivos de configuración en el directorio actual:

- `.cwfrc.json`
- `.cwfrc`
- `package.json` (bajo la clave `"formatter"`)

### Crear Configuración Predeterminada

Genera un archivo de configuración predeterminado:

```bash
cwf init
```

Esto crea un archivo `.cwfrc.json` con la configuración por defecto:

```json
{
  "rules": [
    {
      "name": "indentation",
      "enabled": true,
      "options": { "style": "space", "size": 2 }
    },
    {
      "name": "line-ending",
      "enabled": true,
      "options": { "style": "lf" }
    },
    {
      "name": "trailing-whitespace",
      "enabled": true
    },
    {
      "name": "final-newline",
      "enabled": true,
      "options": { "insert": true }
    }
  ]
}
```

## Uso Programático

Usa CWF en tus aplicaciones Node.js:

```typescript
import { createFormatter, getDefaultConfig } from '@codewaveinnovation/formatter';

const formatter = createFormatter();
const config = getDefaultConfig();

const result = await formatter.format('  hello world  ', config);

console.log(result.content);       // 'hello world\n'
console.log(result.changed);       // true
console.log(result.appliedRules);  // ['trailing-whitespace', 'final-newline']
```

## Próximos Pasos

- Aprende sobre las opciones de [Configuración](./configuration)
- Explora las [Reglas](./rules) disponibles
- Consulta la [documentación de la API](/es/api/)
