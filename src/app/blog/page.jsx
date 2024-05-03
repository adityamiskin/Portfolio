import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import BlogWrapper from './blog-wrapper';

const Blogs = () => {
	const blogDir = '/src/content';
	const files = fs.readdirSync(path.join(process.cwd(), blogDir));

	const blogs = files.map((filename) => {
		let fileContent = fs.readFileSync(
			path.join(process.cwd(), `${blogDir}/${filename}`),
			'utf-8',
		);
		const { data: frontMatter } = matter(fileContent);
		return {
			meta: frontMatter,
			slug: filename.replace('.mdx', '').toLowerCase().replaceAll(' ', '-'),
		};
	});

	return (
		<>
			{/* <h2 className='fixed top-1/2 w-full text-center text-3xl tracking-wider font-semibold'>
				COMING SOON...
			</h2> */}
			<BlogWrapper blogs={blogs} />
		</>
	);
};

export default Blogs;
