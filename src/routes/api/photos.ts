import { createFileRoute } from "@tanstack/react-router";
import { getAllImages } from "@/lib/photos.server";

export const Route = createFileRoute("/api/photos")({
  server: {
    handlers: {
      GET: async () => Response.json(await getAllImages()),
    },
  },
});
