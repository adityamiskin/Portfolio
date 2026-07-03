import { createFileRoute } from "@tanstack/react-router";
import { absoluteUrl } from "@/lib/seo";
import { getBlogPosts, parseBlogPublishedDate } from "@/lib/utils";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const now = new Date().toISOString();
        const staticRoutes = [
          { url: absoluteUrl("/"), lastModified: now, changeFrequency: "monthly", priority: 1 },
          { url: absoluteUrl("/work"), lastModified: now, changeFrequency: "monthly", priority: 0.8 },
          { url: absoluteUrl("/projects"), lastModified: now, changeFrequency: "monthly", priority: 0.8 },
          { url: absoluteUrl("/photos"), lastModified: now, changeFrequency: "weekly", priority: 0.6 },
          { url: absoluteUrl("/blog"), lastModified: now, changeFrequency: "weekly", priority: 0.7 },
        ];

        const blogRoutes = getBlogPosts().map((post) => ({
          url: absoluteUrl(`/blog/${post.slug}`),
          lastModified:
            parseBlogPublishedDate(post.metadata.publishedAt)?.toISOString() ?? now,
          changeFrequency: "monthly",
          priority: 0.6,
        }));

        const urls = [...staticRoutes, ...blogRoutes]
          .map(
            (entry) => `<url><loc>${entry.url}</loc><lastmod>${entry.lastModified}</lastmod><changefreq>${entry.changeFrequency}</changefreq><priority>${entry.priority}</priority></url>`
          )
          .join("");

        return new Response(
          `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`,
          {
            headers: {
              "content-type": "application/xml; charset=utf-8",
            },
          }
        );
      },
    },
  },
});
