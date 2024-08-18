import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          "react-vendor": ["react", "react-dom"],
          "firebase-vendor": ["firebase/app", "firebase/auth"],
          // Add other vendors or large modules you want to split
        },
      },
      // chunkSizeWarningLimit: 500, // Adjust the chunk size warning limit if needed
    },
  },
});
