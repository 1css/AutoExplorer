import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  env: {
    VITE_NODE_ENV: "development",
  },
  build: {
    outDir: "build",
  },
});
