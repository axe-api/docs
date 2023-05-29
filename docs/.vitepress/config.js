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
        text: "How DB Analyzer works?",
        link: "/learn/db-analyzer",
      },
    ],
  },
  {
    text: "Application Logic",
    collapsed: true,
    items: [
      { text: "Getting started", link: "/learn/application-logic" },
      { text: "Request-Response cycle", link: "/learn/request-response-cycle" },
      { text: "Middlewares", link: "/learn/middlewares" },
      { text: "Hooks & Events", link: "/learn/hooks-and-events" },
      { text: "Serializers", link: "/learn/serializers" },
    ],
  },
  {
    text: "Advanced",
    collapsed: true,
    items: [
      { text: "Configurations", link: "/learn/configurations" },
      { text: "Internationalization", link: "/learn/i18n" },
      { text: "Error handling", link: "/learn/error-handling" },
      {
        text: "Database transactions",
        link: "/learn/database-transactions",
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
  {
    text: "Contribution",
    collapsed: true,
    items: [
      { text: "Preparation", link: "/learn/contribution" },
      { text: "Development Kit", link: "/learn/development-kit" },
      { text: "Databases", link: "/learn/dev-kit-databases" },
      { text: "Tests", link: "/learn/contribution-tests" },
    ],
  },
];

const sidebarReference = [
  {
    text: "Configs",
    collapsed: false,
    items: [
      { text: "API configs", link: "/reference/api-configs" },
      { text: "Database configs", link: "/reference/database-configs" },
      { text: "Version configs", link: "/reference/version-configs" },
    ],
  },
  {
    text: "Initialization",
    collapsed: true,
    items: [
      { text: "onBeforeInit()", link: "/reference/on-before-init" },
      { text: "onAfterInit()", link: "/reference/on-after-init" },
    ],
  },
  {
    text: "Models",
    collapsed: true,
    items: [
      { text: "table()", link: "/reference/model-table" },
      { text: "primaryKey()", link: "/reference/model-primary-key" },
      { text: "fillable()", link: "/reference/model-fillable" },
      { text: "validations()", link: "/reference/model-validations" },
      { text: "hiddens()", link: "/reference/model-hiddens" },
      { text: "createdAtColumn()", link: "/reference/model-created-at-column" },
      { text: "updatedAtColumn()", link: "/reference/model-updated-at-column" },
      { text: "deletedAtColumn()", link: "/reference/model-deleted-at-column" },
      { text: "handlers()", link: "/reference/model-handlers" },
      { text: "middlewares()", link: "/reference/model-middlewares" },
      { text: "limits()", link: "/reference/model-limits" },
      { text: "ignore()", link: "/reference/model-ignore" },
    ],
  },
  {
    text: "Handlers",
    collapsed: true,
    items: [
      { text: "Defaults", link: "/reference/default-handlers" },
      { text: "INSERT", link: "/reference/handlers-insert-handler" },
      { text: "PAGINATE", link: "/reference/handlers-paginate-handler" },
      { text: "SHOW", link: "/reference/handlers-show-handler" },
      { text: "UPDATE", link: "/reference/handlers-update-handler" },
      { text: "DELETE", link: "/reference/handlers-delete-handler" },
      {
        text: "FORCE_DELETE",
        link: "/reference/handlers-force-delete-handler",
      },
      { text: "PATCH", link: "/reference/handlers-patch-handler" },
      { text: "ALL", link: "/reference/handlers-all-handler" },
    ],
  },
  {
    text: "Queries",
    collapsed: true,
    items: [
      { text: "fields", link: "/reference/queries-fields" },
      { text: "sort", link: "/reference/queries-sort" },
      { text: "page", link: "/reference/queries-page" },
      { text: "per_page", link: "/reference/queries-per-page" },
      { text: "trashed", link: "/reference/queries-trashed" },
      { text: "q", link: "/reference/queries-q" },
      { text: "with", link: "/reference/queries-with" },
    ],
  },
  {
    text: "Hooks & Events",
    collapsed: true,
    items: [
      {
        text: "onBeforeInsert()",
        link: "/reference/hooks-events-on-before-insert",
      },
      {
        text: "onBeforeUpdateQuery()",
        link: "/reference/hooks-events-on-before-update-query",
      },
      {
        text: "onBeforeUpdate()",
        link: "/reference/hooks-events-on-before-update",
      },
      {
        text: "onBeforeDeleteQuery()",
        link: "/reference/hooks-events-on-before-delete-query",
      },
      {
        text: "onBeforeDelete()",
        link: "/reference/hooks-events-on-before-delete",
      },
      {
        text: "onBeforeForceDeleteQuery()",
        link: "/reference/hooks-events-on-before-force-delete-query",
      },
      {
        text: "onBeforeForceDelete()",
        link: "/reference/hooks-events-on-before-force-delete",
      },
      {
        text: "onBeforePaginate()",
        link: "/reference/hooks-events-on-before-paginate",
      },
      { text: "onBeforeAll()", link: "/reference/hooks-events-on-before-all" },
      {
        text: "onBeforeShow()",
        link: "/reference/hooks-events-on-before-show",
      },
      {
        text: "onAfterInsert()",
        link: "/reference/hooks-events-on-after-insert",
      },
      {
        text: "onAfterUpdateQuery()",
        link: "/reference/hooks-events-on-after-update-query",
      },
      {
        text: "onAfterUpdate()",
        link: "/reference/hooks-events-on-after-update",
      },
      {
        text: "onAfterDeleteQuery()",
        link: "/reference/hooks-events-on-after-delete-query",
      },
      {
        text: "onAfterDelete()",
        link: "/reference/hooks-events-on-after-delete",
      },
      {
        text: "onAfterForceDeleteQuery()",
        link: "/reference/hooks-events-on-after-force-delete-query",
      },
      {
        text: "onAfterForceDelete()",
        link: "/reference/hooks-events-on-after-force-delete",
      },
      {
        text: "onAfterPaginate()",
        link: "/reference/hooks-events-on-after-paginate",
      },
      { text: "onAfterAll()", link: "/reference/hooks-events-on-after-all" },
      { text: "onAfterShow()", link: "/reference/hooks-events-on-after-show" },
    ],
  },
  {
    text: "Hooks & Event Parameters",
    collapsed: true,
    items: [
      { text: "request", link: "/reference/hooks-event-parameters-request" },
      { text: "response", link: "/reference/hooks-event-parameters-response" },
      { text: "model", link: "/reference/hooks-event-parameters-model" },
      { text: "database", link: "/reference/hooks-event-parameters-database" },
      { text: "relation", link: "/reference/hooks-event-parameters-relation" },
      {
        text: "parentModel",
        link: "/reference/hooks-event-parameters-parentModel",
      },
      { text: "query", link: "/reference/hooks-event-parameters-query" },
      {
        text: "conditions",
        link: "/reference/hooks-event-parameters-conditions",
      },
      { text: "item", link: "/reference/hooks-event-parameters-item" },
      { text: "result", link: "/reference/hooks-event-parameters-result" },
      { text: "formData", link: "/reference/hooks-event-parameters-formData" },
    ],
  },
  {
    text: "System",
    collapsed: true,
    items: [
      { text: "IoC", link: "/reference/ioc" },
      { text: "Error Codes", link: "/reference/error-codes" },
      { text: "ApiError", link: "/reference/api-error" },
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
      { text: "Queries", link: "/basics/queries" },
    ],
  },
  {
    text: "Advanced",
    items: [
      { text: "Hooks", link: "/advanced/hooks" },
      { text: "IoC", link: "/advanced/ioc" },
      { text: "System Errors", link: "/errors" },
    ],
  },
  {
    text: "Database",
    items: [{ text: "Migrations", link: "/database/migrations" }],
  },
  {
    text: "Testing",
    items: [{ text: "Concepts", link: "/testing" }],
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
      {
        text: "Learn",
        link: "/learn/quick-start",
      },
      {
        text: "API Reference",
        link: "/reference/intro",
      },
      {
        text: "Upgrading",
        items: [
          { text: "0.20.0", link: "/upgrading/0.20.0" },
          { text: "0.30.0", link: "/upgrading/0.30.0" },
        ],
      },
      {
        text: "Ecosystem",
        items: [
          {
            text: "Releases",
            link: "https://github.com/axe-api/axe-api/releases",
          },
          {
            text: "Changelog",
            link: "https://github.com/axe-api/axe-api/blob/master/CHANGELOG.md",
          },
          { text: "CLI", link: "https://github.com/axe-api/axe-magic" },
          {
            text: "SonarCloud",
            link: "https://sonarcloud.io/dashboard?id=axe-api_axe-api",
          },
        ],
      },
      { text: "GitHub", link: "https://github.com/axe-api/axe-api" },
    ],

    sidebar: {
      "/learn/": sidebarGuide(),
      "/reference/": sidebarReference,
      "/upgrading/": sidebarGuide(),
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
