import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { MDXRemote } from 'next-mdx-remote/rsc';

export async function generateStaticParams() {
	const blogDir = '/src/blogs';
	let files = fs.readdirSync(path.join(process.cwd(), blogDir));

	files = files.map((file) => file.replaceAll(' ', '-'));

	const paths = files.map((filename) => ({
		slug: filename.replace('.mdx', ''),
	}));

	return paths;
}

function getPost({ slug }: { slug: string }) {
	const blogDir = '/src/blogs';
	const fileName = slug.replaceAll('-', ' ');
	const markdownFile = fs.readFileSync(
		path.join(process.cwd(), `${blogDir}/${fileName}.mdx`),
		'utf-8',
	);

	const { data: frontMatter, content } = matter(markdownFile);

	return {
		frontMatter,
		slug,
		content,
	};
}

export default function Post({ params }: any) {
	const props = getPost(params);

	return (
		<article className='mx-auto my-20 prose md:prose-xl prose-p:text-lg prose-headings:text-7xl prose-headings:mt-4 prose-h2:text-center prose-h3:text-3xl prose-h3:mt-16 dark:prose-invert px-5 prose-img:rounded-md prose-p:mx-auto md:prose-img:w-[1000px] md:prose-img:h-[600px] prose-img:w-full prose-img:h-[200px]'>
			<p className='text-sm font-semibold text-center'>
				{props.frontMatter.date}
			</p>

			<MDXRemote source={props.content} />
		</article>
	);
}
