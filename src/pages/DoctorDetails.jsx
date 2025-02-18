import server from '@/services/server'
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faUserDoctor,
	faEnvelope,
	faPhone,
	faCheckCircle,
} from '@fortawesome/free-solid-svg-icons'

const DoctorDetails = () => {
	const { id } = useParams()
	const [doctor, setDoctor] = useState(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)

	useEffect(() => {
		const fetchDoctorDetails = async () => {
			try {
				const doctorRes = await server.query('get', `doctors/${id}`)
				setDoctor(doctorRes.doctor || null)
			} catch (error) {
				setError('Failed to load doctor details')
			} finally {
				setLoading(false)
			}
		}

		fetchDoctorDetails()
	}, [id])

	if (loading)
		return <p className="text-center mt-10">Loading doctor details...</p>
	if (error) return <p className="text-red-500 text-center mt-10">{error}</p>

	return (
		<section className="container mx-auto my-24 xl:my-48 px-5 xl:px-0">
			<h1 className="text-2xl font-bold mb-12">Doctor Details</h1>

			<div className="flex flex-col gap-2 xl:grid grid-cols-4">
				{/* Doctor Name */}
				<div className="bg-white drop-shadow-custom rounded-xl p-6 flex items-center gap-4">
					<div className="p-2 rounded-full">
						<FontAwesomeIcon
							icon={faUserDoctor}
							style={{ color: '#000000' }}
							size="2x"
							className="text-[#2A3342]"
						/>
					</div>
					<div>
						<h3 className="font-semibold text-lg">Doctor</h3>
						<p className="text-gray-600 font-medium">{doctor?.name}</p>
					</div>
				</div>

				{/* Email */}
				<div className="bg-white drop-shadow-custom rounded-xl p-6 flex items-center gap-4">
					<div className="p-2 rounded-full">
						<FontAwesomeIcon
							icon={faEnvelope}
							style={{ color: '#000000' }}
							size="2x"
							className="text-[#2A3342]"
						/>
					</div>
					<div>
						<h3 className="font-semibold text-lg">Email</h3>
						<p className="text-gray-600 font-medium">{doctor?.email}</p>
					</div>
				</div>

				{/* Phone */}
				<div className="bg-white drop-shadow-custom rounded-xl p-6 flex items-center gap-4">
					<div className="p-2 rounded-full">
						<FontAwesomeIcon
							icon={faPhone}
							style={{ color: '#000000' }}
							size="2x"
							className="text-[#2A3342]"
						/>
					</div>
					<div>
						<h3 className="font-semibold text-lg">Phone</h3>
						<p className="text-gray-600 font-medium">{doctor?.phone}</p>
					</div>
				</div>

				{/* Status */}
				<div className="bg-white drop-shadow-custom rounded-xl p-6 flex items-center gap-4">
					<div className="p-2 rounded-full">
						<FontAwesomeIcon
							icon={faCheckCircle}
							style={{ color: '#000000' }}
							size="2x"
							className="text-[#2A3342]"
						/>
					</div>
					<div>
						<h3 className="font-semibold text-lg">Status</h3>
						<p className="text-gray-600 font-medium">{doctor?.status}</p>
					</div>
				</div>
			</div>
		</section>
	)
}

export default DoctorDetails
