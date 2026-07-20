/**
 * Default source: /tmp/camera-reference.jpg — override with CAMERA_JPEG=/path/to.jpg
 *
 * ICON_AS_IS=1 — full image scaled with `fit: "contain"` (no crop or color tweaks).
 * Rounded clipping is applied in every mode.
 *
 * Without ICON_AS_IS: centered crop + nearest-neighbor resize (pixel-style icons).
 *
 * ICON_FILL — (non–as-is only) centered square crop fraction (0–1). Default ~0.75.
 */
import sharp from "sharp";
import { existsSync } from "fs";
import { execSync } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const defaultSrc = process.env.CAMERA_JPEG ?? "/tmp/camera-reference.jpg";

/** Empty string = standard names (`icon.png`). Set `ICON_SUFFIX=-alt` → `icon-alt.png`. */
const iconSuffix = process.env.ICON_SUFFIX ?? "";

const iconAsIs = /^(1|true|yes)$/i.test(process.env.ICON_AS_IS ?? "");

/** @param {string} fileName e.g. "icon.png", "favicon.ico" */
function publicPath(fileName) {
  if (!iconSuffix) {
    return path.join(root, "public", fileName);
  }
  const ext = path.extname(fileName);
  const base = path.basename(fileName, ext);
  return path.join(root, "public", `${base}${iconSuffix}${ext}`);
}

/** @param {string} srcPath */
async function zoomedSourcePipeline(srcPath) {
  const fill = Math.min(1, Math.max(0.28, parseFloat(process.env.ICON_FILL ?? "0.75")));
  const meta = await sharp(srcPath).metadata();
  const w = meta.width;
  const h = meta.height;
  if (!w || !h) {
    throw new Error("Could not read image dimensions");
  }
  if (fill >= 0.999) {
    return sharp(srcPath);
  }
  const cw = Math.round(w * fill);
  const ch = Math.round(h * fill);
  const left = Math.round((w - cw) / 2);
  const top = Math.round((h - ch) / 2);
  return sharp(srcPath).extract({ left, top, width: cw, height: ch });
}

function readSource() {
  if (!existsSync(defaultSrc)) {
    console.error(`Missing image: ${defaultSrc}`);
    console.error("Set CAMERA_JPEG to your source JPG path.");
    process.exit(1);
  }
  return defaultSrc;
}

/** Rounded-square alpha mask (`dest-in`); same geometry for every output size. */
function roundedMaskSvg(size) {
  const r = Math.max(2, Math.round(size * 0.185));
  return Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}">` +
      `<rect width="${size}" height="${size}" rx="${r}" ry="${r}" fill="white"/>` +
      "</svg>",
  );
}

async function roundedSquare(srcPath, outPath, size) {
  const svg = roundedMaskSvg(size);

  const base = await zoomedSourcePipeline(srcPath);
  await base
    .resize(size, size, { kernel: sharp.kernel.nearest })
    .ensureAlpha()
    .composite([{ input: svg, blend: "dest-in" }])
    .png()
    .toFile(outPath);
}

/** Full-frame scale (`contain`), then same rounded clip as `roundedSquare`. */
async function resizedAsIsRounded(srcPath, outPath, size) {
  const svg = roundedMaskSvg(size);

  await sharp(srcPath)
    .resize(size, size, {
      fit: "contain",
      position: "centre",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .ensureAlpha()
    .composite([{ input: svg, blend: "dest-in" }])
    .png()
    .toFile(outPath);
}

async function main() {
  const src = readSource();

  const jobs = [
    [publicPath("icon.png"), 512],
    [publicPath("apple-icon.png"), 180],
    [publicPath("android-chrome-192x192.png"), 192],
    [publicPath("android-chrome-512x512.png"), 512],
    [publicPath("favicon-32x32.png"), 32],
    [publicPath("favicon-16x16.png"), 16],
    [publicPath("mstile-150x150.png"), 150],
  ];

  for (const [dest, sz] of jobs) {
    if (iconAsIs) {
      await resizedAsIsRounded(src, dest, sz);
    } else {
      await roundedSquare(src, dest, sz);
    }
    console.log("wrote", dest, sz);
  }

  const f16 = publicPath("favicon-16x16.png");
  const f32 = publicPath("favicon-32x32.png");
  const icoOut = publicPath("favicon.ico");
  execSync(`magick "${f16}" "${f32}" "${icoOut}"`, { stdio: "inherit" });
  console.log("wrote", icoOut);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
