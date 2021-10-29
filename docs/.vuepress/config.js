module.exports = {
  title: 'Textury Docs',
  description: 'The act of permanence, building for the permaweb.',
  themeConfig: {
    sidebarDepth: 2,
    logo: '/img/textury.svg',
    repo: 'textury/docs',
    editLinks: true, 
    editLinkText: "Edit this page on GitHub",
    docsBranch: 'main',
    docsDir: "docs",
    head: [
      [
        'link',
        {
          rel: 'icon',
          type: 'image/svg+xml',
          href: '/img/textury.svg'
        }
      ]
    ],
    nav: [
      {
        text: 'Overview',
        link: '/'
      },
      {
        text: 'Blockweave',
        link: '/blockweave'
      },
      {
        text: 'Arkb',
        link: '/arkb'
      },
      {
        text: 'Ardb',
        link: '/ardb'
      },
      {
        text: 'Arlocal',
        link: '/arlocal'
      },
    ]
  },
};
