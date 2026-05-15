import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
	return {
		rules: {
			userAgent: '*',
			allow: '/',
			disallow: ['/photos/'],
		},
		sitemap: 'https://adityamiskin.com/sitemap.xml',
	};
}
