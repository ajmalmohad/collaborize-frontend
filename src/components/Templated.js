import React from 'react'
import './css/Templated.css'
import Navbar from './Navbar'
import Sidebar from './Sidebar'

function Templated({ children }) {
  return (
    <div className='Templated'>
        <Navbar />
        <div className='playground'>
            <div className='bar'>
                <Sidebar/>
            </div>
            <div className='ground'>
                { children }
            </div>
        </div>
    </div>
  )
}

export default Templated