import { v2 as cloudinary } from "cloudinary";

type CloudinaryImage = {
  secure_url: string;
  width?: number;
  height?: number;
  tags?: string[];
  context?: { custom?: { caption?: string; alt?: string } };
};

export type PhotoImage = {
  img: string;
  width?: number;
  height?: number;
  title?: string;
  description?: string;
  tags?: string[];
};

function mapCloudinaryImage(image: CloudinaryImage): PhotoImage {
  return {
    img: image.secure_url,
    width: image.width,
    height: image.height,
    title: image.context?.custom?.caption,
    description: image.context?.custom?.alt,
    tags: [...new Set(image.tags ?? [])],
  };
}

export async function getAllImages() {
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
        .then((result: { resources: CloudinaryImage[] }) =>
          result.resources.map((image) => ({
            ...image,
            tags: [...new Set([...(image.tags ?? []).filter((tag) => tag !== "imgs"), slug])],
          }))
        )
        .catch(() => [] as CloudinaryImage[])
    )
  );

  const mixed: CloudinaryImage[] = [];
  const maxLength = Math.max(...results.map((group) => group.length), 0);

  for (let i = 0; i < maxLength; i += 1) {
    for (const group of results) {
      if (group[i]) {
        mixed.push(group[i]);
      }
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

  return {
    heroImage: heroSource ? mapCloudinaryImage(heroSource) : undefined,
    images: mixed.map(mapCloudinaryImage),
  };
}
