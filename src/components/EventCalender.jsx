import React, { useEffect, useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid'
import server from '../services/server' // Adjust the import based on your project structure

// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger
// } from '@/components/ui/popover'

import { AppDetailsModal } from './Calendar/AppDetailsModal'
import { NewAppModal } from './Calendar/NewAppModal'

const EventCalendar = () => {
  const [appointments, setAppointments] = useState([])
  const [events, setEvents] = useState([])
  const [resources, setResources] = useState([])
  const [appData, setAppData] = useState(null)
  const [open, setOpen] = useState(false)
  const [newAppData, setNewAppData] = useState(null)
  const [newAppOpen, setNewAppOpen] = useState(false)
  const [doctorServices, setDoctorServices] = useState(null)

  /* const onSubmit = () => {
    setAppData(null)
    setOpen(false)
  } */

  const colors = {
    invoiced: '#606c38',
    approved: '#003049',
    inprogress: '#c1121f',
    new: '#780000',
    arrived: '#669bbc'
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [appointmentsRes, doctorsRes] = await Promise.all([
          server.query('get', 'appointments'),
          server.query('get', 'doctors')
        ])

        // Map doctors to resources
        const resourcesData = doctorsRes.doctors.map((doc) => ({
          id: `${doc.id}`,
          title: doc.name,
          eventColor: 'blue' // Customize color as needed
        }))

        // Map appointments to events
        const eventsData = appointmentsRes.appointments.map((appointment) => ({
          id: appointment.id,
          title: `${appointment.patientname}`,
          start: appointment.date,
          end: new Date(
            new Date(appointment.date).getTime() + appointment.duration * 60000
          ).toISOString(),
          resourceId: `${appointment.docid}`,
          extendedProps: {
            description: appointment.description,
            status: appointment.status,
            service: appointment.service,
            serviceId: appointment.serviceid,
            doctor: appointment.doctor
          },
          backgroundColor: colors[appointment.status]
        }))

        setResources(resourcesData)
        setEvents(eventsData)
        setAppointments(eventsData)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  const handleDateClick = async (info) => {
    setNewAppData({
      doctor: info.resource.title,
      date: info.dateStr.split('+')[0],
      docId: info.resource.id
    })
    const fetchServices = await server.query(
      'get',
      `doctors/services/${info.resource.id}`
    )
    if (fetchServices.services) {
      setDoctorServices(fetchServices.services)
    }
    setNewAppOpen(true)
  }

  const handleEventClick = (info) => {
    // alert(
    //   `Event: ${info.event.title}\nDescription: ${info.event.extendedProps.description}`
    // )
    setAppData(info.event)
    setOpen(true)
  }

  const handleDates = async (info) => {
    const startDate = info.startStr.split('T')[0]
    const view = info.view.type
    let endDate = info.endStr.split('T')[0]
    if (view.includes('Day')) {
      endDate = startDate
    }
    const appointmentsRes = await server.query(
      'get',
      `appointments/range/${startDate}/${endDate}`
    )
    // Map appointments to events
    const eventsData = appointmentsRes.appointments.map((appointment) => ({
      id: appointment.id,
      title: `${appointment.patientname}`,
      start: appointment.date,
      end: new Date(
        new Date(appointment.date).getTime() + appointment.duration * 60000
      ).toISOString(),
      resourceId: `${appointment.docid}`,
      extendedProps: {
        description: appointment.description,
        status: appointment.status,
        service: appointment.service,
        serviceId: appointment.serviceid,
        doctor: appointment.doctor
      },
      backgroundColor: colors[appointment.status]
    }))
    setEvents(eventsData)
  }

  const changeStatus = async (info) => {
    const id = parseInt(info.target.id)
    const status = info.target.name
    try {
      const update = await server.query('put', `appointments/status/${id}`, {
        status
      })
      const updatedEvents = []
      if (status !== 'delete' && status !== 'rejected') {
        for (const event of events) {
          if (event.id === id) {
            event.backgroundColor = colors[status]
            event.extendedProps.status = status
          }
          updatedEvents.push(event)
        }
      } else {
        for (const event of events) {
          if (event.id !== id) {
            updatedEvents.push(event)
          }
        }
      }
      setOpen(false)
      setAppData(null)
      setEvents(updatedEvents)
    } catch (error) {
      console.error('Error updating appointment:', error)
    }
  }

  const handelSubmit = async (event) => {
    event.preventDefault()
    console.log(event.target.date.value)
    console.log(event.target.docId.value)
    console.log(event.target.doctor.value)
    console.log(event.target.name.value)
    console.log(event.target.phone.value)
    console.log(event.target.cpr.value)
    console.log(event.target.email.value)
    console.log(event.target.services.value)
    console.log(event.target.description.value)

    const newApp = {
      name: event.target.name.value,
      cpr: event.target.cpr.value,
      phone: event.target.phone.value,
      email: event.target.email.value,
      serviceId: event.target.services.value,
      doctorId: event.target.docId.value,
      appointmentDate: event.target.date.value,
      description: event.target.description.value
    }
    const data = await server.query('post', 'appointments', newApp)
    console.log(data)

    setNewAppOpen(false)
  }

  return (
    <>
      <AppDetailsModal
        appData={appData}
        open={open}
        setOpen={setOpen}
        changeStatus={changeStatus}
      />
      <NewAppModal
        appData={newAppData}
        open={newAppOpen}
        setOpen={setNewAppOpen}
        services={doctorServices}
        onSubmit={handelSubmit}
      />
      <FullCalendar
        plugins={[
          dayGridPlugin,
          timeGridPlugin,
          interactionPlugin,
          resourceTimeGridPlugin
        ]}
        schedulerLicenseKey="GPL-My-Project-Is-Open-Source"
        initialView="resourceTimeGridDay"
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'resourceTimeGridWeek,resourceTimeGridDay'
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
        slotMinTime="08:00:00"
        slotMaxTime="16:00:00"
        datesSet={handleDates}
        firstDay={6} // Adjust based on your locale (0 = Sunday, 1 = Monday, etc.)
        expandRows={true}
        stickyHeaderDates={true}
      />
    </>
  )
}

export default EventCalendar
