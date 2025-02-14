import React, { useEffect, useState, useRef } from 'react'
import server from '../../../services/server'

const generateDates = () => {
	const today = new Date()
	let dates = []
	for (let i = 0; i < 7; i++) {
		let date = new Date()
		date.setDate(today.getDate() + i)
		dates.push({
			fullDate: date.toISOString().split('T')[0],
			day: date.toLocaleDateString('en-US', { weekday: 'short' }),
		})
	}
	return dates
}

const generateTimeSlots = () => {
	let slots = []
	for (let hour = 8; hour < 16; hour++) {
		slots.push(`${hour}:00 AM`)
		slots.push(`${hour}:30 AM`)
	}
	return slots.map((time) =>
		time.includes('12:') ? time.replace('AM', 'PM') : time
	)
}

const Appointments = () => {
	const [showSuccess, setShowSuccess] = useState(false)
	const [showError, setShowError] = useState(false)
	const appointmentRef = useRef(null)

	const [services, setServices] = useState(null)
	const [specialists, setSpecialists] = useState([]) // Fixed specialists state
	const [formData, setFormData] = useState({
		selectedService: null,
		selectedDoctor: null,
		selectedDate: null,
		selectedTime: null,
		userName: '',
		userMobile: '',
		userEmail: '',
		userCPR: '',
		userMessage: '',
	})

	// Handle input changes
	const handleInputChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value })
	}

	// Fetch doctors when a service is selected
	const handleServiceChange = async (serviceId) => {
		setFormData((prevFormData) => ({
			...prevFormData,
			selectedService: serviceId,
			selectedDoctor: null, // Reset doctor selection
		}))

		try {
			const data = await server.query('get', `srvdoctors/${serviceId}`)
			setSpecialists(data.doctors)
		} catch (error) {
			console.error('Error fetching doctors:', error)
		}
	}

	const handleSubmit = async () => {
		const {
			selectedDoctor,
			selectedDate,
			selectedTime,
			userName,
			userMobile,
			userEmail,
			userCPR,
		} = formData

		if (!selectedDoctor || !selectedDate || !selectedTime) {
			setShowError(true)
			return
		}

		try {
			// Prepare request payload
			const requestData = {
				name: userName,
				cpr: userCPR,
				phone: userMobile,
				email: userEmail,
				serviceId: formData.selectedService,
				doctorId: selectedDoctor,
				appointmentDate: `${selectedDate} ${selectedTime}`,
			}

			console.log('Sending request:', requestData)

			// Send request
			const data = await server.query('post', 'get_appointment', requestData)

			console.log('API Response:', data)

			// Success Condition (Check if response contains success message)
			if (
				data &&
				data.message &&
				data.message.toLowerCase().includes('success')
			) {
				setShowSuccess(true)
				setShowError(false)

				// Reset form after successful submission
				setFormData({
					selectedService: null,
					selectedDoctor: null,
					selectedDate: null,
					selectedTime: null,
					userName: '',
					userMobile: '',
					userEmail: '',
					userCPR: '',
					userMessage: '',
				})

				setSpecialists([])

				// Hide success message after 8 seconds
				setTimeout(() => setShowSuccess(false), 8000)
			} else {
				// If response doesn't contain success, treat as error
				throw new Error(data.error || 'Unknown error occurred')
			}
		} catch (error) {
			console.error('Submission Error:', error)

			// Show error message
			setShowError(true)
			setShowSuccess(false)

			// Hide error message after 8 seconds
			setTimeout(() => setShowError(false), 8000)
		}
	}

	useEffect(() => {
		if (showSuccess || showError) {
			setTimeout(() => {
				if (appointmentRef.current) {
					appointmentRef.current.scrollIntoView({ behavior: 'smooth' })
				}
			}, 200) // Small delay to ensure DOM updates before scrolling
		}
	}, [showSuccess, showError])

	// Fetch available services
	useEffect(() => {
		const getServices = async () => {
			try {
				const data = await server.query('get', 'get_services')
				setServices(data.services)
			} catch (error) {
				console.error('Error fetching services:', error)
			}
		}
		getServices()
	}, []) // Add dependency array to run only once

	return (
		<section id="appointment" className="mt-48" ref={appointmentRef}>
			<div className="flex flex-col gap-12 items-center justify-center mb-16">
				<div className="uppercase bg-[#c9deff] text-[#3C82F6] px-2 py-1 shadow-lg shadow-blue-400/10 text-sm rounded-full">
					Book an Appointment
				</div>
				<div className="text-center text-balance flex flex-col gap-6">
					<h1 className="font-semibold text-3xl">
						Schedule Your Visit with Our Specialists
					</h1>
					<p className="text-base text-[#8896AB]">
						At Shefaa Clinic, your health is our priority. Choose from our team
						of expert doctors and request an appointment at your convenience.
						Submit your preferred date and time, and our reception team will
						confirm your booking shortly.
					</p>
				</div>
			</div>

			{/* Error Message */}
			{showError && (
				<div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded-xl mb-6 flex items-center">
					<svg
						className="h-5 w-5 text-red-700 mr-2"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M6 18L18 6M6 6l12 12"
						></path>
					</svg>
					<div>
						<h3 className="font-semibold">Error!</h3>
						<p>Something went wrong. Please try again.</p>
					</div>
				</div>
			)}

			{/* Success Message */}
			{showSuccess && (
				<div className="bg-green-50 border border-green-400 text-green-700 px-4 py-3 rounded-xl mb-6 flex items-center">
					<svg
						className="h-5 w-5 text-green-700 mr-2"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M5 13l4 4L19 7"
						></path>
					</svg>
					<div>
						<h3 className="font-semibold">Success!</h3>
						<p>
							Your preferred appointment request has been submitted. The
							receptionist will confirm your appointment.
						</p>
					</div>
				</div>
			)}
			{/* Service Selection */}
			<div className="mb-9">
				<h3 className="text-lg font-semibold text-gray-700 mb-6">
					Select a Service
				</h3>
				<div className="grid grid-cols-2 md:grid-cols-3 gap-4">
					{services &&
						services.map((service) => (
							<button
								key={service.id}
								className={`p-3 rounded-full font-semibold border-1 text-center cursor-pointer transform hover:scale-105 transition ease-linear hover:delay-75 ${
									formData.selectedService === service.id
										? 'bg-[#3C82F6] text-white border-[#3C82F6]'
										: 'border-gray-300 text-gray-700 bg-white'
								}`}
								onClick={() => handleServiceChange(service.id)} // Fixed event handling
							>
								{service.title}
							</button>
						))}
				</div>
			</div>

			{/* Doctor Selection (Appears when a service is selected) */}
			{formData.selectedService && (
				<div className="mb-9">
					<h3 className="text-lg font-semibold text-gray-700 mb-6">
						Select a Doctor
					</h3>
					<div className="grid grid-cols-2 md:grid-cols-3 gap-4">
						{specialists.length > 0 ? (
							specialists.map((doctor) => (
								<button
									key={doctor.id}
									className={`p-3 rounded-full font-semibold border-1 text-center cursor-pointer transform hover:scale-105 transition ease-linear hover:delay-75 ${
										formData.selectedDoctor === doctor.id
											? 'bg-[#3C82F6] text-white border-[#3C82F6]'
											: 'border-gray-300 text-gray-700 bg-white'
									}`}
									onClick={() =>
										setFormData({ ...formData, selectedDoctor: doctor.id })
									}
								>
									{doctor.name}
								</button>
							))
						) : (
							<p className="text-gray-500">
								No doctors available for this service
							</p>
						)}
					</div>
				</div>
			)}

			{/* Date Selection */}
			<div className="flex justify-center gap-4 my-9">
				{generateDates().map((date) => (
					<button
						key={date.fullDate}
						onClick={() =>
							setFormData((prevFormData) => ({
								...prevFormData,
								selectedDate: date.fullDate,
							}))
						}
						className={`w-16 h-24 px-2 py-4 rounded-full text-center border-1 cursor-pointer transform hover:scale-110 transition ease-linear hover:delay-75 ${
							formData.selectedDate === date.fullDate
								? 'bg-[#3C82F6] text-white border-[#3C82F6]'
								: 'border-gray-300 text-gray-700 bg-white'
						}`}
					>
						<div className="text-sm">{date.day}</div>
						<div className="text-lg font-semibold">
							{date.fullDate.split('-')[2]}
						</div>
					</button>
				))}
			</div>

			{/* Time Slots */}
			<div className="flex flex-col gap-6 mt-9">
				{/* Morning Slots */}
				<div>
					<h3 className="text-lg font-semibold text-gray-700 mb-6">Morning</h3>
					<div className="grid grid-cols-4 gap-3">
						{generateTimeSlots()
							.slice(0, 8)
							.map((time, index) => (
								<button
									key={index}
									onClick={() =>
										setFormData((prevFormData) => ({
											...prevFormData,
											selectedTime: time,
										}))
									}
									className={`p-4 rounded-full text-sm border-1 cursor-pointer transform hover:scale-105 transition ease-linear hover:delay-75 ${
										formData.selectedTime === time
											? 'bg-[#3C82F6] text-white border-[#3C82F6]'
											: 'border-gray-300 text-gray-700 bg-white'
									}`}
								>
									{time}
								</button>
							))}
					</div>
				</div>

				{/* Night Slots */}
				<div className="mt-12">
					<h3 className="text-lg font-semibold text-gray-700 mb-6">Night</h3>
					<div className="grid grid-cols-4 gap-3">
						{generateTimeSlots()
							.slice(8)
							.map((time, index) => (
								<button
									key={index}
									onClick={() =>
										setFormData((prevFormData) => ({
											...prevFormData,
											selectedTime: time,
										}))
									}
									className={`p-4 rounded-full text-sm border-1 cursor-pointer transform hover:scale-105 transition ease-linear hover:delay-75 ${
										formData.selectedTime === time
											? 'bg-[#3C82F6] text-white border-[#3C82F6]'
											: 'border-gray-300 text-gray-700 bg-white'
									}`}
								>
									{time}
								</button>
							))}
					</div>
				</div>
			</div>

			{/* User Details Form */}
			<div className="w-full my-12">
				<h3 className="text-lg font-semibold text-gray-700 mb-8">
					Your Details
				</h3>

				<div className="flex flex-col lg:grid md:grid-cols-2 xl:grid-cols-4 gap-4">
					{/* Name */}
					<div className="mb-4">
						<label className="block text-gray-700 font-medium mb-2">
							Full Name
						</label>
						<input
							type="text"
							placeholder="John Doe"
							name="userName"
							value={formData.userName}
							onChange={handleInputChange}
							className="w-full bg-white px-3 py-2.5 border border-gray-300 rounded-2xl focus:outline-none focus:ring-1 focus:ring-[#3C82F6]"
						/>
					</div>

					{/* CPR Number */}
					<div className="mb-4">
						<label className="block text-gray-700 font-medium mb-2">
							CPR Number
						</label>
						<input
							type="text"
							placeholder="000707124"
							name="userCPR"
							value={formData.userCPR}
							onChange={handleInputChange}
							className="w-full bg-white px-3 py-2.5 border border-gray-300 rounded-2xl focus:outline-none focus:ring-1 focus:ring-[#3C82F6]"
						/>
					</div>

					{/* Mobile Number */}
					<div className="mb-4">
						<label className="block text-gray-700 font-medium mb-2">
							Mobile Number
						</label>
						<input
							type="tel"
							placeholder="39893989"
							name="userMobile"
							value={formData.userMobile}
							onChange={handleInputChange}
							className="w-full bg-white px-3 py-2.5 border border-gray-300 rounded-2xl focus:outline-none focus:ring-1 focus:ring-[#3C82F6]"
						/>
					</div>

					{/* Email */}
					<div className="mb-4">
						<label className="block text-gray-700 font-medium mb-2">
							Email Address
						</label>
						<input
							type="email"
							placeholder="hello@john.com"
							name="userEmail"
							value={formData.userEmail}
							onChange={handleInputChange}
							className="w-full bg-white px-3 py-2.5 border border-gray-300 rounded-2xl focus:outline-none focus:ring-1 focus:ring-[#3C82F6]"
						/>
					</div>
				</div>

				{/* Message */}
				<div className="mb-4">
					<label className="block text-gray-700 font-medium mb-2">
						Message
					</label>
					<textarea
						placeholder="Enter your Message"
						name="userMessage"
						value={formData.userMessage}
						onChange={handleInputChange}
						className="w-full bg-white p-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-1 focus:ring-[#3C82F6]"
					/>
				</div>
			</div>

			{/* Confirm Button */}
			<div className="text-center mt-12">
				<button
					className="bg-[#3C82F6] text-white px-6 py-3 rounded-2xl hover:bg-[#316fd4] transition-all cursor-pointer"
					onClick={handleSubmit}
					disabled={
						!formData.selectedDoctor ||
						!formData.selectedDate ||
						!formData.selectedTime
					}
				>
					Request Appointment
				</button>
			</div>
		</section>
	)
}

export default Appointments
