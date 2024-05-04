/** @type {import("prettier").Config} */
const config = {
  trailingComma: "none",
  tabWidth: 4,
  arrowParens: "avoid",
  overrides: [
    {
      files: [
        "**/*config*/*.js",
        "*.json",
        "*.eslintrc.*",
        "*.config.*",
        "*env*.js"
      ],
      options: {
        tabWidth: 2
      }
    }
  ],
  plugins: ["prettier-plugin-tailwindcss"]
};

export default config;
