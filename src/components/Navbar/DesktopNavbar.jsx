import React from 'react'
import Logo from '../../assets/Vite.svg'
import { Link } from 'react-router-dom'

const DesktopNavbar = ({ user, logOut }) => {
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
		<div className="hidden lg:block w-full bg-[#2A3342] h-24 fixed top-0 z-10">
			<section className="container mx-auto h-full flex items-center justify-between">
				{/* Left: Logo */}
				<Link
					to="/"
					className="flex items-center transform hover:scale-105 transition ease-linear hover:delay-75"
				>
					<img src={Logo} alt="Logo" className="h-12" />
				</Link>

				{/* Center: Navigation Links */}
				<div className="flex items-center gap-6">
					{' '}
					{/* items-center ensures vertical centering */}
					{user ? (
						<>
							<Link
								to="/dashboard"
								className="hover:bg-[#222935] text-[#8896AB] px-4 py-1.5 rounded-xl"
							>
								Dashboard
							</Link>
							{/* <Link
								to="/dashboard"
								className="hover:bg-[#222935] text-[#8896AB] px-4 py-1.5 rounded-xl"
							>
								Profile
							</Link> */}
							<Link
								to="/appointments"
								className="hover:bg-[#222935] text-[#8896AB] px-4 py-1.5 rounded-xl"
							>
								Appointments
							</Link>
							{user.role === 'laboratorist' && (
								<Link
									to="/dashboard"
									className="hover:bg-[#222935] text-[#8896AB] px-4 py-1.5 rounded-xl"
								>
									Laboratory
								</Link>
							)}

							{user.role === 'pharmacist' && (
								<Link
									to="/dashboard"
									className="hover:bg-[#222935] text-[#8896AB] px-4 py-1.5 rounded-xl"
								>
									Pharmacy
								</Link>
							)}

							{user.role === 'admin' && (
								<>
									{/* <Link
										to="/prescription"
										className="hover:bg-[#222935] text-[#8896AB] px-4 py-1.5 rounded-xl"
									>
										Prescription
									</Link> */}
									<Link
										to="/services"
										className="hover:bg-[#222935] text-[#8896AB] px-4 py-1.5 rounded-xl"
									>
										Services
									</Link>
									<Link
										to="/doctors"
										className="hover:bg-[#222935] text-[#8896AB] px-4 py-1.5 rounded-xl"
									>
										Doctors
									</Link>
								</>
							)}
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

				{/* Right: Login/Logout Button */}
				<div className="flex items-center">
					{' '}
					{/* Ensures vertical alignment */}
					{user ? (
						<button
							onClick={logOut}
							className="bg-[#f63f3c] hover:bg-red-700 px-4 py-1.5 rounded-xl text-white border border-[#f63f3c] hover:border-red-700 font-light transition ease-in-out"
						>
							Logout
						</button>
					) : (
						<Link
							to="/auth/login"
							className="bg-[#3C82F6] hover:bg-[#2A3342] px-4 py-1.5 rounded-xl text-white border border-[#3C82F6] hover:text-[#3C82F6] font-light transition ease-in-out"
						>
							Login
						</Link>
					)}
				</div>
			</section>
		</div>
	)
}

export default DesktopNavbar
