import { describe, expect, it } from "vite-plus/test";
import { blogPosts } from "@/lib/blog";
import { getBlogPostComponent } from "@/lib/blog-components";

describe("build-time MDX blog collection", () => {
  it("loads schema-validated posts in newest-first order", () => {
    expect(blogPosts.length).toBeGreaterThan(0);
    for (let index = 1; index < blogPosts.length; index += 1) {
      const previous = new Date(blogPosts[index - 1].publishedAt).getTime();
      const current = new Date(blogPosts[index].publishedAt).getTime();
      expect(previous).toBeGreaterThanOrEqual(current);
    }
  });

  it("exposes statically compiled MDX and frontmatter by slug", () => {
    const post = blogPosts.find((candidate) => candidate.slug === "hello-world");
    const component = getBlogPostComponent("hello-world");

    expect(post?.title).toBe("Hello World");
    expect(post?.readingMinutes).toBeGreaterThan(0);
    expect(component).toBeTypeOf("function");
  });
});
