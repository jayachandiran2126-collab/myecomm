import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  base: "/myecomm/",   // ✅ repo name EXACT

  plugins: [react()],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  server: {
    host: true,
    port: 8080,
  },

  build: {
    outDir: "dist",
    assetsDir: "assets",
    sourcemap: false,
  },
});
