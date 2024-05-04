import './globals.css';
import Wrapper from '@/app/wrapper';
import { SpeedInsights } from '@vercel/speed-insights/next';
import localFont from 'next/font/local';

export const metadata = {
	title: 'Aditya Miskin',
	description:
		"Hi, I'm Aditya. I'm a software engineer living in Bengaluru, India. I’m also a hobbyist photographer travelling the world, documenting this beautiful planet of ours.",
	keywords:
		'freelancing, machine learning, ai, web development, aditya miskin, photography, travel photography, street photography, urban photography, nature photography, portfolio, india, frontend developer, software engineer, aditya, miskin',
	applicationName: 'Aditya Miskin',
	metadataBase: 'https://adityamiskin.com',

	openGraph: {
		title: 'Aditya Miskin',
		description:
			"Hi, I'm Aditya. I'm a software engineer living in Bengaluru, India. I’m also a hobbyist photographer travelling the world, documenting this beautiful planet of ours.",
		url: 'https://adityamiskin.com',
		siteName: 'Aditya Miskin',
		// If you add an opengraph-image.(jpg|jpeg|png|gif) image to the /app folder, you don't need the code below
		// images: [
		//   {
		//     url: `https://${config.domainName}/share.png`,
		//     width: 1200,
		//     height: 660,
		//   },
		// ],
		locale: 'en_US',
		type: 'website',
	},

	twitter: {
		title: 'Aditya Miskin',
		description:
			"Hi, I'm Aditya. I'm a software engineer living in Bengaluru, India. I’m also a hobbyist photographer travelling the world, documenting this beautiful planet of ours.",
		// If you add an twitter-image.(jpg|jpeg|png|gif) image to the /app folder, you don't need the code below
		// images: [openGraph?.image || defaults.og.image],
		card: 'summary_large_image',
		creator: '@ad1tyamiskin',
	},
};

export const renderSchemaTags = () => {
	return (
		<script
			type='application/ld+json'
			dangerouslySetInnerHTML={{
				__html: JSON.stringify({
					'@context': 'http://schema.org',
					'@type': 'SoftwareApplication',
					name: 'Aditya Miskin',
					description:
						"Hi, I'm Aditya. I'm a software engineer living in Bengaluru, India. I’m also a hobbyist photographer travelling the world, documenting this beautiful planet of ours.",
					image: `https://adityamiskin.com/icon.png`,
					url: `https://adityamiskin.com`,
					author: {
						'@type': 'Person',
						name: 'Aditya Miskin',
					},
					datePublished: '2024-08-01',
				}),
			}}></script>
	);
};

const futuraPt = localFont({
	src: [
		{
			path: '../assets/fonts/FuturaPT-Book.woff2',
			weight: '400',
			style: 'normal',
		},
		{
			path: '../assets/fonts/FuturaPT-Heavy.woff2',
			weight: '600',
			style: 'normal',
		},
	],
	variable: '--font-futura-pt',
});

const proximaNova = localFont({
	src: [
		{
			path: '@/assets/fonts/Proxima-Nova-Sbold.woff2',
			weight: '600',
			style: 'normal',
		},
		{
			path: '../assets/fonts/Proxima-Nova-Sbold.woff2',
			weight: '500',
			style: 'normal',
		},
		{
			path: '../assets/fonts/ProximaNova-Medium.woff2',
			weight: '400',
			style: 'normal',
		},
		{
			path: '../assets/fonts/ProximaNova-Thin.woff2',
			weight: '100',
			style: 'normal',
		},
		{
			path: '../assets/fonts/ProximaNova-Regular.woff2',
			weight: '300',
			style: 'normal',
		},
		{
			path: '@/assets/fonts/ProximaNova-RegularIt.woff2',
			weight: '400',
			style: 'italic',
		},
	],
	variable: '--font-proxima-nova',
});

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body className={`${futuraPt.variable} ${proximaNova.variable}`}>
				<Wrapper>{children}</Wrapper>
				<SpeedInsights />
			</body>
		</html>
	);
}
