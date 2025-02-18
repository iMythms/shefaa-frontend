import React, { useEffect, useState } from 'react'
import EventCalendar from '@/components/EventCalender'
import AppointmentsTable from '@/components/AppointmentsTable'
import DoctorAppointments from '@/components/DoctorAppointments'

const Appointments = ({ user }) => {
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
			return (
				<>
					<AppointmentsTable />
					<EventCalendar />
				</>
			)
		case 'doctor':
			return <DoctorAppointments user={user} />
		case 'receptionist':
			return (
				<>
					<AppointmentsTable />
					<EventCalendar />
				</>
			)

		default:
			return (
				<p className="text-red-500 flex items-center justify-center min-h-screen">
					Access Denied
				</p>
			)
	}
}

export default Appointments
