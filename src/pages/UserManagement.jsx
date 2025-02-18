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

const UsersManagement = () => {
	const [users, setUsers] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)

	const handleDelete = async (userId) => {
		try {
			await server.query('delete', `users/${userId}`)
			setUsers(users.filter((user) => user.id !== userId))
		} catch (error) {
			console.error('Error deleting user:', error)
			setError('Failed to delete user.')
		}
	}

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const data = await server.query('get', 'users')
				setUsers(data.users || [])
			} catch (error) {
				console.error('Error fetching users:', error)
				setError('Failed to load users.')
			} finally {
				setLoading(false)
			}
		}
		fetchUsers()
	}, [])

	return (
		<section className="container mx-auto mt-48 mb-24">
			<h1 className="text-2xl font-bold mb-6">User Management</h1>
			<p className="text-gray-600">{users.length} Registered Users</p>

			<Table>
				<TableCaption>List of registered users.</TableCaption>
				<TableHeader>
					<TableRow>
						<TableHead className="w-[100px]">ID</TableHead>
						<TableCell>Name</TableCell>
						<TableHead>Role</TableHead>
						<TableHead>Email</TableHead>
						<TableHead>Phone</TableHead>
						<TableHead>CPR</TableHead>
						<TableHead>Status</TableHead>
						<TableHead className="text-center">Actions</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{loading ? (
						<TableRow>
							<TableCell colSpan={7} className="text-center">
								Loading users...
							</TableCell>
						</TableRow>
					) : error ? (
						<TableRow>
							<TableCell colSpan={7} className="text-center text-red-500">
								{error}
							</TableCell>
						</TableRow>
					) : users.length > 0 ? (
						users.map((user) => (
							<TableRow key={user.id}>
								<TableCell className="font-medium">{user.id}</TableCell>
								<TableCell className="font-medium">{user.name}</TableCell>
								<TableCell>{user.role}</TableCell>
								<TableCell>{user.email}</TableCell>
								<TableCell>{user.phone}</TableCell>
								<TableCell>{user.cpr}</TableCell>
								<TableCell>{user.status}</TableCell>
								<TableCell>
									<div className="flex space-x-2 justify-center">
										<Link
											to={`/users/${user.id}`}
											className="bg-gray-800 hover:bg-gray-950 cursor-pointer text-white px-4 py-1.5 rounded-lg"
										>
											View
										</Link>
										<Link
											to={`/users/${user.id}/edit`}
											className="bg-gray-800 hover:bg-gray-950 text-white px-4 py-1.5 rounded-lg"
										>
											Edit
										</Link>

										{/* Delete Confirmation */}
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
														This action cannot be undone. This will permanently
														delete the user.
													</AlertDialogDescription>
												</AlertDialogHeader>
												<AlertDialogFooter>
													<AlertDialogCancel>Cancel</AlertDialogCancel>
													<AlertDialogAction
														onClick={() => handleDelete(user.id)}
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
								No users available.
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
		</section>
	)
}

export default UsersManagement
