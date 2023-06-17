import React from 'react'
import './css/Sidebar.css'
import { AiFillHome } from 'react-icons/ai';
import { BsFillChatFill } from 'react-icons/bs';
import { MdDraw } from 'react-icons/md';
import { AiFillRobot } from 'react-icons/ai';
import { Link } from 'react-router-dom';

function Sidebar({ label }) {
  return (
    <div className='Sidebar'>
      <div className='icons'>
        <Link to="/home"><AiFillHome className={`${label==="Home" ? "selected" : ""}`} /></Link>
        <Link to="/chat"><BsFillChatFill className={`${label==="Chat" ? "selected" : ""}`} /></Link>
        <Link to="/draw"><MdDraw className={`${label==="Draw" ? "selected" : ""}`} /></Link>
        <Link to="/chatbot"><AiFillRobot className={`${label==="ChatBot" ? "selected" : ""}`} /></Link>
      </div>
    </div>
  )
}

export default Sidebar