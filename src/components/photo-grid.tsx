"use client";

import { useState } from "react";
import Image from "next/image";
import ImageLightbox from "./image-lightbox";
import { getOptimizedCloudinaryUrl } from "@/lib/utils";

interface PhotoGridProps {
  images: Array<{
    img: string;
    title?: string;
    description?: string;
  }>;
  categoryName: string;
}

export default function PhotoGrid({ images, categoryName }: PhotoGridProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  if (images.length === 0) {
    return (
      <div className="text-center text-muted-foreground py-12">
        No images found
      </div>
    );
  }

  return (
    <>
      <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
        <div className="max-w-[1500px] mx-auto w-full p-4 pb-10 mb-10 gap-4 columns-1 md:columns-2 space-y-4 md:px-12 px-4">
          {images.map((image, index) => (
            <div
              key={index}
              className="group relative w-full break-inside-avoid mb-4 cursor-pointer"
              onClick={() => setLightboxIndex(index)}
            >
              <div className="relative w-full overflow-hidden">
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
                  width={1200}
                  height={900}
                  className="w-full h-auto object-cover shadow transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                {(image.title || image.description) && (
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4">
                    {image.title && (
                      <p className="text-white font-medium text-sm mb-1 drop-shadow-lg">
                        {image.title}
                      </p>
                    )}
                    {image.description && (
                      <p className="text-white/90 text-xs font-body tracking-wider font-light drop-shadow-lg">
                        {image.description}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {lightboxIndex !== null && (
        <ImageLightbox
          images={images}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </>
  );
}
