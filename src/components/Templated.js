import React from 'react'
import './css/Templated.css'
import Navbar from './Navbar'
import Sidebar from './Sidebar'

function Templated({ children, label }) {
  return (
    <div className='Templated'>
        <Navbar />
        <div className='playground'>
            <div className='bar'>
                <Sidebar label = {label} />
            </div>
            <div className='ground'>
                { children }
            </div>
        </div>
    </div>
  )
}

export default Templated