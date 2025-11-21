import Link from "next/link";
import { Suspense } from "react";
import { Spinner } from "@/components/ui/spinner";
import PhotoGrid from "@/components/photo-grid";

async function getImagesFromFolder(folderPath: string) {
  const cloudinary = require("cloudinary").v2;

  cloudinary.config({
    secure: true,
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
    api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
  });

  const results = await cloudinary.api.resources({
    type: "upload",
    prefix: folderPath,
    metadata: true,
    context: true,
    tags: true,
  });

  return results.resources.map((image) => ({
    img: image.secure_url,
    title: image.context?.custom?.caption,
    description: image.context?.custom?.alt,
  }));
}

const categoryInfo: Record<string, { name: string; description: string }> = {
  street: {
    name: "Street",
    description: "Capturing the essence of urban life and street scenes.",
  },
  landscape: {
    name: "Landscape",
    description: "Scenic views of natural and urban landscapes.",
  },
  nature: {
    name: "Nature",
    description: "The beauty of the natural world around us.",
  },
  portraits: {
    name: "Portraits",
    description: "Capturing moments and expressions of people.",
  },
  urban: {
    name: "Urban",
    description: "Cityscapes and urban architecture.",
  },
};

// Generate static params at build time for instant navigation
export async function generateStaticParams() {
  return Object.keys(categoryInfo).map((slug) => ({
    slug,
  }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = categoryInfo[slug] || { name: slug, description: "" };

  const images = await getImagesFromFolder(slug);

  return (
    <>
      <div className="mb-8 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between -mx-4 md:-mx-16 px-4 md:px-16">
        <div>
          <h1 className="text-foreground font-medium text-xl mb-1">
            {category.name} Photography
          </h1>
          {category.description && (
            <div className="text-muted-foreground text-sm">
              {category.description}
            </div>
          )}
        </div>
        <Link
          href="/photo"
          className="text-muted-foreground text-sm font-medium hover:text-foreground transition-colors"
        >
          ← back
        </Link>
      </div>
      <Suspense fallback={<Spinner />}>
        <PhotoGrid images={images} categoryName={category.name} />
      </Suspense>
    </>
  );
}
