require('dotenv').config()

export default {
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: 'server',
  /*
   ** Environment Variables
   ** See https://nuxtjs.org/api/configuration-env/
   */
  env: {
    version: process.env.npm_package_version || '',
  },
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  head: {
    title: 'Home',
    titleTemplate: '%s - Ellaism Explorer',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  /*
   ** Global CSS
   */
  css: ['~/assets/scss/app.scss'],
  /*
   ** BootstrapVue
   ** See https://bootstrap-vue.org/docs#nuxtjs-module
   */
  bootstrapVue: {
    bootstrapCSS: false,
    bootstrapVueCSS: false,
  },
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: [],
  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: true,
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    // Doc: https://github.com/nuxt-community/analytics-module
    '@nuxtjs/google-analytics',
    // Doc: https://github.com/nuxt-community/moment-module
    '@nuxtjs/moment',
  ],
  /*
   ** ESLint
   */
  eslint: {
    fix: true,
  },
  /*
   ** Google Analytics
   */
  googleAnalytics: {
    id: null,
  },
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/
    '@nuxtjs/axios',
    // Doc: https://bootstrap-vue.js.org
    'bootstrap-vue/nuxt',
    // Doc: https://github.com/nuxt-community/proxy-module
    '@nuxtjs/proxy',
    // Doc: https://github.com/nuxt-community/i18n-module
    'nuxt-i18n',
  ],
  /*
   ** nuxt/axios
   ** See https://axios.nuxtjs.org/
   */
  axios: {
    proxy: true,
    // Used as fallback if no runtime config is provided
    baseURL: 'http://localhost:3000',
  },
  /*
   ** nuxt-i18n
   ** See https://nuxt-community.github.io/nuxt-i18n/options-reference.html
   ** See https://kazupon.github.io/vue-i18n/api/#constructor-options
   */
  i18n: {
    locales: [
      {
        code: 'en',
        file: 'en-US.js',
      },
    ],
    defaultLocale: 'en',
    strategy: 'no_prefix',
    lazy: true,
    langDir: 'lang/',
    vueI18n: {
      dateTimeFormats: {
        en: {
          short: {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
          },
          long: {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
          },
        },
      },
      numberFormats: {
        en: {
          marketCap: {
            style: 'currency',
            currency: 'USD',
          },
          currency: {
            style: 'currency',
            currency: 'USD',
          },
        },
      },
    },
  },
  /*
   ** Nuxt.js Proxy
   */
  proxy: {
    // Cinder API Instance
    '/api': {
      pathRewrite: { '^/api': '/v1' },
      target: process.env.EXPLORER_API_URL || 'https://api.ellaism.io',
    },
  },
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {},
  /*
   ** Runtime Config
   ** See https://nuxtjs.org/guide/runtime-config#runtime-config-213
   */
  publicRuntimeConfig: {
    axios: {
      browserBaseURL: process.env.BROWSER_BASE_URL,
    },
  },
  privateRuntimeConfig: {
    axios: {
      baseURL: process.env.BASE_URL,
    },
  },
}
