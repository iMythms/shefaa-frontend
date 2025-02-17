import './App.css'
import React, { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'

import '@schedule-x/theme-shadcn/dist/index.css'

import Navbar from './components/Navbar'
import Home from './pages/Home'
import Footer from './components/Footer'
import Signin from './pages/auth/Signin'
import Dashboard from './pages/Dashboard'
import UserManagement from './pages/UserManagement'
import UserDetails from './pages/UserDetails'
import UserEdit from './pages/UserEdit'
import Invoices from './pages/Invoices'
import Appointments from './pages/Appointments'
import ServicesManagement from './pages/ServicesManagement'
import ServiceDetails from './pages/ServiceDetails'
import ServiceEdit from './pages/ServiceEdit'

import Server from './services/server'

const App = () => {
	const [user, setUser] = useState(null)
	const [message, setMessage] = useState(null)

	const getUser = async () => {
		const data = await Server.query('get', 'auth/loggedUser')
		console.log('user data = ', data.user)
		setUser(data.user.user)
		console.log('user = ', user)
	}
	useEffect(() => {
		getUser()
	}, [])

	const logOut = () => {
		localStorage.removeItem('authToken')
		setUser(null)
		window.location.href = '/'
	}

	return (
		<div className="flex flex-col min-h-screen">
			<header>
				<Navbar user={user} logOut={logOut} />
			</header>
			<main className="flex-grow">
				<Routes>
					<Route path="/" element={<Home />} />
					<Route
						path="/auth/login"
						element={
							<Signin
								user={user}
								setUser={setUser}
								message={message}
								setMessage={setMessage}
							/>
						}
					/>
					<Route path="/dashboard" element={<Dashboard user={user} />} />
					<Route path="/users" element={<UserManagement />} />
					<Route path="/users/:id" element={<UserDetails />} />
					<Route path="/users/:id/edit" element={<UserEdit />} />
					<Route path="/invoices" element={<Invoices user={user} />} />
					<Route path="/appointments" element={<Appointments user={user} />} />
					<Route path="/services" element={<ServicesManagement />} />
					<Route path="/services/:id" element={<ServiceDetails />} />
					<Route path="/services/:id/edit" element={<ServiceEdit />} />
				</Routes>
			</main>
			<footer>
				<Footer />
			</footer>
		</div>
	)
}

export default App
