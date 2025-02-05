import React from 'react'
import Sidebar from '../components/Sidebar'
import ContentArea from '../components/ContentArea'

const MainLayout = () => {
  return (
    <div className='flex'>
        <Sidebar />
        <ContentArea />
    </div>
  )
}

export default MainLayout