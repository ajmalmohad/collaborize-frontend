import React from 'react'
import './css/Home.css'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className='Home'>
      <h1 className='heading'>Popular Rooms</h1>
      <div className='rooms'>
        <Link to="/chat/lobby"><div className='room'>Lobby</div></Link>
        <Link to="/chat/python"><div className='room'>Python</div></Link>
        <Link to="/chat/machine-learning"><div className='room'>Machine Learning</div></Link>
        <Link to="/chat/javascript"><div className='room'>Javascript</div></Link>
        <Link to="/chat/rust"><div className='room'>Rust</div></Link>
        <Link to="/chat/cpp"><div className='room'>C++</div></Link>
        <Link to="/draw/art"><div className='room draw'>Art</div></Link>
        <Link to="/draw/drawing"><div className='room draw'>Drawing</div></Link>
      </div>
    </div>
  )
}

export default Home