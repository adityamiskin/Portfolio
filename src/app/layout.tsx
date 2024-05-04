import './globals.css';
import Wrapper from '@/app/wrapper';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Providers } from './providers';

// export const metadata = {
// 	title: 'Aditya Miskin',
// 	description:
// 		"Hi, I'm Aditya. I'm a software engineer living in Bengaluru, India. I’m also a hobbyist photographer travelling the world, documenting this beautiful planet of ours.",
// 	keywords:
// 		'freelancing, machine learning, ai, web development, aditya miskin, photography, travel photography, street photography, urban photography, nature photography, portfolio, india, frontend developer, software engineer, aditya, miskin',
// 	applicationName: 'Aditya Miskin',
// 	metadataBase: 'https://adityamiskin.com',

// 	openGraph: {
// 		title: 'Aditya Miskin',
// 		description:
// 			"Hi, I'm Aditya. I'm a software engineer living in Bengaluru, India. I’m also a hobbyist photographer travelling the world, documenting this beautiful planet of ours.",
// 		url: 'https://adityamiskin.com',
// 		siteName: 'Aditya Miskin',
// 		// If you add an opengraph-image.(jpg|jpeg|png|gif) image to the /app folder, you don't need the code below
// 		// images: [
// 		//   {
// 		//     url: `https://${config.domainName}/share.png`,
// 		//     width: 1200,
// 		//     height: 660,
// 		//   },
// 		// ],
// 		locale: 'en_US',
// 		type: 'website',
// 	},

// 	twitter: {
// 		title: 'Aditya Miskin',
// 		description:
// 			"Hi, I'm Aditya. I'm a software engineer living in Bengaluru, India. I’m also a hobbyist photographer travelling the world, documenting this beautiful planet of ours.",
// 		// If you add an twitter-image.(jpg|jpeg|png|gif) image to the /app folder, you don't need the code below
// 		// images: [openGraph?.image || defaults.og.image],
// 		card: 'summary_large_image',
// 		creator: '@ad1tyamiskin',
// 	},
// };

// export const renderSchemaTags = () => {
// 	return (
// 		<script
// 			type='application/ld+json'
// 			dangerouslySetInnerHTML={{
// 				__html: JSON.stringify({
// 					'@context': 'http://schema.org',
// 					'@type': 'SoftwareApplication',
// 					name: 'Aditya Miskin',
// 					description:
// 						"Hi, I'm Aditya. I'm a software engineer living in Bengaluru, India. I’m also a hobbyist photographer travelling the world, documenting this beautiful planet of ours.",
// 					image: `https://adityamiskin.com/icon.png`,
// 					url: `https://adityamiskin.com`,
// 					author: {
// 						'@type': 'Person',
// 						name: 'Aditya Miskin',
// 					},
// 					datePublished: '2024-08-01',
// 				}),
// 			}}></script>
// 	);
// };

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body>
				<Providers>
					<Wrapper>{children}</Wrapper>
					<SpeedInsights />
				</Providers>
			</body>
		</html>
	);
}
