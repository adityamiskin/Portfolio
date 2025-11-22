export default function manifest() {
	return {
		name: 'Aditya Miskin',
		short_name: 'Aditya Miskin',
		description: "Passionate about creating meaningful software and exploring new technologies. I love building products that solve real problems and make people's lives better. When I'm not coding, you'll usually find me out with my camera, capturing moments and places that inspire me.",
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
