import React from 'react'
import Hero from '../components/home/Hero'
import About from '../components/home/About'
import Services from '../components/home/Services'
import Specialists from '../components/home/Specialists/Specialists'
import Contact from '../components/home/Contact'

const Home = () => {
	return (
		<div>
			<main>
				<Hero />
				<About />
				<Services />
				<Specialists />
				<Contact />
			</main>
		</div>
	)
}

export default Home
