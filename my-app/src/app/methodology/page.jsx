import Footer from '@/components/layout/Footer'
import Navbar from '@/components/layout/Navbar'
import MethodologyPage from '@/components/Methodology/Methodology'
import React from 'react'

const page = () => {
  return (
    <div>
        <Navbar/>
        <div className='mt-20'>
        <MethodologyPage/>
        </div>
        <Footer/>
             
    </div>
  )
}

export default page
