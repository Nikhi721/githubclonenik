import { defineConfig } from "vite";

export default defineConfig({
  build: {
    chunkSizeWarningLimit: 1000, // Increase limit to 1000 kB
  },
});
