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

const DoctorsManagement = () => {
	const [doctors, setDoctors] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)

	const handleDelete = async (doctorId) => {
		try {
			const ba6ee5 = await server.query('delete', `doctors/${doctorId}`)
			console.log(ba6ee5)
			setDoctors(doctors.filter((doctor) => doctor.id !== doctorId))
		} catch (error) {
			console.error('Error deleting doctor:', error)
			setError('Failed to delete doctor.')
		}
	}

	useEffect(() => {
		const fetchDoctors = async () => {
			try {
				const data = await server.query('get', 'doctors')
				setDoctors(data.doctors || [])
			} catch (error) {
				console.error('Error fetching doctors:', error)
				setError('Failed to load doctors.')
			} finally {
				setLoading(false)
			}
		}
		fetchDoctors()
	}, [])

	return (
		<section className="container mx-auto mt-48 mb-24">
			<h1 className="text-2xl font-bold mb-6">Doctors Management</h1>
			<div>
				<Table>
					<TableCaption>List of available doctors.</TableCaption>
					<TableHeader>
						<TableRow>
							<TableHead className="w-[100px]">ID</TableHead>
							<TableHead>Name</TableHead>
							<TableHead>Email</TableHead>
							<TableHead>Phone</TableHead>
							<TableHead>Status</TableHead>
							<TableHead className="text-center">Actions</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{loading ? (
							<TableRow>
								<TableCell colSpan={7} className="text-center">
									Loading doctors...
								</TableCell>
							</TableRow>
						) : error ? (
							<TableRow>
								<TableCell colSpan={7} className="text-center text-red-500">
									{error}
								</TableCell>
							</TableRow>
						) : doctors.length > 0 ? (
							doctors.map((doctor) => (
								<TableRow key={doctor.id}>
									<TableCell className="font-medium">{doctor.id}</TableCell>
									<TableCell>{doctor.name}</TableCell>
									<TableCell>{doctor.email}</TableCell>
									<TableCell>{doctor.phone}</TableCell>
									<TableCell>{doctor.status}</TableCell>
									<TableCell>
										<div className="flex space-x-2 justify-center">
											<Link
												to={`/doctors/${doctor.id}`}
												className="bg-gray-800 hover:bg-gray-950 cursor-pointer text-white px-4 py-1.5 rounded-lg"
											>
												View
											</Link>
											<Link
												to={`/doctors/${doctor.id}/edit`}
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
														<AlertDialogTitle>
															Are you absolutely sure?
														</AlertDialogTitle>
														<AlertDialogDescription>
															This action cannot be undone. This will
															permanently delete the doctor.
														</AlertDialogDescription>
													</AlertDialogHeader>
													<AlertDialogFooter>
														<AlertDialogCancel>Cancel</AlertDialogCancel>
														<AlertDialogAction
															onClick={() => handleDelete(doctor.id)}
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
								<TableCell colSpan={7} className="text-center">
									No doctors available.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
		</section>
	)
}

export default DoctorsManagement
