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
        slowb: {
          "0%, 100%": {
            transform: "translateY(-10%)",
            animationTimingFunction: "cubic-bezier(0.8, 0, 1, 1)",
          },
          "50%": {
            transform: "translateY(0)",
            animationTimingFunction: "cubic-bezier(0, 0, 0.2, 1)",
          },
        },
      },
      animation: {
        slowb: "slowb 600ms infinite",
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
