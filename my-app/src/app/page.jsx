import LandingPage from '@/components/Home/Home'
import Footer from '@/components/layout/Footer'
import Navbar from '@/components/layout/Navbar'
import React from 'react'

const home = () => {
  return (
    <>
      <Navbar />
      <LandingPage />
      <Footer />
    </>
  )
}

export default home