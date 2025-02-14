import React, { useState, useEffect } from 'react'
import { ThemeProvider } from '@mui/material/styles'
import theme from '../styles/theme'
import server from '../services/server'
import { Link } from 'react-router-dom'
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
} from '@mui/material'

const UsersManagement = () => {
	const [users, setUsers] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const usersRes = await server.query('get', 'users')
				setUsers(usersRes.users || [])
			} catch (error) {
				setError('Failed to load users')
			} finally {
				setLoading(false)
			}
		}

		fetchUsers()
	}, [])

	const handleDelete = async (id) => {
		if (!window.confirm('Are you sure you want to delete this user?')) return
		try {
			await server.query('delete', `users/${id}`)
			setUsers(users.filter((user) => user.id !== id)) // Remove from UI
		} catch (error) {
			console.error('Error deleting user:', error)
		}
	}

	if (loading) return <p className="text-center mt-10">Loading users...</p>
	if (error) return <p className="text-red-500 text-center mt-10">{error}</p>

	return (
		<ThemeProvider theme={theme}>
			<section className="container mx-auto mt-48 mb-24">
				<h1 className="text-2xl font-bold mb-6">User Management</h1>
				<p className="text-gray-600">{users.length} Registered Users</p>

				<TableContainer
					component={Paper}
					className="shadow-lg rounded-2xl mt-6"
				>
					<Table>
						<TableHead>
							<TableRow className="bg-gray-200">
								<TableCell className="font-semibold">Name</TableCell>
								<TableCell className="font-semibold">Role</TableCell>
								<TableCell className="font-semibold">Email</TableCell>
								<TableCell className="font-semibold">Phone</TableCell>
								<TableCell className="font-semibold">CPR</TableCell>
								<TableCell className="font-semibold">Status</TableCell>
								<TableCell
									className="font-semibold"
									sx={{ textAlign: 'center' }}
								>
									Actions
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{users.map((user) => (
								<TableRow key={user.id}>
									<TableCell>{user.name}</TableCell>
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
											<button
												onClick={() => handleDelete(user.id)}
												className="bg-red-600 hover:bg-red-700 text-white cursor-pointer px-4 py-1.5 rounded-lg"
											>
												Delete
											</button>
										</div>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</section>
		</ThemeProvider>
	)
}

export default UsersManagement
