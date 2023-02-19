/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{html,js,svelte,ts}"],
  future: {
    hoverOnlyWhenSupported: true,
  },
  theme: {
    extend: {
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "rotate(-15deg)" },
          "50%": { transform: "rotate(15deg)" },
        },
      },
      animation: {
        wiggle: "wiggle 1s ease-in-out infinite",
      },
    },
  },
  safelist: [
    "fill-error",
    "fill-success",
    "fill-info",
    "fill-base-content",
    "fill-primary",
    "fill-secondary",
    "fill-accent",
  ],
  plugins: [require("daisyui")],
  daisyui: {
    styled: true,
    themes: ["light", "dark", "synthwave", "fantasy", "dracula"],

    base: true,
    utils: true,
    logs: true,
  },
};
