import './globals.css';
import Wrapper from '@/app/wrapper';
import { SpeedInsights } from '@vercel/speed-insights/next';
import localFont from 'next/font/local';
import { Analytics } from '@vercel/analytics/react';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Aditya Miskin',
	description:
		"I'm a software engineer living in Bengaluru, India. I’m also a hobbyist photographer travelling the world, documenting this beautiful planet of ours.",
	keywords:
		'freelancing, machine learning, ai, web development, aditya miskin, photography, travel photography, street photography, urban photography, nature photography, portfolio, india, frontend developer, software engineer, aditya, miskin',
	applicationName: 'Aditya Miskin',
	metadataBase: new URL('https://adityamiskin.com'),

	openGraph: {
		title: 'Aditya Miskin',
		description:
			"I'm a software engineer living in Bengaluru, India. I’m also a hobbyist photographer travelling the world, documenting this beautiful planet of ours.",
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
			"I'm a software engineer living in Bengaluru, India. I’m also a hobbyist photographer travelling the world, documenting this beautiful planet of ours.",
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

const jost = localFont({
	src: [
		{
			path: '../assets/fonts/Jost-400-Book.ttf',
			weight: '400',
			style: 'normal',
		},
		{
			path: '../assets/fonts/Jost-600-Semi.ttf',
			weight: '600',
			style: 'normal',
		},
	],
	variable: '--font-jost',
});

const metropolis = localFont({
	src: [
		{
			path: '../assets/fonts/Metropolis-Thin.ttf',
			weight: '100',
			style: 'normal',
		},
		{
			path: '../assets/fonts/Metropolis-Regular.ttf',
			weight: '300',
			style: 'normal',
		},
		{
			path: '../assets/fonts/Metropolis-Regular.ttf',
			weight: '400',
			style: 'normal',
		},
		{
			path: '../assets/fonts/Metropolis-RegularItalic.ttf',
			weight: '400',
			style: 'italic',
		},
		{
			path: '../assets/fonts/Metropolis-SemiBold.ttf',
			weight: '500',
			style: 'normal',
		},
		{
			path: '../assets/fonts/Metropolis-SemiBold.ttf',
			weight: '600',
			style: 'normal',
		},
	],
	variable: '--font-metropolis',
});

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<script async defer src='https://platform.twitter.com/widgets.js' />
			<link rel='icon' href='/favicon.svg' sizes='any' type='image/svg+xml' />
			<body
				className={`${jost.variable} ${metropolis.variable} ${GeistSans.variable} ${GeistMono.variable} font-body`}>
				<Analytics />
				<Wrapper>{children}</Wrapper>
				<SpeedInsights />
			</body>
		</html>
	);
}
