import React from 'react'
import './css/ChatRoomBar.css'
import {FaUserCircle} from 'react-icons/fa'

function ChatRoomBar({ room, roomUsers }) {
  return (
    <div className='ChatRoomBar'>
        <h3 className='roomname'>{room}</h3>
        <div className='members'>
        {roomUsers.map((member, i) => (
            <div className='member' key={i}>
                <FaUserCircle/><p>{member.username}</p>
            </div>
        ))}
        </div>
    </div>
  )
}

export default ChatRoomBar