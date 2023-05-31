/**
 * @type {import('@types/tailwindcss/tailwind-config').TailwindConfig}
 */
module.exports = {
  content: [
    "./node_modules/flowbite-react/**/*.js",
    "./pages/**/*.{ts,tsx}",
    "./public/**/*.html",
    "./node_modules/tailwind-datepicker-react/dist/**/*.js",
  ],
  plugins: [require("@tailwindcss/typography"), require("flowbite/plugin")],
  theme: {},
};
