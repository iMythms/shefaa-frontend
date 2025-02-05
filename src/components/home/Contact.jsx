import React from 'react'
import { MailIcon, DeviceMobileIcon, StackIcon } from '@primer/octicons-react'

const Contact = () => {
	return (
		<section id="contact" className="container mx-auto mb-48">
			<div className="flex flex-col gap-12 items-center justify-center">
				<div className="uppercase bg-[#c9deff] text-[#3C82F6] px-2 py-1 shadow-lg shadow-blue-400/10 text-xs rounded-full">
					Contact us
				</div>
				<div className="text-center text-balance flex flex-col gap-6">
					<h1 className="font-semibold text-3xl">Let's stay connected</h1>
					<p className="text-base text-[#8896AB]">
						Find out how we can help you and improve your health at the same
						time.
					</p>
				</div>

				<div className="flex items-center justify-between gap-10">
					<div className="flex flex-col items-center justify-center gap-4">
						<div className="bg-[#3C82F6] p-4 rounded-2xl">
							<MailIcon size={32} fill="#FFFFFF" />
						</div>
						<h3 className="font-semibold text-2xl">Email</h3>
						<a href="mailto:contact@shefaa.bh" className="hover:underline">
							contact@shefaa.bh
						</a>
					</div>
					<div className="flex flex-col items-center justify-center gap-4">
						<div className="bg-[#3C82F6] p-4 rounded-2xl">
							<DeviceMobileIcon size={32} fill="#FFFFFF" />
						</div>
						<h3 className="font-semibold text-2xl">Phone</h3>
						<a href="tel:+97377111111" className="hover:underline">
							+973 7711 1111
						</a>
					</div>
					<div className="flex flex-col items-center justify-center gap-4">
						<div className="bg-[#3C82F6] p-4 rounded-2xl">
							<StackIcon size={32} fill="#FFFFFF" />
						</div>
						<h3 className="font-semibold text-2xl">Socials</h3>
						<p>+973 7711 1111</p>
					</div>
				</div>

				<iframe
					src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4561.761543389586!2d50.572268476192875!3d26.242732088560036!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e49a8d1f03b1701%3A0xd415be5ff2b43933!2sBahrain%20Institute%20of%20Banking%20and%20Finance%20(BIBF)!5e1!3m2!1sen!2sbh!4v1738689608513!5m2!1sen!2sbh"
					style={{ border: 0 }}
					allowFullScreen=""
					loading="lazy"
					referrerPolicy="no-referrer-when-downgrade"
					className="rounded-xl w-full h-[400px]"
				></iframe>
			</div>
		</section>
	)
}

export default Contact
