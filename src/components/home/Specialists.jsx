import React, { useEffect, useState } from 'react'
import server from '../../services/server'

const Specialists = () => {
	const [specialists, setSpecialists] = useState(null)
	const [selectedDoctor, setSelectedDoctor] = useState(null)
	const [selectedDate, setSelectedDate] = useState(null)
	const [selectedTime, setSelectedTime] = useState(null)

	const [userName, setUserName] = useState('')
	const [userMobile, setUserMobile] = useState('')
	const [userEmail, setUserEmail] = useState('')
	const [userCPR, setUserCPR] = useState('')

	// Fetch doctors from the database
	useEffect(() => {
		const getSpecialists = async () => {
			const data = await server.query('get', 'get_doctors')
			setSpecialists(data.doctors)
		}
		getSpecialists()
	}, [])

	// Generate available dates (Today + 7 days)
	const generateDates = () => {
		const today = new Date()
		let dates = []
		for (let i = 0; i < 7; i++) {
			let date = new Date()
			date.setDate(today.getDate() + i)
			dates.push({
				fullDate: date.toISOString().split('T')[0], // YYYY-MM-DD
				day: date.toLocaleDateString('en-US', { weekday: 'short' }), // Mon, Tue, etc.
				dateNumber: date.getDate(), // 7, 8, 9, etc.
			})
		}
		return dates
	}

	// Generate time slots from 8 AM to 4 PM (30 min interval)
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

	// Handle appointment submission
	const handleSubmit = async () => {
		if (!selectedDoctor || !selectedDate || !selectedTime) {
			alert('Please select a doctor, date, and time')
			return
		}

		// Save preferred appointment request (not confirmed)
		await server.query('post', 'request_appointment', {
			doctorId: selectedDoctor,
			date: selectedDate,
			time: selectedTime,
			status: 'pending', // Receptionist approval needed
		})

		alert(
			'Your preferred appointment request has been submitted. The receptionist will confirm your appointment.'
		)
	}

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

				{/* Book an Appointment */}
				<section id="appointment" className="mt-48">
					<div className="flex flex-col gap-12 items-center justify-center mb-16">
						<div className="uppercase bg-[#c9deff] text-[#3C82F6] px-2 py-1 shadow-lg shadow-blue-400/10 text-sm rounded-full">
							Book an Appointment
						</div>
						<div className="text-center text-balance flex flex-col gap-6">
							<h1 className="font-semibold text-3xl">
								Schedule Your Visit with Our Specialists{' '}
							</h1>
							<p className="text-base text-[#8896AB]">
								At Shefaa Clinic, your health is our priority. Choose from our
								team of expert doctors and request an appointment at your
								convenience. Submit your preferred date and time, and our
								reception team will confirm your booking shortly.
							</p>
						</div>
					</div>

					{/* Doctor Selection */}
					<div className="mb-9">
						<h3 className="text-lg font-semibold text-gray-700 mb-6">
							Select a Doctor
						</h3>
						<div className="grid grid-cols-2 md:grid-cols-3 gap-4">
							{specialists &&
								specialists.map((doctor) => (
									<button
										key={doctor.id}
										onClick={() => setSelectedDoctor(doctor.id)}
										className={`p-3 rounded-full border-1 text-center cursor-pointer transform hover:scale-105 transition ease-linear hover:delay-75 ${
											selectedDoctor === doctor.id
												? 'bg-[#3C82F6] text-white border-[#3C82F6]'
												: 'border-gray-300 text-gray-700'
										}`}
									>
										<h4 className="font-semibold">{doctor.name}</h4>
									</button>
								))}
						</div>
					</div>

					{/* Date Selection */}
					<div className="flex justify-center gap-4 my-9">
						{generateDates().map((date) => (
							<button
								key={date.fullDate}
								onClick={() => setSelectedDate(date.fullDate)}
								className={`w-16 h-24 px-2 py-4 rounded-full text-center border-1 cursor-pointer transform hover:scale-110 transition ease-linear hover:delay-75 ${
									selectedDate === date.fullDate
										? 'bg-[#3C82F6] text-white border-[#3C82F6]'
										: 'border-gray-300 text-gray-700 bg-white'
								}`}
							>
								<div className="text-sm">{date.day}</div>
								<div className="text-lg font-semibold">{date.dateNumber}</div>
							</button>
						))}
					</div>

					{/* Time Slots */}
					<div className="flex flex-col gap-6 mt-9">
						{/* Morning Slots */}
						<div>
							<h3 className="text-lg font-semibold text-gray-700 mb-6">
								Morning
							</h3>
							<div className="grid grid-cols-4 gap-3">
								{generateTimeSlots()
									.slice(0, 8)
									.map((time, index) => (
										<button
											key={index}
											onClick={() => setSelectedTime(time)}
											className={`p-4 rounded-full text-sm border-1 cursor-pointer transform hover:scale-105 transition ease-linear hover:delay-75 ${
												selectedTime === time
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
							<h3 className="text-lg font-semibold text-gray-700 mb-6">
								Night
							</h3>
							<div className="grid grid-cols-4 gap-3">
								{generateTimeSlots()
									.slice(8)
									.map((time, index) => (
										<button
											key={index}
											onClick={() => setSelectedTime(time)}
											className={`p-4 rounded-full text-sm border-1 cursor-pointer transform hover:scale-105 transition ease-linear hover:delay-75 ${
												selectedTime === time
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
									value={userName}
									onChange={(e) => setUserName(e.target.value)}
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
									value={userCPR}
									onChange={(e) => setUserCPR(e.target.value)}
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
									value={userMobile}
									onChange={(e) => setUserMobile(e.target.value)}
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
									value={userEmail}
									onChange={(e) => setUserEmail(e.target.value)}
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
								type="text"
								placeholder="Enter your Message"
								value={userCPR}
								onChange={(e) => setUserCPR(e.target.value)}
								className="w-full bg-white p-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-1 focus:ring-[#3C82F6]"
							/>
						</div>
					</div>

					{/* Confirm Button */}
					<div className="text-center mt-12">
						<button
							className="bg-[#3C82F6] text-white px-6 py-3 rounded-2xl hover:bg-[#316fd4] transition-all cursor-pointer"
							onClick={handleSubmit}
							disabled={!selectedDoctor || !selectedDate || !selectedTime}
						>
							Request Appointment
						</button>
					</div>
				</section>
			</div>
		</section>
	)
}

export default Specialists
