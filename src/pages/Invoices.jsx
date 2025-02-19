import React, { useState, useEffect } from 'react'
import server from '../services/server'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { Link } from 'react-router-dom'

const Invoices = ({ user }) => {
  const [paidInvoices, setPaidInvoices] = useState([])
  const [unpaidInvoices, setUnpaidInvoices] = useState([])

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchInvoices = async () => {
      const invoicesRes = await server.query('get', 'invoices')
      console.log(invoicesRes)

      setPaidInvoices(invoicesRes.paidApps || [])
      setUnpaidInvoices(invoicesRes.unpaidApps || [])
      setLoading(false)
    }

    fetchInvoices()
  }, [])

  return (
    <section className="container mx-auto mt-48 mb-24">
      <h1 className="text-2xl font-bold mb-6">Invoices Management</h1>
      <h4>Unpaid Invoices</h4>
      <div>
        <Table>
          <TableCaption>List of unpaid appointments.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">App#</TableHead>
              <TableHead>Patient Name</TableHead>
              <TableHead>Doctor Name</TableHead>
              <TableHead>Appointment Date</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  Loading Appointments...
                </TableCell>
              </TableRow>
            ) : error ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-red-500">
                  {error}
                </TableCell>
              </TableRow>
            ) : unpaidInvoices.length > 0 ? (
              // a.id id, a.appointmentdate date, s.title service, u.name doctor, pu.name patientName
              unpaidInvoices.map((app) => (
                <TableRow key={app.id}>
                  <TableCell className="font-medium">{app.id}</TableCell>
                  <TableCell>{app.patientname}</TableCell>
                  <TableCell>{app.doctor}</TableCell>
                  <TableCell>{app.date}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2 justify-center">
                      <Link
                        to={`/invoices/${app.id}`}
                        className="bg-gray-800 hover:bg-gray-950 cursor-pointer text-white px-4 py-1.5 rounded-lg"
                      >
                        View
                      </Link>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  No unpaid appointments available.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <h4>Today's Paid Invoices</h4>
      <div>
        <Table>
          <TableCaption>List of today's paid appointments.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Inv#</TableHead>
              <TableHead>Patient Name</TableHead>
              <TableHead>Doctor Name</TableHead>
              <TableHead>Appointment Date</TableHead>
              <TableHead>Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  Loading Appointments...
                </TableCell>
              </TableRow>
            ) : error ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-red-500">
                  {error}
                </TableCell>
              </TableRow>
            ) : paidInvoices.length > 0 ? (
              // a.id id, a.appointmentdate date, s.title service, u.name doctor, pu.name patientName
              paidInvoices.map((app) => (
                <TableRow key={app.id}>
                  <TableCell className="font-medium">{app.id}</TableCell>
                  <TableCell>{app.patientName}</TableCell>
                  <TableCell>{app.doctor}</TableCell>
                  <TableCell>{app.date}</TableCell>
                  <TableCell>{app.amount}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  No unpaid appointments available.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </section>
  )
}

export default Invoices
