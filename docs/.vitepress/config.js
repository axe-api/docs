const sidebarGuide = () => [
  {
    text: "Getting Started",
    collapsed: false,
    items: [
      {
        text: "Quick start",
        link: "/learn/quick-start",
      },
      { text: "Tutorial: Bookstore API", link: "/learn/bookstore-api" },
    ],
  },
  {
    text: "Fundamentals",
    collapsed: true,
    items: [
      { text: "What does a Model mean?", link: "/learn/models" },
      { text: "Understanding the routing", link: "/learn/routing" },
      { text: "Version management", link: "/learn/version-management" },
      { text: "Validate your data", link: "/learn/validations" },
    ],
  },
  {
    text: "Gains",
    collapsed: true,
    items: [
      { text: "Auto-created documentation", link: "/learn/documentation" },
      { text: "Querying data", link: "/learn/querying-data" },
      { text: "Related data queries", link: "/learn/related-data-queries" },
      {
        text: "Query with JS client",
        link: "/learn/axe-api-client",
      },
      {
        text: "Understanding the DB Analyzer",
        link: "/learn/db-analyzer",
      },
    ],
  },
  {
    text: "Advanced",
    collapsed: true,
    items: [
      { text: "Configurations", link: "/learn/configurations" },
      { text: "i18n", link: "/learn/i18n" },
      { text: "Error handling", link: "/learn/error-handling" },
      {
        text: "Custom routes",
        link: "/learn/custom-routes",
      },
      {
        text: "Hooks",
        link: "/learn/hooks",
      },
      {
        text: "Securing your API",
        link: "/learn/security",
      },
      {
        text: "Database transactions",
        link: "/learn/database-transactions",
      },
      {
        text: "Multiple database support",
        link: "/learn/multiple-database-supports",
      },
    ],
  },
  {
    text: "How to?",
    collapsed: true,
    items: [
      { text: "File uploading", link: "/learn/file-uploading" },
      { text: "Authentication", link: "/learn/authentication" },
      { text: "Rate limiting", link: "/learn/rate-limiting" },
      {
        text: "Deployment",
        link: "/learn/deployment",
      },
    ],
  },
];

const sidebarReference = [
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
];

export default {
  title: "Axe API",
  description:
    "The fastest way to create Rest API, by defining database models and relations.",

  lang: "en-US",

  lastUpdated: true,

  themeConfig: {
    logo: "/axe.png",

    nav: [
      { text: "GitHub", link: "https://github.com/axe-api/axe-api" },
      {
        text: "Changelog",
        link: "https://github.com/axe-api/axe-api/blob/master/CHANGELOG.md",
      },
      {
        text: "Cookbooks",
        link: "/cookbooks/",
      },
      {
        text: "SonarCloud",
        link: "https://sonarcloud.io/dashboard?id=axe-api_axe-api",
      },
      {
        text: "Releases",
        link: "https://github.com/axe-api/axe-api/releases",
      },
      { text: "CLI", link: "https://github.com/axe-api/axe-magic" },
    ],

    sidebar: {
      "/learn/": sidebarGuide(),
      "/reference/": sidebarReference,
    },

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
    // [
    //   "script",
    //   {},
    //   `
    //   (function(w,d,e,u,f,l,n){w[f]=w[f]||function(){(w[f].q=w[f].q||[])
    // .push(arguments);},l=d.createElement(e),l.async=1,l.src=u,
    // n=d.getElementsByTagName(e)[0],n.parentNode.insertBefore(l,n);})
    // (window,document,'script','https://assets.mailerlite.com/js/universal.js','ml');
    // ml('account', '418678');
    //   `,
    // ],
  ],
};
