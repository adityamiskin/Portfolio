import Carousel from "@/components/Carousel";
import { Suspense } from "react";
import Spinner from "@/components/Spinner";

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

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const carouselImages = [
    await getImagesFromFolder("street"),
    await getImagesFromFolder("landscape"),
    await getImagesFromFolder("nature"),
    await getImagesFromFolder("portraits"),
    await getImagesFromFolder("urban"),
  ];

  const { slug } = await params;

  const imageTypes = ["Street", "Landscape", "Nature", "Portraits", "Urban"];
  let lowerCaseArr = imageTypes.map(function (item) {
    return item.toLowerCase();
  });
  const index = lowerCaseArr.indexOf(slug);

  const slides = carouselImages[index] || [];

  return (
    <Suspense fallback={<Spinner />}>
      <Carousel slides={slides} />
    </Suspense>
  );
}
