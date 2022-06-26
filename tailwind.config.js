module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",

    // toaster
    'node_modules/tv-*/dist/tv-*.umd.min.js',
  ],
  important: true,
  theme: {
    extend: {},
  },

  plugins: [
    // require('@tailwindcss/forms'),
    require("@tailwindcss/forms")({
      strategy: 'base', // only generate global styles
    }),
  ],


}
