'use client';

import { FaSchool, FaBriefcase, FaShareFromSquare } from 'react-icons/fa6';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';
import Link from 'next/link';
import React, { useRef, useState, useEffect } from 'react';
import DataViz from '@/assets/images/projects/dataviz.png';
import Subtitle from '@/assets/images/projects/subtitle.jpg';
import CLI from '@/assets/images/projects/cli.jpg';
import Annote from '@/assets/images/projects/annote.jpg';
import Image from 'next/image';

const Project = ({ project }) => (
	<a
		href={project.link}
		target='_blank'
		rrel='noopener noreferrer'
		className='relative w-[22rem] z-10 overflow-visible group snap-center snap-always'>
		<div className='flex md:w-[22rem] md:h-[30rem] w-[20rem] h-[22rem] group overflow-hidden rounded-md '>
			<Image
				src={project.image}
				alt={project.name}
				width={640}
				height={426}
				className='w-full transition-transform duration-300 ease-in-out transform group-hover:scale-[1.02] object-cover'
			/>
		</div>
		<div className='flex flex-col p-4 dark:border-white absolute top-0 justify-between h-full z-20'>
			<p className='font-medium text-sm mb-2'>{project.name}</p>
			<p className='project-desc text-lg'>{project.description}</p>
		</div>
	</a>
);

const ListItem = ({ item, type }) => (
	<li className='mb-10 ms-6'>
		<span className='absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -start-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900'>
			{type === 'experience' ? (
				<FaBriefcase className='w-3 h-3 text-blue-800 dark:text-blue-300' />
			) : (
				<FaSchool className='w-3 h-3 text-blue-800 dark:text-blue-300' />
			)}
		</span>
		<h3 className='flex items-center mb-1 text-lg font-semibold text-gray-900 dark:text-white'>
			<a className='flex gap-2 items-center' href={item.link}>
				<span>{item.company || item.institution}</span>
				<FaShareFromSquare className='w-4 h-4' />
			</a>
			{item.position && (
				<span className='bg-blue-100 text-blue-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300 ms-3'>
					{item.position}
				</span>
			)}
		</h3>
		<time className='block mb-2 text-sm font-semibold leading-none text-gray-400 dark:text-gray-500'>
			{item.duration}
		</time>
		<p className='mb-2 text-base text-gray-500 dark:text-gray-400'>
			{item.description || item.course}
		</p>
		{item.cgpa && <span className='font-bold'>{item.cgpa}</span>}
	</li>
);

const Work = () => {
	const projects = [
		{
			name: 'Data Visualization AI',
			description:
				'A powerful AI tool for visualizing and analyzing complex data sets.',
			techStack: 'React, AI',
			image: DataViz,
			link: 'https://www.github.com',
		},
		{
			name: 'AI Subtitle Generator',
			description:
				'An AI-powered tool that generates subtitles with timestamps for videos.',
			techStack: 'React, AI',
			image:
				'https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.jpg',
			link: 'https://www.github.com',
		},
		{
			name: 'ML Preprocessor CLI',
			description: 'A CLI for preprocessing machine learning datasets.',
			techStack: 'CLI, Machine Learning',
			image:
				'https://img.daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.jpg',
			link: 'https://www.github.com',
		},
		{
			name: 'Image Annotation Tool',
			description:
				'A tool for annotating images with bounding boxes and labels.',
			techStack: 'HTML, CSS, Flask, Tessaract',
			image:
				'https://img.daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.jpg',
			link: 'https://www.github.com',
		},
		{
			name: 'AI Chatbot',
			description:
				'A chatbot that uses machine learning to provide human-like responses.',
			techStack: 'Python, AI',
			image:
				'https://img.daisyui.com/images/stock/photo-1494253109108-2e30c049369b.jpg',
			link: 'https://www.github.com',
		},
		{
			name: 'Data Visualization AI',
			description:
				'A powerful AI tool for visualizing and analyzing complex data sets.',
			techStack: 'React, AI',
			image:
				'https://img.daisyui.com/images/stock/photo-1550258987-190a2d41a8ba.jpg',
			link: 'https://www.github.com',
		},
	];

	const experiences = [
		{
			company: 'Carelon Global Solutions',
			link: 'https://www.carelonglobal.in/',
			position: 'Associate Data Scientist',
			duration: 'August 2023 - Present',
			description:
				'Working as an Associate Data Scientist specializing in Artificial Intelligence in Healthcare domain.',
		},
		{
			company: 'Magnimus',
			link: 'https://magnimus.com',
			position: 'Lead Frontend Developer',
			duration: 'October 2022 - June 2023',
			description:
				'Developed a fully responsive website for a 3D startup using React.',
		},
	];

	const educations = [
		{
			institution: 'National Institute of Technology Karnataka, Surathkal',
			link: 'https://www.nitk.ac.in/',
			duration: 'April 2019 - June 2023',
			course:
				'Bachelor of Technology in Electronics and Communication Engineering (ECE)',
			cgpa: 'CGPA: 7.9/10',
		},
	];

	const scrollContainer = useRef(null);
	const [scrollPosition, setScrollPosition] = useState(0);
	const [maxScrollWidth, setMaxScrollWidth] = useState(0);

	// useEffect(() => {
	// 	const updateMaxScrollWidth = () => {
	// 		setMaxScrollWidth(
	// 			scrollContainer.current.scrollWidth -
	// 				scrollContainer.current.clientWidth,
	// 		);
	// 	};

	// 	updateMaxScrollWidth();
	// 	window.addEventListener('resize', updateMaxScrollWidth);

	// 	return () => window.removeEventListener('resize', updateMaxScrollWidth);
	// }, []);

	// const scroll = (scrollOffset) => {
	// 	const newScrollPosition = scrollPosition + scrollOffset;
	// 	setScrollPosition(newScrollPosition);
	// 	scrollContainer.current.scrollBy({
	// 		top: 0,
	// 		left: scrollOffset,
	// 		behavior: 'smooth',
	// 	});
	// };

	return (
		<section className='max-w-8xl mx-auto pb-20 mt-8'>
			<div className='flex md:gap-11 gap-4 flex-col md:flex-row px-4 mb-10 w-full md:px-16 '>
				<div className='professional-exp w-full'>
					<h2 className='text-4xl font-head font-semibold mb-8'>
						Professional Experience
					</h2>
					<ol className='relative border-s border-gray-200 dark:border-gray-700 mb-8'>
						{experiences.map((experience, index) => (
							<ListItem key={index} item={experience} type='experience' />
						))}
					</ol>
				</div>

				<div className='education w-full'>
					<h2 className='text-4xl font-head font-semibold mb-8'>Education</h2>
					<ol className='relative border-s border-gray-200 dark:border-gray-700 mb-8'>
						{educations.map((education, index) => (
							<ListItem key={index} item={education} type='education' />
						))}
					</ol>
				</div>
			</div>

			<div>
				<div className='flex items-center justify-between md:px-16 px-4'>
					<h2 className='text-4xl font-head font-semibold mb-4'>Projects</h2>
					{/* <div className='flex gap-6'>
						<button
							onClick={() => scroll(-300)}
							className={`transform transition duration-300 ${
								scrollPosition > 0 ? 'hover:-translate-x-1' : ''
							}`}
							disabled={scrollPosition <= 0}
							style={{ opacity: scrollPosition <= 0 ? 0.5 : 1 }}>
							<FaChevronLeft />
						</button>
						<button
							onClick={() => scroll(300)}
							className={`transform transition duration-300 ${
								scrollPosition < maxScrollWidth ? 'hover:translate-x-1' : ''
							}`}
							disabled={scrollPosition >= maxScrollWidth}
							style={{ opacity: scrollPosition >= maxScrollWidth ? 0.5 : 1 }}>
							<FaChevronRight />
						</button>
					</div> */}
				</div>

				{/* <div className='w-full'>
					<div
						ref={scrollContainer}
						className='flex overflow-x-scroll snap-x snap-mandatory scroll-smooth hide-scrollbar px-4 space-x-3 md:px-16 md:pl-18'>
						{projects.map((project, index) => (
							<Project key={index} project={project} />
						))}
					</div>
				</div> */}
			</div>

			<h3 className='text-2xl font-semibold w-full md:px-16 px-4'>
				Under Development ＞﹏＜
			</h3>
		</section>
	);
};

export default Work;
