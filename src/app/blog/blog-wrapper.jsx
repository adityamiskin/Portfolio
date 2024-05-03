'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import Image from 'next/image';
import Link from 'next/link';

const BlogWrapper = ({ blogs }) => {
	const [value, setValue] = useState([]);
	const [current, setCurrent] = useState(0);
	const imageRefs = useRef([]);

	const images2 = [
		'https://images.ctfassets.net/kftzwdyauwt9/44csSCT2TZUSqqI2UCLDF9/153e0192aeb75b2322007085c1009bc0/AGI2.png?w=1200&q=90&fm=jpg',
		'https://res.cloudinary.com/vite-img/image/upload/c_scale,q_80,w_1000/v1697995113/IMG_20230626_215242_984_fhpfnc.webp',
		'https://images.ctfassets.net/kftzwdyauwt9/3AqhaLAr15EI64BCwbVSsb/835f85036a29a91f9b92f2ff7e0ef569/Business.png?w=1920&q=90&fm=jpg',
		'https://images.ctfassets.net/kftzwdyauwt9/44csSCT2TZUSqqI2UCLDF9/153e0192aeb75b2322007085c1009bc0/AGI2.png?w=1200&q=90&fm=jpg',
		'https://res.cloudinary.com/vite-img/image/upload/c_scale,q_80,w_1000/v1697995113/IMG_20230626_215242_984_fhpfnc.webp',
		'https://images.ctfassets.net/kftzwdyauwt9/3AqhaLAr15EI64BCwbVSsb/835f85036a29a91f9b92f2ff7e0ef569/Business.png?w=1920&q=90&fm=jpg',
	];

	const images3 = [
		'https://res.cloudinary.com/vite-img/image/upload/c_scale,q_80,w_1000/v1697995113/IMG_20230626_215242_984_fhpfnc.webp',
		'https://images.ctfassets.net/kftzwdyauwt9/3AqhaLAr15EI64BCwbVSsb/835f85036a29a91f9b92f2ff7e0ef569/Business.png?w=1920&q=90&fm=jpg',
		'https://images.ctfassets.net/kftzwdyauwt9/44csSCT2TZUSqqI2UCLDF9/153e0192aeb75b2322007085c1009bc0/AGI2.png?w=1200&q=90&fm=jpg',
		'https://res.cloudinary.com/vite-img/image/upload/c_scale,q_80,w_1000/v1697995113/IMG_20230626_215242_984_fhpfnc.webp',
		'https://images.ctfassets.net/kftzwdyauwt9/44csSCT2TZUSqqI2UCLDF9/153e0192aeb75b2322007085c1009bc0/AGI2.png?w=1200&q=90&fm=jpg',
		'https://images.ctfassets.net/kftzwdyauwt9/3AqhaLAr15EI64BCwbVSsb/835f85036a29a91f9b92f2ff7e0ef569/Business.png?w=1920&q=90&fm=jpg',
	];

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
		return blog.meta.tags.some((tag) => value.includes(tag));
	});

	return (
		<section>
			<div className='mb-24'>
				<div className='relative w-full flex gap-3 snap-x snap-mandatory overflow-x-auto mb-4 hide-scrollbar'>
					<div className='snap-center shrink-0 md:w-8'></div>
					{blogs.map((blog, index) => (
						<a
							ref={(el) => (imageRefs.current[index] = el)}
							data-index={index}
							className='relative snap-center shrink-0 md:w-[calc(100vw-5rem)] md:h-[calc(100vh-12rem)] h-[30rem] w-[23rem] overflow-hidden cursor-pointer rounded-md group'
							key={index}>
							<div className='absolute flex flex-col h-full justify-center w-full text-center px-4 z-10'>
								<h2 className='md:text-6xl text-3xl mb-4'>{blog.meta.title}</h2>
								<p className='md:text-2xl text-lg'>{blog.meta.description}</p>
							</div>
							<Image
								width={1500}
								height={1000}
								className='shrink-0 w-full h-full shadow-xl bg-white object-cover transition duration-[250ms] ease-in-out transform group-hover:scale-[1.02]'
								src={blog.meta.image}
							/>
						</a>
					))}

					<div className='snap-center shrink-0 md:w-8'></div>
				</div>
				<div className='flex justify-center space-x-2'>
					{blogs.map((blog, index) => (
						<span
							key={index}
							className={`rounded-full w-[0.5rem] h-[0.5rem] flex items-center justify-center group transition duration-[250ms] ${
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
					className='mb-6 flex gap-4'
					value={value}
					onValueChange={(value) => {
						setValue(value);
					}}>
					<ToggleGroupItem value='latest' aria-label='Toggle latest'>
						<p
							className={`text-xs px-2 py-0.5 rounded-full transition ${
								value.includes('latest')
									? 'dark:bg-white bg-black text-white dark:text-black'
									: 'dark:bg-black outline dark:outline-white dark:text-white text-black'
							}`}>
							Latest
						</p>
					</ToggleGroupItem>
					<ToggleGroupItem value='coding' aria-label='Toggle coding'>
						<p
							className={`text-xs px-2 py-0.5 rounded-full transition ${
								value.includes('coding')
									? 'dark:bg-white bg-black text-white dark:text-black'
									: 'dark:bg-black outline dark:outline-white dark:text-white text-black'
							}`}>
							Coding
						</p>
					</ToggleGroupItem>
					<ToggleGroupItem value='life' aria-label='Toggle life'>
						<p
							className={`text-xs px-2 py-0.5 rounded-full transition ${
								value.includes('life')
									? 'dark:bg-white bg-black text-white dark:text-black'
									: 'dark:bg-black outline dark:outline-white dark:text-white text-black'
							}`}>
							Life
						</p>
					</ToggleGroupItem>
					<ToggleGroupItem value='photography' aria-label='Toggle photography'>
						<p
							className={`text-xs px-2 py-0.5 rounded-full transition ${
								value.includes('photography')
									? 'dark:bg-white bg-black text-white dark:text-black'
									: 'dark:bg-black outline dark:outline-white dark:text-white text-black'
							}`}>
							Photography
						</p>
					</ToggleGroupItem>
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
									<h2 className='text-base mb-2'>{blog.meta.title}</h2>
									<div className='flex gap-2'>
										{blog.meta.tags.map((tag, index) => (
											<Badge key={index}>{tag}</Badge>
										))}
									</div>
								</div>

								<p className='text-2xl'>{blog.meta.description}</p>
							</div>
							<Image
								width={300}
								height={300}
								className='w-full h-full object-cover transition duration-[250ms] ease-in-out group-hover:scale-[1.02]'
								src={blog.meta.image}
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
			{/* <div className='px-12 text-3xl font-semibold mb-24'>
				<h2 className='mb-8'>Stories</h2>
				<div className='relative w-full flex gap-3 snap-x snap-mandatory overflow-x-auto hide-scrollbar'>
					{images3.map((image, index) => (
						<a
							className='snap-center shrink-0 md:w-[22rem] md:h-[calc(100vh-18rem)] h-[28rem] w-[22rem] overflow-hidden cursor-pointer'
							key={index}>
							<Image
								width={300}
								height={300}
								className='shrink-0 w-full h-full rounded-sm shadow-xl bg-white object-cover transition duration-300 ease-in-out transform hover:scale-[1.02]'
								src={image}
							/>
						</a>
					))}

					<div className='snap-center shrink-0'></div>
				</div>
			</div> */}
		</section>
	);
};

export default BlogWrapper;
