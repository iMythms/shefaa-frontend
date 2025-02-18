import React, { useEffect, useState } from 'react'
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog'

import { Link } from 'react-router-dom'
import server from '@/services/server'

const PrescriptionManagement = () => {
	const [prescriptions, setPrescriptions] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)

	const fetchPrescriptions = async () => {
		try {
			const data = await server.query('get', 'prescriptions')
			setPrescriptions(data.prescriptions || [])
		} catch (error) {
			console.error('Error fetching prescriptions:', error)
			setError('Failed to load prescriptions.')
		} finally {
			setLoading(false)
		}
	}

	const handleDelete = async (prescriptionId) => {
		try {
			await server.query('delete', `prescriptions/${prescriptionId}`)
			setPrescriptions(prescriptions.filter((p) => p.id !== prescriptionId))
		} catch (error) {
			console.error('Error deleting prescription:', error)
			setError('Failed to delete prescription.')
		}
	}

	useEffect(() => {
		fetchPrescriptions()
	}, [])

	return (
		<section className="container mx-auto mt-48 mb-24">
			<h1 className="text-2xl font-bold mb-6">Prescription Management</h1>
			<p className="text-gray-600">
				{prescriptions.length} Registered Prescriptions
			</p>

			<Table>
				<TableCaption>List of prescriptions.</TableCaption>
				<TableHeader>
					<TableRow>
						<TableHead className="w-[100px]">ID</TableHead>
						<TableHead>Patient</TableHead>
						<TableHead>Doctor</TableHead>
						<TableHead>Diagnosis</TableHead>
						<TableHead>Medication</TableHead>
						<TableHead className="text-center">Actions</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{loading ? (
						<TableRow>
							<TableCell colSpan={6} className="text-center">
								Loading prescriptions...
							</TableCell>
						</TableRow>
					) : error ? (
						<TableRow>
							<TableCell colSpan={6} className="text-center text-red-500">
								{error}
							</TableCell>
						</TableRow>
					) : prescriptions.length > 0 ? (
						prescriptions.map((prescription) => (
							<TableRow key={prescription.id}>
								<TableCell className="font-medium">{prescription.id}</TableCell>
								<TableCell>{prescription.patientName}</TableCell>
								<TableCell>{prescription.doctorName}</TableCell>
								<TableCell>{prescription.diagnosis}</TableCell>
								<TableCell>{prescription.medication}</TableCell>
								<TableCell>
									<div className="flex space-x-2 justify-center">
										<Link
											to={`/prescriptions/${prescription.id}`}
											className="bg-gray-800 hover:bg-gray-950 text-white px-4 py-1.5 rounded-lg"
										>
											View
										</Link>
										<Link
											to={`/prescriptions/${prescription.id}/edit`}
											className="bg-gray-800 hover:bg-gray-950 text-white px-4 py-1.5 rounded-lg"
										>
											Edit
										</Link>

										{/* Delete Confirmation */}
										<AlertDialog>
											<AlertDialogTrigger asChild>
												<button className="bg-red-600 hover:bg-red-700 text-white px-4 py-1.5 rounded-lg">
													Delete
												</button>
											</AlertDialogTrigger>
											<AlertDialogContent>
												<AlertDialogHeader>
													<AlertDialogTitle>Are you sure?</AlertDialogTitle>
													<AlertDialogDescription>
														This action cannot be undone. This will permanently
														delete the prescription.
													</AlertDialogDescription>
												</AlertDialogHeader>
												<AlertDialogFooter>
													<AlertDialogCancel>Cancel</AlertDialogCancel>
													<AlertDialogAction
														onClick={() => handleDelete(prescription.id)}
														className="bg-red-600 hover:bg-red-700"
													>
														Confirm
													</AlertDialogAction>
												</AlertDialogFooter>
											</AlertDialogContent>
										</AlertDialog>
									</div>
								</TableCell>
							</TableRow>
						))
					) : (
						<TableRow>
							<TableCell colSpan={6} className="text-center">
								No prescriptions available.
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
		</section>
	)
}

export default PrescriptionManagement
