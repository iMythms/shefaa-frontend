import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import server from '../services/server'

const UserEdit = () => {
	const { id } = useParams()
	const navigate = useNavigate()
	const [user, setUser] = useState({
		name: '',
		email: '',
		phone: '',
		role: '',
		status: '',
	})

	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const response = await server.query('get', `users/${id}`)
				setUser(response.user)
			} catch (err) {
				setError('Failed to fetch user data')
			} finally {
				setLoading(false)
			}
		}

		fetchUser()
	}, [id])

	const handleChange = (e) => {
		setUser({ ...user, [e.target.name]: e.target.value })
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		try {
			await server.query('put', `users/${id}`, user)
			navigate('/users') // Redirect back to user list
		} catch (err) {
			setError('Failed to update user')
		}
	}

	if (loading) return <p className="text-center mt-10">Loading user...</p>
	if (error) return <p className="text-red-500 text-center mt-10">{error}</p>

	return (
		<section className="container mx-auto mt-48 mb-24 flex flex-col items-center justify-center">
			<div className="w-full lg:w-1/2">
				<div className="bg-white p-12 drop-shadow-custom rounded-3xl">
					<h1 className="text-2xl font-bold mb-8">Edit User</h1>

					<form
						onSubmit={handleSubmit}
						autoComplete="off"
						className="w-full flex flex-col gap-6"
					>
						{/* Name */}
						<div className="space-y-2 flex flex-col">
							<label htmlFor="name">Name</label>
							<div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
								<input
									type="text"
									id="name"
									name="name"
									value={user.name}
									onChange={handleChange}
									placeholder="Enter Name"
									className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
									required
								/>
							</div>
						</div>

						{/* Email */}
						<div className="space-y-2 flex flex-col">
							<label htmlFor="email">Email</label>
							<div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
								<input
									type="email"
									id="email"
									name="email"
									value={user.email}
									onChange={handleChange}
									placeholder="Enter Email"
									className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
									required
								/>
							</div>
						</div>

						{/* CPR */}
						<div className="space-y-2 flex flex-col">
							<label htmlFor="cpr">CPR</label>
							<div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
								<input
									type="text"
									id="cpr"
									name="cpr"
									value={user.cpr}
									onChange={handleChange}
									placeholder="Enter CPR"
									className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
								/>
							</div>
						</div>

						{/* Phone */}
						<div className="space-y-2 flex flex-col">
							<label htmlFor="phone">Phone</label>
							<div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
								<input
									type="text"
									id="phone"
									name="phone"
									value={user.phone}
									onChange={handleChange}
									placeholder="Enter Phone"
									className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
									required
								/>
							</div>
						</div>

						{/* Role */}
						<div className="space-y-2 flex flex-col">
							<label htmlFor="role">Role</label>
							<div className="flex items-center rounded-md bg-white px-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
								<select
									id="role"
									name="role"
									value={user.role}
									onChange={handleChange}
									className="block min-w-0 grow py-1.5 px-1 text-base text-gray-900 focus:outline-none sm:text-sm/6"
								>
									<option value="admin">Admin</option>
									<option value="doctor">Doctor</option>
									<option value="receptionist">Receptionist</option>
									<option value="patient">Patient</option>
								</select>
							</div>
						</div>

						{/* Status */}
						<div className="space-y-2 flex flex-col">
							<label htmlFor="status">Status</label>
							<div className="flex items-center rounded-md bg-white px-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
								<select
									id="status"
									name="status"
									value={user.status}
									onChange={handleChange}
									className="block min-w-0 grow py-1.5 px-1 text-base text-gray-900 focus:outline-none sm:text-sm/6"
								>
									<option value="active">Active</option>
									<option value="suspended">Suspended</option>
								</select>
							</div>
						</div>

						{/* Submit Button */}
						<button
							type="submit"
							className="w-full bg-green-600 hover:bg-green-700 cursor-pointer text-white rounded-lg p-2"
						>
							Update User
						</button>
					</form>
				</div>
			</div>
		</section>
	)
}

export default UserEdit
