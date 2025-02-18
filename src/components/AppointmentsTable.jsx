import { useEffect, useState } from 'react'
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
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from '@/components/ui/pagination'

const AppointmentsTable = () => {
	const [appointments, setAppointments] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)
	const [currentPage, setCurrentPage] = useState(1) // ✅ Moved inside
	const itemsPerPage = 10

	useEffect(() => {
		const fetchAppointments = async () => {
			try {
				const data = await server.query('get', 'appointments')
				setAppointments(data.appointments || [])
			} catch (error) {
				console.error('Error fetching appointments:', error)
				setError('Failed to load appointments.')
			} finally {
				setLoading(false)
			}
		}
		fetchAppointments()
	}, [])

	const handleDelete = async (appointmentId) => {
		try {
			await server.query('delete', `appointments/${appointmentId}`)
			setAppointments(appointments.filter((appt) => appt.id !== appointmentId))
		} catch (error) {
			console.error('Error deleting appointment:', error)
			setError('Failed to delete appointment.')
		}
	}

	const indexOfLastItem = currentPage * itemsPerPage
	const indexOfFirstItem = indexOfLastItem - itemsPerPage
	const currentAppointments = appointments.slice(
		indexOfFirstItem,
		indexOfLastItem
	)
	const totalPages = Math.max(1, Math.ceil(appointments.length / itemsPerPage)) // ✅ Fix for empty state

	return (
		<section className="container mx-auto mt-10 mb-6">
			<Table>
				<TableCaption>List of scheduled appointments.</TableCaption>
				<TableHeader>
					<TableRow>
						<TableHead className="w-[100px]">ID</TableHead>
						<TableHead>Patient</TableHead>
						<TableHead>Doctor</TableHead>
						<TableHead>Service</TableHead>
						<TableHead>Date</TableHead>
						<TableHead>Time</TableHead>
						<TableHead>Status</TableHead>
						<TableHead className="text-center">Actions</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{loading ? (
						<TableRow>
							<TableCell colSpan={8} className="text-center">
								Loading appointments...
							</TableCell>
						</TableRow>
					) : error ? (
						<TableRow>
							<TableCell colSpan={8} className="text-center text-red-500">
								{error}
							</TableCell>
						</TableRow>
					) : currentAppointments.length > 0 ? (
						currentAppointments.map((appt) => (
							<TableRow key={appt.id}>
								<TableCell className="font-medium">{appt.id}</TableCell>
								<TableCell>{appt.patientname}</TableCell>
								<TableCell>{appt.doctor}</TableCell>
								<TableCell>{appt.service}</TableCell>
								<TableCell>
									{new Date(appt.date).toLocaleDateString()}
								</TableCell>
								<TableCell>
									{new Date(appt.date).toLocaleTimeString()}
								</TableCell>
								<TableCell>{appt.status}</TableCell>
								<TableCell>
									<div className="flex space-x-2 justify-center">
										<Link
											to={`/appointments/${appt.id}`}
											className="bg-gray-800 hover:bg-gray-950 text-white px-4 py-1.5 rounded-lg"
										>
											View
										</Link>
										<Link
											to={`/appointments/${appt.id}/edit`}
											className="bg-gray-800 hover:bg-gray-950 text-white px-4 py-1.5 rounded-lg"
										>
											Edit
										</Link>
										<AlertDialog>
											<AlertDialogTrigger asChild>
												<button className="bg-red-600 hover:bg-red-700 text-white cursor-pointer px-4 py-1.5 rounded-lg">
													Delete
												</button>
											</AlertDialogTrigger>
											<AlertDialogContent>
												<AlertDialogHeader>
													<AlertDialogTitle>Are you sure?</AlertDialogTitle>
													<AlertDialogDescription>
														This action cannot be undone. This will permanently
														delete the appointment.
													</AlertDialogDescription>
												</AlertDialogHeader>
												<AlertDialogFooter>
													<AlertDialogCancel>Cancel</AlertDialogCancel>
													<AlertDialogAction
														onClick={() => handleDelete(appt.id)}
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
							<TableCell colSpan={8} className="text-center">
								No appointments available.
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>

			{/* Pagination */}
			<Pagination className="mt-6">
				<PaginationContent>
					<PaginationItem>
						<PaginationPrevious
							href="#"
							onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
							disabled={currentPage === 1}
						/>
					</PaginationItem>

					{[...Array(totalPages)].map((_, index) => (
						<PaginationItem key={index}>
							<PaginationLink
								href="#"
								isActive={currentPage === index + 1}
								onClick={() => setCurrentPage(index + 1)}
							>
								{index + 1}
							</PaginationLink>
						</PaginationItem>
					))}

					<PaginationItem>
						<PaginationNext
							href="#"
							onClick={() =>
								setCurrentPage((prev) => Math.min(prev + 1, totalPages))
							}
							disabled={currentPage >= totalPages} // ✅ Fix pagination bug
						/>
					</PaginationItem>
				</PaginationContent>
			</Pagination>
		</section>
	)
}

export default AppointmentsTable
