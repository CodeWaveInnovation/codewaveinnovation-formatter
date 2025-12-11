---
layout: home

hero:
  name: "CWF"
  text: "Formateador Agnóstico de Lenguaje"
  tagline: "Un poderoso formateador de código extensible con reglas configurables y soporte de plugins"
  actions:
    - theme: brand
      text: Empezar
      link: /es/guide/getting-started
    - theme: alt
      text: Ver en GitHub
      link: https://github.com/CodeWaveInnovation/codewaveinnovation-formatter
  image:
    src: /logo.svg
    alt: CWF

features:
  - icon: 🌍
    title: Agnóstico de Lenguaje
    details: Funciona con cualquier formato de archivo de texto. Sin suposiciones específicas del lenguaje.
  
  - icon: 🔧
    title: Altamente Configurable
    details: Personaliza las reglas de formateo para adaptarse a las necesidades de tu proyecto.
  
  - icon: 🧩
    title: Sistema de Plugins
    details: Extiende la funcionalidad sin modificar el código principal. Crea reglas personalizadas fácilmente.
  
  - icon: 🎯
    title: Arquitectura SOLID
    details: Construido siguiendo principios SOLID para mantenibilidad y extensibilidad.
  
  - icon: ⚡
    title: Rápido y Eficiente
    details: Rendimiento optimizado con caché inteligente y procesamiento por lotes.
  
  - icon: ✅
    title: Bien Probado
    details: Más del 80% de cobertura de pruebas garantizando confiabilidad y estabilidad.
---

## Inicio Rápido

Instala globalmente:

```bash
npm install -g @codewaveinnovation/formatter
```

Formatea un archivo:

```bash
cwf format miarchivo.txt
```

Formatea múltiples archivos:

```bash
cwf format "src/**/*.ts"
```

## ¿Por qué CWF?

CWF (CodeWave Formatter) está diseñado para ser una solución de formateo universal que funciona con cualquier lenguaje de programación o archivo de texto. A diferencia de los formateadores específicos de lenguaje, CWF proporciona una experiencia de formateo consistente en toda tu base de código.

### Beneficios Clave

- **Universal**: Un formateador para todos tus archivos
- **Extensible**: Crea reglas personalizadas para tus necesidades específicas
- **Consistente**: Aplica estándares de codificación en todo tu equipo
- **Automatizado**: Integra con pipelines de CI/CD
- **Amigable para Desarrolladores**: CLI interactivo y documentación completa
