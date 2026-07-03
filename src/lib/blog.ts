import fs from 'node:fs';
import path from 'node:path';
import { parseBlogPublishedDate } from '@/lib/utils';

type Metadata = {
	title: string;
	publishedAt: string;
	image?: string;
	description?: string;
};

function parseFrontmatter(fileContent: string) {
	const frontmatterRegex = /---\s*([\s\S]*?)\s*---/;
	const match = frontmatterRegex.exec(fileContent);
	const frontMatterBlock = match![1];
	const content = fileContent.replace(frontmatterRegex, '').trim();
	const frontMatterLines = frontMatterBlock.trim().split('\n');
	const metadata: Partial<Metadata> = {};

	frontMatterLines.forEach((line) => {
		const [key, ...valueArr] = line.split(': ');
		let value = valueArr.join(': ').trim();
		value = value.replace(/^['](.*)[']$|^[\"](.*)[\"]$/, '$1$2');
		metadata[key.trim() as keyof Metadata] = value as any;
	});

	return { metadata: metadata as Metadata, content };
}

function getMDXFiles(dir: string) {
	return fs.readdirSync(dir).filter((file) => path.extname(file) === '.mdx');
}

function readMDXFile(filePath: string) {
	const rawContent = fs.readFileSync(filePath, 'utf-8');
	return parseFrontmatter(rawContent);
}

function getMDXData(dir: string) {
	const mdxFiles = getMDXFiles(dir);
	return mdxFiles.map((file) => {
		const { metadata, content } = readMDXFile(path.join(dir, file));
		const slug = path.basename(file, path.extname(file));

		return {
			metadata,
			slug,
			content,
		};
	});
}

/** MDX posts at repo root `posts/`; dynamic imports use `@posts/<slug>.mdx` → same files. */
const BLOG_POSTS_DIR = path.join(process.cwd(), 'posts');

export function getBlogPosts() {
	const posts = getMDXData(BLOG_POSTS_DIR);
	return [...posts].sort((a, b) => {
		const ta = parseBlogPublishedDate(a.metadata.publishedAt)?.getTime() ?? 0;
		const tb = parseBlogPublishedDate(b.metadata.publishedAt)?.getTime() ?? 0;
		return tb - ta;
	});
}

/** Published MDX posts, newest first (same source as the blog index). */
export function getPublishedPosts() {
	return getBlogPosts();
}
