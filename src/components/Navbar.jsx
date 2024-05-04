'use client';

import React, { useState, useEffect } from 'react';
import {
	FaTwitter,
	FaInstagram,
	FaLinkedinIn,
	FaGithub,
} from 'react-icons/fa6';
import { FiMenu, FiSun, FiMoon } from 'react-icons/fi';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const Navbar = ({ navbarOpen, setNavbarOpen }) => {
	const [activeLink, setActiveLink] = useState('/');
	const [isSubmenuOpen, setSubmenuOpen] = useState(false);
	const [darkMode, setDarkMode] = useState(() => {
		if (typeof window !== 'undefined') {
			const storedDarkMode = window.localStorage.getItem('darkMode');
			return storedDarkMode ? JSON.parse(storedDarkMode) : false;
		}
		return false;
	});
	const [hasMounted, setHasMounted] = useState(false);

	useEffect(() => {
		setHasMounted(true);
	}, []);
	const pathname = usePathname();
	const imageTypes = ['Street', 'Landscape', 'Nature', 'Portraits', 'Urban'];

	useEffect(() => {
		setActiveLink(pathname);
	}, [pathname]);

	const handleClick = (path) => {
		if (typeof path === 'object' && path.target) {
			path = path.target.pathname;
		}
		setActiveLink(path);
		setNavbarOpen(false); // Close the menu when a link is clicked
	};

	useEffect(() => {
		if (darkMode) {
			document.body.classList.add('dark');
		} else {
			document.body.classList.remove('dark');
		}
		document.body.classList.add('transition-colors');
		window.localStorage.setItem('darkMode', JSON.stringify(darkMode));
	}, [darkMode]);

	return (
		<header>
			<nav
				className={`justify-between items-center transition-all duration-200 w-full dark:text-white p-8 z-50 md:flex hidden max-w-8xl mx-auto  ${
					pathname === '/photo'
						? 'text-white py-2 px-4 dark-hover '
						: pathname.startsWith('/photo/')
						? 'text-black py-2 px-4'
						: 'text-black px-12'
				} ${
					pathname !== '/photo' && pathname.startsWith('/photo/')
						? 'fixed top-0'
						: 'relative'
				}`}>
				<div className='flex justify-between lg:items-center items-baseline w-full'>
					<div>
						<Link href='/' className='' onClick={() => handleClick('/')}>
							<h1 className='tracking-widest font-head font-semibold text-[38px] w-min lg:w-full'>
								ADITYA MISKIN
							</h1>
						</Link>
					</div>

					<div className='flex lg:gap-6 md:gap-4 flex-col lg:flex-row transition'>
						<ul className='flex gap-8 items-center tracking-widest text-[15px] font-head'>
							<li>
								<Link
									href='/'
									className={`link ${
										activeLink === '/' ? 'active' : ''
									} underline-offset-2`}
									onClick={() => handleClick('/')}>
									About
								</Link>
							</li>

							<li>
								<Link
									href='/work'
									className={`link ${
										activeLink === '/work' ? 'active' : ''
									} underline-offset-2`}
									onClick={() => handleClick('/work')}>
									Work
								</Link>
							</li>

							<li>
								<Link
									href='/blog'
									className={`link ${
										activeLink.startsWith('/blog') ? 'active' : ''
									} underline-offset-2`}
									onClick={() => handleClick('/blog')}>
									Blog
								</Link>
							</li>

							<li>
								<div
									className={`relative extra ${isSubmenuOpen ? 'open' : ''}`}
									onMouseEnter={() => setSubmenuOpen(true)}
									onMouseLeave={() => setSubmenuOpen(false)}>
									<Link
										href='/photo'
										className={`link flex ${
											activeLink.startsWith('/photo') ? 'active' : ''
										} underline-offset-2`}
										onClick={() => {
											handleClick('/photo');
										}}>
										+&nbsp;Photo
									</Link>

									{isSubmenuOpen && (
										<ul className='absolute flex flex-col p-4 px-5 text-[13px] w-36 gap-4 left-[-35px] mt-2 bg-black text-white border-t-2 border-transparent dark:bg-[#fbfbfb] dark:text-black'>
											{imageTypes.map((type) => (
												<li key={type}>
													<Link
														href={`/photo/${type.toLowerCase()}`}
														className={`sublink ${
															activeLink === `/photo/${type.toLowerCase()}`
																? 'active'
																: ''
														} underline-offset-2 decoration-white`}
														onClick={() =>
															handleClick(`/photo/${type.toLowerCase()}`)
														}>
														{type}
													</Link>
												</li>
											))}
										</ul>
									)}
								</div>
							</li>

							<li>
								<Link
									href='/contact'
									className={`link ${
										activeLink === '/contact' ? 'active' : ''
									} underline-offset-2`}
									onClick={() => handleClick('/contact')}>
									Contact
								</Link>
							</li>

							<li className='flex'>
								<button
									onClick={() => setDarkMode(!darkMode)}
									aria-label='Dark Mode toggle'>
									{darkMode && hasMounted ? (
										<FiSun className='text-2xl transition ease-in-out duration-500 stroke-2 fill-orange-400 stroke-orange-400' />
									) : (
										<FiMoon className='text-2xl transition ease-in-out duration-500 stroke-1 stroke-violet-500 fill-violet-500' />
									)}
								</button>
							</li>
						</ul>
						<div className='text-xl flex gap-4 justify-end'>
							<a
								href='https://github.com/adityamiskin'
								aria-label='Github'
								target='_blank'>
								<FaGithub />
							</a>
							<a
								href='https://twitter.com/ad1tyamiskin'
								aria-label='Twitter'
								target='_blank'>
								<FaTwitter />
							</a>
							<a
								href='https://www.instagram.com/by.miskin'
								aria-label='Instagram'
								target='_blank'>
								<FaInstagram />
							</a>
							<a
								href='https://www.linkedin.com/in/adityamiskin'
								aria-label='LinkedIn'
								target='_blank'>
								<FaLinkedinIn />
							</a>
						</div>
					</div>
				</div>
			</nav>

			<div className={`flex md:hidden flex-col mb-8 p-4 relative  `}>
				<div
					className={`flex justify-between mb-2 ${
						pathname === '/photo'
							? 'text-white'
							: pathname.startsWith('/photo/')
							? 'text-black'
							: 'text-black'
					} dark:text-white`}>
					<Link href='/' className='' onClick={() => handleClick('/')}>
						<h1 className='tracking-widest font-head font-semibold text-3xl relative z-30'>
							ADITYA MISKIN
						</h1>
					</Link>
					<div className='flex items-center gap-4 '>
						<button
							onClick={() => setDarkMode(!darkMode)}
							aria-label='Dark mode toggle'
							className='z-30'>
							{darkMode && hasMounted ? (
								<FiSun className='text-2xl transition ease-in-out duration-500 stroke-2 fill-orange-400 stroke-orange-400' />
							) : (
								<FiMoon className='text-2xl transition ease-in-out duration-500 stroke-1 stroke-violet-500 fill-violet-500' />
							)}
						</button>
						<button
							onClick={() => setNavbarOpen((prevState) => !prevState)}
							aria-label='Menu toggle'
							className={`relative z-50 ${navbarOpen ? 'text-black' : null}`}>
							<FiMenu className='text-3xl' />
						</button>
					</div>
				</div>
				<h2
					className={`tracking-[7.5px] text-[#111] font-thin z-30 relative ${
						pathname === '/photo'
							? 'text-white'
							: pathname.startsWith('/photo/')
							? 'text-black'
							: 'text-black'
					} dark:text-white`}>
					TELLING STORIES IN EVERY MEDIUM
				</h2>
			</div>

			<aside
				className={`w-full h-full text-left transition-transform duration-300 ease-out transform fixed bg-[#fbfbfb] top-0 left-0 p-6 py-8 font-head md:hidden z-40 dark:text-black ${
					navbarOpen ? 'translate-x-0' : 'translate-x-full'
				}`}>
				<ul
					className='flex flex-col gap-6 tracking-wider text-lg font-head'
					style={{ width: 'fit-content' }}>
					<li>
						<Link href='/' className={`link ml-3`} onClick={handleClick}>
							About
						</Link>
					</li>

					<li>
						<Link href='/work' className={`link ml-3`} onClick={handleClick}>
							Work
						</Link>
					</li>

					<li>
						<Link href='/blog' className={`link ml-3`} onClick={handleClick}>
							Blog
						</Link>
					</li>

					<li>
						<Link href='/photo' className='link' onClick={handleClick}>
							+ Photo
						</Link>
						<ul className='ml-8 flex flex-col gap-2 mt-3'>
							{imageTypes.map((type) => (
								<li key={type}>
									<Link
										href={`/photo/${type.toLowerCase()}`}
										className={`sublink `}
										onClick={handleClick}>
										{type}
									</Link>
								</li>
							))}
						</ul>
					</li>

					<li>
						<Link
							href='/contact'
							className={`link ${
								activeLink === '/contact' ? 'active' : ''
							} underline-offset-2`}
							onClick={() => handleClick('/contact')}>
							Contact
						</Link>
					</li>

					<li className='text-xl flex gap-4'>
						<Link href='https://github.com/adityamiskin' aria-label='Github'>
							<FaGithub />
						</Link>
						<Link href='https://twitter.com/AdityaMiskin3' aria-label='Twitter'>
							<FaTwitter />
						</Link>
						<Link
							href='https://www.instagram.com/by.miskin'
							aria-label='Instagram'>
							<FaInstagram />
						</Link>
						<Link
							href='https://www.linkedin.com/in/aditya-miskin/'
							aria-label='LinkedIn'>
							<FaLinkedinIn />
						</Link>
					</li>
				</ul>
			</aside>
		</header>
	);
};

export default Navbar;
