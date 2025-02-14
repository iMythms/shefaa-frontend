import React, { useState, useEffect } from 'react'
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
		<section className="container mx-auto my-48">
			<h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
			<h2 className="text-xl mb-8">
				Welcome <span className="font-semibold">{user.name}!</span>
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
				<div className="bg-white drop-shadow-custom rounded-xl p-6">
					<h3 className="font-semibold text-lg mb-3">Appointments</h3>
					<p className="text-gray-600">{appointments.length} Total</p>
				</div>

				<div className="bg-white drop-shadow-custom rounded-xl p-6">
					<h3 className="font-semibold text-lg mb-3">Doctors</h3>
					<p className="text-gray-600">{doctors.length} Registered</p>
				</div>

				<div className="bg-white drop-shadow-custom rounded-xl p-6">
					<h3 className="font-semibold text-lg mb-3">Services</h3>
					<p className="text-gray-600">{services.length} Available</p>
				</div>

				<div className="bg-white drop-shadow-custom rounded-xl p-6">
					<h3 className="font-semibold text-lg mb-3">Prescriptions</h3>
					<p className="text-gray-600">{prescriptions.length} Issued</p>
				</div>
			</div>

			{/* Charts & Analytics */}
			{/* <div className="bg-white drop-shadow-custom rounded-xl p-6 mt-10">
				<h3 className="font-semibold text-lg mb-4">Appointments Trend</h3>
				<ResponsiveContainer width="100%" height={300}>
					<BarChart data={appointments}>
						<XAxis dataKey="date" />
						<YAxis />
						<Tooltip />
						<Legend />
						<Bar dataKey="total" fill="#3C82F6" />
					</BarChart>
				</ResponsiveContainer>
			</div> */}

			{/* User Management & Pending Actions */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mt-10">
				<div className="bg-white drop-shadow-custom rounded-xl p-6">
					<h3 className="font-semibold text-lg mb-3">User Management</h3>
					<p className="text-gray-600">{users.length} Registered Users</p>
					<div className="flex justify-end mt-4">
						{' '}
						{/* Align to the right */}
						<button className="bg-gray-800 hover:bg-gray-950 cursor-pointer text-white px-4 py-2 rounded-lg">
							Manage Users
						</button>
					</div>
				</div>

				<div className="bg-white drop-shadow-custom rounded-xl p-6">
					<h3 className="font-semibold text-lg mb-3">Unpaid Invoices</h3>
					<p className="text-gray-600">{unpaidInvoices.length} Pending</p>
					<div className="flex justify-end mt-4">
						{' '}
						{/* Align to the right */}
						<button className="bg-gray-800 hover:bg-gray-950 cursor-pointer text-white px-4 py-2 rounded-lg">
							View Invoices
						</button>
					</div>
				</div>
			</div>

			{/* Recent Activities */}
			<div className="bg-white drop-shadow-custom rounded-xl p-6 mt-10">
				<h3 className="font-semibold text-lg mb-4">Recent Activities</h3>
				<ul className="text-gray-600">
					{logs.slice(0, 5).map((log, index) => (
						<li key={index} className="border-b py-2">
							{log.message}
						</li>
					))}
				</ul>
			</div>
		</section>
	)
}

export default AdminDashboard
