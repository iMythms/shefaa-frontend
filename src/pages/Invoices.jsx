import React, { useState, useEffect } from 'react'
import server from '../services/server'

const Invoices = () => {
	const [invoices, setInvoices] = useState([])

	useEffect(() => {
		const fetchInvoices = async () => {
			const invoicesRes = await server.query('get', 'unpaid_invoices')
			setInvoices(invoicesRes.invoices || [])
		}

		fetchInvoices()
	}, [])

	return (
		<section className="container mx-auto mt-48">
			<h1 className="text-2xl font-bold mb-6">Unpaid Invoices</h1>
			<p className="text-gray-600">{invoices.length} Pending</p>
			<ul className="mt-4">
				{invoices.map((invoice) => (
					<li key={invoice.id} className="border-b py-2">
						Invoice #{invoice.id} - {invoice.created_at}
					</li>
				))}
			</ul>
		</section>
	)
}

export default Invoices
