"use client";

import { useState } from "react";
import Image from "next/image";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import ImageLightbox from "./image-lightbox";
import { TextScramble } from "@/components/text-scramble";
import { getOptimizedCloudinaryUrl } from "@/lib/utils";

type PhotoImage = {
  img: string;
  width?: number;
  height?: number;
  title?: string;
  description?: string;
  tags?: string[];
};

interface PhotoGridProps {
  images: PhotoImage[];
  heroImage?: PhotoImage;
  categoryName?: string;
}

export default function PhotoGrid({
  images,
  heroImage,
  categoryName = "Photo",
}: PhotoGridProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [activeTag, setActiveTag] = useState("all");

  const tags = Array.from(
    new Set(
      [heroImage, ...images]
        .flatMap((image) => image?.tags ?? [])
        .filter(Boolean)
    )
  ).sort();

  const showHero = activeTag === "all" && heroImage;
  const filteredImages =
    activeTag === "all"
      ? images
      : images.filter((image) => image.tags?.includes(activeTag));

  const displayedImages = showHero
    ? filteredImages.filter((image) => image.img !== heroImage.img)
    : filteredImages;
  const lightboxImages = showHero ? [heroImage, ...displayedImages] : displayedImages;

  if (lightboxImages.length === 0) {
    return (
      <div className="text-center text-muted-foreground py-12">
        No images found
      </div>
    );
  }

  return (
    <>
      <div className="w-screen relative left-1/2 right-1/2 ml-[-50vw] mr-[-50vw]">
        <div className="w-full px-[5vw] pb-10 mb-10">
          <header className="mb-10 max-w-3xl border-b border-border/50 pb-8">
            <h1 className="mb-4 text-4xl font-bold lowercase text-foreground tracking-wider">
              <span className="accent-glow text-primary mr-2">*</span>
              <TextScramble as="span" className="font-geist-pixel">
                photos
              </TextScramble>
            </h1>
            <p className="leading-relaxed lowercase text-foreground/60">
              frames from places i have been, people i have noticed, and quiet
              things that stayed with me.
            </p>
          </header>

          {tags.length > 0 && (
            <div className="mb-8 flex flex-wrap gap-x-6 gap-y-3 border-b border-border/50 pb-5 text-sm lowercase tracking-wider text-muted-foreground">
              {["all", ...tags].map((tag) => {
                const isActive = activeTag === tag;

                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => setActiveTag(tag)}
                    className={`relative outline-none transition-colors hover:text-foreground focus-visible:text-foreground ${
                      isActive ? "text-foreground" : ""
                    }`}
                  >
                    {tag}
                    {isActive && (
                      <span className="absolute -bottom-1 left-0 right-0 h-px bg-foreground" />
                    )}
                  </button>
                );
              })}
            </div>
          )}

          {showHero && (
            <>
              <div
                className="group relative mb-12 w-full cursor-pointer overflow-hidden rounded-sm lg:hidden"
                onClick={() => setLightboxIndex(0)}
              >
                <Image
                  src={getOptimizedCloudinaryUrl(heroImage.img, {
                    width: 1200,
                    quality: "auto",
                    format: "auto",
                    crop: "limit",
                  })}
                  alt={heroImage.description || heroImage.title || "Featured photo"}
                  width={heroImage.width ?? 1200}
                  height={heroImage.height ?? 900}
                  className="w-full h-auto object-cover shadow-sm transition-transform duration-300 ease group-hover:scale-[1.015]"
                  sizes="100vw"
                  priority
                />
              </div>
              <div
                className="group relative mb-12 hidden aspect-[21/9] w-full cursor-pointer overflow-hidden rounded-sm lg:block"
                onClick={() => setLightboxIndex(0)}
              >
                <Image
                  src={getOptimizedCloudinaryUrl(heroImage.img, {
                    width: 2000,
                    quality: "auto",
                    format: "auto",
                    crop: "fill",
                  })}
                  alt={heroImage.description || heroImage.title || "Featured photo"}
                  fill
                  className="object-cover shadow-sm transition-transform duration-300 ease group-hover:scale-[1.015]"
                  sizes="100vw"
                  priority
                />
              </div>
            </>
          )}

          <ResponsiveMasonry columnsCountBreakPoints={{ 0: 1, 640: 2, 1024: 3, 1280: 4 }}>
            <Masonry gutter="1rem">
              {displayedImages.map((image, index) => (
            <div
              key={index}
              className="group relative w-full cursor-pointer overflow-hidden"
              onClick={() => setLightboxIndex(showHero ? index + 1 : index)}
            >
              <Image
                src={getOptimizedCloudinaryUrl(image.img, {
                  width: 1200,
                  quality: "auto",
                  format: "auto",
                  crop: "limit",
                })}
                alt={
                  image.description ||
                  image.title ||
                  `${categoryName} photo ${index + 1}`
                }
                width={image.width ?? 1200}
                height={image.height ?? 900}
                className="w-full h-auto object-cover shadow-sm transition-transform duration-300 ease group-hover:scale-[1.015]"
                loading="lazy"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
              {(image.title || image.description) && (
                <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/80 via-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4">
                  {image.title && (
                    <p className="text-white font-medium text-base mb-1 drop-shadow-lg">
                      {image.title}
                    </p>
                  )}
                  {image.description && (
                    <p className="text-white/90 text-xs tracking-wider font-light drop-shadow-lg">
                      {image.description}
                    </p>
                  )}
                </div>
              )}
            </div>
              ))}
            </Masonry>
          </ResponsiveMasonry>
        </div>
      </div>

      {lightboxIndex !== null && (
        <ImageLightbox
          images={lightboxImages}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </>
  );
}
