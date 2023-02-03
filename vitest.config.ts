import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { sveltekit } from "@sveltejs/kit/vite";

export default defineConfig({
  plugins: [svelte({ hot: !process.env.VITEST }), sveltekit()],
  test: {
    globals: true,
    environment: "jsdom",
  },
});
