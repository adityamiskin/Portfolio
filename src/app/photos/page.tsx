import { fetchPhotos, getAllTags, getAllCameras } from "@/lib/photos-data";
import { PhotosPageClient } from "@/components/photos/photos-page-client";

export const metadata = {
  title: "photos",
};

export default async function PhotosHomePage() {
  const [photos, tags, cameras] = await Promise.all([
    fetchPhotos(),
    getAllTags(),
    getAllCameras(),
  ]);
  return <PhotosPageClient photos={photos} tags={tags} cameras={cameras} />;
}