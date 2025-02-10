'use client'

import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import server from '../../services/server'

const Signin = ({ user, setUser, message, setMessage }) => {
	const [formData, setFormData] = useState({
		username: '',
		password: '',
	})

	const navigate = useNavigate()

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value })
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		setMessage('')

		try {
			const response = await server.query('post', '/auth/login', formData)
			setUser(response.user)
			setMessage(response.message)

			const token = await response.token
			localStorage.setItem('authToken', token)

			navigate('/dashboard') // Redirect to Dashboard
		} catch (err) {
			setMessage(err.message)
		}
	}

	return (
		<section className="container mx-auto my-48 flex items-center justify-center">
			<div className="w-full lg:w-1/2">
				<h1 className="text-4xl font-bold mb-8 text-center">Login</h1>
				{message && <p className="text-black text-center">{message}</p>}
				<div className="flex items-center justify-center bg-white p-12 drop-shadow-custom rounded-3xl">
					<form
						onSubmit={handleSubmit}
						autoComplete="off"
						className="w-full flex flex-col gap-6"
					>
						<div className="space-y-2 flex flex-col">
							<label htmlFor="username">Username</label>
							<div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
								<input
									type="text"
									id="username"
									name="username"
									autoComplete="off"
									value={formData.username}
									onChange={handleChange}
									placeholder="Enter your email or CPR No."
									className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
									required
								/>
							</div>
						</div>

						{/* Password */}
						<div className="space-y-2 flex flex-col">
							<label htmlFor="password">Password</label>
							<div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
								<input
									type="password"
									id="password"
									name="password"
									autoComplete="off"
									value={formData.password}
									onChange={handleChange}
									placeholder="Enter your email or CPR No."
									className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
									required
								/>
							</div>
						</div>

						<button
							type="submit"
							className="w-full bg-black hover:bg-gray-800 cursor-pointer text-white rounded-lg p-2"
						>
							Login
						</button>
					</form>
				</div>
			</div>
		</section>
	)
}

export default Signin
