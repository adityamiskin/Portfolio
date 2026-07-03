import babel from "@rolldown/plugin-babel";
import mdx from "@mdx-js/rollup";
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import { readdirSync } from "node:fs";
import { extname } from "node:path";
import { defineConfig } from "vite";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";

const mdxPlugin = mdx({
  remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter],
});

const blogPostRoutes = readdirSync(new URL("./posts", import.meta.url))
  .filter((file) => extname(file) === ".mdx")
  .map((file) => `/blog/${file.replace(/\.mdx$/, "")}`);

const prerenderPages = ["/", "/blog", "/photos", "/projects", "/work", ...blogPostRoutes].map(
  (path) => ({
    path,
    prerender: {
      enabled: true,
      crawlLinks: false,
    },
  })
);

export default defineConfig({
  server: {
    port: 3000,
  },
  resolve: {
    tsconfigPaths: true,
  },
  plugins: [
    tailwindcss(),
    tanstackStart({
      pages: prerenderPages,
      prerender: {
        enabled: true,
        autoStaticPathsDiscovery: false,
        crawlLinks: false,
        failOnError: true,
      },
    }),
    { enforce: "pre", ...(Array.isArray(mdxPlugin) ? mdxPlugin[0] : mdxPlugin) },
    react({
      include: /\.(md|mdx|js|jsx|ts|tsx)$/,
    }),
    babel({
      presets: [reactCompilerPreset()],
    }),
  ],
});
