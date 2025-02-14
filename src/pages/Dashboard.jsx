import React, { useEffect, useState } from 'react'
import DoctorsDashboard from '../components/Dashboard/DoctorsDashboard'
import AdminDashboard from '../components/Dashboard/AdminDashboard'
import ReceptionDashboard from '../components/Dashboard/ReceptionDashboard'
import LabDashboard from '../components/Dashboard/LabDashboard'
import PharmacyDashboard from '../components/Dashboard/PharmacyDashboard'
import AccountDashboard from '../components/Dashboard/AccountDashboard'
import PatientDashboard from '../components/Dashboard/PatientDashboard'

const Dashboard = ({ user }) => {
	const [loading, setLoading] = useState(true)
	const [role, setRole] = useState(null)

	useEffect(() => {
		if (user) {
			setRole(user.role) // Directly use user.role
			console.log(user.role)
			setLoading(false)
		} else {
			setLoading(false) // No user, stop loading
		}
	}, [user])

	if (loading)
		return (
			<p className="flex items-center justify-center min-h-screen">
				Loading dashboard...
			</p>
		)

	if (!user || !role)
		return (
			<p className="text-red-500 flex items-center justify-center min-h-screen">
				Access Denied
			</p>
		)

	switch (role) {
		case 'admin':
			return <AdminDashboard user={user} />
		case 'doctor':
			return <DoctorsDashboard user={user} />
		case 'receptionist':
			return <ReceptionDashboard user={user} />
		case 'laboratorist':
			return <LabDashboard user={user} />
		case 'pharmacist':
			return <PharmacyDashboard user={user} />
		case 'accountant':
			return <AccountDashboard user={user} />
		case 'patient':
			return <PatientDashboard user={user} />
		default:
			return (
				<p className="text-red-500 flex items-center justify-center min-h-screen">
					Access Denied
				</p>
			)
	}
}

export default Dashboard
