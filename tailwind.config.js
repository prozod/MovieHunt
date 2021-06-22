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
