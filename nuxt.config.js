export default {
  target: "static",

  head: {
    title: "Laravel Arcanist",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content:
          "Arcanist is a Laravel package that takes away the pain of creating multi-step wizards in your applications.",
      },
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      { rel: "preconnect", href: "https://fonts.gstatic.com" },
      {
        rel: "stylesheet",
        href:
          "https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@300;400;500;600&display=swap",
      },
      {
        rel: "stylesheet",
        href:
          "https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@300;400&display=swap",
      },
    ],
  },

  components: true,

  buildModules: ["@nuxtjs/tailwindcss"],

  modules: ["@nuxt/content"],

  content: {
    liveEdit: false,
    markdown: {
      prism: {
        theme: "prism-themes/themes/prism-base16-ateliersulphurpool.light.css",
      },
    },
  },
};
