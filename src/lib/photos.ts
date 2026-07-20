import { createServerFn } from "@tanstack/react-start";
import { env } from "cloudflare:workers";

export type PhotoImage = {
  img: string;
  width?: number;
  height?: number;
  title?: string;
  description?: string;
  tags?: string[];
};

type CloudinaryImage = {
  secure_url: string;
  width?: number;
  height?: number;
  tags?: string[];
  context?: { custom?: { caption?: string; alt?: string } };
};

type CloudinaryResponse = {
  resources?: CloudinaryImage[];
};

type CloudinaryBindings = {
  CLOUDINARY_CLOUD_NAME?: string;
  CLOUDINARY_API_KEY?: string;
  CLOUDINARY_API_SECRET?: string;
};

type PhotoLibrary = {
  heroImage: PhotoImage | undefined;
  images: PhotoImage[];
};

const PHOTO_CACHE_TTL = 15 * 60 * 1000;
let photoCache: { data: PhotoLibrary; expiresAt: number } | undefined;
let pendingPhotoRequest: Promise<PhotoLibrary> | undefined;

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

async function fetchCategory(
  category: string,
  credentials: { cloudName: string; apiKey: string; apiSecret: string },
) {
  const url = new URL(
    `https://api.cloudinary.com/v1_1/${credentials.cloudName}/resources/image/upload`,
  );
  url.searchParams.set("prefix", category);
  url.searchParams.set("max_results", "200");
  url.searchParams.set("metadata", "true");
  url.searchParams.set("context", "true");
  url.searchParams.set("tags", "true");

  const authorization = btoa(`${credentials.apiKey}:${credentials.apiSecret}`);
  const response = await fetch(url, {
    headers: {
      Authorization: `Basic ${authorization}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Cloudinary returned ${response.status} for ${category}.`);
  }

  const result = (await response.json()) as CloudinaryResponse;
  return (result.resources ?? []).map((image) => ({
    ...image,
    tags: [...new Set([...(image.tags ?? []).filter((tag) => tag !== "imgs"), category])],
  }));
}

async function loadAllImages(): Promise<PhotoLibrary> {
  if (photoCache && photoCache.expiresAt > Date.now()) {
    return photoCache.data;
  }

  const bindings = env as CloudinaryBindings;
  const cloudName = bindings.CLOUDINARY_CLOUD_NAME;
  const apiKey = bindings.CLOUDINARY_API_KEY;
  const apiSecret = bindings.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    return { heroImage: undefined, images: [] as PhotoImage[] };
  }

  pendingPhotoRequest ??= (async () => {
    const credentials = { cloudName, apiKey, apiSecret };
    const categories = ["street", "landscape", "nature", "portraits", "urban"];
    const results = await Promise.all(
      categories.map((category) =>
        fetchCategory(category, credentials).catch(() => [] as CloudinaryImage[]),
      ),
    );

    const mixed: CloudinaryImage[] = [];
    const maxLength = Math.max(0, ...results.map((group) => group.length));

    for (let index = 0; index < maxLength; index += 1) {
      for (const group of results) {
        if (group[index]) mixed.push(group[index]);
      }
    }

    const preferredHero = mixed.find(
      (image) =>
        image.context?.custom?.caption === "Pretty Flowers, North Sikkim" ||
        image.context?.custom?.alt === "A tree with pretty pink flowers.",
    );
    const landscapeImages = mixed.filter(
      (image) => image.width && image.height && image.width / image.height > 1.3,
    );
    const heroSource = preferredHero ?? landscapeImages[0] ?? mixed[0];
    const data = {
      heroImage: heroSource ? mapCloudinaryImage(heroSource) : undefined,
      images: mixed.map(mapCloudinaryImage),
    };

    photoCache = {
      data,
      expiresAt: Date.now() + PHOTO_CACHE_TTL,
    };

    return data;
  })().finally(() => {
    pendingPhotoRequest = undefined;
  });

  return pendingPhotoRequest;
}

export const getAllImages = createServerFn({ method: "GET" }).handler(loadAllImages);
