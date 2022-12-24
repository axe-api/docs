export default {
  title: "Axe API",
  description:
    "The fastest way to create Rest API, by defining database models and relations.",

  lang: "en-US",

  lastUpdated: true,

  themeConfig: {
    logo: "/axe.png",

    nav: [
      { text: "Github", link: "https://github.com/axe-api/axe-api" },
      { text: "CLI", link: "https://github.com/axe-api/axe-magic" },
      {
        text: "Cookbooks",
        link: "/cookbooks/",
      },
      {
        text: "Sonarcloud",
        link: "https://sonarcloud.io/dashboard?id=axe-api_axe-api",
      },
      {
        text: "Releases",
        link: "https://github.com/axe-api/axe-api/releases",
      },
    ],
    sidebar: [
      {
        text: "Getting Started",
        items: [
          {
            text: "What is Axe API?",
            link: "getting-started/what-is-axe-api",
          },
          { text: "Installation", link: "getting-started/installation/index" },
          { text: "Migrations", link: "getting-started/migrations/index" },
          { text: "CRUD", link: "getting-started/crud/index" },
          { text: "Architecture", link: "getting-started/architecture" },
          { text: "Development", link: "getting-started/development/index" },
          { text: "What is next?", link: "getting-started/what-is-next/index" },
        ],
      },
      {
        text: "Upgrading",
        items: [{ text: "0.20.0", link: "upgrading/0.20.0" }],
      },
      {
        text: "Basics",
        items: [
          { text: "Initialization", link: "basics/init/index" },
          { text: "Models", link: "basics/models/index" },
          { text: "Handlers", link: "basics/handlers/index" },
          { text: "Configs", link: "basics/config/index" },
          { text: "Middlewares", link: "basics/middlewares/index" },
          { text: "Queries", link: "basics/queries/index" },
          { text: "Error Handling", link: "basics/errors/index" },
          { text: "Deployment", link: "basics/deployment" },
        ],
      },
      {
        text: "Advanced",
        items: [
          { text: "Hooks", link: "advanced/hooks/index" },
          { text: "IoC", link: "advanced/ioc/index" },
          { text: "Custom Routes", link: "advanced/custom-routes/index" },
          { text: "Documentation", link: "advanced/docs/index" },
        ],
      },
      {
        text: "Database",
        items: [
          { text: "Migrations", link: "database/migrations/index" },
          { text: "Transactions", link: "database/transactions/index" },
          { text: "DB Analyzer", link: "database/db-analyzer/index" },
        ],
      },
      {
        text: "Security",
        items: [
          { text: "Authentication", link: "security/authentication/index" },
          { text: "Rate Limiting", link: "security/rate-limiting/index" },
        ],
      },
      {
        text: "Testing",
        items: [{ text: "Concepts", link: "testing/index" }],
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/axe-api/axe-api" },
      { icon: "twitter", link: "https://twitter.com/axeapi" },
    ],

    footer: {
      message: "Released under the MIT License.",
      copyright: "Copyright © 2020-present",
    },
  },

  head: [
    ["link", { rel: "icon", href: `/logo.png` }],
    ["meta", { name: "theme-color", content: "#3eaf7c" }],
    ["meta", { name: "apple-mobile-web-app-capable", content: "yes" }],
    ["link", { rel: "stylesheet", href: "/styles.css" }],
    [
      "meta",
      { name: "apple-mobile-web-app-status-bar-style", content: "black" },
    ],
    [
      "link",
      { rel: "apple-touch-icon", href: `/icons/apple-touch-icon-152x152.png` },
    ],
    [
      "link",
      {
        rel: "mask-icon",
        href: "/icons/safari-pinned-tab.svg",
        color: "#3eaf7c",
      },
    ],
    [
      "meta",
      {
        name: "msapplication-TileImage",
        content: "/icons/msapplication-icon-144x144.png",
      },
    ],
    ["meta", { name: "msapplication-TileColor", content: "#000000" }],
    [
      "script",
      {
        async: true,
        src: "https://www.googletagmanager.com/gtag/js?id=G-1HBM031QWE",
      },
    ],
    [
      "script",
      {},
      `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-1HBM031QWE');
      `,
    ],
  ],
};
