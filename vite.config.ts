import { cloudflare } from "@cloudflare/vite-plugin";
import contentCollections from "@content-collections/vite";
import { compile } from "@mdx-js/mdx";
import babel from "@rolldown/plugin-babel";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import tailwindcss from "@tailwindcss/vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import { defineConfig } from "vite-plus";
import { resolve } from "node:path";
import remarkFrontmatter from "remark-frontmatter";

function portfolioMdx() {
  return {
    name: "portfolio-mdx",
    enforce: "pre" as const,
    async transform(source: string, id: string) {
      const filePath = id.split("?")[0];
      if (!filePath.endsWith(".mdx")) return;

      const compiled = await compile(
        { value: source, path: filePath },
        { remarkPlugins: [remarkFrontmatter] },
      );

      return {
        code: String(compiled.value),
        map: compiled.map,
      };
    },
  };
}

export default defineConfig({
  resolve: {
    alias: {
      "@": resolve(import.meta.dirname, "src"),
      "content-collections": resolve(import.meta.dirname, ".content-collections/generated"),
    },
  },
  server: {
    port: 3000,
  },
  plugins: [
    portfolioMdx(),
    contentCollections({
      isEnabled: (config) => config.mode !== "test",
    }),
    ...(process.env.VITEST ? [] : [cloudflare({ viteEnvironment: { name: "ssr" } })]),
    tanstackStart({
      prerender: {
        enabled: true,
        autoStaticPathsDiscovery: true,
        crawlLinks: true,
        failOnError: true,
        filter: ({ path }) => path !== "/photos",
      },
    }),
    react({
      include: /\.(js|jsx|ts|tsx|mdx)$/,
    }),
    babel({
      presets: [reactCompilerPreset()],
    }),
    tailwindcss(),
  ],
  lint: {
    ignorePatterns: ["src/routeTree.gen.ts"],
    options: {
      typeAware: true,
      typeCheck: true,
    },
  },
  fmt: {
    ignorePatterns: ["src/routeTree.gen.ts"],
  },
  test: {
    include: ["src/**/*.test.{ts,tsx}"],
  },
});
