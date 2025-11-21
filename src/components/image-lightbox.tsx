"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { getOptimizedCloudinaryUrl } from "@/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

interface ImageLightboxProps {
  images: Array<{
    img: string;
    title?: string;
    description?: string;
  }>;
  initialIndex?: number;
  onClose: () => void;
}

export default function ImageLightbox({
  images,
  initialIndex = 0,
  onClose,
}: ImageLightboxProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  useEffect(() => {
    if (!api) {
      return;
    }

    const updateIndex = () => {
      setCurrentIndex(api.selectedScrollSnap());
    };

    updateIndex();
    api.on("select", updateIndex);

    return () => {
      api.off("select", updateIndex);
    };
  }, [api]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [onClose]);

  const currentImage = images[currentIndex];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-50 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors"
        aria-label="Close lightbox"
      >
        <X size={24} />
      </button>

      <div
        className="relative w-full h-full max-w-[95vw] max-h-[95vh] p-2 flex flex-col items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <Carousel
          setApi={setApi}
          opts={{
            startIndex: initialIndex,
            loop: true,
          }}
          className="w-full flex-1 flex items-center justify-center min-h-0 overflow-hidden"
        >
          <CarouselContent className="h-full -ml-0 flex items-center">
            {images.map((image, index) => (
              <CarouselItem
                key={index}
                className="pl-0 basis-full flex items-center justify-center h-full"
              >
                <div className="relative w-full h-full flex items-center justify-center">
                  <Image
                    src={getOptimizedCloudinaryUrl(image.img, {
                      width: 1920,
                      quality: "auto",
                      format: "auto",
                      crop: "limit",
                    })}
                    alt={image.description || image.title || "Photo"}
                    width={1920}
                    height={1080}
                    className="object-contain max-w-[calc(95vw-16px)] max-h-[calc(95vh-120px-16px)]"
                    sizes="95vw"
                    priority={index === initialIndex}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {images.length > 1 && (
            <>
              <CarouselPrevious className="left-4" />
              <CarouselNext className="right-4" />
            </>
          )}
        </Carousel>

        <div className="h-[120px] w-full flex flex-col items-center justify-center">
          {currentImage && (
            <>
              {(currentImage.title || currentImage.description) && (
                <div className="text-center max-w-2xl mx-auto">
                  {currentImage.title && (
                    <h3 className="text-white font-medium text-lg mb-2">
                      {currentImage.title}
                    </h3>
                  )}
                  {currentImage.description && (
                    <p className="text-white/80 text-sm">
                      {currentImage.description}
                    </p>
                  )}
                </div>
              )}

              {images.length > 1 && (
                <div className="mt-4 text-white/60 text-sm text-center">
                  {currentIndex + 1} / {images.length}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
