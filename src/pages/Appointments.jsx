import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import server from '../services/server'
import EventCalendar from '@/components/EventCalender'

const Appointments = ({ user }) => {
	return (
		<section className="container mx-auto mt-48 mb-24">
			<h1 className="text-2xl font-bold mb-6">Appointments</h1>
			<div>
				<EventCalendar />
			</div>
		</section>
	)
}

export default Appointments
