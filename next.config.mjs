/** @type {import('next').NextConfig} */
import createMDX from '@next/mdx';
const nextConfig = {
	pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
	async redirects() {
		return [{ source: '/uses', destination: '/#interests-setup', permanent: true }];
	},
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

const withMDX = createMDX({});

// Merge MDX config with Next.js config
export default withMDX(nextConfig);
