'use client';
import React, { useEffect, useState } from 'react';
import { SquareLoader } from 'react-spinners';

const Spinner = () => {
	let [loading, setLoading] = useState(true);
	let [color, setColor] = useState('#ffffff');

	useEffect(() => {
		const handleStorageChange = () => {
			const darkMode = localStorage.getItem('darkMode');
			setColor(darkMode === 'true' ? '#ffffff' : '#000000');
		};

		// Listen for changes in `localStorage` in other documents
		window.addEventListener('storage', handleStorageChange);

		// Initial color setting
		handleStorageChange();

		return () => {
			// Clean up the listener when the component unmounts
			window.removeEventListener('storage', handleStorageChange);
		};
	}, []);

	return (
		<div className='fixed top-[50%] left-[50%]'>
			<SquareLoader key={color} loading={loading} size={40} color={color} />
		</div>
	);
};

export default Spinner;
