/** @type {import('next').NextConfig} */
import createMDX from '@next/mdx';
const nextConfig = {
	pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
	typescript: {
		ignoreBuildErrors: true,
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
		],
	},
};

const withMDX = createMDX({});

// Merge MDX config with Next.js config
export default withMDX(nextConfig);
