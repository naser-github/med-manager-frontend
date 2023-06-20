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
  ],

  // customize progress bar
  loading: {
    color: '#f85604', height: '2px', duration: 5000
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    // importing chart js
    {src: '~/plugins/chart.js', mode: 'client'},

    // store vuex data in browser local storage
    {src: '~/plugins/persistedState.client.js'},

    // theme
    {src: '~/plugins/theme/app.client.js'}
  ],


  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxt/postcss8',

    '@nuxtjs/fontawesome', // fontawesome

    ['@nuxtjs/vuetify'] // vuetify
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
    '@nuxtjs/axios', // axios

    ['nuxt-tailvue', {toast: true}] // toaster [ link - https://github.com/acidjazz/nuxt-tailvue ]
  ],

  axios: {
    // baseURL: 'http://med-man.dev/api' // localhost
    baseURL: 'http://localhost:9000/api' // localhost
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
    linkActiveClass: 'top-menu--active'
  },

  // creates public server
  // server: {
  //   host: '0' // default: localhost
  // }

}
