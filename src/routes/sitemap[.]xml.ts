import { createFileRoute } from "@tanstack/react-router";
import { blogPosts } from "@/lib/blog";
import { absoluteUrl } from "@/lib/seo";
import { parseBlogPublishedDate } from "@/lib/utils";

const staticRoutes = [
  { path: "/", changeFrequency: "monthly", priority: 1 },
  { path: "/work", changeFrequency: "monthly", priority: 0.8 },
  { path: "/projects", changeFrequency: "monthly", priority: 0.8 },
  { path: "/photos", changeFrequency: "weekly", priority: 0.6 },
  { path: "/blog", changeFrequency: "weekly", priority: 0.7 },
] as const;

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function renderSitemap() {
  const urls = [
    ...staticRoutes.map((route) => ({
      url: absoluteUrl(route.path),
      lastModified: undefined,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),
    ...blogPosts.map((post) => ({
      url: absoluteUrl(`/blog/${post.slug}`),
      lastModified: parseBlogPublishedDate(post.updatedAt ?? post.publishedAt)?.toISOString(),
      changeFrequency: "monthly",
      priority: 0.6,
    })),
  ];

  const entries = urls
    .map(
      (entry) => `  <url>
    <loc>${escapeXml(entry.url)}</loc>${
      entry.lastModified ? `\n    <lastmod>${entry.lastModified}</lastmod>` : ""
    }
    <changefreq>${entry.changeFrequency}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`,
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</urlset>
`;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: () =>
        new Response(renderSitemap(), {
          headers: {
            "content-type": "application/xml; charset=utf-8",
            "cache-control": "public, max-age=3600",
          },
        }),
    },
  },
});
