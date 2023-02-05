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
      {
        text: "Changelog",
        link: "https://github.com/axe-api/axe-api/blob/master/CHANGELOG.md",
      },
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
      { text: "CLI", link: "https://github.com/axe-api/axe-magic" },
    ],
    sidebar: [
      {
        text: "Getting Started",
        items: [
          {
            text: "What is Axe API?",
            link: "/getting-started/what-is-axe-api",
          },
          { text: "Installation", link: "/getting-started/installation" },
          { text: "Migrations", link: "/getting-started/migrations" },
          { text: "CRUD", link: "/getting-started/crud" },
          { text: "Architecture", link: "/getting-started/architecture" },
          {
            text: "What is next?",
            link: "/getting-started/what-is-next",
          },
        ],
      },
      {
        text: "Upgrading",
        items: [
          { text: "0.20.0", link: "/upgrading/0.20.0" },
          { text: "0.30.0", link: "/upgrading/0.30.0" },
        ],
      },
      {
        text: "Basics",
        items: [
          { text: "Versions", link: "/basics/versions" },
          { text: "Configs", link: "/basics/config" },
          { text: "Initialization", link: "/basics/init" },
          { text: "Models", link: "/basics/models" },
          { text: "Handlers", link: "/basics/handlers" },
          { text: "Middlewares", link: "/basics/middlewares" },
          { text: "Queries", link: "/basics/queries" },
          { text: "Serialization", link: "/basics/serialization" },
          { text: "Error Handling", link: "/basics/errors" },
          { text: "Deployment", link: "/basics/deployment" },
        ],
      },
      {
        text: "Advanced",
        items: [
          { text: "Hooks", link: "/advanced/hooks" },
          { text: "Internationalization", link: "/advanced/i18n" },
          { text: "IoC", link: "/advanced/ioc" },
          { text: "Custom Routes", link: "/advanced/custom-routes" },
          { text: "System Errors", link: "/errors" },
          { text: "Documentation", link: "/advanced/docs" },
        ],
      },
      {
        text: "Database",
        items: [
          { text: "Migrations", link: "/database/migrations" },
          { text: "Transactions", link: "/database/transactions" },
          { text: "DB Analyzer", link: "/database/db-analyzer" },
        ],
      },
      {
        text: "Security",
        items: [
          { text: "Authentication", link: "/security/authentication" },
          { text: "Rate Limiting", link: "/security/rate-limiting" },
        ],
      },
      {
        text: "Testing",
        items: [{ text: "Concepts", link: "/testing" }],
      },
      {
        text: "Contribution",
        items: [
          { text: "Fundamentals", link: "/contribution/fundamentals" },
          { text: "Development Kit", link: "/contribution/development-kit" },
          { text: "Databases", link: "/contribution/databases" },
          { text: "Tests", link: "/contribution/tests" },
        ],
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
