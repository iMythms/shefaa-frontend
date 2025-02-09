import './App.css'
import React, { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'

import server from './services/server'

import Navbar from './components/Navbar'
import Home from './pages/Home'
import Footer from './components/Footer'
import Signin from './pages/auth/Signin'
import Dashboard from './pages/Dashboard'

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
				<Navbar user={user} />
			</header>
			<main className="flex-grow">
				<Routes>
					<Route path="/" element={<Home />} server={server} />
					<Route
						path="/login"
						element={<Signin />}
						getUserProfile={getUserProfile}
					/>
					<Route
						path="/dashboard"
						element={<Dashboard />}
						getUserProfile={getUserProfile}
					/>
				</Routes>
			</main>
			<footer>
				<Footer />
			</footer>
		</div>
	)
}

export default App
