import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import server from '../../services/server'
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from 'recharts'

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

const AdminDashboard = ({ user }) => {
	const [appointments, setAppointments] = useState([])
	const [doctors, setDoctors] = useState([])
	const [services, setServices] = useState([])
	const [prescriptions, setPrescriptions] = useState([])
	const [users, setUsers] = useState([])
	const [unpaidInvoices, setUnpaidInvoices] = useState([])
	const [logs, setLogs] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)

	useEffect(() => {
		const fetchData = async () => {
			try {
				const [
					appointmentsRes,
					doctorsRes,
					servicesRes,
					prescriptionsRes,
					usersRes,
					invoicesRes,
					logsRes,
				] = await Promise.all([
					server.query('get', 'appointments'), // Appointments
					server.query('get', 'doctors'), // Doctors
					server.query('get', 'services'), // Services
					server.query('get', 'prescriptions'), // Prescriptions
					server.query('get', 'users'), // Users list
					server.query('get', 'unpaid_invoices'), // Unpaid invoices
					server.query('get', 'logs'), // Recent logs
				])

				// Store retrieved data
				setAppointments(appointmentsRes.appointments || [])
				setDoctors(doctorsRes.doctors || [])
				setServices(servicesRes.services || [])
				setPrescriptions(prescriptionsRes.prescriptions || [])
				setUsers(usersRes.users || [])
				setUnpaidInvoices(invoicesRes.invoices || [])
				setLogs(logsRes.logs || [])
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
		<section className="container mx-auto mt-48 mb-24">
			<h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
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
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
						<h3 className="font-semibold text-lg">Appointments</h3>
						<p className="text-gray-600">{appointments.length} Total</p>
					</div>
				</div>

				{/* Doctors Card */}
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
						<h3 className="font-semibold text-lg">Doctors</h3>
						<p className="text-gray-600">{doctors.length} Registered</p>
					</div>
				</div>

				{/* Services Card */}
				<div className="bg-white drop-shadow-custom rounded-xl p-6 flex items-center gap-4">
					<div className="p-2 rounded-full">
						<FontAwesomeIcon
							icon={faClipboardList}
							style={{ color: '#000000' }}
							size="2x"
							className="text-[#2A3342]"
						/>
					</div>
					<div>
						<h3 className="font-semibold text-lg">Services</h3>
						<p className="text-gray-600">{services.length} Available</p>
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

			{/* User Management & Pending Actions */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mt-10">
				<div className="bg-white drop-shadow-custom rounded-xl p-6">
					<div className="flex gap-2 items-center">
						<div className="p-2 rounded-full">
							<FontAwesomeIcon
								icon={faUsers}
								style={{ color: '#000000' }}
								size="3x"
								className="text-[#2A3342]"
							/>
						</div>
						<div>
							<h3 className="font-semibold text-lg mb-1">User Management</h3>
							<p className="text-gray-600">{users.length} Registered Users</p>
						</div>
					</div>
					<div className="flex justify-end mt-4">
						<Link
							to="/users"
							className="bg-gray-800 hover:bg-gray-950 text-white px-4 py-2 rounded-lg"
						>
							Manage Users
						</Link>
					</div>
				</div>

				<div className="bg-white drop-shadow-custom rounded-xl p-6">
					<div className="flex gap-2 items-center">
						<div className="p-2 rounded-full">
							<FontAwesomeIcon
								icon={faFileInvoiceDollar}
								style={{ color: '#000000' }}
								size="3x"
								className="text-[#2A3342]"
							/>
						</div>
						<div>
							<h3 className="font-semibold text-lg mb-1">Unpaid Invoices</h3>
							<p className="text-gray-600">{unpaidInvoices.length} Pending</p>
						</div>
					</div>

					<div className="flex justify-end mt-4">
						<Link
							to="/invoices"
							className="bg-gray-800 hover:bg-gray-950 text-white px-4 py-2 rounded-lg"
						>
							View Invoices
						</Link>
					</div>
				</div>
			</div>

			{/* Recent Activities */}
			<div className="bg-white drop-shadow-custom rounded-xl p-6 mt-10">
				<div className="flex gap-2 items-center">
					<div className="p-2 rounded-full">
						<FontAwesomeIcon
							icon={faHistory}
							style={{ color: '#000000' }}
							size="2x"
							className="text-[#2A3342]"
						/>
					</div>
					<div className="p-1">
						<h3 className="font-semibold text-lg mb-1">Recent Activities</h3>
						<p className="text-gray-600">
							{logs.filter((log) => isWithinWeek(log.date)).length} New activity
							this week
						</p>
					</div>
				</div>
				<ul className="text-gray-600">
					{logs.slice(0, 5).map((log, index) => (
						<li key={index} className="border-b py-4">
							{log.message}
						</li>
					))}
				</ul>
			</div>
		</section>
	)
}

export default AdminDashboard
