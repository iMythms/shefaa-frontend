import React from 'react'
import HeroImage from '../../assets/heroImage.png'

const Hero = () => {
	return (
		<section className="bg-[#2A3342] rounded-b-[64px] mb-48 px-5 xl:px-0">
			<div className="pt-32 lg:pt-76 pb-28 lg:pb-48 container mx-auto lg:grid md:grid-cols-2 flex flex-col-reverse gap-16 lg:gap-32">
				<div className="flex flex-col gap-6 items-center lg:items-start justify-center lg:justify-start">
					<a
						href="https://maps.app.goo.gl/JNGevNRSYpKcmHQm6"
						className="bg-[#C1121F] rounded-xl text-xs px-3 py-1.5 font-light text-white w-fit transform hover:scale-105 transition ease-linear hover:delay-75 shadow-lg shadow-red-700/40"
					>
						Located in Bahrain
					</a>
					<h1 className="font-extrabold text-4xl text-white leading-normal text-balance lg:text-left text-center">
						Your Health and Wellbeing, our Priority
					</h1>
					<p className="text-base font-normal text-[#8896AB] text-balance lg:text-left text-center">
						Our goal is to make sure our customers receive the best treatment
						they need in a pleasant environment.
					</p>

					{/* Buttons */}
					<div className="flex gap-2.5">
						<a
							href="tel:+97377111111"
							className="px-4 py-2 border border-[#3C82F6] text-[#3C82F6] font-light rounded-xl hover:bg-[#3C82F6] hover:text-white transition ease-in-out"
						>
							+973 7711 1111
						</a>
						<a
							href="#contact"
							className="px-4 py-2 border border-[#3C82F6] hover:text-[#3C82F6] font-light rounded-xl hover:bg-[#2A3342] bg-[#3C82F6] text-white transition ease-in-out"
						>
							Book an Appointment
						</a>
					</div>
				</div>
				<div className="ml-auto">
					<img
						src={HeroImage}
						alt="heroImage"
						className="w-full"
						loading="lazy"
					/>
				</div>
			</div>
		</section>
	)
}

export default Hero
