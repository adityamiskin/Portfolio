/** @type {import('next').NextConfig} */
import createMDX from '@next/mdx';
const nextConfig = {
	pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
	typescript: {
		ignoreBuildErrors: true,
	},
	async headers() {
		return [
			{
				source: '/favicon.ico',
				headers: [
					{ key: 'Cache-Control', value: 'public, max-age=0, must-revalidate' },
				],
			},
			{
				source: '/icon.png',
				headers: [
					{ key: 'Cache-Control', value: 'public, max-age=0, must-revalidate' },
				],
			},
			{
				source: '/apple-icon.png',
				headers: [
					{ key: 'Cache-Control', value: 'public, max-age=0, must-revalidate' },
				],
			},
		];
	},
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'res.cloudinary.com',
				pathname: '/vite-img/image/upload/**',
			},
			{
				protocol: 'https',
				hostname: 'images.ctfassets.net',
				pathname: '/**',
			},
			{
				protocol: 'https',
				hostname: 'techcrunch.com',
				pathname: '/wp-content/uploads/**',
			},
			{ protocol: 'https', hostname: 'pbs.twimg.com' },
			{ protocol: 'https', hostname: 'abs.twimg.com' },
			{ protocol: 'https', hostname: 'picsum.photos' },
			{
				protocol: 'https',
				hostname: 'g4uc5cphcl.ufs.sh',
				pathname: '/**',
			},
		],
	},
};

// Use plugin names (strings) so options are serializable for Turbopack.
const withMDX = createMDX({
	options: {
		remarkPlugins: ['remark-frontmatter'],
		rehypePlugins: [],
	},
});

export default withMDX(nextConfig);
