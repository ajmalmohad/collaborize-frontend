import React, { useState } from 'react'
import './css/Chat.css'
import TextField from './../components/TextField'
import SubmitButton from './../components/SubmitButton'
import { useNavigate } from 'react-router-dom';



function Chat() {

  const navigate = useNavigate();
  const [room, setRoom] = useState("");

  const handleChange = (event, label) => {
    let value = event.target.value;
    if(label === "room") setRoom(value);
  }

  const joinRoom = () => {
    if(room!=="") navigate(`/chat/${room}`, { replace: true });
  };
  
  return (
    <div className='Chat'>
      <div className='join'>
        <div className='fields'>
          <TextField value={room} placeholder={"Enter Chat Room Code"} action={(e)=>handleChange(e,"room")} label={"Room Code"} />
          <SubmitButton value={"Join Room"} action={joinRoom} />
        </div>
      </div>
    </div>
  )

}

export default Chat