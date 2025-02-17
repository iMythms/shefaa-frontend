import server from '@/services/server'
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'

const ServiceDetails = () => {
	const { id } = useParams()
	const [service, setService] = useState(null)
	const [doctors, setDoctors] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)

	useEffect(() => {
		const fetchServiceDetails = async () => {
			try {
				const serviceRes = await server.query('get', `services/${id}`)
				setService(serviceRes.service || null)
				setDoctors(serviceRes.doctors || [])
			} catch (error) {
				setError('Failed to load service details')
			} finally {
				setLoading(false)
			}
		}

		fetchServiceDetails()
	}, [id])

	const handleDelete = async (doctorId) => {
		try {
			const data = await server.query('delete', `services/${id}/${doctorId}`)
			console.log(data)
			setDoctors(doctors.filter((doctor) => doctor.id !== doctorId))
		} catch (error) {
			setError('Failed to delete doctor')
		}
	}

	if (loading)
		return <p className="text-center mt-10">Loading service details...</p>
	if (error) return <p className="text-red-500 text-center mt-10">{error}</p>

	return (
		<section className="container mx-auto my-24 xl:my-48 px-5 xl:px-0">
			<h1 className="text-2xl font-bold mb-6">Service Details</h1>

			<div>
				<p className="text-lg font-semibold">{service?.title}</p>

				<div className="flex flex-col gap-2 xl:grid grid-cols-3">
					<p className="mt-6">
						Price: <span className="font-medium">{service?.price} BHD</span>
					</p>
					<p className="">
						Duration:
						<span className="font-medium">{service?.duration} minutes</span>
					</p>
					<p className="">
						Status: <span className="font-medium">{service?.status}</span>
					</p>
					<p className="">
						Description: {''}
						<span className="font-medium">
							{service?.description || 'No description available.'}
						</span>
					</p>
				</div>

				<section className="mt-12">
					<h1 className="text-lg font-semibold">Doctors</h1>
					<div className="mt-8">
						<Table>
							<TableCaption>List of associated doctors.</TableCaption>
							<TableHeader>
								<TableRow>
									<TableHead className="w-[100px]">ID</TableHead>
									<TableHead>Doctor Name</TableHead>
									<TableHead className="text-center">Actions</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{doctors.length > 0 ? (
									doctors.map((doctor) => (
										<TableRow key={doctor.id}>
											<TableCell className="font-medium">{doctor.id}</TableCell>
											<TableCell>{doctor.name}</TableCell>
											<TableCell>
												<div className="flex space-x-2 justify-center">
													<button
														onClick={() => handleDelete(doctor.id)}
														className="bg-red-600 hover:bg-red-700 text-white cursor-pointer px-4 py-1.5 rounded-lg"
													>
														Delete
													</button>
												</div>
											</TableCell>
										</TableRow>
									))
								) : (
									<TableRow>
										<TableCell colSpan={3} className="text-center">
											No doctors available.
										</TableCell>
									</TableRow>
								)}
							</TableBody>
						</Table>
					</div>
				</section>
			</div>
		</section>
	)
}

export default ServiceDetails
