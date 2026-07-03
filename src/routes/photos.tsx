import { createFileRoute } from "@tanstack/react-router";
import PhotoGrid from "@/components/photo-grid";
import { buildSeoHead, pageDescriptions, siteName } from "@/lib/seo";

export const Route = createFileRoute("/photos")({
  head: () =>
    buildSeoHead({
      title: `Photography | ${siteName}`,
      description: pageDescriptions.photos,
      path: "/photos",
    }),
  loader: async () => {
    try {
      if (import.meta.env.SSR) {
        const { getAllImages } = await import("@/lib/photos.server");
        return await getAllImages();
      }

      const response = await fetch("/api/photos");
      if (!response.ok) {
        throw new Error(`Failed to load photos: ${response.status}`);
      }

      return await response.json();
    } catch {
      return { heroImage: undefined, images: [] };
    }
  },
  component: PhotosPage,
});

function PhotosPage() {
  const data = Route.useLoaderData();

  return <PhotoGrid images={data.images} heroImage={data.heroImage} />;
}
