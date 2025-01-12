import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
	return [
		{
			url: 'https://adityamiskin.com',
			lastModified: new Date(),
			priority: 1,
		},
		{
			url: 'https://adityamiskin.com/work',
			lastModified: new Date(),
			priority: 1,
		},
		{
			url: 'https://adityamiskin.com/photo',
			lastModified: new Date(),
			priority: 1,
		},
		{
			url: 'https://adityamiskin.com/blog',
			lastModified: new Date(),
		},
		{
			url: 'https://adityamiskin.com/contact',
			lastModified: new Date(),
			priority: 0.3,
		},
	];
}
