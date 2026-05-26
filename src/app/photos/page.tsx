import type { Metadata } from "next";
import { Suspense } from "react";
import { Spinner } from "@/components/ui/spinner";
import PhotoGrid from "@/components/photo-grid";
import { pageDescriptions } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Photography",
  description: pageDescriptions.photos,
  alternates: {
    canonical: "/photos",
  },
  openGraph: {
    title: "Photography | Aditya Miskin",
    description: pageDescriptions.photos,
    url: "/photos",
  },
};

type CloudinaryImage = {
  secure_url: string;
  width?: number;
  height?: number;
  tags?: string[];
  context?: { custom?: { caption?: string; alt?: string } };
};

function mapCloudinaryImage(image: CloudinaryImage) {
  return {
    img: image.secure_url,
    width: image.width,
    height: image.height,
    title: image.context?.custom?.caption,
    description: image.context?.custom?.alt,
    tags: [...new Set(image.tags ?? [])],
  };
}

async function getAllImages() {
  const cloudinary = require("cloudinary").v2;

  cloudinary.config({
    secure: true,
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  const categories = ["street", "landscape", "nature", "portraits", "urban"];

  const results = await Promise.all(
    categories.map((slug) =>
      cloudinary.api
        .resources({
          type: "upload",
          prefix: slug,
          metadata: true,
          context: true,
          tags: true,
          max_results: 200,
        })
        .then((r: { resources: CloudinaryImage[] }) =>
          r.resources.map((image) => ({
            ...image,
            tags: [...new Set([...(image.tags ?? []).filter((tag) => tag !== "imgs"), slug])],
          }))
        )
        .catch(() => [] as CloudinaryImage[])
    )
  );

  const mixed: CloudinaryImage[] = [];
  const maxLength = Math.max(...results.map((group) => group.length));

  for (let i = 0; i < maxLength; i++) {
    for (const group of results) {
      if (group[i]) mixed.push(group[i]);
    }
  }

  const preferredHero = mixed.find(
    (image) =>
      image.context?.custom?.caption === "Pretty Flowers, North Sikkim" ||
      image.context?.custom?.alt === "A tree with pretty pink flowers."
  );
  const landscapeImages = mixed.filter(
    (image) => image.width && image.height && image.width / image.height > 1.3
  );
  const heroSource = preferredHero ?? landscapeImages[0] ?? mixed[0];
  const heroImage = heroSource ? mapCloudinaryImage(heroSource) : undefined;
  const images = mixed.map(mapCloudinaryImage);

  return { heroImage, images };
}

const Photo = async () => {
  const { heroImage, images } = await getAllImages();

  return (
    <Suspense fallback={<Spinner />}>
      <PhotoGrid images={images} heroImage={heroImage} />
    </Suspense>
  );
};

export default Photo;
