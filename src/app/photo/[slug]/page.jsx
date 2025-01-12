import React from 'react';
import Carousel from '@/components/Carousel';
import { Suspense } from 'react';
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

async function getImagesFromFolder(folderPath, options = {}) {
	const cloudinary = require('cloudinary').v2;

	cloudinary.config({
		secure: true,
		cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
		api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
		api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
	});

	const results = await cloudinary.api.resources({
		type: 'upload',
		prefix: folderPath,
		metadata: true,
		context: true,
		tags: true,
	});

	return results.resources.map((image) => ({
		img: image.secure_url,
		title: image.context?.custom?.caption,
		description: image.context?.custom?.alt,
	}));
}

const page = async ({ params }) => {
	const carouselImages = [
		await getImagesFromFolder('street'),
		await getImagesFromFolder('landscape'),
		await getImagesFromFolder('nature'),
		await getImagesFromFolder('portraits'),
		await getImagesFromFolder('urban'),
	];

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
