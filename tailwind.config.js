module.exports = {
  mode: "jit",
  purge: {
    enabled: true,
    content: ["./*.html", "./src/js/*.js"],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter"],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
