import React from 'react'
import './css/Enter.css'
import PreNavbar from '../components/PreNavbar'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

function Enter() {

  const navigate = useNavigate()
  useEffect (()=>{
    navigate("/login")
  }, [navigate])

  return (
    <div className='Enter'>
      <PreNavbar />
    </div>
  )
}

export default Enter