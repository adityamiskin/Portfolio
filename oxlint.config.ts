import { defineConfig } from "oxlint";

export default defineConfig({
  plugins: ["react", "typescript", "import"],
  env: {
    browser: true,
    node: true,
  },
  ignorePatterns: [
    ".git/**",
    ".tanstack/**",
    "dist/**",
    "node_modules/**",
    "public/**",
    "src/routeTree.gen.ts",
  ],
  rules: {
    "react/jsx-key": "error",
    "react/no-direct-mutation-state": "error",
  },
});
