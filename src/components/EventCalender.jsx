import React, { useEffect, useState } from 'react'
import server from '@/services/server'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'

const EventCalender = () => {
	const [events, setEvents] = useState([])

	useEffect(() => {
		const fetchData = async () => {
			try {
				const [appointmentsRes, doctorsRes] = await Promise.all([
					server.query('get', 'appointments'),
					server.query('get', 'doctors'),
				])

				// Map appointments to FullCalendar event format
				const formattedEvents = appointmentsRes.appointments.map(
					(appointment) => {
						const doctor = doctorsRes.doctors.find(
							(doc) => doc.id === appointment.docid
						)
						return {
							id: appointment.id,
							title: `${appointment.service} with Dr. ${
								doctor ? doctor.name : 'Unknown'
							}`,
							start: appointment.date,
							end: new Date(
								new Date(appointment.date).getTime() +
									appointment.duration * 60000
							).toISOString(),
							extendedProps: {
								doctorName: doctor ? doctor.name : 'Unknown',
								patientName: appointment.patientname,
								description: appointment.description,
							},
						}
					}
				)

				setEvents(formattedEvents)
			} catch (error) {
				console.error('Error fetching data:', error)
			}
		}

		fetchData()
	}, [])

	return (
		<FullCalendar
			plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
			initialView="dayGridMonth"
			events={events}
			headerToolbar={{
				left: 'prev,next today',
				center: 'title',
				right: 'dayGridMonth,timeGridWeek,timeGridDay',
			}}
			eventClick={(info) => {
				alert(
					`Event: ${info.event.title}\nDescription: ${info.event.extendedProps.description}`
				)
			}}
			dateClick={(info) => {
				alert(`Clicked on date: ${info.dateStr}`)
			}}
		/>
	)
}

export default EventCalender
