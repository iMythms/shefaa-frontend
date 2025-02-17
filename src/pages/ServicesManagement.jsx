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

const ServicesManagement = () => {
	const [services, setServices] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)

	const handleDelete = async (serviceId) => {
		try {
			await server.query('delete', `services/${serviceId}`)
			setServices(services.filter((service) => service.id !== serviceId))
		} catch (error) {
			console.error('Error deleting service:', error)
			setError('Failed to delete service.')
		}
	}

	useEffect(() => {
		const fetchServices = async () => {
			try {
				const data = await server.query('get', 'services')
				setServices(data.services || [])
			} catch (error) {
				console.error('Error fetching services:', error)
				setError('Failed to load services.')
			} finally {
				setLoading(false)
			}
		}
		fetchServices()
	}, [])

	return (
		<section className="container mx-auto mt-48 mb-24">
			<h1 className="text-2xl font-bold mb-6">Services</h1>
			<div>
				<Table>
					<TableCaption>List of available services.</TableCaption>
					<TableHeader>
						<TableRow>
							<TableHead className="w-[100px]">ID</TableHead>
							<TableHead>Service Name</TableHead>
							<TableHead>Price (BHD)</TableHead>
							<TableHead>Duration (min)</TableHead>
							<TableHead>Status</TableHead>
							<TableHead className="text-center">Actions</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{loading ? (
							<TableRow>
								<TableCell colSpan={3} className="text-center">
									Loading services...
								</TableCell>
							</TableRow>
						) : error ? (
							<TableRow>
								<TableCell colSpan={3} className="text-center text-red-500">
									{error}
								</TableCell>
							</TableRow>
						) : services.length > 0 ? (
							services.map((service) => (
								<TableRow key={service.id}>
									<TableCell className="font-medium">{service.id}</TableCell>
									<TableCell>{service.title}</TableCell>
									<TableCell>{service.price}</TableCell>
									<TableCell>{service.duration}</TableCell>
									<TableCell>{service.status}</TableCell>
									<TableCell>
										<div className="flex space-x-2 justify-center">
											<Link
												to={`/services/${service.id}`}
												className="bg-gray-800 hover:bg-gray-950 cursor-pointer text-white px-4 py-1.5 rounded-lg"
											>
												View
											</Link>
											<Link
												to={`/services/${service.id}/edit`}
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
															permanently delete the service.
														</AlertDialogDescription>
													</AlertDialogHeader>
													<AlertDialogFooter>
														<AlertDialogCancel>Cancel</AlertDialogCancel>
														<AlertDialogAction
															onClick={() => handleDelete(service.id)}
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
								<TableCell colSpan={3} className="text-center">
									No services available.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
		</section>
	)
}

export default ServicesManagement
