import React, { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faStethoscope,
	faVial,
	faXRay,
	faSyringe,
	faTooth,
	faDumbbell,
} from '@fortawesome/free-solid-svg-icons'

const Services = ({ server }) => {
	const [services, setServices] = useState(null)

	const getServices = () => {
		setServices(server.query('get', '/get-services'))
	}

	useEffect(() => {
		getServices()
	}, [])

	return (
		<section id="services" className="container mx-auto mb-48 px-5 xl:px-0">
			<div className="flex flex-col gap-12 items-center justify-center">
				<div className="uppercase bg-[#c9deff] text-[#3C82F6] px-2 py-1 shadow-lg shadow-blue-400/10 text-sm rounded-full">
					What we offer
				</div>
				<div className="text-center text-balance flex flex-col gap-6">
					<h1 className="font-semibold text-3xl">
						Do you have a chronical weight problem that just won't go away?
					</h1>
					<p className="text-base text-[#8896AB]">
						If so, Shefaa Clinic is here to help! We specialize in
						endocrinology, diabetes, weight control and other chronic
						conditions. We believe that health is the most important thing in
						the world, and we want to make sure that everyone has access to the
						best treatment possible.
					</p>
				</div>
			</div>

			{/* Service List */}
			<div className="my-16 lg:grid md:grid-cols-2 xl:grid-cols-3 flex flex-col gap-8">
				<div className="bg-white drop-shadow-custom rounded-3xl w-full p-8 flex flex-col gap-6">
					{/* Icon */}
					<div className="bg-[#c9deff] w-fit p-4 rounded-full">
						<FontAwesomeIcon
							icon={faStethoscope}
							size="2x"
							style={{ color: '#2A3342' }}
						/>
					</div>

					{/* Title */}
					<h3 className="font-semibold text-xl text-[#3C82F6]">
						General Consultation
					</h3>

					{/* Description */}
					<p className="text-balance font-normal text-base">
						Comprehensive patient evaluation, diagnosis, and treatment planning
						for common health issues.
					</p>
				</div>
				<div className="bg-white drop-shadow-custom rounded-3xl w-full p-8 flex flex-col gap-6">
					{/* Icon */}
					<div className="bg-[#c9deff] w-fit p-4 rounded-full">
						<FontAwesomeIcon
							icon={faVial}
							size="2x"
							style={{ color: '#2A3342' }}
						/>
					</div>

					{/* Title */}
					<h3 className="font-semibold text-xl text-[#3C82F6]">
						Laboratory Testing
					</h3>

					{/* Description */}
					<p className="text-balance font-normal text-base">
						A range of diagnostic tests including blood work, urinalysis, and
						other specimen analyses to support accurate medical assessments.
					</p>
				</div>
				<div className="bg-white drop-shadow-custom rounded-3xl w-full p-8 flex flex-col gap-6">
					{/* Icon */}
					<div className="bg-[#c9deff] w-fit p-4 rounded-full">
						<FontAwesomeIcon
							icon={faXRay}
							size="2x"
							style={{ color: '#2A3342' }}
						/>
					</div>

					{/* Title */}
					<h3 className="font-semibold text-xl text-[#3C82F6]">
						Radiology Services
					</h3>

					{/* Description */}
					<p className="text-balance font-normal text-base">
						Imaging solutions such as X-rays, CT scans, and ultrasound to
						diagnose internal conditions and monitor treatment progress.
					</p>
				</div>
				<div className="bg-white drop-shadow-custom rounded-3xl w-full p-8 flex flex-col gap-6">
					{/* Icon */}
					<div className="bg-[#c9deff] w-fit p-4 rounded-full">
						<FontAwesomeIcon
							icon={faSyringe}
							size="2x"
							style={{ color: '#2A3342' }}
						/>
					</div>

					{/* Title */}
					<h3 className="font-semibold text-xl text-[#3C82F6]">
						Vaccination Clinic
					</h3>

					{/* Description */}
					<p className="text-balance font-normal text-base">
						Immunization services for both children and adults to protect
						against seasonal and preventable diseases.
					</p>
				</div>
				<div className="bg-white drop-shadow-custom rounded-3xl w-full p-8 flex flex-col gap-6">
					{/* Icon */}
					<div className="bg-[#c9deff] w-fit p-4 rounded-full">
						<FontAwesomeIcon
							icon={faTooth}
							size="2x"
							style={{ color: '#2A3342' }}
						/>
					</div>

					{/* Title */}
					<h3 className="font-semibold text-xl text-[#3C82F6]">Dental Care</h3>

					{/* Description */}
					<p className="text-balance font-normal text-base">
						Routine check-ups, cleaning, and minor dental procedures designed to
						maintain oral health.
					</p>
				</div>
				<div className="bg-white drop-shadow-custom rounded-3xl w-full p-8 flex flex-col gap-6">
					{/* Icon */}
					<div className="bg-[#c9deff] w-fit p-4 rounded-full">
						<FontAwesomeIcon
							icon={faDumbbell}
							size="2x"
							style={{ color: '#2A3342' }}
						/>
					</div>

					{/* Title */}
					<h3 className="font-semibold text-xl text-[#3C82F6]">
						Physiotherapy & Rehabilitation
					</h3>

					{/* Description */}
					<p className="text-balance font-normal text-base">
						Therapeutic services focused on improving mobility, relieving pain,
						and restoring physical function following injury or surgery.
					</p>
				</div>
			</div>
		</section>
	)
}

export default Services
