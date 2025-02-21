import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  env: {
    VITE_NODE_ENV: "development",
  },
  build: {
    outDir: "dist", // Ensure this matches the directory you expect
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return "vendor";
          }
        },
      },
    },
  },
});
