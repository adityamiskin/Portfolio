export default function manifest() {
	return {
		name: 'Aditya Miskin',
		short_name: 'Aditya Miskin',
		description: "I'm a software engineer living in Bengaluru, IN. I’m also a hobbyist photographer travelling the world, documenting this beautiful planet of ours.",
		start_url: '/',
		display: 'standalone',
		background_color: '#fbfbfb',
		theme_color: '#fbfbfb',
		icons: [
			{
				src: '/favicon.ico',
				sizes: 'any',
				type: 'image/x-icon',
			},
		],
	};
}
