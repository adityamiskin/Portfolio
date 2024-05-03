/** @type {import('next').NextConfig} */
import createMDX from '@next/mdx';
const nextConfig = {
	output: 'export',
	pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
	typescript: {
		ignoreBuildErrors: true,
	},
	images: {
		unoptimized: true,
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'res.cloudinary.com',
				port: '',
				pathname: '/vite-img/image/upload/**',
			},
			{
				protocol: 'https',
				hostname: 'images.ctfassets.net',
				port: '',
				pathname: '/**',
			},
		],
	},
};
const withMDX = createMDX({
	// Add markdown plugins here, as desired
});

// Merge MDX config with Next.js config
export default withMDX(nextConfig);
