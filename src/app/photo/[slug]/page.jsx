import React from 'react';
import Carousel from '@/components/Carousel';
import { lazy, Suspense } from 'react';
import Spinner from '@/components/Spinner';

export async function generateStaticParams() {
	const imageTypes = ['Street', 'Landscape', 'Nature', 'Portraits', 'Urban'];
	let lowerCaseArr = imageTypes.map(function (item) {
		return item.toLowerCase();
	});
	return lowerCaseArr.map((imgType) => ({
		slug: imgType,
	}));
}

const page = ({ params }) => {
	const street = [
		{
			img: 'https://res.cloudinary.com/vite-img/image/upload/c_scale,q_80,w_1000/v1704632731/test_hjtzaw.webp',
			img_phone:
				'https://res.cloudinary.com/vite-img/image/upload/c_scale,q_80,w_1000/v1704632731/test_hjtzaw.webp',
			title: 'Lone cycle',
			description:
				'A cycle parked on the streets of Mumbai. Shot on Fujifilm X-T30II.',
		},
		{
			img: 'https://res.cloudinary.com/vite-img/image/upload/c_scale,q_80,w_1000/v1697995113/IMG_20230626_215242_984_fhpfnc.webp',
			img_phone:
				'https://res.cloudinary.com/vite-img/image/upload/c_scale,q_80,w_1000/v1697995113/IMG_20230626_215242_984_fhpfnc.webp',
			title: 'Funky Mona Lisa',
			description:
				'A funky art piece on the streets of Kasol. Taken on Canon IXUS 120.',
		},
		{
			img: 'https://res.cloudinary.com/vite-img/image/upload/c_scale,q_80,w_1000/v1704634247/DSCF5114_gqu1gy.webp',
			img_phone:
				'https://res.cloudinary.com/vite-img/image/upload/c_scale,q_80,w_1000/v1704634247/DSCF5114_gqu1gy.webp',
			title: 'Mumbai Hustle',
			description:
				'A Man sitting on a bench in Mumbai. Shot on Fujifilm X-T30II.',
		},
		{
			img: 'https://res.cloudinary.com/vite-img/image/upload/c_scale,q_80,w_1000/v1697995114/IMG_20230626_220758_719_omhfux.webp',
			img_phone:
				'https://res.cloudinary.com/vite-img/image/upload/c_scale,q_80,w_1000/v1697995114/IMG_20230626_220758_719_omhfux.webp',
			title: 'Waiting for metro',
			description: 'A man waiting for metro at Delhi metro station.',
		},

		{
			img: 'https://res.cloudinary.com/vite-img/image/upload/c_scale,q_80,w_1000/v1704634255/DSCF5134_ap7qjx.webp',
			img_phone:
				'https://res.cloudinary.com/vite-img/image/upload/c_scale,q_80,w_1000/v1704634255/DSCF5134_ap7qjx.webp',
			title: 'Moongfali',
			description: 'A "moongfali" seller on the streets of Mumbai.',
		},
		{
			img: 'https://res.cloudinary.com/vite-img/image/upload/c_scale,q_80,w_1000/v1704634255/DSCF5167_w0oxu3.webp',
			img_phone:
				'https://res.cloudinary.com/vite-img/image/upload/c_scale,q_80,w_1000/v1704634255/DSCF5167_w0oxu3.webp',
			title: 'Fancy a Gola?',
			description: 'A woman selling "gola" on the streets of Mumbai.',
		},
		{
			img: 'https://res.cloudinary.com/vite-img/image/upload/c_scale,q_80,w_1000/v1704647622/DSCF5059_izylhv.webp',
			img_phone:
				'https://res.cloudinary.com/vite-img/image/upload/c_scale,q_80,w_1000/v1704647622/DSCF5059_izylhv.webp',
			title: 'A Mumbai Cab.',
			description: '',
		},
	];
	const landscape = [
		{
			img: 'https://res.cloudinary.com/vite-img/image/upload/c_scale,q_80,w_1000/v1697995108/IMG_5329_ydugbu.webp',
			img_phone:
				'https://res.cloudinary.com/vite-img/image/upload/c_scale,q_80,w_1000/v1697995108/IMG_5329_ydugbu.webp',
			title: 'Mighty Eagle',
			description:
				'An eagle flying in the sky in Himachal Pradesh. Shot on Canon IXUS 120.',
		},
		{
			img: 'https://res.cloudinary.com/vite-img/image/upload/c_scale,q_80,w_1000/v1697995108/IMG_5457_io4yrn.webp',
			img_phone:
				'https://res.cloudinary.com/vite-img/image/upload/c_scale,q_80,w_1000/v1697995108/IMG_5457_io4yrn.webp',
			title: 'Cute house',
			description: 'A snap of a cute house in Sissu.',
		},
		{
			img: 'https://res.cloudinary.com/vite-img/image/upload/c_scale,q_80,w_1000/v1697995112/IMG_20230626_204602_413_jfr8t7.webp',
			img_phone:
				'https://res.cloudinary.com/vite-img/image/upload/c_scale,q_80,w_1000/v1697995112/IMG_20230626_204602_413_jfr8t7.webp',
			title: 'Bulb in the sky',
			description:
				"A close-up shot of a bulb at Parvati's lap in Himachal. Taken on Canon IXUS 120.",
		},
		{
			img: 'https://res.cloudinary.com/vite-img/image/upload/c_scale,q_80,w_1000/v1697995149/IMG_20230627_161221_997_wkljdb.webp',
			img_phone:
				'https://res.cloudinary.com/vite-img/image/upload/c_scale,q_80,w_1000/v1697995149/IMG_20230627_161221_997_wkljdb.webp',
			title: 'Sur Pass Mountain',
			description: 'A shot of sur pass trek in Kasol.',
		},
		{
			img: 'https://res.cloudinary.com/vite-img/image/upload/c_scale,q_80,w_1000/v1697995109/IMG_20230626_155050_238_lnsx65.webp',
			img_phone:
				'https://res.cloudinary.com/vite-img/image/upload/c_scale,q_80,w_1000/v1697995109/IMG_20230626_155050_238_lnsx65.webp',
			title: 'Sissu Monastery',
			description:
				'A picture of Sissu Monastery with icy mountains in the background. Shot on Canon IXUS 120.',
		},
		{
			img: 'https://res.cloudinary.com/vite-img/image/upload/c_scale,q_80,w_1000/v1697995150/IMG_20230627_181713_869_z9elkk.webp',
			img_phone:
				'https://res.cloudinary.com/vite-img/image/upload/c_scale,q_80,w_1000/v1697995150/IMG_20230627_181713_869_z9elkk.webp',
			title: 'Distant Horizon',
			description:
				'A generic picture of mountains in the distance in Himachal.',
		},
	];
	const nature = [
		{
			img: 'https://res.cloudinary.com/vite-img/image/upload/c_scale,q_80,w_1000/v1697995106/IMG_4323_zyigit.webp',
			img_phone:
				'https://res.cloudinary.com/vite-img/image/upload/c_scale,q_80,w_1000/v1697995106/IMG_4323_zyigit.webp',
			title: 'Lush Green, Kasol',
			description: 'A picture of forest in Kasol. Taken on Canon IXUS 120.',
		},
		{
			img: 'https://res.cloudinary.com/vite-img/image/upload/c_scale,q_80,w_1000/v1697995154/IMG_20230627_181655_483_rpbovu.webp',
			img_phone:
				'https://res.cloudinary.com/vite-img/image/upload/c_scale,q_80,w_1000/v1697995154/IMG_20230627_181655_483_rpbovu.webp',
			title: 'Kheerganga Forest, Himachal Pradesh',
			description: 'A picture of Kheerganga Forest in Himachal Pradesh.',
		},
		{
			img: 'https://res.cloudinary.com/vite-img/image/upload/c_scale,q_81,w_1000/v1697995135/IMG_20230627_161213_639_zijls5.webp',
			img_phone:
				'https://res.cloudinary.com/vite-img/image/upload/c_scale,q_81,w_800/v1697995135/IMG_20230627_161213_639_zijls5.webp',
			title: 'Father and Son, Kheerganga Peak',
			description: 'Couple of horses eating grass in Himachal Pradesh.',
		},
		{
			img: 'https://res.cloudinary.com/vite-img/image/upload/c_scale,q_82,w_1000/v1697995126/IMG_20230627_143518_831_1_hvndpw.webp',
			img_phone:
				'https://res.cloudinary.com/vite-img/image/upload/c_scale,q_82,w_800/v1697995126/IMG_20230627_143518_831_1_hvndpw.webp',
			title: 'Sheep Herding, Sissu',
			description:
				'A bunch of sheep being herded in Sissu, Himachal Pradesh. Shot on Canon IXUS 120.',
		},
		{
			img: 'https://res.cloudinary.com/vite-img/image/upload/c_scale,q_82,w_1000/v1712488680/camfkh9yqk11k3cpss72.jpg',
			img_phone:
				'https://res.cloudinary.com/vite-img/image/upload/c_scale,q_82,w_800/v1712488680/camfkh9yqk11k3cpss72.jpg',
			title: 'Pretty Flowers, North Sikkim',
			description: 'A tree with pretty pink flowers.',
		},
	];
	const portraits = [
		{
			img: 'https://res.cloudinary.com/vite-img/image/upload/c_scale,q_80,w_1000/v1697995111/IMG_20230626_195628_445_mm200y.webp',
			img_phone:
				'https://res.cloudinary.com/vite-img/image/upload/c_scale,q_80,w_1000/v1697995111/IMG_20230626_195628_445_mm200y.webp',
			title: 'Old Monk at Sissu',
			description:
				'A shot of an old monk in Sissu Monastery. Taken on Canon IXUS 120.',
		},
		{
			img: 'https://res.cloudinary.com/vite-img/image/upload/c_scale,q_80,w_1000/v1697995127/IMG_20230627_161205_165_fxek47.webp',
			img_phone:
				'https://res.cloudinary.com/vite-img/image/upload/c_scale,q_80,w_1000/v1697995127/IMG_20230627_161205_165_fxek47.webp',
			title: 'Thoughts',
			description: 'An old woman sitting at Kheerganga Path in Himachal.',
		},
		{
			img: 'https://res.cloudinary.com/vite-img/image/upload/c_scale,q_80,w_1000/v1704632731/test3_yqykrt.webp',
			img_phone:
				'https://res.cloudinary.com/vite-img/image/upload/c_scale,q_80,w_1000/v1704632731/test3_yqykrt.webp',
			title: 'Expressions',
			description:
				'A picture of an old man at Ajantha Caves. Shot on Fujifilm X-T30II.',
		},
		{
			img: 'https://res.cloudinary.com/vite-img/image/upload/c_scale,q_80,w_1000/v1697995125/IMG_20230627_143545_797_onv1fp.webp',
			img_phone:
				'https://res.cloudinary.com/vite-img/image/upload/c_scale,q_80,w_1000/v1697995125/IMG_20230627_143545_797_onv1fp.webp',
			title: 'Traveller Buddy',
			description:
				'A photo of our guide to Parvati Valley in Himachal. Taken on Canon IXUS 120.',
		},
	];
	const urban = [
		{
			img: 'https://res.cloudinary.com/vite-img/image/upload/c_scale,q_80,w_1000/v1704633882/test4_xtagby.webp',
			img_phone:
				'https://res.cloudinary.com/vite-img/image/upload/c_scale,q_80,w_1000/v1704633882/test4_xtagby.webp',
			title: 'Buddha Painting',
			description:
				'A painting of Buddha in Ajanta Caves. Taken on Fujifilm X-T30II.',
		},
		{
			img: 'https://res.cloudinary.com/vite-img/image/upload/c_scale,q_80,w_1000/v1704647230/DSCF4684_2_amx9im.webp',
			img_phone:
				'https://res.cloudinary.com/vite-img/image/upload/c_scale,q_80,w_1000/v1704647230/DSCF4684_2_amx9im.webp',
			title: 'Bibi ka Maqbara',
			description: 'A shot of Bibi ka Maqbara in Aurangabad.',
		},
		{
			img: 'https://res.cloudinary.com/vite-img/image/upload/c_scale,q_80,w_1000/v1697995106/IMG_20230626_143812_171_rtgyto.webp',
			img_phone:
				'https://res.cloudinary.com/vite-img/image/upload/c_scale,q_80,w_1000/v1697995106/IMG_20230626_143812_171_rtgyto.webp',
			title: 'Tomb of Iltutmish, Delhi',
			description:
				'Tomb of Iltumish at Qutub Minar, Delhi. Taken on Canon IXUS 120.',
		},
		{
			img: 'https://res.cloudinary.com/vite-img/image/upload/c_scale,q_80,w_1000/v1704646892/DSCF4657_jsoinl.webp',
			img_phone:
				'https://res.cloudinary.com/vite-img/image/upload/c_scale,q_80,w_1000/v1704646892/DSCF4657_jsoinl.webp',
			title: 'A Broken door',
			description:
				'An artistic picture of a broken door in Aurangabad. Shot on Fujifilm X-T30II.',
		},
		{
			img: 'https://res.cloudinary.com/vite-img/image/upload/c_scale,q_80,w_1000/v1704647410/DSCF4903_so4nmr.webp',
			img_phone:
				'https://res.cloudinary.com/vite-img/image/upload/c_scale,q_80,w_1000/v1704647410/DSCF4903_so4nmr.webp',
			title: 'Buddha Vihara, Ajanta Caves',
			description: 'Buddha Stupa at Ajanta Caves. Taken on Fujifilm X-T30II.',
		},
	];
	const carouselImages = [street, landscape, nature, portraits, urban];
	const imageTypes = ['Street', 'Landscape', 'Nature', 'Portraits', 'Urban'];
	let lowerCaseArr = imageTypes.map(function (item) {
		return item.toLowerCase();
	});
	const index = lowerCaseArr.indexOf(params.slug);

	return (
		<Suspense fallback={<Spinner />}>
			<Carousel slides={carouselImages[index]} />
		</Suspense>
	);
};

export default page;
