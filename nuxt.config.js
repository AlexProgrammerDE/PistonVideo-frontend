const secrets = require('./secrets.json');

export default {
  target: 'server',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'PistonVideo',
    meta: [{ name: 'format-detection', content: 'telephone=no' }],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['video.js/dist/video-js.css'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    '@nuxtjs/google-fonts',
    '@nuxtjs/fontawesome',
    '@nuxtjs/color-mode',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    // https://go.nuxtjs.dev/content
    '@nuxt/content',
    'nuxt-helmet',
    '@nuxtjs/auth-next',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    proxy: true,
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    meta: {
      ogHost: 'https://pistonvideo.com/',
      twitterCreator: '@AlexProgrammer3',
      theme_color: '#1F2937',
      description: 'Awesome open source video upload platform!',
    },
    manifest: {
      lang: 'en',
    },
  },

  // Content module configuration: https://go.nuxtjs.dev/config-content
  content: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  googleFonts: {
    download: true,
    base64: true,
  },

  fontawesome: {
    icons: {
      solid: true,
      brands: true,
    },
  },

  tailwindcss: {
    // add '~tailwind.config` alias
    exposeConfig: true,
  },

  colorMode: {
    classSuffix: '',
  },

  proxy: {
    '/api': 'http://localhost:3434',
    '/static': 'http://localhost:3434',
  },

  loading: {
    color: 'blue',
    height: '5px',
  },

  auth: {
    redirect: {
      login: '/login',
      home: '/',
    },
    strategies: {
      local: {
        token: {
          property: 'token',
          global: true,
          required: true,
          type: '',
        },
        user: {
          property: 'user',
          autoFetch: true,
        },
        endpoints: {
          login: { url: '/api/auth/login', method: 'post' },
          logout: { url: '/api/auth/logout', method: 'post' },
          user: { url: '/api/auth/user', method: 'get' },
        },
      },
      github: {
        clientId: secrets.github.clientId,
        clientSecret: secrets.github.clientSecret,
      },
      facebook: {
        endpoints: {
          userInfo: 'https://graph.facebook.com/v6.0/me?fields=id,name,picture{url}',
        },
        clientId: secrets.facebook.clientId,
        scope: ['public_profile', 'email'],
      },
      google: {
        clientId: secrets.google.clientId,
      },
      discord: {
        clientId: secrets.discord.clientId,
        clientSecret: secrets.discord.clientSecret,
      },
    },
  },

  router: {
    middleware: ['auth'],
  },
};
