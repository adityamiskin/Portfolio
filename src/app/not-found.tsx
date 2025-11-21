import Anya from '@/assets/images/anya-new.png';
import Image from 'next/image';

const NotFound = () => {
	return (
		<section className='md:p-10 p-4 mx-auto'>
			<Image
				src={Anya}
				width={500}
				height={500}
				alt='404'
				className='mx-auto w-[500px] mt-10'
			/>
		</section>
	);
};

export default NotFound;
