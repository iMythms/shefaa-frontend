import React from 'react'
import Logo from '../assets/Vite.svg'
import { Link } from 'react-router-dom'

const Navbar = ({ user, logOut }) => {
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
				<Link
					to="/"
					className="flex items-center justify-center transform hover:scale-105 transition ease-linear hover:delay-75"
				>
					<img src={Logo} alt="Logo" className="h-12" />
				</Link>

				<div className="flex gap-1">
					{/* Dynamic navigation items */}

					{user ? (
						<>
							{/* For everyone */}
							<Link
								to="/dashboard"
								className="hover:bg-[#222935] text-[#8896AB] px-4 py-1.5 rounded-xl"
							>
								Dashboard
							</Link>
							<Link
								to="/dashboard"
								className="hover:bg-[#222935] text-[#8896AB] px-4 py-1.5 rounded-xl"
							>
								Profile
							</Link>

							{/* Admin & Reception & Doctors */}
							<Link
								to="/dashboard"
								className="hover:bg-[#222935] text-[#8896AB] px-4 py-1.5 rounded-xl"
							>
								Appointment
							</Link>

							{/* Admin & Laboratorian */}
							<Link
								to="/dashboard"
								className="hover:bg-[#222935] text-[#8896AB] px-4 py-1.5 rounded-xl"
							>
								Laboratory
							</Link>

							{/* Admin & Pharmacist */}
							<Link
								to="/dashboard"
								className="hover:bg-[#222935] text-[#8896AB] px-4 py-1.5 rounded-xl"
							>
								Pharmacy
							</Link>

							{/* Admin & Doctor */}
							<Link
								to="/dashboard"
								className="hover:bg-[#222935] text-[#8896AB] px-4 py-1.5 rounded-xl"
							>
								Prescription
							</Link>

							{/* Only Admin */}
							<Link
								to="/dashboard"
								className="hover:bg-[#222935] text-[#8896AB] px-4 py-1.5 rounded-xl"
							>
								Services
							</Link>
							<Link
								to="/dashboard"
								className="hover:bg-[#222935] text-[#8896AB] px-4 py-1.5 rounded-xl"
							>
								Doctors
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
							<a
								href="#services"
								onClick={(e) => handleScroll(e, 'services')}
								className="hover:bg-[#222935] text-[#8896AB] px-4 py-1.5 rounded-xl"
							>
								Services
							</a>
							<a
								href="#specialists"
								onClick={(e) => handleScroll(e, 'specialists')}
								className="hover:bg-[#222935] text-[#8896AB] px-4 py-1.5 rounded-xl"
							>
								Specialists
							</a>
							<a
								href="#contact"
								onClick={(e) => handleScroll(e, 'contact')}
								className="hover:bg-[#222935] text-[#8896AB] px-4 py-1.5 rounded-xl"
							>
								Contact us
							</a>
						</>
					)}
				</div>

				{user ? (
					<>
						<button
							onClick={logOut}
							className="bg-[#f63f3c] hover:bg-red-700 px-4 py-1.5 rounded-xl text-white border border-[#f63f3c] hover:border-red-700 font-light cursor-pointer transition ease-in-out"
						>
							Logout
						</button>
					</>
				) : (
					<>
						<Link
							to="/auth/login"
							className="bg-[#3C82F6] hover:bg-[#2A3342] px-4 py-1.5 rounded-xl text-white border border-[#3C82F6] hover:text-[#3C82F6] font-light transition ease-in-out"
						>
							Login
						</Link>
					</>
				)}
			</section>
		</nav>
	)
}

export default Navbar
