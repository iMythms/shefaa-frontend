import React from 'react'
import AboutImage from '../../assets/aboutImage.jpg'

const About = () => {
	return (
		<section className="container mx-auto mb-48 px-5 xl:px-0" id="about">
			<div>
				<div className="flex flex-col gap-12 items-center justify-center">
					<div className="uppercase bg-[#c9deff] text-[#3C82F6] px-2 py-1 shadow-lg shadow-blue-400/10 text-xs rounded-full">
						Get well with us
					</div>
					<div className="text-center text-balance flex flex-col gap-6">
						<h1 className="font-semibold text-3xl">
							Do you have a chronical weight problem that just won't go away?
						</h1>
						<p className="text-base text-[#8896AB]">
							If so, Shefaa Clinic is here to help! We specialize in
							endocrinology, diabetes, weight control and other chronic
							conditions. We believe that health is the most important thing in
							the world, and we want to make sure that everyone has access to
							the best treatment possible.
						</p>
					</div>
					<img src={AboutImage} alt="aboutImage" className="lg:w-1/2" />
				</div>
			</div>
		</section>
	)
}

export default About
