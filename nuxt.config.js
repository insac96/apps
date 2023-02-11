import path from 'path'

export default {
  ssr: false,

  telemetry: false,

  components: true,

  srcDir: '_client/',

  head: {
    title: 'Apps',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: '//fonts.googleapis.com/css?family=Quicksand:300,400,500,600,700' },
      { rel: 'stylesheet', href: '//cdn.jsdelivr.net/npm/boxicons@2.0.9/css/boxicons.min.css' }
    ]
  },

  css: [
    '~/assets/style.sass'
  ],

  plugins: [
    { src: '~/plugins/axios.js' },
    { src: '~/plugins/day.js' },
  ],

  router: {
    middleware: 'auth'
  },

  buildModules: [
  ],

  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
  ],

  axios: {
    baseURL: '/api',
    progress: false
  },

  pwa: {
    manifest: {
      name: 'Skype',
      short_name: 'Skype',
      description: 'Skype App Clone',
      lang: 'vi'
    }
  },

  build: {
  },

  serverMiddleware: [
    { path: '/api', handler: path.join(__dirname, './_server/index.js') }
  ],

  watchers: {
    webpack: {
      ignored: [
        'node_modules'
      ]
    },
    chokidar: {
      ignored: [
        'node_modules'
      ]
    }
  }
}
