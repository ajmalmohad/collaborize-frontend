import React from 'react'
import './css/Error.css'
import { Link } from 'react-router-dom'

function Error() {
  return (
    <div className='Error'>
      <h1>404 Not Found</h1>
      <Link to="/home">Go Back</Link>
    </div>
  )
}

export default Error