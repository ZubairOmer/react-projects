import React from 'react'
import Hero from '../components/Hero'
import Banner from '../components/Banner'
import { Link } from 'react-router-dom'
import Services from '../components/Services'
import FeaturedRooms from '../components/FeaturedRooms'

function Home() {
    return (
        <>
            <Hero>
                <Banner title='Kabul House' subTitle='find your dream house here'>
                    <Link to='/rooms' className='btn-primary'>Our Rooms</Link>
                </Banner>
            </Hero>
            <Services />
            <FeaturedRooms />
        </>
    )
}

export default Home
