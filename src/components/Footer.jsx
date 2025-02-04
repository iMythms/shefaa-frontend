import React from 'react'

const Footer = () => {
	const currentYear = new Date().getFullYear()

	return (
		<section className="bg-[#2A3342] py-8 rounded-t-3xl flex items-center justify-center w-full mt-auto">
			<h1 className="font-medium text-base text-[#8896AB]">
				© {currentYear} Shefaa. All rights reserved.
			</h1>
		</section>
	)
}

export default Footer
