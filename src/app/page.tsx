import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
	return (
		<main>
			<section className='md:w-10/12 lg:w-9/12 w-full max-w-3xl mx-auto flex flex-col p-4 md:p-8 mb-12 relative my-auto mt-8'>
				<h2 className='font-head font-semibold text-3xl mb-6'>About</h2>
				<div className='flex mx-auto gap-6 flex-col md:flex-row'>
					<div className='tracking-wider text-sm order-2 md:order-1'>
						<p className='mb-4 mt-2'>Hi, I&apos;m Aditya.</p>
						<p className='mb-8 leading-relaxed'>
							I&apos;m a software engineer living in Bengaluru, IN. I’m also a
							hobbyist{' '}
							<Link
								href={'/photo'}
								className='link-text'
								rel='noopener noreferrer'>
								photographer
							</Link>{' '}
							travelling the world, documenting this beautiful planet of ours.
							In my free time, I play a lot of games and learn guitar. Check out
							my{' '}
							<Link
								href={'/blog'}
								className='link-text'
								rel='noopener noreferrer'>
								blogs
							</Link>{' '}
							and resume over{' '}
							<a
								href='https://drive.google.com/file/d/12uiedKhDRLFK5DbC2ZRyuSqTMYwC5M7F/view?usp=sharing'
								className='link-text'
								target='_blank'
								rel='noopener noreferrer'>
								here.
							</a>{' '}
						</p>

						<h3 className='mb-3 font-head text-lg font-semibold'>
							Toss me a line
						</h3>

						<p className='italic'>adityamiskin98@gmail.com</p>
					</div>

					<Image
						src='https://res.cloudinary.com/vite-img/image/upload/c_scale,q_80,w_600/v1704632730/profile_bhu0aw.webp'
						alt='profile picture'
						className=' md:max-w-[21rem] md:max-h-[21rem] order-1 md:order-2 w-full h-full'
						width={600}
						height={600}
						priority={true}
					/>
				</div>
			</section>
		</main>
	);
}
