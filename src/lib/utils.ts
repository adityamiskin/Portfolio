import { clsx, type ClassValue } from 'clsx';
import { format, isValid, parse, parseISO } from 'date-fns';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

const BLOG_PARSE_REFERENCE = new Date(2000, 0, 1);
const BLOG_PARSE_FORMATS = ['MMMM d, yyyy', 'MMM d, yyyy', 'yyyy-MM-dd'] as const;

function blogDateCandidates(raw: string): string[] {
	const s = raw.trim();
	const capFirstWord = s.replace(
		/^([a-zA-Z]+)/,
		(w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase(),
	);
	const capWords = s.replace(/\b[a-z]+\b/gi, (w) =>
		w.charAt(0).toUpperCase() + w.slice(1).toLowerCase(),
	);
	return [...new Set([s, capFirstWord, capWords])];
}

/** Parses publishedAt strings from MDX (ISO, “December 25, 2025”, “dec 27, 2025”, etc.). */
export function parseBlogPublishedDate(raw: string): Date | null {
	const s = raw.trim();

	if (/^\d{4}-\d{2}-\d{2}/.test(s)) {
		const iso = parseISO(s);
		if (isValid(iso)) return iso;
	}

	for (const candidate of blogDateCandidates(raw)) {
		for (const fmt of BLOG_PARSE_FORMATS) {
			const d = parse(candidate, fmt, BLOG_PARSE_REFERENCE);
			if (isValid(d)) return d;
		}
	}

	return null;
}

/** Display date as month day, year (e.g. December 27, 2025). Post pages. */
export function formatBlogDate(raw: string): string {
	const d = parseBlogPublishedDate(raw);
	if (!d || !isValid(d)) return raw.trim();
	return format(d, 'MMMM d, yyyy');
}

/** Listing: abbreviated lowercase month (e.g. dec 27, 2025). */
export function formatBlogDateShort(raw: string): string {
	const d = parseBlogPublishedDate(raw);
	if (!d || !isValid(d)) return raw.trim().toLowerCase();
	return format(d, 'MMM d, yyyy').toLowerCase();
}

/** Blog listing rows (abbreviated lowercase date). */
export function formatDate(raw: string): string {
	return formatBlogDateShort(raw);
}

export function getBlogReadingMinutes(content: string): number {
	const words = content.trim().split(/\s+/).filter(Boolean).length;
	return Math.max(1, Math.round(words / 200));
}

/**
 * Generates an optimized Cloudinary URL with automatic format and quality optimization
 * @param url - The original Cloudinary URL (with or without existing transformations)
 * @param options - Optimization options
 * @returns Optimized Cloudinary URL
 */
export function getOptimizedCloudinaryUrl(
	url: string,
	options: {
		width?: number;
		height?: number;
		quality?: 'auto' | number;
		format?: 'auto' | 'webp' | 'avif' | 'jpg' | 'png';
		crop?: 'scale' | 'limit' | 'fill' | 'fit';
	} = {}
): string {
	if (!url || !url.includes('cloudinary.com')) {
		return url;
	}

	const {
		width,
		height,
		quality = 'auto',
		format = 'auto',
		crop = 'limit',
	} = options;

	// Parse the Cloudinary URL
	// Format: https://res.cloudinary.com/{cloud_name}/image/upload/{transformations}/{version}/{public_id}.{format}
	const urlParts = url.split('/upload/');
	if (urlParts.length !== 2) {
		return url;
	}

	const baseUrl = urlParts[0];
	const afterUpload = urlParts[1];

	// Extract the public ID and version
	// Cloudinary URL structure: {transformations}/{version}/{public_id}
	// Version pattern: v{number}/
	const versionMatch = afterUpload.match(/\/v(\d+)\/(.+)/);
	
	const version = versionMatch ? `v${versionMatch[1]}/` : '';
	const publicId = versionMatch ? versionMatch[2] : afterUpload;

	// Build new transformation parameters (replacing any existing ones)
	const transformations: string[] = [];

	// Crop mode
	if (crop === 'limit') {
		transformations.push('c_limit');
	} else if (crop === 'scale') {
		transformations.push('c_scale');
	} else if (crop === 'fill') {
		transformations.push('c_fill');
	} else if (crop === 'fit') {
		transformations.push('c_fit');
	}

	// Width
	if (width) {
		transformations.push(`w_${width}`);
	}

	// Height
	if (height) {
		transformations.push(`h_${height}`);
	}

	// Format (f_auto for automatic format selection - AVIF/WebP)
	if (format === 'auto') {
		transformations.push('f_auto');
	} else {
		transformations.push(`f_${format}`);
	}

	// Quality (q_auto for automatic quality optimization)
	if (quality === 'auto') {
		transformations.push('q_auto');
	} else {
		transformations.push(`q_${quality}`);
	}

	// Construct the optimized URL
	const transformationString = transformations.join(',');
	const versionPart = version || '';
	return `${baseUrl}/upload/${transformationString}/${versionPart}${publicId}`;
}
