import Image from 'next/image';

export default function Img({ src, width, height, alt, className }) {
	return (
		<Image
			src={src}
			width={width}
			height={height}
			alt={alt}
			className={className}
		/>
	);
}
