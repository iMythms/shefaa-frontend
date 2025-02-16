import React, { useEffect, useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid'
import server from '../services/server' // Adjust the import based on your project structure

const EventCalendar = () => {
	const [events, setEvents] = useState([])
	const [resources, setResources] = useState([])

	useEffect(() => {
		const fetchData = async () => {
			try {
				const [appointmentsRes, doctorsRes] = await Promise.all([
					server.query('get', 'appointments'),
					server.query('get', 'doctors'),
				])

				// Map doctors to resources
				const resourcesData = doctorsRes.doctors.map((doc) => ({
					id: `doctor${doc.id}`,
					title: doc.name,
					eventColor: 'blue', // Customize color as needed
				}))

				// Map appointments to events
				const eventsData = appointmentsRes.appointments.map((appointment) => ({
					id: appointment.id,
					title: `${appointment.service} - ${appointment.patientname}`,
					start: appointment.date,
					end: new Date(
						new Date(appointment.date).getTime() + appointment.duration * 60000
					).toISOString(),
					resourceId: `doctor${appointment.docid}`,
					extendedProps: {
						description: appointment.description,
						status: appointment.status,
					},
				}))

				setResources(resourcesData)
				setEvents(eventsData)
			} catch (error) {
				console.error('Error fetching data:', error)
			}
		}

		fetchData()
	}, [])

	const handleDateClick = (info) => {
		alert(`Clicked on date: ${info.dateStr}`)
	}

	const handleEventClick = (info) => {
		alert(
			`Event: ${info.event.title}\nDescription: ${info.event.extendedProps.description}`
		)
	}

	return (
		<FullCalendar
			plugins={[
				dayGridPlugin,
				timeGridPlugin,
				interactionPlugin,
				resourceTimeGridPlugin,
			]}
			initialView="resourceTimeGridDay"
			headerToolbar={{
				left: 'prev,next today',
				center: 'title',
				right: 'resourceTimeGridWeek,resourceTimeGridDay',
			}}
			resources={resources}
			events={events}
			dateClick={handleDateClick}
			eventClick={handleEventClick}
			editable={true}
			selectable={true}
			slotDuration="00:30:00"
			snapDuration="00:30:00"
			scrollTime="08:00:00"
			firstDay={6} // Adjust based on your locale (0 = Sunday, 1 = Monday, etc.)
			eventLimit={true}
		/>
	)
}

export default EventCalendar
