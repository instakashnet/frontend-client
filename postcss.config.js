const tailwindcss = require("tailwindcss");

module.exports = {
  purge: ["./src/**/*.html", "./src/**/*.js"],
  plugins: [tailwindcss("./tailwind.config.js"), require("autoprefixer")],
};
