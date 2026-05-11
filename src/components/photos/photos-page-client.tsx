"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Camera, Tag, LayoutList, LayoutGrid } from "lucide-react";
import { Photo } from "@/lib/photos-data";
import {
  formatPhotosDate,
  formatPhotosDateShort,
  formatPhotosDateOnly,
} from "@/lib/photos-utils";
import { cn } from "@/lib/utils";

interface PhotosPageClientProps {
  photos: Photo[];
  tags: string[];
  cameras: { name: string; slug: string }[];
}

export function PhotosPageClient({ photos, tags, cameras }: PhotosPageClientProps) {
  const [view, setView] = useState<"list" | "grid">("list");

  return (
    <main className="mx-3 mb-3 lg:mx-6 lg:mb-6">
      {/* Header */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-x-4 lg:gap-x-6 max-w-7xl">
        <div className="col-span-1 md:col-span-9">
          <header className="flex items-center justify-between w-full min-h-16">
            <div className="flex gap-1 sm:gap-2">
              <div className="flex divide-x divide-neutral-300 dark:divide-neutral-800 border border-neutral-300 dark:border-neutral-800 rounded-[0.25rem] shadow-sm overflow-hidden">
                <button
                  onClick={() => setView("list")}
                  className={cn(
                    "py-0.5 px-1.5 flex items-center justify-center cursor-pointer hover:bg-neutral-100/60 active:bg-neutral-100 dark:hover:bg-neutral-900/75 dark:active:bg-neutral-900",
                    view === "list"
                      ? "text-neutral-900 dark:text-white"
                      : "text-neutral-400 dark:text-neutral-600 hover:text-neutral-700 dark:hover:text-neutral-400"
                  )}
                  aria-label="List view"
                  title="List view"
                >
                  <LayoutList size={16} strokeWidth={1.5} />
                </button>
                <button
                  onClick={() => setView("grid")}
                  className={cn(
                    "py-0.5 px-1.5 flex items-center justify-center cursor-pointer hover:bg-neutral-100/60 active:bg-neutral-100 dark:hover:bg-neutral-900/75 dark:active:bg-neutral-900",
                    view === "grid"
                      ? "text-neutral-900 dark:text-white"
                      : "text-neutral-400 dark:text-neutral-600 hover:text-neutral-700 dark:hover:text-neutral-400"
                  )}
                  aria-label="Grid view"
                  title="Grid view"
                >
                  <LayoutGrid size={16} strokeWidth={1.5} />
                </button>
              </div>
            </div>
            <div className="flex-grow text-right text-ellipsis overflow-hidden hidden sm:block">
              <Link href="/" className="hover:opacity-70 transition-opacity">
                photos.adityamiskin.com
              </Link>
            </div>
          </header>
        </div>
      </div>

      {/* Content */}
      {view === "list" ? (
        <PhotoListView photos={photos} />
      ) : (
        <PhotoGridView photos={photos} tags={tags} cameras={cameras} />
      )}
    </main>
  );
}

function PhotoListView({ photos }: { photos: Photo[] }) {
  return (
    <div className="space-y-1">
      {photos.map((photo, index) => (
        <article key={photo.id}>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-x-4 lg:gap-x-6 gap-y-4 max-w-7xl">
            <div className="col-span-1 md:col-span-9">
              <div className={index === 0 ? "min-h-[16rem] sm:min-h-[30rem]" : ""}>
                <div
                  className="relative overflow-hidden bg-neutral-100 dark:bg-neutral-800 w-full"
                  style={{ aspectRatio: photo.width / photo.height }}
                >
                  <Image
                    src={photo.src}
                    alt={photo.title}
                    width={photo.width}
                    height={photo.height}
                    className="w-full h-full object-cover"
                    sizes="(max-width: 768px) 100vw, 75vw"
                    priority={index < 2}
                  />
                </div>
              </div>
            </div>
            <div className="col-span-1 md:col-span-3">
              <div className="md:sticky md:top-4 md:self-start -translate-y-1 grid grid-cols-2 md:grid-cols-1 gap-x-1 sm:gap-x-1.5 gap-y-1.5 pb-6">
                <div className="pr-2 md:pr-0">
                  <div className="md:relative flex gap-2 items-start">
                    <h2 className="font-bold uppercase">{photo.title}</h2>
                  </div>
                  <div className="space-y-1.5">
                    {photo.camera && (
                      <span className="group inline-flex gap-2">
                        <span className="inline-flex gap-x-1 md:gap-x-1.5 text-neutral-500 dark:text-neutral-400">
                          <span className="h-[18px] md:h-[20px] w-[14px] inline-flex items-center justify-center">
                            <Camera size={13} strokeWidth={1.5} />
                          </span>
                          <span className="uppercase">{photo.camera}</span>
                        </span>
                      </span>
                    )}
                    {photo.tags.length > 0 && (
                      <div className="flex flex-col">
                        {photo.tags.map((tag) => (
                          <span key={tag} className="group inline-flex gap-2">
                            <span className="inline-flex gap-x-1 md:gap-x-1.5 text-neutral-500 dark:text-neutral-400">
                              <span className="h-[18px] md:h-[20px] w-[14px] inline-flex items-center justify-center">
                                <Tag size={11} strokeWidth={2} />
                              </span>
                              <span className="uppercase">{tag}</span>
                            </span>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div className="space-y-1.5">
                  <div className="flex gap-x-2 md:flex-col md:justify-normal">
                    <span className="text-neutral-500 dark:text-neutral-400 uppercase">
                      <span className="hidden sm:inline-block">{formatPhotosDate(photo.date)}</span>
                      <span className="hidden xs:inline-block sm:hidden">{formatPhotosDateShort(photo.date)}</span>
                      <span className="xs:hidden">{formatPhotosDateOnly(photo.date)}</span>
                    </span>
                  </div>
                  {photo.exif && (
                    <ul className="text-neutral-500 dark:text-neutral-400 space-y-0.5 list-none p-0">
                      {photo.exif.focalLength && <li>{photo.exif.focalLength}</li>}
                      {photo.exif.aperture && <li>{photo.exif.aperture}</li>}
                      {photo.exif.shutter && <li>{photo.exif.shutter}</li>}
                      {photo.exif.iso && <li>ISO {photo.exif.iso}</li>}
                      {photo.exif.ev && <li>{photo.exif.ev}</li>}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

function PhotoGridView({
  photos,
  tags,
  cameras,
}: {
  photos: Photo[];
  tags: string[];
  cameras: { name: string; slug: string }[];
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-x-4 lg:gap-x-6 gap-y-4 max-w-7xl">
      <div className="col-span-1 md:col-span-9">
        <div className="grid grid-cols-2 xs:grid-cols-4 lg:grid-cols-5 gap-0.5 sm:gap-1">
          {photos.map((photo) => (
            <div
              key={photo.id}
              className="group relative aspect-square overflow-hidden bg-neutral-100 dark:bg-neutral-800"
            >
              <Image
                src={photo.src}
                alt={photo.title}
                fill
                className="object-cover"
                sizes="(max-width: 475px) 50vw, (max-width: 768px) 25vw, (max-width: 1024px) 20vw, 15vw"
              />
            </div>
          ))}
        </div>
      </div>
      <div className="col-span-1 md:col-span-3 hidden md:block">
        <aside className="space-y-6">
          <section>
            <div className="flex items-center gap-1.5 mb-3 text-sm font-medium">
              <Tag size={13} strokeWidth={1.5} />
              <span className="uppercase tracking-wide">Tags</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 text-xs border border-neutral-300 dark:border-neutral-800 rounded-[0.25rem]"
                >
                  {tag.toUpperCase()}
                </span>
              ))}
            </div>
          </section>
          <section>
            <div className="flex items-center gap-1.5 mb-3 text-sm font-medium">
              <Camera size={13} strokeWidth={1.5} />
              <span className="uppercase tracking-wide">Cameras</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {cameras.map((camera) => (
                <span
                  key={camera.slug}
                  className="px-2 py-0.5 text-xs border border-neutral-300 dark:border-neutral-800 rounded-[0.25rem]"
                >
                  {camera.name.toUpperCase()}
                </span>
              ))}
            </div>
          </section>
          <p className="text-neutral-500 dark:text-neutral-400 text-xs uppercase tracking-wide">
            {photos.length} photos
          </p>
        </aside>
      </div>
    </div>
  );
}