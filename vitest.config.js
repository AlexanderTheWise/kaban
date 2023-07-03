/// <reference types="vitest" />
import { defineConfig } from "vite"

export default defineConfig({
  test: {
    globals: true,
    coverage: {
      provider: "v8",
      reporter: ["text", "lcov"],
    },
    environment: "jsdom",
    setupFiles: "src/setupTests.ts",
  },
})
