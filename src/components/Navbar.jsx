import React, { useEffect, useState } from 'react'
import DesktopNavbar from './Navbar/DesktopNavbar'
import MobileNavbar from './Navbar/MobileNavbar'

const Navbar = ({ user, logOut }) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false)

	// Handle menu toggle based on window width
	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth > 768) {
				setIsMenuOpen(false)
			}
		}

		window.addEventListener('resize', handleResize)
		handleResize()
		return () => window.removeEventListener('resize', handleResize)
	}, [])

	// Prevent scrolling when menu is open
	useEffect(() => {
		document.body.style.overflow = isMenuOpen ? 'hidden' : 'unset'
	}, [isMenuOpen])

	return (
		<section className="sticky top-0 left-0 w-full z-20">
			<MobileNavbar
				user={user}
				logOut={logOut}
				isMenuOpen={isMenuOpen}
				setIsMenuOpen={setIsMenuOpen}
			/>
			<DesktopNavbar user={user} logOut={logOut} />
		</section>
	)
}

export default Navbar
