import LandingPage from '@/components/Home/Home'
import Footer from '@/components/layout/footer'
import Navbar from '@/components/layout/navbar'
import React from 'react'

const home = () => {
  return (
    <>
      <Navbar/>
      <LandingPage/>
      <Footer/>
    </>
  )
}

export default home