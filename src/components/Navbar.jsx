import React from 'react'
import Logo from '../assets/Vite.svg'
import { Link } from 'react-router-dom'

const Navbar = ({ user }) => {
	const handleScroll = (e, targetId) => {
		e.preventDefault()
		const targetElement = document.getElementById(targetId)
		if (targetElement) {
			const yOffset = -200 // Adjust the offset as needed
			const y =
				targetElement.getBoundingClientRect().top + window.pageYOffset + yOffset
			window.scrollTo({ top: y, behavior: 'smooth' })
		}
	}

	return (
		<nav className="bg-[#2A3342] h-24 flex items-center fixed top-0 w-full z-10">
			<section className="container mx-auto flex items-center justify-between">
				<Link to="/" className="flex items-center justify-center">
					<img src={Logo} alt="Logo" className="h-12" />
				</Link>

				<div className="flex gap-8">
					{/* Dynamic navigation items */}
					{user ? (
						<>
							<Link to="/dashboard" className="">
								Dashboard
							</Link>
						</>
					) : (
						<>
							<a
								href="#about"
								onClick={(e) => handleScroll(e, 'about')}
								className="hover:bg-[#222935] text-[#8896AB] px-4 py-1.5 rounded-xl"
							>
								About
							</a>
						</>
					)}
				</div>
			</section>
		</nav>
	)
}

export default Navbar
