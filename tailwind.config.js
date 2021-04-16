module.exports = {
  important: true,

  theme: {
    fontFamily: {
      sans: ["IBM Plex Sans", "ui-sans-serif", "system-ui", "sans-serif"],
      mono: ["IBM Plex Mono", "monospace"],
    },

    extend: {
      typography: {
        DEFAULT: {
          css: {
            pre: null,
            code: null,
            "code::before": null,
            "code::after": null,
            "pre code": null,
            "pre code::before": null,
            "pre code::after": null,
          },
        },
      },
    },
  },

  plugins: [require("@tailwindcss/typography")],
};
