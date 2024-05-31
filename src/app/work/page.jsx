'use client';

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	FaTerminal,
	FaGithub,
	FaChevronLeft,
	FaChevronRight,
} from 'react-icons/fa6';
import {
	LuArrowUpRight,
	LuBrainCircuit,
	LuLink,
	LuFileText,
} from 'react-icons/lu';
import { SiStreamlit, SiSupabase } from 'react-icons/si';
import Vite from '@/assets/icons/vite.svg';
import Shadcn from '@/assets/icons/shadcn.svg';
import OpenAI from '@/assets/icons/openai.svg';
import Typescript from '@/assets/icons/typescript.svg';
import Nextjs from '@/assets/icons/nextjs.svg';
import Javascript from '@/assets/icons/javascript.svg';
import TailwindCss from '@/assets/icons/tailwind.svg';
import ReactIcon from '@/assets/icons/react.svg';
import Vercel from '@/assets/icons/vercel.svg';
import Python from '@/assets/icons/python.svg';
import Css from '@/assets/icons/css.svg';
import Html from '@/assets/icons/html.svg';
import WorkImage from '@/assets/images/work.svg';

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

const CareerListItem = ({ item, type }) => (
	<li class='mb-10 ms-4'>
		<div class='absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700'></div>
		<time class='mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500'>
			{item.duration}
		</time>

		<h3 class='text-lg font-semibold text-gray-900 dark:text-white flex gap-3 mb-2 '>
			{item.company || item.institution}
			<Badge variant='secondary' className='shadow-md flex gap-1 h-fit p-1'>
				{item.position}
			</Badge>
		</h3>
		<p class='mb-1 text-sm font-normal text-gray-500 dark:text-gray-400 tracking-wider'>
			{item.description}
		</p>
		{item.cgpa && <span className='font-semibold text-sm'>{item.cgpa}</span>}
	</li>
);

const ProjectListItem = ({ project }) => (
	<div class='rounded-lg bg-card text-card-foreground flex flex-col border shadow w-full justify-between'>
		<div class='flex flex-col space-y-2 p-4'>
			<h3 class='font-semibold tracking-tight text-xl dark:text-neutral-100 text-neutral-900'>
				<a
					href={project.link}
					target='_blank'
					rel='noreferrer'
					class='inline-flex items-center hover:underline group underline-offset-4 gap-2'
					data-state='closed'>
					<h3>{project.title}</h3>
					<LuArrowUpRight size={18} color='rgb(115 115 115)' />
				</a>
			</h3>
			<p class='text-sm dark:text-neutral-400 text-neutral-600 tracking-wider'>
				{project.description}
			</p>
			<div class='flex flex-wrap gap-2'>
				{project.technologies.map((tech) => (
					<Badge
						key={tech.name}
						variant='secondary'
						className='shadow-md flex gap-1'>
						{tech.icon}
						{tech.name}
					</Badge>
				))}
			</div>
		</div>
		<div class='flex flex-col space-y-6 p-4 pt-0'>
			<div class='flex gap-x-2'>
				{project.link && (
					<Button size='sm'>
						<a
							href={project.link}
							target='_blank'
							rel='noreferrer'
							className='flex gap-1 items-center'>
							<LuLink size={18} className='text-gray-100 dark:text-gray-700' />
							Preview
						</a>
					</Button>
				)}
				{project.github && (
					<Button size='sm'>
						<a
							href={project.github}
							target='_blank'
							rel='noreferrer'
							className='flex gap-1 items-center'>
							<FaGithub
								size={18}
								className='text-gray-100 dark:text-gray-700'
							/>
							GitHub
						</a>
					</Button>
				)}
			</div>
		</div>
	</div>
);

const Work = () => {
	const projects = [
		{
			title: 'Data Visualization AI',
			description:
				'A powerful AI tool for visualizing and analyzing complex data sets.',
			technologies: [
				{
					name: 'React',
					icon: <Image src={ReactIcon} alt='react' width={14} height={14} />,
				},
				{
					name: 'AI',
					icon: <LuBrainCircuit size={14} color='#fedbd5' />,
				},
				{
					name: 'Tailwind CSS',
					icon: (
						<Image src={TailwindCss} alt='tailwind' width={14} height={14} />
					),
				},
				{
					name: 'Python',
					icon: <Image src={Python} alt='python' width={14} height={14} />,
				},
				{
					name: 'Javascript',
					icon: (
						<Image src={Javascript} alt='javascript' width={14} height={14} />
					),
				},
				{
					name: 'Vite',
					icon: <Image src={Vite} alt='vite' width={14} height={14} />,
				},
				{
					name: 'Shadcn/ui',
					icon: <Image src={Shadcn} alt='shadcn' width={14} height={14} />,
				},
			],
			link: 'https://www.github.com',
		},
		{
			title: 'Saastify',
			description:
				'End-to-End boilerplate specifically for startups to ship products quickly.',
			technologies: [
				{
					name: 'Tailwind CSS',
					icon: (
						<Image src={TailwindCss} alt='tailwind' width={14} height={14} />
					),
				},
				{
					name: 'Vercel',
					icon: <Image src={Vercel} alt='vercel' width={14} height={14} />,
				},
				{
					name: 'Next.js',
					icon: <Image src={Nextjs} alt='nextjs' width={14} height={14} />,
				},
				{
					name: 'Javascript',
					icon: (
						<Image src={Javascript} alt='javascript' width={14} height={14} />
					),
				},
				{
					name: 'Shadcn/ui',
					icon: <Image src={Shadcn} alt='shadcn' width={14} height={14} />,
				},
				{
					name: 'OpenAI',
					icon: <Image src={OpenAI} alt='openai' width={14} height={14} />,
				},
				{
					name: 'Supabase',
					icon: <SiSupabase size={14} color='#3ed18f' />,
				},
			],
			link: 'https://saastify.vercel.app/',
		},
		{
			title: 'Solodit AI',
			description:
				'An AI tool for quickly understanding large Web3 codebases and identifying issues for rapid bug fixes.',
			technologies: [
				{
					name: 'Tailwind CSS',
					icon: (
						<Image src={TailwindCss} alt='tailwind' width={14} height={14} />
					),
				},
				{
					name: 'Vercel',
					icon: <Image src={Vercel} alt='vercel' width={14} height={14} />,
				},
				{
					name: 'Next.js',
					icon: <Image src={Nextjs} alt='nextjs' width={14} height={14} />,
				},
				{
					name: 'Javascript',
					icon: (
						<Image src={Javascript} alt='javascript' width={14} height={14} />
					),
				},
				{
					name: 'Shadcn/ui',
					icon: <Image src={Shadcn} alt='shadcn' width={14} height={14} />,
				},
				{
					name: 'OpenAI',
					icon: <Image src={OpenAI} alt='openai' width={14} height={14} />,
				},
				{
					name: 'Supabase',
					icon: <SiSupabase size={14} color='#3ed18f' />,
				},
			],
			link: 'https://ai-next-seven.vercel.app/',
		},
		{
			title: 'ML Preprocessor CLI',
			description: 'A CLI for preprocessing machine learning datasets.',
			technologies: [
				{
					name: 'Python',
					icon: <Image src={Python} alt='python' width={14} height={14} />,
				},
			],
			github: 'https://github.com/adityamiskin/ML-preprocessor-CLI',
		},
		{
			title: 'Image Compressor',
			description: 'An in-browser image compressor and resizer.',
			technologies: [
				{
					name: 'React',
					icon: <Image src={ReactIcon} alt='react' width={14} height={14} />,
				},

				{
					name: 'Javascript',
					icon: (
						<Image src={Javascript} alt='javascript' width={14} height={14} />
					),
				},
				{
					name: 'Vite',
					icon: <Image src={Vite} alt='vite' width={14} height={14} />,
				},
				{
					name: 'Shadcn/ui',
					icon: <Image src={Shadcn} alt='shadcn' width={14} height={14} />,
				},
			],
			github: 'https://github.com/adityamiskin/image-compressor',
		},
		{
			title: 'Image Annotation Tool',
			description:
				'A tool for annotating images with bounding boxes and labels.',
			technologies: [
				{
					name: 'HTML',
					icon: <Image src={Html} alt='html' width={14} height={14} />,
				},
				{
					name: 'CSS',
					icon: <Image src={Css} alt='css' width={14} height={14} />,
				},

				{
					name: 'Python',
					icon: <Image src={Python} alt='python' width={14} height={14} />,
				},
				{
					name: 'Streamlit',
					icon: <SiStreamlit size={14} color='#ff2b2b' />,
				},
			],
		},
	];

	const career = [
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
		{
			institution: 'National Institute of Technology Karnataka, Surathkal',
			link: 'https://www.nitk.ac.in/',
			position: 'Student',
			duration: 'April 2019 - June 2023',
			description:
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
		<section className='max-w-8xl mx-auto pb-20 mt-8 animate-in'>
			<div className='flex md:gap-11 gap-4 flex-col md:flex-row px-4 mb-10 w-full md:px-16 '>
				<div className='professional-exp w-full'>
					<div className='flex gap-3 items-baseline'>
						<LuFileText size={28} />
						<h2 className='text-4xl font-head font-semibold mb-8 flex gap-3'>
							Career & Works
						</h2>
					</div>
					<ol className='relative border-s border-gray-200 dark:border-gray-700'>
						{career.map((careerItem, index) => (
							<CareerListItem key={index} item={careerItem} />
						))}
					</ol>
				</div>
				<div className='w-full hidden md:block'>
					<Image
						src={WorkImage}
						alt='work'
						width={800}
						height={600}
						className='w-2/3 mx-auto'
					/>
				</div>
			</div>

			<div>
				<div className='flex flex-col md:px-16 px-4'>
					<div className='flex gap-3 items-baseline'>
						<FaTerminal
							size={24}
							style={{ animation: 'blink 1.5s infinite' }}
						/>
						<h2 className='text-4xl font-head font-semibold mb-4'>Projects</h2>
					</div>

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
					<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
						{projects.map((project, index) => (
							<ProjectListItem key={index} project={project} />
						))}
					</div>
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
		</section>
	);
};

export default Work;
