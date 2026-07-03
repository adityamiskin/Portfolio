import { createFileRoute } from "@tanstack/react-router";
import { absoluteUrl } from "@/lib/seo";

export const Route = createFileRoute("/robots.txt")({
  server: {
    handlers: {
      GET: async () =>
        new Response(
          `User-agent: *\nAllow: /\nSitemap: ${absoluteUrl("/sitemap.xml")}\n`,
          {
            headers: {
              "content-type": "text/plain; charset=utf-8",
            },
          }
        ),
    },
  },
});
