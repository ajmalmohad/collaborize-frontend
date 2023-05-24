import React from 'react'
import './css/Navbar.css'
import Logo from './../images/Logo.png'
import { useAppContext } from './../contexts/AuthContext'

function Navbar() {

  let { setIsLoggedIn } = useAppContext();

  const handleClick = () => {
    setIsLoggedIn(false);
  }

  return (
    <div className='Navbar'>
        <img src={Logo} alt='Logo' />
        <div className='Others'>
            <button className='logout' onClick={handleClick}>Logout</button>
        </div>
    </div>
  )
}

export default Navbar