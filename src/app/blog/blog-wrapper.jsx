'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import Image from 'next/image';
import Link from 'next/link';
import CavnvasImage from '@/components/CanvasImage';

const BlogWrapper = ({ blogs }) => {
	const [value, setValue] = useState([]);
	const [current, setCurrent] = useState(0);
	const imageRefs = useRef([]);

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						setCurrent(+entry.target.getAttribute('data-index'));
					}
				});
			},
			{ threshold: 0.5 },
		);

		imageRefs.current.forEach((ref) => observer.observe(ref));

		return () => {
			imageRefs.current.forEach((ref) => {
				if (ref) {
					observer.unobserve(ref);
				}
			});
		};
	}, []);

	const filteredBlogs = blogs.filter((blog) => {
		if (value.length === 0) return true;
		return blog.metadata.tags.some((tag) => value.includes(tag));
	});

	const toggleItems = [
		{ value: 'latest', label: 'Latest' },
		{ value: 'technology', label: 'Technology' },
		{ value: 'life', label: 'Life' },
		{ value: 'photography', label: 'Photography' },
	];

	return (
		<section>
			<div className='mb-24'>
				<div className='relative w-full flex gap-3 snap-x snap-mandatory overflow-x-auto pb-36 hide-scrollbar'>
					<div className='snap-center shrink-0 md:w-8 w-2'></div>
					{blogs.map((blog, index) => (
						<Link
							href={'/blog/' + blog.slug}
							ref={(el) => (imageRefs.current[index] = el)}
							data-index={index}
							className='relative snap-center shrink-0 md:w-[calc(100vw-5rem)] md:h-[calc(100vh-12rem)] h-[30rem] w-[23rem] cursor-pointer rounded-md group'
							key={index}>
							<div className='absolute flex flex-col h-full justify-center w-full text-center px-4 z-10'>
								<h2 className='md:text-6xl text-3xl mb-4 font-semibold dark:drop-shadow-2xl '>
									{blog.metadata.title}
								</h2>
								<p className='md:text-2xl text-lg'>
									{blog.metadata.description}
								</p>
							</div>
							<CavnvasImage
								width={900}
								height={400}
								src={blog.metadata.image}
							/>
							<Image
								width={1500}
								height={1000}
								alt={blog.metadata.title}
								className='shrink-0 w-full h-full object-cover bg-white transition duration-[250ms] ease-in-out transform group-hover:scale-[1.008] rounded-md '
								src={blog.metadata.image}
							/>
						</Link>
					))}
					<div className='snap-center shrink-0 md:w-8 w-2'></div>
				</div>
				<div className='flex justify-center space-x-2 mt-[-7rem]'>
					{blogs.map((blog, index) => (
						<span
							key={index}
							onClick={() => {
								imageRefs.current[index].scrollIntoView({
									behavior: 'smooth',
									inline: 'center',
									block: 'nearest',
								});
							}}
							className={`rounded-full w-[0.5rem] h-[0.5rem] flex items-center justify-center group transition duration-[250ms] cursor-pointer ${
								current === index
									? 'bg-black dark:bg-white scale-[1.02]'
									: ' dark:bg-gray-100/15 bg-gray-400'
							}`}></span>
					))}
				</div>
			</div>

			<div className='md:px-12 px-4 text-3xl font-semibold mb-24'>
				<h2 className='mb-4'>My Blogs</h2>
				<ToggleGroup
					type='multiple'
					variant='outline'
					size='sm'
					className='mb-6 float-left'
					value={value}
					onValueChange={(value) => {
						setValue(value);
					}}>
					{toggleItems.map((item) => (
						<ToggleGroupItem
							key={item.value}
							value={item.value}
							aria-label={`Toggle ${item.label}`}
							className='font-normal tracking-wider'>
							{item.label}
						</ToggleGroupItem>
					))}
				</ToggleGroup>

				<div className='relative w-full grid md:grid-cols-3 sm:grid-cols-2 md:gap-8 gap-8 transition duration-300'>
					{filteredBlogs.map((blog, index) => (
						<Link
							href={'/blog/' + blog.slug}
							passHref
							key={blog.slug}
							className=' relative cursor-pointer group overflow-hidden h-[400px] rounded-sm'>
							<div className='absolute flex flex-col h-full justify-between w-full text-left p-4 z-10'>
								<div>
									<h2 className='text-base mb-2 '>{blog.metadata.title}</h2>
									<div className='flex gap-2'>
										{blog.metadata.tags.map((tag, index) => (
											<Badge key={index}>{tag}</Badge>
										))}
									</div>
								</div>

								<p className='text-2xl'>{blog.metadata.description}</p>
							</div>
							<Image
								width={300}
								height={300}
								alt={blog.metadata.title}
								className='w-full h-full object-cover transition duration-[250ms] ease-in-out group-hover:scale-[1.02]'
								src={blog.metadata.image}
							/>
							<div className='absolute top-0 left-0 w-full h-full transition duration-200 dark:bg-black/30 bg-white/10 group-hover:dark:bg-black/50 group-hover:bg-white/50'></div>
						</Link>
					))}
					{filteredBlogs.length === 0 && (
						<p className='text-sm'>No blogs found :(</p>
					)}
					<div className='snap-center shrink-0'></div>
				</div>
			</div>
		</section>
	);
};

export default BlogWrapper;
