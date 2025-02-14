import React, { useState, useEffect } from 'react'
import server from '../../services/server'

const AdminDashboard = ({ user }) => {
	const [appointments, setAppointments] = useState([])
	const [doctors, setDoctors] = useState([])
	const [services, setServices] = useState([])
	const [prescriptions, setPrescriptions] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)

	useEffect(() => {
		const fetchData = async () => {
			try {
				const [appointmentsRes, doctorsRes, servicesRes, prescriptionsRes] =
					await Promise.all([
						server.query('get', 'appointments'), // Fetch appointments
						server.query('get', 'doctors'), // Fetch doctors
						server.query('get', 'services'), // Fetch services
						server.query('get', 'prescriptions'), // Fetch prescriptions
					])

				// Store retrieved data
				setAppointments(appointmentsRes.appointments || [])
				setDoctors(doctorsRes.doctors || [])
				setServices(servicesRes.services || [])
				setPrescriptions(prescriptionsRes.prescriptions || [])
			} catch (err) {
				setError('Failed to load data')
				console.error('Error fetching admin dashboard data:', err)
			} finally {
				setLoading(false)
			}
		}

		fetchData()
	}, [])

	if (loading) return <p className="text-center mt-10">Loading dashboard...</p>
	if (error) return <p className="text-red-500 text-center mt-10">{error}</p>

	return (
		<section className="container mx-auto mt-48">
			<h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
			<h2 className="text-xl mb-8">
				Welcome <span className="font-semibold">{user.name}!</span>
			</h2>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
				{/* Appointments Section */}
				<div className="bg-white drop-shadow-custom rounded-xl p-6">
					<h3 className="font-semibold text-lg mb-3">Appointments</h3>
					<p className="text-gray-600">{appointments.length} Total</p>
				</div>

				{/* Doctors Section */}
				<div className="bg-white drop-shadow-custom rounded-xl p-6">
					<h3 className="font-semibold text-lg mb-3">Doctors</h3>
					<p className="text-gray-600">{doctors.length} Registered</p>
				</div>

				{/* Services Section */}
				<div className="bg-white drop-shadow-custom rounded-xl p-6">
					<h3 className="font-semibold text-lg mb-3">Services</h3>
					<p className="text-gray-600">{services.length} Available</p>
				</div>

				{/* Prescriptions Section */}
				<div className="bg-white drop-shadow-custom rounded-xl p-6">
					<h3 className="font-semibold text-lg mb-3">Prescriptions</h3>
					<p className="text-gray-600">{prescriptions.length} Issued</p>
				</div>
			</div>
		</section>
	)
}

export default AdminDashboard
