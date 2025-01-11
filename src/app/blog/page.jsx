import BlogWrapper from './blog-wrapper';
import { getBlogPosts } from '@/lib/utils';

const Blogs = () => {
	const blogs = getBlogPosts();

	return (
		<>
			<BlogWrapper blogs={blogs} />
		</>
	);
};

export default Blogs;
