import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const base = env.VITE_BASE_URL || "/";

  return {
    plugins: [react()],
    root: resolve(__dirname, "src"),
    base,
    build: {
      outDir: resolve(__dirname, "dist"),
      rollupOptions: {
        input: {
          cart: resolve(__dirname, "src/cart/index.html"),
          fetch: resolve(__dirname, "src/fetch/index.html"),
          page1: resolve(__dirname, "src/fetch/page1.html"),
          page2: resolve(__dirname, "src/fetch/page2.html"),
          page3: resolve(__dirname, "src/fetch/page3.html"),
          popoverCommand: resolve(__dirname, "src/popover-command/index.html"),
          popoverInterest: resolve(__dirname, "src/popover-interest/index.html"),
        },
      },
    },
  };
});
