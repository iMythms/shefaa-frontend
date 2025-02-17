import React, { useEffect, useState } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import moment from 'moment'
import server from '../services/server' // Keep API calls

const localizer = momentLocalizer(moment)

const TestCalendar = () => {
	const [events, setEvents] = useState([])
	const [doctorColors, setDoctorColors] = useState({})

	useEffect(() => {
		const fetchData = async () => {
			try {
				const [appointmentsRes, doctorsRes] = await Promise.all([
					server.query('get', 'appointments'),
					server.query('get', 'doctors'),
				])

				// Generate random colors for each doctor
				const colors = {}
				doctorsRes.doctors.forEach((doc) => {
					colors[doc.id] = getRandomColor()
				})
				setDoctorColors(colors)

				// Map appointments to events
				const eventsData = appointmentsRes.appointments.map((appointment) => ({
					id: appointment.id,
					title: `${appointment.service} - ${appointment.patientname}`,
					start: new Date(appointment.date),
					end: new Date(
						new Date(appointment.date).getTime() + appointment.duration * 60000
					),
					resourceId: appointment.docid,
					doctorId: appointment.docid,
					description: appointment.description,
					status: appointment.status,
				}))

				setEvents(eventsData)
			} catch (error) {
				console.error('Error fetching data:', error)
			}
		}

		fetchData()
	}, [])

	// Function to assign a random color
	const getRandomColor = () => {
		const letters = '0123456789ABCDEF'
		let color = '#'
		for (let i = 0; i < 6; i++) {
			color += letters[Math.floor(Math.random() * 16)]
		}
		return color
	}

	// Function to style events based on the doctor
	const eventStyleGetter = (event) => {
		const backgroundColor = doctorColors[event.doctorId] || '#3788d8'
		const style = {
			backgroundColor,
			borderRadius: '5px',
			opacity: 0.8,
			color: 'white',
			border: 'none',
			display: 'block',
		}
		return { style }
	}

	// Handle Clicks
	const handleSelectSlot = (slotInfo) => {
		alert(`Clicked on date: ${slotInfo.start.toLocaleString()}`)
	}

	const handleSelectEvent = (event) => {
		alert(`Event: ${event.title}\nDescription: ${event.description}`)
	}

	return (
		<div style={{ height: '600px' }}>
			<Calendar
				localizer={localizer}
				events={events}
				startAccessor="start"
				endAccessor="end"
				style={{ height: 600 }}
				selectable
				onSelectEvent={handleSelectEvent}
				onSelectSlot={handleSelectSlot}
				eventPropGetter={eventStyleGetter} // Assign colors
			/>
		</div>
	)
}

export default TestCalendar
