import AreasPage from '@/components/Areas/Areas'
import Footer from '@/components/layout/Footer'
import Navbar from '@/components/layout/Navbar'
import React from 'react'

const page = () => {
  return (
    <div>
        <Navbar/>
        <div className='mt-10'>
      <AreasPage/>
        </div>
      <Footer/>
    </div>
  )
}

export default page
