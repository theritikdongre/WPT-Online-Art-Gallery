import React from 'react'
import Navbar from '../../components/Navbar'
import Hero from '../../components/Hero'
import GalleryPreview from '../../components/GalleryPreview'

const Home = () => {
  return (
    <div>
      <Navbar/>
      <Hero/>
      <GalleryPreview/>
    </div>
  )
}

export default Home