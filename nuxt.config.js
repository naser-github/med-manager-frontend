export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'med-manager',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      {
        charset: 'utf-8'
      }, {
        name: 'viewport', content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: ''
      },
      {
        name: 'format-detection', content: 'telephone=no'
      }
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}
    ],
    script: []
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/css/main.css'
    // '@/assets/css/app.css'
  ],

  // customize progress bar
  loading: {
    color: '#f85604', height: '2px', duration: 5000
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    {src: '~/plugins/persistedState.client.js'},

    // theme
    {src: '~/plugins/theme/app.client.js'},
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxt/postcss8',

    // fontawesome
    '@nuxtjs/fontawesome'
  ],

  fontawesome: {
    component: 'fa',
    icons: {
      solid: true,
      brands: true
    }
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // axios
    '@nuxtjs/axios',

    // toast
    ['nuxt-tailvue', {
      all: true,
      toast:
        {
          defaults: {
            containerClasses: []
          }
        }
    }]
  ],

  axios: {
    baseURL: 'http://med-man.dev/api/' // localhost
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    postcss: {
      plugins: {
        tailwindcss: {}, autoprefixer: {}
      }
    }
  },

  // routing config
  router: {
    linkActiveClass: 'active'
  },

  // // creates public server
  // server: {
  //   host: '0' // default: localhost
  // }

}
