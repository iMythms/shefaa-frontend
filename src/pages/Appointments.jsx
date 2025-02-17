import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import server from '../services/server'
import EventCalendar from '@/components/EventCalender'
import AppointmentsTable from '@/components/AppointmentsTable'
import TestCalendar from '@/components/TestCalendar'

const Appointments = ({ user }) => {
	return (
		<section className="container mx-auto mt-48 mb-24">
			<h1 className="text-2xl font-bold mb-6">Appointments</h1>
			<div className="flex flex-col gap-32">
				<AppointmentsTable />
				<EventCalendar />

				<TestCalendar />
			</div>
		</section>
	)
}

export default Appointments
