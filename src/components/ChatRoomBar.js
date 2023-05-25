import React from 'react'
import './css/ChatRoomBar.css'
import {FaUserCircle} from 'react-icons/fa'

function ChatRoomBar({ room, roomUsers, onLeave }) {
  return (
    <div className='ChatRoomBar'>
        <div className='header'>
          <h3 className='roomname'>{room}</h3>
          <button onClick={onLeave}>Leave</button>
        </div>
        
        <div className='members'>
        {roomUsers.map((member, i) => (
            <div className='member' key={i}>
                <FaUserCircle/><p>{member.name}</p>
            </div>
        ))}
        </div>
    </div>
  )
}

export default ChatRoomBar