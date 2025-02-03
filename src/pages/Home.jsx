import React from 'react'
import Hero from '../components/home/Hero'
import About from '../components/home/About'
import Treatments from '../components/home/Treatments'
import Specialists from '../components/home/Specialists'
import Contact from '../components/home/Contact'

const Home = () => {
	return (
		<div>
			<main>
				<Hero />
				<About />
				<Treatments />
				<Specialists />
				<Contact />
			</main>
		</div>
	)
}

export default Home
