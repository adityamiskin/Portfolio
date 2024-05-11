import React, { useRef, useEffect } from 'react';

const CanvasImage = ({ src, width, height }) => {
	const canvasRef = useRef(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		const context = canvas.getContext('2d');
		const img = new Image();

		img.onload = function () {
			context.drawImage(img, 0, 0, width, height);
		};

		img.src = src;
	}, [src, width, height]);

	return (
		<canvas
			ref={canvasRef}
			width={width}
			height={height}
			className='absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-30%] md:translate-y-[-40%] shrink-0 lg:w-[1200px] md:w-[700px] w-[250px] md:h-[400px] h-[300px] object-cover transition duration-[250ms] ease-in-out transform-gpu rounded-md md:blur-[70px] blur-[40px] opacity-0 group-hover:opacity-100'
		/>
	);
};

export default CanvasImage;
