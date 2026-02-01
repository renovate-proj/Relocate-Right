import Footer from '@/components/layout/Footer'
import Navbar from '@/components/layout/Navbar'
import ResourcesPage from '@/components/Resources/Resources'
import React from 'react'

const page = () => {
  return (
    <div>
        <Navbar/>
        <div className='mt-20'>
      <ResourcesPage/>
        </div>
      <Footer/>
    </div>
  )
}

export default page
