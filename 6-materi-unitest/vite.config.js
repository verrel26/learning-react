import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    // Digunaakan untuk menjalankan unit test dengan menggunakan Vitest
    environment: "jsdom",
    // Digunaakan untuk menjalankan file setupTests.js sebelum menjalankan unit test
    setupFiles: "./src/tests/setupTests.js",
  },
});
