import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "node:url";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  build: {
    target: "esnext",
    sourcemap: false,
  },
  server: {
    port: 5173,
    open: true,
    proxy: {
      "/api": {
        target: process.env.VITE_LARAVEL_URL ?? "https://anc-backend-production-89ca.up.railway.app",
        changeOrigin: true,
      },
      "/storage": {
        target: process.env.VITE_LARAVEL_URL ?? "https://anc-backend-production-89ca.up.railway.app",
        changeOrigin: true,
      },
    },
  },
});
