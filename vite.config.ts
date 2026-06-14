import path from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  clearScreen: false,
  resolve: {
    alias: {
      "@app": path.resolve(__dirname, "src/app"),
      "@features": path.resolve(__dirname, "src/features"),
      "@assets": path.resolve(__dirname, "src/assets"),
      "@components": path.resolve(__dirname, "src/components"),
      "@lib": path.resolve(__dirname, "src/lib"),
      "@screens": path.resolve(__dirname, "src/screens"),
      "@services": path.resolve(__dirname, "src/services")
    }
  },
  server: {
    host: "127.0.0.1",
    port: 1420,
    strictPort: true
  }
});
