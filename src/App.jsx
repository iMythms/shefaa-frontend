import './App.css'
import React, { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'

import Navbar from './components/Navbar'
import Home from './pages/Home'
import Footer from './components/Footer'
import Signin from './pages/auth/Signin'
import Dashboard from './pages/Dashboard'
import UserManagement from './pages/UserManagement'
import UserDetails from './pages/UserDetails'
import UserEdit from './pages/UserEdit'
import Invoices from './pages/Invoices'

const App = () => {
	const [user, setUser] = useState(null)
	const [message, setMessage] = useState(null)

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
					<Route path="/invoices" element={<Invoices />} />
				</Routes>
			</main>
			<footer>
				<Footer />
			</footer>
		</div>
	)
}

export default App
