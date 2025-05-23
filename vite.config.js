import path from "path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    include: ["./test/**/*.test.{js,ts,mjs,mts}"],
    coverage: {
      provider: "v8",
    },
  },
});
