import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
	return [
		{
			url: 'https://adityamiskin.com',
			lastModified: new Date(),
			priority: 1,
		},
		{
			url: 'https://adityamiskin.com/projects',
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
	];
}
