/** @type {import("prettier").Config} */
const config = {
  trailingComma: "none",
  tabWidth: 4,
  arrowParens: "avoid",
  overrides: [
    {
      files: [
        "**/*config*/*.js",
        "*config*.ts",
        "*config*.js",
        "*.json",
        "*env*.js"
      ],
      options: {
        tabWidth: 2
      }
    }
  ],
  plugins: ["prettier-plugin-tailwindcss", "prettier-plugin-packagejson"]
};

export default config;
