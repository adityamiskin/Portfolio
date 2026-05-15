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
			url: 'https://adityamiskin.com/projects',
			lastModified: new Date(),
			priority: 1,
		},
		{
			url: 'https://adityamiskin.com/photos',
			lastModified: new Date(),
			priority: 1,
		},
		{
			url: 'https://adityamiskin.com/blog',
			lastModified: new Date(),
		},
	];
}
