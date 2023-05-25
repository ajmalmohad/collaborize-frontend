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
      <TextField value={room} action={(e)=>handleChange(e,"room")} label={"Room Code"} />
      <SubmitButton value={"Join Room"} action={joinRoom} />
    </div>
  )

}

export default Chat