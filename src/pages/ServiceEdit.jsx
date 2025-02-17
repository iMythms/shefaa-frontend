import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import server from '../services/server'

const ServiceEdit = () => {
	const { id } = useParams()
	const navigate = useNavigate()
	const [service, setService] = useState({
		title: '',
		price: '',
		duration: '',
		status: '',
		description: '',
		doctors: [],
	})
	const [availableDoctors, setAvailableDoctors] = useState([]) // List of all doctors
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await server.query('get', `services/${id}`)
				const doctorsRes = await server.query(
					'get',
					`services/otherDoctors/${id}`
				) // Fetch all doctors

				console.log(doctorsRes)
				setService(response.service)
				setAvailableDoctors(doctorsRes.srvDoctors)
			} catch (err) {
				setError('Failed to fetch service data')
			} finally {
				setLoading(false)
			}
		}
		fetchData()
	}, [id])

	const handleChange = (e) => {
		setService({ ...service, [e.target.name]: e.target.value })
	}

	// Handle doctor selection
	const handleDoctorChange = (e) => {
		const selectedOptions = Array.from(
			e.target.selectedOptions,
			(option) => option.value
		)
		setService({ ...service, doctors: selectedOptions })
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		try {
			const data = await server.query('put', `services/${id}`, service)
			console.log(data)
			navigate('/services')
		} catch (err) {
			setError('Failed to update service')
		}
	}

	if (loading) return <p className="text-center mt-10">Loading service...</p>
	if (error) return <p className="text-red-500 text-center mt-10">{error}</p>

	return (
		<section className="container mx-auto mt-48 mb-24 flex flex-col items-center justify-center">
			<div className="w-full lg:w-1/2">
				<div className="bg-white p-12 drop-shadow-custom rounded-3xl">
					<h1 className="text-2xl font-bold mb-8">Edit Service</h1>

					<form
						onSubmit={handleSubmit}
						autoComplete="off"
						className="w-full flex flex-col gap-6"
					>
						{/* Name */}
						<div className="space-y-2 flex flex-col">
							<label htmlFor="title">Title</label>
							<input
								type="text"
								id="title"
								name="title"
								value={service.title}
								onChange={handleChange}
								placeholder="Enter Service Title"
								className="border p-2 rounded-lg"
								required
							/>
						</div>

						{/* Price */}
						<div className="space-y-2 flex flex-col">
							<label htmlFor="price">Price</label>
							<input
								type="text"
								id="price"
								name="price"
								value={service.price}
								onChange={handleChange}
								placeholder="Enter Price"
								className="border p-2 rounded-lg"
							/>
						</div>

						{/* Duration */}
						<div className="space-y-2 flex flex-col">
							<label htmlFor="duration">Duration (minutes)</label>
							<input
								type="text"
								id="duration"
								name="duration"
								value={service.duration}
								onChange={handleChange}
								placeholder="Enter Duration"
								className="border p-2 rounded-lg"
								required
							/>
						</div>

						{/* Status */}
						<div className="space-y-2 flex flex-col">
							<label htmlFor="status">Status</label>
							<select
								id="status"
								name="status"
								value={service.status}
								onChange={handleChange}
								className="border p-2 rounded-lg"
							>
								<option value="active">Active</option>
								<option value="suspended">Suspended</option>
							</select>
						</div>

						{/* Doctors Multi-Select */}
						<div className="space-y-2 flex flex-col">
							<label htmlFor="doctors">Doctors</label>
							<select
								id="doctors"
								name="doctors"
								multiple
								value={service.doctors}
								onChange={handleDoctorChange}
								className="border p-2 rounded-lg h-32"
							>
								{availableDoctors.map((doctor) => (
									<option key={doctor.id} value={doctor.id}>
										{doctor.name}
									</option>
								))}
							</select>
							<p className="text-sm font-mono text-gray-600">
								Hold Ctrl (Windows) or Cmd (Mac) to select multiple doctors.
							</p>
						</div>

						{/* Submit Button */}
						<button
							type="submit"
							className="w-full bg-green-600 hover:bg-green-700 text-white rounded-lg p-2"
						>
							Update Service
						</button>
					</form>
				</div>
			</div>
		</section>
	)
}

export default ServiceEdit
