const { urlencoded } = require("express");

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
        inter: ["Roboto", "sans-serif"],
      },
      backgroundImage: (theme) => ({
        "hero-pattern":
          "url('https://images.unsplash.com/photo-1585951237313-1979e4df7385?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80')",
      }),
    },
  },
  variants: {
    extend: {
      textColor: [
        "responsive",
        "hover",
        "focus",
        "before",
        "after",
        "hover::before",
        "hover::after",
        "focus::before",
        "checked:hover",
        "checked:hover::before",
      ],
    },
  },
  plugins: [
    require("tailwindcss-pseudo-elements")({
      customPseudoClasses: ["foo"],
      customPseudoElements: ["bar"],
      contentUtilities: false,
      emptyContent: false,
      classNameReplacer: {
        "hover:before:text-black": "hbt",
      },
    }),
    require("@tailwindcss/line-clamp"),
  ],
};
