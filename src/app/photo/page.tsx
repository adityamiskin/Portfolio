import Link from "next/link";
import Image from "next/image";
import { ProgressiveBlur } from "@/components/ui/progressive-blur";
import { getOptimizedCloudinaryUrl } from "@/lib/utils";

const Photo = () => {
  const photoCategories = [
    {
      name: "Street",
      slug: "street",
      description: "Capturing the essence of urban life and street scenes.",
      previewImage:
        "https://res.cloudinary.com/vite-img/image/upload/v1704632731/street/test_hjtzaw.webp",
    },
    {
      name: "Landscape",
      slug: "landscape",
      description: "Scenic views of natural and urban landscapes.",
      previewImage:
        "https://res.cloudinary.com/vite-img/image/upload/v1704632729/landscape/nsef38tlas3myh0ildzv",
    },
    {
      name: "Nature",
      slug: "nature",
      description: "The beauty of the natural world around us.",
      previewImage:
        "https://res.cloudinary.com/vite-img/image/upload/v1704632729/nature/test8_wethqp.webp",
    },
    {
      name: "Portraits",
      slug: "portraits",
      description: "Capturing moments and expressions of people.",
      previewImage:
        "https://res.cloudinary.com/vite-img/image/upload/v1704632731/portraits/test3_yqykrt.webp",
    },
    {
      name: "Urban",
      slug: "urban",
      description: "Cityscapes and urban architecture.",
      previewImage:
        "https://res.cloudinary.com/vite-img/image/upload/v1704633882/urban/test4_xtagby.webp",
    },
  ];

  return (
    <div className="space-y-8">
      {photoCategories.map((category) => (
        <Link
          key={category.slug}
          href={`/photo/${category.slug}`}
          className="block group"
          prefetch={true}
        >
          <article className="relative w-full aspect-video overflow-hidden rounded-md">
            <Image
              src={getOptimizedCloudinaryUrl(category.previewImage, {
                width: 2000,
                quality: "auto",
                format: "auto",
                crop: "limit",
              })}
              alt={`${category.name} photography preview`}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 100vw"
            />
            <ProgressiveBlur position="bottom" height="30%" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10" />
            <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 z-20">
              <h2 className="text-white font-medium mb-2 text-xl md:text-2xl drop-shadow-lg">
                {category.name} Photography
              </h2>
              {category.description && (
                <p className="text-white drop-shadow-lg leading-relaxed">
                  {category.description}
                </p>
              )}
            </div>
          </article>
        </Link>
      ))}
    </div>
  );
};

export default Photo;
