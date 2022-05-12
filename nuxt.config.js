export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "User manager",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [
      {
        rel: "icon",
        type: "image/x-icon",
        href: "https://www.idsolutions.com.vn/wp-content/uploads/2019/10/ids-official-favicon-1-1.png",
      },
    ],
  },

  css: ["~/node_modules/bootstrap/dist/css/bootstrap.min.css"],
  plugins: [
    {
      src: "~/node_modules/bootstrap/dist/js/bootstrap.bundle.min.js",
      mode: "client",
    },
  ],

  buildModules: ["@nuxt/typescript-build"],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    "@nuxt/typescript-build",
    "@nuxtjs/vuetify",
    // https://go.nuxtjs.dev/tailwindcss
    // '@nuxtjs/tailwindcss',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [],

  vuetify: {
    optionsPath: "./vuetify.option.js",
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
};
