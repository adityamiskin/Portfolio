import { createFileRoute } from "@tanstack/react-router";
import PhotoGrid from "@/components/photo-grid";
import { pageDescriptions } from "@/lib/seo";
import { pageHead } from "@/lib/meta";
import { getAllImages } from "@/lib/photos";

export const Route = createFileRoute("/photos")({
  staleTime: 15 * 60 * 1000,
  preloadStaleTime: 15 * 60 * 1000,
  head: () =>
    pageHead({
      title: "Photography",
      description: pageDescriptions.photos,
      path: "/photos",
    }),
  loader: () => getAllImages(),
  pendingComponent: () => (
    <p className="py-12 text-center text-muted-foreground">Loading photos…</p>
  ),
  component: PhotosPage,
});

function PhotosPage() {
  const { heroImage, images } = Route.useLoaderData();

  return <PhotoGrid images={images} heroImage={heroImage} />;
}
