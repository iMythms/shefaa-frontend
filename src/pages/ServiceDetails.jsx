import server from '@/services/server'
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faDollarSign,
	faClock,
	faInfoCircle,
	faCheckCircle,
} from '@fortawesome/free-solid-svg-icons'

import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog'

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
			<h1 className="text-2xl font-bold mb-12">{service?.title}</h1>

			<div>
				<div className="flex flex-col gap-2 xl:grid grid-cols-4">
					{/* Price Card */}
					<div className="bg-white drop-shadow-custom rounded-xl p-6 flex items-center gap-4">
						<div className="p-2 rounded-full">
							<FontAwesomeIcon
								icon={faDollarSign}
								style={{ color: '#000000' }}
								size="2x"
								className="text-[#2A3342]"
							/>
						</div>
						<div>
							<h3 className="font-semibold text-lg">Price</h3>
							<p className="text-gray-600 font-medium">{service?.price} BHD</p>
						</div>
					</div>

					{/* Duration Card */}
					<div className="bg-white drop-shadow-custom rounded-xl p-6 flex items-center gap-4">
						<div className="p-2 rounded-full">
							<FontAwesomeIcon
								icon={faClock}
								style={{ color: '#000000' }}
								size="2x"
								className="text-[#2A3342]"
							/>
						</div>
						<div>
							<h3 className="font-semibold text-lg">Duration</h3>
							<p className="text-gray-600 font-medium">
								{service?.duration} minutes
							</p>
						</div>
					</div>

					{/* Status Card */}
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
							<p className="text-gray-600 font-medium">{service?.status}</p>
						</div>
					</div>

					{/* Description Card */}
					<div className="bg-white drop-shadow-custom rounded-xl p-6 flex items-center gap-4">
						<div className="p-2 rounded-full">
							<FontAwesomeIcon
								icon={faInfoCircle}
								style={{ color: '#000000' }}
								size="2x"
								className="text-[#2A3342]"
							/>
						</div>
						<div>
							<h3 className="font-semibold text-lg">Description</h3>
							<p className="text-gray-600 font-medium">
								{service?.description || 'No description available.'}
							</p>
						</div>
					</div>
				</div>

				<section className="mt-12">
					<h1 className="text-lg font-semibold">Doctors</h1>
					<div className="mt-8">
						<Table className="">
							<TableCaption>List of associated doctors.</TableCaption>
							<TableHeader>
								<TableRow>
									<TableHead className="w-[100px]">ID</TableHead>
									<TableHead className="w-full">Doctor Name</TableHead>
									<TableHead className="w-fit text-center">Actions</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{doctors.length > 0 ? (
									doctors.map((doctor) => (
										<TableRow key={doctor.id}>
											<TableCell className="font-medium">{doctor.id}</TableCell>
											<TableCell>{doctor.name}</TableCell>
											<TableCell>
												<AlertDialog>
													<AlertDialogTrigger asChild>
														<button className="bg-red-600 hover:bg-red-700 text-white cursor-pointer px-4 py-1.5 rounded-lg">
															Delete
														</button>
													</AlertDialogTrigger>
													<AlertDialogContent>
														<AlertDialogHeader>
															<AlertDialogTitle>
																Are you absolutely sure?
															</AlertDialogTitle>
															<AlertDialogDescription>
																This action cannot be undone. This will remove
																the doctor from this service.
															</AlertDialogDescription>
														</AlertDialogHeader>
														<AlertDialogFooter>
															<AlertDialogCancel>Cancel</AlertDialogCancel>
															<AlertDialogAction
																onClick={() => handleDelete(doctor.id)}
																className="bg-red-600 hover:bg-red-700"
															>
																Confirm
															</AlertDialogAction>
														</AlertDialogFooter>
													</AlertDialogContent>
												</AlertDialog>
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
