import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import fs from 'fs';
import path from 'path';

type Metadata = {
	title: string;
	publishedAt: string;
	image?: string;
	description?: string;
	tags: Array<string>;
};

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

function parseFrontmatter(fileContent: string) {
	let frontmatterRegex = /---\s*([\s\S]*?)\s*---/;
	let match = frontmatterRegex.exec(fileContent);
	let frontMatterBlock = match![1];
	let content = fileContent.replace(frontmatterRegex, '').trim();
	let frontMatterLines = frontMatterBlock.trim().split('\n');
	let metadata: Partial<Metadata> = {};

	frontMatterLines.forEach((line) => {
		let [key, ...valueArr] = line.split(': ');
		let value = valueArr.join(': ').trim();
		value = value.replace(/^['"](.*)['"]$/, '$1'); // Remove quotes
		if (key.trim() === 'tags') {
			metadata.tags = value
				.split(',')
				.map((tag) => tag.trim());
		} else {
			metadata[key.trim() as keyof Metadata] = value as any;
		}
	});

	return { metadata: metadata as Metadata, content };
}

function getMDXFiles(dir: string) {
	return fs.readdirSync(dir).filter((file) => path.extname(file) === '.mdx');
}

function readMDXFile(filePath: string) {
	let rawContent = fs.readFileSync(filePath, 'utf-8');
	return parseFrontmatter(rawContent);
}

function getMDXData(dir: string) {
	let mdxFiles = getMDXFiles(dir);
	return mdxFiles.map((file) => {
		let { metadata, content } = readMDXFile(path.join(dir, file));
		let slug = path.basename(file, path.extname(file));

		return {
			metadata,
			slug,
			content,
		};
	});
}

export function getBlogPosts() {
	return getMDXData(path.join(process.cwd(), 'src', 'app', 'blog', 'posts'));
}

export function formatDate(date: string, includeRelative = false) {
	if (!date.includes('T')) {
		date = `${date}T00:00:00`;
	}
	let targetDate = new Date(date);

	let fullDate = targetDate.toLocaleString('en-us', {
		month: 'long',
		day: 'numeric',
		year: 'numeric',
	});

	if (!includeRelative) {
		return fullDate;
	}

	// Only calculate relative time when includeRelative is true
	let currentDate = new Date();
	let yearsAgo = currentDate.getFullYear() - targetDate.getFullYear();
	let monthsAgo = currentDate.getMonth() - targetDate.getMonth();
	let daysAgo = currentDate.getDate() - targetDate.getDate();

	let formattedDate = '';

	if (yearsAgo > 0) {
		formattedDate = `${yearsAgo}y ago`;
	} else if (monthsAgo > 0) {
		formattedDate = `${monthsAgo}mo ago`;
	} else if (daysAgo > 0) {
		formattedDate = `${daysAgo}d ago`;
	} else {
		formattedDate = 'Today';
	}

	return `${fullDate} (${formattedDate})`;
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
