import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../../assets/Vite.svg'

const MobileNavbar = ({ user, logOut, isMenuOpen, setIsMenuOpen }) => {
	return (
		<div className="lg:hidden w-full bg-[#2A3342] border-b-2 border-[#222935]">
			<div className="container mx-auto px-5 h-auto">
				<div className="flex justify-between items-center py-5">
					{/* Logo */}
					<div className="h-9">
						<Link to="/">
							<img
								src={Logo}
								alt="Logo"
								className="w-full h-full object-contain"
							/>
						</Link>
					</div>

					{/* Hamburger Menu Button */}
					<button
						onClick={() => setIsMenuOpen(!isMenuOpen)}
						aria-expanded={isMenuOpen}
						aria-label="Toggle navigation menu"
						className="relative z-50 flex flex-col justify-around w-4 aspect-square group"
					>
						<div
							className={`w-4 h-[1.5px] bg-white origin-center duration-200 ${
								isMenuOpen ? 'rotate-45 absolute inset-0 translate-y-[6px]' : ''
							}`}
						></div>
						<div
							className={`w-4 h-[1.5px] bg-white origin-center duration-200 ${
								isMenuOpen
									? '-rotate-45 absolute inset-0 translate-y-[6px]'
									: ''
							}`}
						></div>
					</button>
				</div>
			</div>

			{/* Full-screen Menu */}
			<div
				className={`fixed inset-0 bg-[#2A3342] flex flex-col w-full gap-4 text-start items-start overflow-y-auto md:hidden transform transition-transform duration-300 ${
					isMenuOpen
						? 'translate-y-0 opacity-100'
						: '-translate-y-full opacity-0'
				}`}
			>
				<div className="container px-5 pt-20 pb-1 flex flex-col gap-4">
					{user ? (
						<>
							<Link
								to="/dashboard"
								className="text-[#8896AB] text-lg py-2"
								onClick={() => setIsMenuOpen(false)}
							>
								Dashboard
							</Link>
							{/* <Link
								to="/dashboard"
								className="text-[#8896AB] text-lg py-2"
								onClick={() => setIsMenuOpen(false)}
							>
								Profile
							</Link> */}
							<Link
								to="/appointments"
								className="text-[#8896AB] text-lg py-2"
								onClick={() => setIsMenuOpen(false)}
							>
								Appointments
							</Link>
							<Link
								to="/appointments"
								className="text-[#8896AB] text-lg py-2"
								onClick={() => setIsMenuOpen(false)}
							>
								Laboratory
							</Link>
							<Link
								to="/dashboard"
								className="text-[#8896AB] text-lg py-2"
								onClick={() => setIsMenuOpen(false)}
							>
								Pharmacy
							</Link>
							<Link
								to="/dashboard"
								className="text-[#8896AB] text-lg py-2"
								onClick={() => setIsMenuOpen(false)}
							>
								Prescription
							</Link>
							<Link
								to="/services"
								className="text-[#8896AB] text-lg py-2"
								onClick={() => setIsMenuOpen(false)}
							>
								Services
							</Link>
							<Link
								to="/doctors"
								className="text-[#8896AB] text-lg py-2"
								onClick={() => setIsMenuOpen(false)}
							>
								Doctors
							</Link>
						</>
					) : (
						<>
							<a
								href="#about"
								className="text-[#8896AB] text-lg py-2"
								onClick={() => setIsMenuOpen(false)}
							>
								About
							</a>
							<a
								href="#services"
								className="text-[#8896AB] text-lg py-2"
								onClick={() => setIsMenuOpen(false)}
							>
								Services
							</a>
							<a
								href="#specialists"
								className="text-[#8896AB] text-lg py-2"
								onClick={() => setIsMenuOpen(false)}
							>
								Specialists
							</a>
							<a
								href="#contact"
								className="text-[#8896AB] text-lg py-2"
								onClick={() => setIsMenuOpen(false)}
							>
								Contact us
							</a>
						</>
					)}

					{/* Login/Logout Button */}
					{user ? (
						<button
							onClick={logOut}
							className="bg-[#f63f3c] hover:bg-red-700 px-4 py-2 rounded-xl mt-2 text-white border border-[#f63f3c] hover:border-red-700 transition ease-in-out"
						>
							Logout
						</button>
					) : (
						<Link
							to="/auth/login"
							className="bg-[#3C82F6] hover:bg-[#2A3342] px-4 py-2 rounded-xl mt-2 text-white border border-[#3C82F6] hover:text-[#3C82F6] transition ease-in-out"
						>
							Login
						</Link>
					)}
				</div>
			</div>
		</div>
	)
}

export default MobileNavbar
