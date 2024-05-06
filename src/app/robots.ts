import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
	return {
		rules: {
			userAgent: '*',
			allow: '/',
			disallow: [
				'photo/portraits/',
				'photo/landscapes/',
				'photo/urban/',
				'photo/street/',
				'photo/nature/',
			],
		},
		sitemap: 'https://adityamiskin.com/sitemap.xml',
	};
}
