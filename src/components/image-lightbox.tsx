"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { getOptimizedCloudinaryUrl } from "@/lib/utils";

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
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft") {
        setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
      } else if (e.key === "ArrowRight") {
        setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [images.length, onClose]);

  const currentImage = images[currentIndex];

  if (!currentImage) return null;

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

      {images.length > 1 && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setCurrentIndex((prev) =>
                prev > 0 ? prev - 1 : images.length - 1
              );
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors"
            aria-label="Previous image"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setCurrentIndex((prev) =>
                prev < images.length - 1 ? prev + 1 : 0
              );
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors"
            aria-label="Next image"
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}

      <div
        className="relative max-w-[90vw] max-h-[90vh] w-full h-full flex flex-col items-center justify-center md:p-8 p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative w-full h-full flex items-center justify-center min-h-0">
          <Image
            src={getOptimizedCloudinaryUrl(currentImage.img, {
              width: 2560,
              quality: "auto",
              format: "auto",
              crop: "limit",
            })}
            alt={currentImage.description || currentImage.title || "Photo"}
            fill
            className="object-contain"
            sizes="90vw"
            priority
          />
        </div>

        {(currentImage.title || currentImage.description) && (
          <div className="mt-4 text-center max-w-2xl">
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
          <div className="mt-4 text-white/60 text-sm">
            {currentIndex + 1} / {images.length}
          </div>
        )}
      </div>
    </div>
  );
}
