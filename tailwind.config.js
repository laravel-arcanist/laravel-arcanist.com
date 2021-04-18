module.exports = {
  important: true,

  theme: {
    fontFamily: {
      serif: ["Noto serif", "serif"],
      sans: ["IBM Plex Sans", "ui-sans-serif", "system-ui", "sans-serif"],
      mono: ["IBM Plex Mono", "monospace"],
    },

    extend: {},
  },

  plugins: [require("@tailwindcss/typography")],
};
