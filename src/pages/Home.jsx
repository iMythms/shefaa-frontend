import React from 'react'
import Hero from '../components/home/Hero'
import About from '../components/home/About'
import Services from '../components/home/Services'
import Specialists from '../components/home/Specialists'
import Contact from '../components/home/Contact'

const Home = ({ server }) => {
	return (
		<div>
			<main>
				<Hero />
				<About />
				<Services server={server} />
				<Specialists server={server} />
				<Contact />
			</main>
		</div>
	)
}

export default Home
