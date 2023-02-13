/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{html,js,svelte,ts}"],
  future: {
    hoverOnlyWhenSupported: true,
  },
  theme: {
    extend: {},
  },
  safelist: ["fill-error", "fill-success", "fill-info", "fill-base-content"],
  plugins: [require("daisyui")],
  daisyui: {
    styled: true,
    themes: [
      "light",
      "dark",
      "cupcake",
      "synthwave",
      "retro",
      "cyberpunk",
      "valentine",
      "lofi",
      "pastel",
      "fantasy",
      "wireframe",
      "luxury",
      "dracula",
    ],

    base: true,
    utils: true,
    logs: true,
  },
};
