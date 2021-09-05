module.exports = {
  title: "Axe API",
  description:
    "The fastest way to create Rest API, by defining database models and relations.",
  theme: "thindark",

  themeConfig: {
    nav: [
      { text: "Github", link: "https://github.com/axe-api/axe-api" },
      { text: "CLI", link: "https://github.com/axe-api/axe-magic" },
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
      "/",
      {
        title: "Getting Started",
        collapsable: true,
        children: [
          "getting-started/introduction/",
          "getting-started/installation/",
          "getting-started/migrations/",
          "getting-started/crud/",
          "getting-started/what-is-next/",
        ],
      },
      {
        title: "Architecture",
        collapsable: true,
        children: [
          "architecture-concepts/analyzing/",
          "architecture-concepts/handling/",
        ],
      },
      {
        title: "Basics",
        collapsable: true,
        children: [
          "basics/models/",
          "basics/config/",
          "basics/middlewares/",
          "basics/queries/",
        ],
      },
      {
        title: "Advanced",
        collapsable: true,
        children: ["advanced/hooks/", "advanced/ioc/"],
      },
      {
        title: "Security",
        collapsable: true,
        children: ["security/authentication/", "security/rate-limiting/"],
      },
      {
        title: "Database",
        collapsable: true,
        children: [
          "database/migrations/",
          "database/transactions/",
          "database/db-analyzer/",
        ],
      },
      // "introduction/",
      // "getting-started/",
      // "config/",
      // "migrations/",
      "routes/",
      // "models/",
      // "queries/",
      // "middlewares/",
      // "authentication/",
      // "hooks/",
      // "ioc/",
      // "db-analyzer/",
      // "transactions/",
      "testing/",
    ],
  },

  head: [
    ["link", { rel: "icon", href: `/logo.png` }],
    ["link", { rel: "manifest", href: "/manifest.json" }],
    ["meta", { name: "theme-color", content: "#3eaf7c" }],
    ["meta", { name: "apple-mobile-web-app-capable", content: "yes" }],
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
  ],

  markdown: {
    extendMarkdown: (md) => {
      md.use(require("markdown-it-task-lists"));
    },
  },

  serviceWorker: true,
};
