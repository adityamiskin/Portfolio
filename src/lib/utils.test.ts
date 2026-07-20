import { describe, expect, it } from "vite-plus/test";
import {
  formatBlogDate,
  formatBlogDateShort,
  getBlogReadingMinutes,
  getOptimizedCloudinaryUrl,
  parseBlogPublishedDate,
} from "@/lib/utils";

describe("blog date utilities", () => {
  it("parses the date formats used by blog frontmatter", () => {
    expect(parseBlogPublishedDate("December 27, 2025")?.getFullYear()).toBe(2025);
    expect(parseBlogPublishedDate("dec 27, 2025")?.getMonth()).toBe(11);
    expect(parseBlogPublishedDate("2025-12-27")?.getDate()).toBe(27);
  });

  it("formats long and short dates consistently", () => {
    expect(formatBlogDate("2025-12-27")).toBe("December 27, 2025");
    expect(formatBlogDateShort("December 27, 2025")).toBe("dec 27, 2025");
  });

  it("never reports less than one reading minute", () => {
    expect(getBlogReadingMinutes("hello")).toBe(1);
    expect(getBlogReadingMinutes("word ".repeat(400))).toBe(2);
  });
});

describe("Cloudinary URL optimization", () => {
  it("adds image transformations without changing the public ID", () => {
    expect(
      getOptimizedCloudinaryUrl(
        "https://res.cloudinary.com/demo/image/upload/v123/photos/example.jpg",
        { width: 1200 },
      ),
    ).toBe(
      "https://res.cloudinary.com/demo/image/upload/c_limit,w_1200,f_auto,q_auto/v123/photos/example.jpg",
    );
  });

  it("leaves non-Cloudinary URLs unchanged", () => {
    const url = "https://example.com/photo.jpg";
    expect(getOptimizedCloudinaryUrl(url)).toBe(url);
  });
});
