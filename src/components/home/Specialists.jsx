import React, { useEffect, useState } from 'react'

import server from '../../services/server'

const Specialists = () => {
	const [specialists, setSpecialists] = useState(null)

	const getSpecialists = async () => {
		const data = await server.query('get', 'get_doctors')
		// console.log(data)
		setSpecialists(data.doctors)
	}

	useEffect(() => {
		getSpecialists()
	}, [])

	return (
		<section id="specialists" className="container mx-auto mb-48 px-5 xl:px-0">
			<div>
				<div className="flex flex-col gap-12 items-center justify-center">
					<div className="uppercase bg-[#c9deff] text-[#3C82F6] px-2 py-1 shadow-lg shadow-blue-400/10 text-sm rounded-full">
						Meet Our Specialists
					</div>
					<div className="text-center text-balance flex flex-col gap-6">
						<h1 className="font-semibold text-3xl">
							Our Team of Expert Doctors
						</h1>
						<p className="text-base text-[#8896AB]">
							At Shefaa Clinic, we have a team of highly qualified specialists
							dedicated to providing the best care for your health needs. Our
							doctors are experts in their fields and are here to help you
							achieve your health goals.
						</p>
					</div>
				</div>

				{/* Doctors */}
				<div className="my-16 lg:grid md:grid-cols-2 xl:grid-cols-3 flex flex-col gap-8">
					{specialists &&
						specialists.map((doctor) => (
							<div
								key={doctor.id}
								className="bg-white drop-shadow-custom rounded-3xl p-8 flex flex-col gap-6"
							>
								<img
									className="rounded-xl lg:h-80 md:h-[600px] h-[450px] w-full object-cover lg:object-top md:object-center"
									src={
										doctor.photopath
											? doctor.photopath
											: 'https://images.pexels.com/photos/2678059/pexels-photo-2678059.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
									}
									alt={doctor.name}
								/>
								<h3 className="font-semibold text-xl text-[#3C82F6]">
									{doctor.name}
								</h3>
							</div>
						))}
				</div>

				{/* Appointments */}
				<div id="appointment"></div>
			</div>
		</section>
	)
}

export default Specialists
