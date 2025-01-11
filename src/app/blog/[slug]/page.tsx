import { MDXRemote } from 'next-mdx-remote/rsc';
import Img from '@/components/Img';
import TwitterEmbed from '@/components/TwitterEmbed';
import { formatDate, getBlogPosts } from '@/lib/utils';

export async function generateStaticParams() {
	let posts = getBlogPosts();

	return posts.map((post) => ({
		slug: post.slug,
	}));
}

const components = { Img, TwitterEmbed };

export default function Post({ params }: any) {
	let post = getBlogPosts().find((post) => post.slug === params.slug);

	if (!post) {
		return <div>Post not found</div>;
	}

	return (
		<article className='prose dark:prose-invert mx-auto'>
			<p className='text-sm font-semibold text-center'>
				{formatDate(post.metadata.publishedAt)}
			</p>

			<MDXRemote source={post.content} components={components} />
		</article>
	);
}
