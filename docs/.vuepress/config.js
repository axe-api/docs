module.exports = {
  title: 'AdonisX',
  description: 'Fastest way to create simple Rest API by defining database models and their relations.',

  themeConfig: {
    nav: [
      { text: 'Github', link: 'https://github.com/adonisx/adonisx' },
      { text: 'CLI', link: 'https://github.com/adonisx/adonisx-cli' },
      { text: 'Sonarcloud', link: 'https://sonarcloud.io/dashboard?id=ozziest_apix' }
    ],
    sidebar: [
      '/',
      '01-introduction/',
      '02-getting-started/',
      '03-models/',
      '04-queries/',
      '05-extensions/'
    ]
  },

  head: [
    ['link', { rel: 'icon', href: `/logo.png` }],
    ['link', { rel: 'manifest', href: '/manifest.json' }],
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
    ['link', { rel: 'apple-touch-icon', href: `/icons/apple-touch-icon-152x152.png` }],
    ['link', { rel: 'mask-icon', href: '/icons/safari-pinned-tab.svg', color: '#3eaf7c' }],
    ['meta', { name: 'msapplication-TileImage', content: '/icons/msapplication-icon-144x144.png' }],
    ['meta', { name: 'msapplication-TileColor', content: '#000000' }]
  ],

  markdown: {
    extendMarkdown: md => {
      md.use(require('markdown-it-task-lists'))
    }
  },

  serviceWorker: true
}