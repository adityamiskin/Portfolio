import portfolio from "@/data/portfolio.json";

function driveFileId(url: string): string | null {
  const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
  return match?.[1] ?? null;
}

/** First-page render URL for the Drive résumé PDF (safe to preload). */
export function getResumePreviewUrl(resumeUrl = portfolio.resumeUrl): string | null {
  if (!resumeUrl) return null;
  const fileId = driveFileId(resumeUrl);
  return fileId ? `https://lh3.googleusercontent.com/d/${fileId}=w720` : null;
}

let resumePrefetchPromise: Promise<void> | null = null;

/** Warm the browser cache for the résumé preview image. */
export function prefetchResumePreview(src = getResumePreviewUrl()): Promise<void> {
  if (!src || typeof window === "undefined") return Promise.resolve();
  if (!resumePrefetchPromise) {
    resumePrefetchPromise = new Promise((resolve) => {
      const img = new Image();
      img.decoding = "async";
      img.onload = () => resolve();
      img.onerror = () => resolve();
      img.src = src;
      if (img.complete) resolve();
    });
  }
  return resumePrefetchPromise;
}
