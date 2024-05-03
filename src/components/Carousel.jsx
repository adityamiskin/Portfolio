'use client';

import React, { useState, useRef, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { usePathname } from 'next/navigation';

const Carousel = ({ slides }) => {
	const [current, setCurrent] = useState(0);
	const length = slides.length;
	const [offset, setOffset] = useState(0);
	const imageRefs = useRef([]);
	const [isMouseLeft, setIsMouseLeft] = useState(false);
	const pathname = usePathname();

	const gap = 16;

	const nextSlide = () => {
		let next = current === length - 1 ? 0 : current + 1;
		if (next === 0) {
			setOffset(0);
		} else {
			setOffset(
				(offsets) => offsets + imageRefs.current[current].offsetWidth + gap,
			);
		}
		setCurrent(next);
	};

	const prevSlide = () => {
		let prev = current === 0 ? length - 1 : current - 1;
		setOffset((offsets) => offsets - imageRefs.current[prev].offsetWidth - gap);
		setCurrent(prev);
	};

	const getMousePosition = (event) => {
		const x = event.clientX;
		const windowWidth = window.innerWidth;

		setIsMouseLeft(x < windowWidth / 2);
	};

	useEffect(() => {
		window.addEventListener('mousemove', getMousePosition);

		// Clean up the event listener when the component unmounts
		return () => {
			window.removeEventListener('mousemove', getMousePosition);
		};
	}, []);

	useEffect(() => {
		imageRefs.current = imageRefs.current.slice(0, slides.length);
	}, [slides]);

	useEffect(() => {
		setCurrent(0);
		setOffset(0);
	}, [pathname]);

	return (
		<section className='flex items-center md:overflow-x-hidden md:absolute w-full h-full relative md:px-4 fade-in mb-10 md:mb-0'>
			{current !== 0 && (
				<button
					className='bg-black p-4 fixed left-10 top-1/2 transform -translate-y-1/2 z-50 hidden md:flex transition-opacity duration-300'
					onClick={prevSlide}
					style={{ opacity: isMouseLeft ? 1 : 0 }}
					aria-label='Go left button'>
					<FaChevronLeft className='text-lg text-white' />
				</button>
			)}

			<button
				className='bg-black p-4 fixed right-10 top-1/2 transform -translate-y-1/2 z-50 hidden md:flex transition-opacity duration-300'
				onClick={nextSlide}
				style={{ opacity: !isMouseLeft ? 1 : 0 }}
				aria-label='Go right button'>
				<FaChevronRight className='text-lg text-white' />
			</button>
			<div
				className='flex overflow-x-hidden md:gap-4 gap-8 relative md:absolute md:flex-row flex-col md:w-[20000px] w-full top-0 left-0 md:left-auto my-auto h-full items-center transition-all '
				style={{
					transform: `translateX(-${offset}px)`,
					transition: 'transform 0.35s ease',
				}}>
				{slides.map((slide, index) => {
					return (
						<div
							key={index}
							className={`md:w-fit w-full transition-opacity duration-500  ${
								index === current - 1 ? 'opacity-0' : 'opacity-100'
							} flex flex-col items-start`}
							ref={(el) => (imageRefs.current[index] = el)}>
							<div className='relative'>
								<picture>
									<source media='(max-width: 600px)' srcSet={slide.img_phone} />
									<img
										src={slide.img}
										alt={slide.description}
										className='w-full md:h-[500px] 3xl:h-[800px] mb-3 z-40 transition-all object-contain'
										width={1000}
										height={1500}
									/>
								</picture>

								<div className='md:absolute bottom-100 mx-auto px-4 md:px-0'>
									<p className='text-black mb-2 font-head font-semibold text-lg md:ml-0 dark:text-white'>
										{slide.title}
									</p>
									<p className='text-black mb-2 text-sm dark:text-white font-body tracking-wider text-wrap font-light md:pr-12'>
										{slide.description}
									</p>
								</div>
							</div>
						</div>
					);
				})}
			</div>
		</section>
	);
};

export default Carousel;
