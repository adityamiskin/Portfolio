'use client';

import React, { useState } from 'react';
import {
	FaTwitter,
	FaInstagram,
	FaLinkedinIn,
	FaGithub,
} from 'react-icons/fa6';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const SOCIAL_MEDIA_LINKS = [
	{
		url: 'https://www.github.com/adityamiskin',
		icon: <FaGithub />,
		ariaLabel: 'Github',
	},
	{
		url: 'https://twitter.com/ad1tyamiskin',
		icon: <FaTwitter />,
		ariaLabel: 'Twitter',
	},
	{
		url: 'https://www.instagram.com/by.miskin',
		icon: <FaInstagram />,
		ariaLabel: 'Instagram',
	},
	{
		url: 'https://www.linkedin.com/in/adityamiskin/',
		icon: <FaLinkedinIn />,
		ariaLabel: 'LinkedIn',
	},
];

const SocialMediaLinks = ({
	isHovered,
	setIsHovered,
	activeIndex,
	setActiveIndex,
}) => (
	<ul
		className='flex gap-4 mb-8 w-full justify-center transition-all'
		onMouseEnter={() => setIsHovered(true)}
		onMouseLeave={() => setIsHovered(false)}>
		{SOCIAL_MEDIA_LINKS.map((link, index) => (
			<li
				key={index}
				className={`text-xl flex gap-4 transition-opacity duration-150 ${
					isHovered && activeIndex !== index ? 'opacity-50' : 'opacity-100'
				}`}
				onMouseEnter={() => setActiveIndex(index)}
				onMouseLeave={() => setActiveIndex(null)}>
				<a
					href={link.url}
					target='_blank'
					rel='noopener noreferrer'
					aria-label={link.ariaLabel}>
					{link.icon}
				</a>
			</li>
		))}
	</ul>
);

const Contact = () => {
	const [isHovered, setIsHovered] = useState(false);
	const [activeIndex, setActiveIndex] = useState(null);
	const [errors, setErrors] = useState({});
	const [formState, setFormState] = useState({
		firstName: '',
		lastName: '',
		email: '',
		subject: '',
		message: '',
	});

	const [serverState, setServerState] = useState({
		submitting: false,
		status: null,
	});

	const formKey = process.env.FORMSPREE_KEY;

	const validateForm = () => {
		let formErrors = {};

		// Add your validation logic here
		if (!formState.firstName) formErrors.firstName = 'First name is required';
		if (!formState.lastName) formErrors.lastName = 'Last name is required';
		if (!formState.email) formErrors.email = 'Email is required';
		else if (!/\S+@\S+\.\S+/.test(formState.email))
			formErrors.email = 'Email is invalid';
		if (!formState.subject) formErrors.subject = 'Subject is required';
		if (!formState.message) formErrors.message = 'Message is required';

		setErrors(formErrors);

		// If no errors, return true, else return false
		return Object.keys(formErrors).length === 0;
	};

	const handleServerResponse = (ok, msg) => {
		setServerState({
			submitting: false,
			status: { ok, msg },
		});
		if (ok) {
			toast.success('Form submitted successfully!', {
				position: toast.POSITION.BOTTOM_RIGHT,
				closeOnClick: true,
				pauseOnHover: false,
			});
			setFormState({
				firstName: '',
				lastName: '',
				email: '',
				subject: '',
				message: '',
			});
		} else {
			toast.error('Form not submitted!', {
				position: toast.POSITION.BOTTOM_RIGHT,
				closeOnClick: true,
				pauseOnHover: false,
			});
		}
	};

	const handleOnSubmit = (event) => {
		event.preventDefault();
		if (!validateForm()) return;
		setServerState({ submitting: true });
		axios({
			method: 'POST',
			url: `https://formspree.io/f/${formKey}`,
			data: formState,
		})
			.then((r) => {
				handleServerResponse(true, 'Thanks!');
			})
			.catch((r) => {
				handleServerResponse(false, r.response.data.error);
			});
	};

	const handleChange = (event) => {
		setFormState({
			...formState,
			[event.target.name]: event.target.value,
		});
	};

	return (
		<section className='flex justify-center flex-col mb-20 p-4 md:mt-12'>
			<SocialMediaLinks
				isHovered={isHovered}
				setIsHovered={setIsHovered}
				activeIndex={activeIndex}
				setActiveIndex={setActiveIndex}
			/>
			<ToastContainer />
			<p className='text-2xl font-head font-semibold mb-8 text-center mx-auto md:max-w-screen-md w-full md:px-6'>
				Available for various services including frontend design, software
				freelancing and MVP building. Contact for rates. Or, if you just wanna
				chat, toss me a line!
			</p>
			<form
				className='flex flex-col gap-3 mx-auto md:max-w-screen-sm w-full justify-center md:px-6'
				onSubmit={handleOnSubmit}>
				<p className='text-sm text-left tracking-wider'>
					Name <span className='text-xs opacity-70'>(required)</span>
				</p>

				<div className='flex flex-col space-y-4 w-full'>
					<div className='flex space-x-4 w-full'>
						<div className='w-full'>
							<label
								htmlFor='firstName'
								className='block text-sm tracking-wider'>
								First Name
							</label>
							<input
								type='text'
								id='firstName'
								name='firstName'
								onChange={handleChange}
								value={formState.firstName}
								className='mt-1 block w-full border border-[#a9a9a9] p-2 bg-transparent'
							/>
							{errors.firstName && <p className='error'>{errors.firstName}</p>}
						</div>
						<div className='w-full'>
							<label
								htmlFor='lastName'
								className='block text-sm text-[#33333] tracking-wider'>
								Last Name
							</label>
							<input
								type='text'
								id='lastName'
								name='lastName'
								onChange={handleChange}
								value={formState.lastName}
								className='mt-1 block w-full border border-[#a9a9a9] p-2 bg-transparent'
							/>
							{errors.lastName && <p className='error'>{errors.lastName}</p>}
						</div>
					</div>

					<div>
						<label
							htmlFor='email'
							className='block text-sm text-[#33333] tracking-wider'>
							Email Address{' '}
							<span className='text-xs opacity-70'>(required)</span>
						</label>
						<input
							type='email'
							id='email'
							name='email'
							onChange={handleChange}
							value={formState.email}
							className='mt-1 block w-full border border-[#a9a9a9] p-2 bg-transparent'
						/>
						{errors.email && <p className='error'>{errors.email}</p>}
					</div>
					<div>
						<label
							htmlFor='subject'
							className='block text-sm text-[#33333] tracking-wider'>
							Subject <span className='text-xs opacity-70'>(required)</span>
						</label>
						<input
							type='text'
							id='subject'
							name='subject'
							onChange={handleChange}
							value={formState.subject}
							className='mt-1 block w-full border border-[#a9a9a9] p-2 bg-transparent'
						/>
						{errors.subject && <p className='error'>{errors.subject}</p>}
					</div>
					<div>
						<label
							htmlFor='message'
							className='block text-sm text-[#33333] tracking-wider'>
							Message <span className='text-xs opacity-70'>(required)</span>
						</label>
						<textarea
							id='message'
							name='message'
							onChange={handleChange}
							value={formState.message}
							className='mt-1 block w-full border border-[#a9a9a9] p-2 bg-transparent'
							rows={5}></textarea>
						{errors.message && <p className='error'>{errors.message}</p>}
					</div>
				</div>
				<button
					type='submit'
					className='bg-[#272727] text-white px-8 py-3 w-fit font-head font-semibold mx-auto mt-2 hover:bg-[#454545] transition tracking-widest'>
					SUBMIT
				</button>
			</form>
		</section>
	);
};

export default Contact;
