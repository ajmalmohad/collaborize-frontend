import React, { useState } from 'react'
import './css/Draw.css'
import TextField from './../components/TextField'
import SubmitButton from './../components/SubmitButton'
import { useNavigate } from 'react-router-dom';

function Draw() {

  const navigate = useNavigate();
  const [room, setRoom] = useState("");

  const handleChange = (event, label) => {
    let value = event.target.value;
    if(label === "room") setRoom(value);
  }

  const joinRoom = () => {
    if(room!=="") navigate(`/draw/${room}`, { replace: true });
  };
  
  return (
    <div className='Draw'>
      <div className='join'>
        <div className='fields'>
          <TextField value={room} placeholder={"Enter Drawing Room Code"} action={(e)=>handleChange(e,"room")} label={"Room Code"} />
          <SubmitButton value={"Join Room"} action={joinRoom} />
        </div>
      </div>
    </div>
  )

}

export default Draw