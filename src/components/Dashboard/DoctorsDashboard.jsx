import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import server from '../../services/server'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faCalendarCheck,
	faUserDoctor,
	faClipboardList,
	faPills,
	faUsers,
	faFileInvoiceDollar,
	faHistory,
} from '@fortawesome/free-solid-svg-icons'
import DoctorAppointments from '../DoctorAppointments'

const DoctorsDashboard = ({ user }) => {
	const [appointments, setAppointments] = useState([])
	const [prescriptions, setPrescriptions] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)

	useEffect(() => {
		const fetchData = async () => {
			try {
				const [appointmentsRes, prescriptionsRes] = await Promise.all([
					server.query('get', `appointments/docApp/${user.id}`),
					server.query('get', `prescriptions/`),
				])

				// Store retrieved data
				setAppointments(appointmentsRes.appointments || [])
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
		<section className="container mx-auto my-24 xl:my-48 px-5 xl:px-0">
			<h1 className="text-2xl font-bold mb-6">Doctor Dashboard</h1>
			<h2 className="text-xl mb-8">
				Welcome back <span className="font-semibold">{user.name}!</span>
			</h2>

			{/* Quick Links */}
			<div className="flex gap-4 justify-end mt-10 mb-16">
				<button className="bg-green-700 hover:bg-green-800 cursor-pointer text-white px-4 py-2.5 rounded-xl">
					Generate Reports
				</button>

				<button className="bg-gray-800 hover:bg-gray-950 cursor-pointer text-white px-4 py-2.5 rounded-xl">
					Export Reports
				</button>
			</div>

			{/* Dashboard Overview */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				{/* Appointments Card */}
				<div className="bg-white drop-shadow-custom rounded-xl p-6 flex items-center gap-4">
					<div className="p-2 rounded-full">
						<FontAwesomeIcon
							icon={faCalendarCheck}
							style={{ color: '#000000' }}
							size="2x"
							className="text-[#2A3342]"
						/>
					</div>
					<div>
						<h3 className="font-semibold text-lg">Today's App.</h3>
						<p className="text-gray-600">{appointments.length} Total</p>
					</div>
				</div>

				{/* Prescriptions Card */}
				<div className="bg-white drop-shadow-custom rounded-xl p-6 flex items-center gap-4">
					<div className="p-2 rounded-full">
						<FontAwesomeIcon
							icon={faPills}
							style={{ color: '#000000' }}
							size="2x"
							className="text-[#2A3342]"
						/>
					</div>
					<div>
						<h3 className="font-semibold text-lg">Prescriptions</h3>
						<p className="text-gray-600">{prescriptions.length} Issued</p>
					</div>
				</div>
			</div>
		</section>
	)
}

export default DoctorsDashboard
