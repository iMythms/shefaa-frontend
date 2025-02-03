import './App.css'
import React, { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'

const App = () => {
	const [user, setUser] = useState(null)

	return (
		<div className="flex flex-col min-h-screen">
			<header>
				<Navbar user={user} />
			</header>
			<main className="flex-grow">
				<Routes>
					<Route path="/" element={<Home />} />
				</Routes>
			</main>
			<footer></footer>
		</div>
	)
}

export default App
