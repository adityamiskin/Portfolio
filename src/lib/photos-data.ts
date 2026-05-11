import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  secure: true,
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export interface ExifData {
  focalLength?: string;
  aperture?: string;
  shutter?: string;
  iso?: number;
  ev?: string;
}

export interface Photo {
  id: string;
  src: string;
  title: string;
  date: string;
  width: number;
  height: number;
  camera?: string;
  cameraSlug?: string;
  tags: string[];
  exif?: ExifData;
}

function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 60);
}

function toTitleCase(str: string): string {
  return str
    .split(/\s+/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ");
}

function getCameraFromFolder(folder: string): { name: string; slug: string } | undefined {
  const map: Record<string, { name: string; slug: string }> = {
    street: { name: "Fujifilm X-T30 II", slug: "fujifilm-x-t30-ii" },
    landscape: { name: "Fujifilm X-T30 II", slug: "fujifilm-x-t30-ii" },
    nature: { name: "Fujifilm X-T30 II", slug: "fujifilm-x-t30-ii" },
    portraits: { name: "Fujifilm X-T30 II", slug: "fujifilm-x-t30-ii" },
    urban: { name: "Fujifilm X-T30 II", slug: "fujifilm-x-t30-ii" },
  };
  return map[folder];
}

function getExifForPhoto(publicId: string): ExifData | undefined {
  // Some known EXIF from old data
  const knownExif: Record<string, ExifData> = {
    "nature/test8_wethqp": { focalLength: "6mm", aperture: "ƒ/2.8", shutter: "1/500s", iso: 100 },
    "street/test_hjtzaw": { focalLength: "15mm", aperture: "ƒ/3.5", shutter: "1/250s", iso: 200 },
    "landscape/nsef38tlas3myh0ildzv": { focalLength: "10mm", aperture: "ƒ/8", shutter: "1/320s", iso: 100 },
    "portraits/test3_yqykrt": { focalLength: "23mm", aperture: "ƒ/2", shutter: "1/125s", iso: 400 },
    "urban/test4_xtagby": { focalLength: "15mm", aperture: "ƒ/4", shutter: "1/60s", iso: 800 },
    "street/DSCF5059_izylhv": { focalLength: "23mm", aperture: "ƒ/2.8", shutter: "1/250s", iso: 200 },
    "street/DSCF5167_w0oxu3": { focalLength: "23mm", aperture: "ƒ/2.8", shutter: "1/500s", iso: 200 },
    "street/DSCF5134_ap7qjx": { focalLength: "23mm", aperture: "ƒ/2.8", shutter: "1/320s", iso: 200 },
    "street/DSCF5114_gqu1gy": { focalLength: "23mm", aperture: "ƒ/2.8", shutter: "1/200s", iso: 200 },
    "urban/DSCF4903_so4nmr": { focalLength: "23mm", aperture: "ƒ/4", shutter: "1/80s", iso: 400 },
    "urban/DSCF4684_2_amx9im": { focalLength: "23mm", aperture: "ƒ/4", shutter: "1/100s", iso: 200 },
    "urban/DSCF4657_jsoinl": { focalLength: "15mm", aperture: "ƒ/4", shutter: "1/60s", iso: 800 },
    "urban/test4_xtagby": { focalLength: "15mm", aperture: "ƒ/4", shutter: "1/60s", iso: 800 },
    "nature/camfkh9yqk11k3cpss72": { focalLength: "55mm", aperture: "ƒ/5.6", shutter: "1/320s", iso: 200 },
    "nature/IMG_20230627_181655_483_rpbovu": { focalLength: "6mm", aperture: "ƒ/2.8", shutter: "1/400s", iso: 100 },
    "nature/IMG_20230627_161213_639_zijls5": { focalLength: "6mm", aperture: "ƒ/2.8", shutter: "1/500s", iso: 100 },
    "nature/IMG_4323_zyigit": { focalLength: "5mm", aperture: "ƒ/2.8", shutter: "1/320s", iso: 100 },
    "street/IMG_20230626_220758_719_omhfux": { focalLength: "4mm", aperture: "ƒ/2", shutter: "1/30s", iso: 800 },
    "street/IMG_20230626_215242_984_fhpfnc": { focalLength: "5mm", aperture: "ƒ/2.8", shutter: "1/60s", iso: 400 },
    "landscape/IMG_20230627_181703_651_fwvtyw": { focalLength: "6mm", aperture: "ƒ/8", shutter: "1/250s", iso: 100 },
    "landscape/IMG_20230626_204602_413_jfr8t7": { focalLength: "5mm", aperture: "ƒ/2.8", shutter: "1/60s", iso: 400 },
    "landscape/IMG_5329_ydugbu": { focalLength: "55mm", aperture: "ƒ/5.6", shutter: "1/1000s", iso: 200 },
    "landscape/IMG_5457_io4yrn": { focalLength: "6mm", aperture: "ƒ/8", shutter: "1/320s", iso: 100 },
    "landscape/IMG_4792_eetv5m": { focalLength: "10mm", aperture: "ƒ/8", shutter: "1/400s", iso: 100 },
    "portraits/IMG_20230627_161205_165_fxek47": { focalLength: "55mm", aperture: "ƒ/4", shutter: "1/125s", iso: 200 },
    "portraits/IMG_20230627_143545_797_onv1fp": { focalLength: "5mm", aperture: "ƒ/2.8", shutter: "1/60s", iso: 400 },
    "portraits/IMG_20230626_195628_445_mm200y": { focalLength: "5mm", aperture: "ƒ/2.8", shutter: "1/30s", iso: 800 },
    "urban/IMG_20230626_143812_171_rtgyto": { focalLength: "5mm", aperture: "ƒ/2.8", shutter: "1/100s", iso: 200 },
  };
  return knownExif[publicId];
}

let cachedPhotos: Promise<Photo[]> | null = null;

export async function fetchPhotos(): Promise<Photo[]> {
  if (cachedPhotos) return cachedPhotos;

  cachedPhotos = (async () => {
    const result = await cloudinary.api.resources({
      type: "upload",
      max_results: 100,
      metadata: true,
      context: true,
      tags: true,
    });

    const photos: Photo[] = [];

    for (const r of result.resources) {
      // Skip samples and non-photo assets
      const publicId = r.public_id;
      if (publicId.startsWith("cld-sample")) continue;
      if (publicId === "sample") continue;
      if (publicId === "profile_bhu0aw") continue;
      if (publicId === "ocpnyqzz9zvna37wugnr") continue;
      if (publicId.startsWith("IMG_") && !r.context?.custom?.caption) continue;

      const caption = r.context?.custom?.caption || "";
      const alt = r.context?.custom?.alt || "";
      const folder = r.folder || "";
      const tags: string[] = r.tags || [];

      const camera = getCameraFromFolder(folder);
      const cameraName = camera?.name || "Canon IXUS 120";
      const cameraSlug = camera?.slug || "canon-ixus-120";

      // Build tags: folder as category, plus Cloudinary tags
      const photoTags: string[] = [];
      if (folder) {
        photoTags.push(toTitleCase(folder));
      }
      for (const tag of tags) {
        if (tag && tag !== "imgs" && tag !== "samples" && tag !== "breakfast" && tag !== "food" && tag !== "basketball" && tag !== "sport" && tag !== "dog" && tag !== "girl" && tag !== "mountains" && tag !== "snow") {
          photoTags.push(toTitleCase(tag));
        }
      }

      photos.push({
        id: slugify(caption || publicId.split("/").pop() || publicId),
        src: r.secure_url,
        title: caption || toTitleCase((publicId.split("/").pop() || publicId).replace(/[_-]/g, " ")),
        date: r.created_at,
        width: r.width,
        height: r.height,
        camera: cameraName,
        cameraSlug: cameraSlug,
        tags: photoTags,
        exif: getExifForPhoto(publicId),
      });
    }

    // Sort by date descending
    photos.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    return photos;
  })();

  return cachedPhotos;
}

export async function getAllTags(): Promise<string[]> {
  const photos = await fetchPhotos();
  const tags = new Set<string>();
  photos.forEach((p) => p.tags.forEach((t) => tags.add(t)));
  return Array.from(tags).sort();
}

export async function getAllCameras(): Promise<{ name: string; slug: string }[]> {
  const photos = await fetchPhotos();
  const cameras = new Map<string, string>();
  photos.forEach((p) => {
    if (p.camera && p.cameraSlug) cameras.set(p.cameraSlug, p.camera);
  });
  return Array.from(cameras.entries())
    .map(([slug, name]) => ({ slug, name }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

export async function getPhotosByTag(tag: string): Promise<Photo[]> {
  const photos = await fetchPhotos();
  return photos.filter((p) =>
    p.tags.some((t) => t.toLowerCase() === tag.toLowerCase())
  );
}

export async function getPhotosByCamera(cameraSlug: string): Promise<Photo[]> {
  const photos = await fetchPhotos();
  return photos.filter(
    (p) => p.cameraSlug?.toLowerCase() === cameraSlug.toLowerCase()
  );
}

export async function getPhotoById(id: string): Promise<Photo | undefined> {
  const photos = await fetchPhotos();
  return photos.find((p) => p.id === id);
}

export async function getAdjacentPhotos(id: string): Promise<{ prev?: Photo; next?: Photo }> {
  const photos = await fetchPhotos();
  const index = photos.findIndex((p) => p.id === id);
  if (index === -1) return {};
  return {
    prev: index > 0 ? photos[index - 1] : undefined,
    next: index < photos.length - 1 ? photos[index + 1] : undefined,
  };
}