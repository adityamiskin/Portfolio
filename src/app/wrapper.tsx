'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';

export default function Wrapper({
	children,
}: {
	children: React.ReactNode;
}) {
	const [navbarOpen, setNavbarOpen] = useState(false);
	return (
		<>
			<Navbar navbarOpen={navbarOpen} setNavbarOpen={setNavbarOpen} />
			{children}
		</>
	);
}
