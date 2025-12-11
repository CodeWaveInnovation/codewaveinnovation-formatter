import { defineConfig } from "vitepress";

export default defineConfig({
  title: "CWF",
  description: "Language-agnostic code formatter with configurable rules",
  base: "/codewaveinnovation-formatter/",
  ignoreDeadLinks: true,

  head: [
    [
      "link",
      {
        rel: "icon",
        type: "image/svg+xml",
        href: "/codewaveinnovation-formatter/logo.svg",
      },
    ],
    ["meta", { name: "theme-color", content: "#3b82f6" }],
    ["meta", { name: "author", content: "CodeWave Innovation" }],
    ["meta", { property: "og:type", content: "website" }],
    ["meta", { property: "og:title", content: "CWF - CodeWave Formatter" }],
    [
      "meta",
      {
        property: "og:description",
        content:
          "Language-agnostic code formatter with configurable rules and plugin support",
      },
    ],
    [
      "meta",
      {
        property: "og:url",
        content:
          "https://codewaveinnovation.github.io/codewaveinnovation-formatter/",
      },
    ],
    [
      "meta",
      {
        property: "og:image",
        content:
          "https://codewaveinnovation.github.io/codewaveinnovation-formatter/logo.svg",
      },
    ],
    ["meta", { name: "twitter:card", content: "summary" }],
    ["meta", { name: "twitter:title", content: "CWF - CodeWave Formatter" }],
    [
      "meta",
      {
        name: "twitter:description",
        content:
          "Language-agnostic code formatter with configurable rules and plugin support",
      },
    ],
    [
      "meta",
      {
        name: "keywords",
        content:
          "formatter, code formatter, beautifier, linter, plugin system, typescript, javascript, language agnostic",
      },
    ],
  ],

  locales: {
    root: {
      label: "English",
      lang: "en",
      themeConfig: {
        logo: "/logo.svg",
        nav: [
          { text: "Guide", link: "/guide/getting-started" },
          { text: "API", link: "/api/readme" },
          {
            text: "GitHub",
            link: "https://github.com/CodeWaveInnovation/codewaveinnovation-formatter",
          },
        ],
        sidebar: [
          {
            text: "Guide",
            items: [
              { text: "Getting Started", link: "/guide/getting-started" },
              { text: "Configuration", link: "/guide/configuration" },
              { text: "Rules", link: "/guide/rules" },
              { text: "Plugins & Extensions", link: "/guide/plugins" },
            ],
          },
        ],
        socialLinks: [
          {
            icon: "github",
            link: "https://github.com/CodeWaveInnovation/codewaveinnovation-formatter",
          },
          {
            icon: "npm",
            link: "https://www.npmjs.com/package/@codewaveinnovation/formatter",
          },
        ],
        footer: {
          message:
            'Released under the <a href="https://github.com/CodeWaveInnovation/codewaveinnovation-formatter/blob/main/LICENSE" target="_blank">MIT License</a> • Powered by <a href="https://vitepress.dev" target="_blank">VitePress</a>',
          copyright:
            'Copyright © 2024-2025 <a href="https://github.com/CodeWaveInnovation" target="_blank">CodeWave Innovation</a>',
        },
      },
    },
    es: {
      label: "Español",
      lang: "es",
      link: "/es/",
      themeConfig: {
        logo: "/logo.svg",
        nav: [
          { text: "Guía", link: "/es/guide/getting-started" },
          { text: "API", link: "/es/api/index" },
          {
            text: "GitHub",
            link: "https://github.com/CodeWaveInnovation/codewaveinnovation-formatter",
          },
        ],
        sidebar: [
          {
            text: "Guía",
            items: [
              { text: "Empezando", link: "/es/guide/getting-started" },
              { text: "Configuración", link: "/es/guide/configuration" },
              { text: "Reglas", link: "/es/guide/rules" },
              { text: "Plugins y Extensiones", link: "/es/guide/plugins" },
            ],
          },
        ],
        socialLinks: [
          {
            icon: "github",
            link: "https://github.com/CodeWaveInnovation/codewaveinnovation-formatter",
          },
          {
            icon: "npm",
            link: "https://www.npmjs.com/package/@codewaveinnovation/formatter",
          },
        ],
        footer: {
          message:
            'Publicado bajo la <a href="https://github.com/CodeWaveInnovation/codewaveinnovation-formatter/blob/main/LICENSE" target="_blank">Licencia MIT</a> • Powered by <a href="https://vitepress.dev" target="_blank">VitePress</a>',
          copyright:
            'Copyright © 2024-2025 <a href="https://github.com/CodeWaveInnovation" target="_blank">CodeWave Innovation</a>',
        },
      },
    },
  },

  themeConfig: {
    search: {
      provider: "local",
    },
  },
});
