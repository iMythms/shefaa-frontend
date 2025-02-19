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
import { useParams, useNavigate } from 'react-router-dom'

const Invoices = ({ user }) => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [appointment, setAppointment] = useState(null)
  const [labs, setLabs] = useState(null)
  const [medicines, setMedicines] = useState(null)
  const [amount, setAmount] = useState(0.0)

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  let count = 1
  useEffect(() => {
    const fetchInvoices = async () => {
      const invoicesRes = await server.query('get', `invoices/${id}`)
      const data = JSON.parse(invoicesRes.invoice.data)
      setAppointment(JSON.parse(data.appointment) || {})
      setLabs(JSON.parse(data.labs) || {})
      setMedicines(JSON.parse(data.medicines) || {})
      setLoading(false)
    }

    fetchInvoices()
  }, [])

  useEffect(() => {
    let total = 0.0
    const checkAmount = async () => {
      setAmount((total += parseFloat(appointment.price)))
      for (const lab of labs) {
        setAmount((total += parseFloat(lab.price)))
      }
      for (const med of medicines) {
        setAmount((total += parseFloat(med.price)))
      }
      console.log('amount ', total)
    }
    checkAmount()
  }, [appointment])

  const payInvoice = async () => {
    const data = await server.query('put', `invoices/${id}`, {
      amount: amount,
      status: 'paid'
    })
    console.log('data = ', data)
    navigate('/invoices')
  }

  return (
    <section className="container mx-auto mt-48 mb-24">
      <h1 className="text-2xl font-bold mb-6">Invoice</h1>
      <div>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : appointment ? (
          <div>
            <div className="mb-6">
              <h2 className="text-xl font-semibold">Invoice Details</h2>
              <p>
                <strong>Date:</strong> {appointment.date}
              </p>
              <p>
                <strong>Doctor:</strong> {appointment.doctor}
              </p>
              <p>
                <strong>Patient:</strong> {appointment.patientname}
              </p>
            </div>

            <div className="mb-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>#</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Price</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell colspan="3" className="text-l font-bold">
                      Main Service
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>{count++}</TableCell>
                    <TableCell>{appointment.service}</TableCell>
                    <TableCell>{appointment.price}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colspan="3" className="text-l font-bold">
                      Lab Tests
                    </TableCell>
                  </TableRow>
                  {labs.map((lab, index) => (
                    <TableRow key={index}>
                      <TableCell>{count++}</TableCell>
                      <TableCell>{lab.name}</TableCell>
                      <TableCell>{lab.price}</TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell colspan="3" className="text-l font-bold">
                      Medicines
                    </TableCell>
                  </TableRow>
                  {medicines.map((medicine, index) => (
                    <TableRow key={index}>
                      <TableCell>{count++}</TableCell>
                      <TableCell>{medicine.name}</TableCell>
                      <TableCell>{medicine.price}</TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell
                      colspan="2"
                      className="text-right text-l font-bold"
                    >
                      Total
                    </TableCell>
                    <TableCell>{amount}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>

            <button
              onClick={() => window.print()}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
            >
              Print Invoice
            </button>
            <button
              onClick={payInvoice}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
            >
              Invoice Paid
            </button>
          </div>
        ) : null}
      </div>
    </section>
  )
}

export default Invoices
