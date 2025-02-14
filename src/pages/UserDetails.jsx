import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import server from '../services/server'

const UserDetails = () => {
	const { id } = useParams() // Get user ID from URL
	const [user, setUser] = useState(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)

	useEffect(() => {
		const fetchUserDetails = async () => {
			try {
				const userRes = await server.query('get', `users/${id}`)
				setUser(userRes.user || null)
			} catch (error) {
				setError('Failed to load user details')
			} finally {
				setLoading(false)
			}
		}

		fetchUserDetails()
	}, [id])

	if (loading)
		return <p className="text-center mt-10">Loading user details...</p>
	if (error) return <p className="text-red-500 text-center mt-10">{error}</p>

	return (
		<section className="container mx-auto mt-48">
			<h1 className="text-2xl font-bold mb-6">User Details</h1>
			{user ? (
				<div className="bg-white p-8 rounded-3xl drop-shadow-custom flex flex-col md:flex-row gap-6 items-center">
					{/* User Photo */}
					{user.photopath ? (
						<img
							src={user.photopath}
							alt={user.name}
							className="w-32 h-32 rounded-full shadow-md"
						/>
					) : (
						<div className="w-32 h-32 flex items-center justify-center bg-gray-200 text-gray-600 rounded-full shadow-md">
							No Photo
						</div>
					)}

					{/* User Info */}
					<div className="flex flex-col gap-3 text-lg">
						<h2 className="text-xl font-semibold">{user.name}</h2>
						<p>
							<strong>Email:</strong> {user.email}
						</p>
						<p>
							<strong>Phone:</strong> {user.phone || 'N/A'}
						</p>
						<p>
							<strong>Role:</strong> {user.role}
						</p>
						<p>
							<strong>CPR:</strong> {user.cpr}
						</p>
						<p>
							<strong>Status:</strong>{' '}
							<span
								className={`px-2.5 text-base rounded-full ${
									user.status === 'active' ? 'bg-green-200' : 'bg-red-500'
								}`}
							>
								{user.status}
							</span>
						</p>
						<p>
							<strong>Username:</strong> {user.username}
						</p>
						{user.notes && (
							<p>
								<strong>Notes:</strong> {user.notes}
							</p>
						)}
					</div>
				</div>
			) : (
				<p className="text-gray-600">User not found.</p>
			)}
		</section>
	)
}

export default UserDetails
