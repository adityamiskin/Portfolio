/**
 * Nearest-neighbor resize + rounded corners for favicon assets.
 * Default source: /tmp/camera-reference.jpg — override with CAMERA_JPEG=/path/to.jpg
 *
 * ICON_FILL — fraction of source width/height kept in a centered square crop (0–1).
 * Lower = zoom in (camera fills more of the icon). Default ~0.75 balances source padding vs tab size.
 */
import sharp from "sharp";
import { existsSync } from "fs";
import { execSync } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const defaultSrc = process.env.CAMERA_JPEG ?? "/tmp/camera-reference.jpg";

/** @param {string} srcPath */
async function zoomedSourcePipeline(srcPath) {
	const fill = Math.min(
		1,
		Math.max(0.28, parseFloat(process.env.ICON_FILL ?? "0.75")),
	);
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

async function roundedSquare(srcPath, outPath, size) {
	const r = Math.max(2, Math.round(size * 0.185));
	const svg = Buffer.from(
		`<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}">` +
			`<rect width="${size}" height="${size}" rx="${r}" ry="${r}" fill="white"/>` +
			"</svg>",
	);

	const base = await zoomedSourcePipeline(srcPath);
	await base
		.resize(size, size, { kernel: sharp.kernel.nearest })
		.ensureAlpha()
		.composite([{ input: svg, blend: "dest-in" }])
		.png()
		.toFile(outPath);
}

async function main() {
	const src = readSource();

	const jobs = [
		[path.join(root, "public/icon.png"), 512],
		[path.join(root, "public/apple-icon.png"), 180],
		[path.join(root, "public/android-chrome-192x192.png"), 192],
		[path.join(root, "public/android-chrome-512x512.png"), 512],
		[path.join(root, "public/favicon-32x32.png"), 32],
		[path.join(root, "public/favicon-16x16.png"), 16],
		[path.join(root, "public/mstile-150x150.png"), 150],
	];

	for (const [dest, sz] of jobs) {
		await roundedSquare(src, dest, sz);
		console.log("wrote", dest, sz);
	}

	const f16 = path.join(root, "public/favicon-16x16.png");
	const f32 = path.join(root, "public/favicon-32x32.png");
	const icoOut = path.join(root, "public/favicon.ico");
	execSync(`magick "${f16}" "${f32}" "${icoOut}"`, { stdio: "inherit" });
	console.log("wrote", icoOut);
}

main().catch((e) => {
	console.error(e);
	process.exit(1);
});
