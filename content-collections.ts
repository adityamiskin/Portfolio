import { defineCollection, defineConfig } from "@content-collections/core";
import { z } from "zod";

const posts = defineCollection({
  name: "posts",
  directory: "posts",
  include: "**/*.mdx",
  schema: z.object({
    title: z.string().min(1),
    publishedAt: z.string().min(1),
    description: z.string().optional(),
    image: z.string().url().optional(),
    content: z.string(),
  }),
  transform: (document) => {
    const wordCount = document.content.trim().split(/\s+/).filter(Boolean).length;

    return {
      ...document,
      slug: document._meta.path,
      readingMinutes: Math.max(1, Math.round(wordCount / 200)),
    };
  },
});

export default defineConfig({
  content: [posts],
});
