import React, {useState, useEffect} from 'react'
import './css/Chatroom.css'
import { useAppContext } from './../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import TextField from '../components/TextField'
import SubmitButton from '../components/SubmitButton'
import { Navigate } from 'react-router-dom'
import ChatRoomBar from '../components/ChatRoomBar'

function Chatroom() {

  const navigate = useNavigate();

  const { socket,  user, room, setRoom } = useAppContext();
  const [messagesRecieved, setMessagesReceived] = useState([]);
  const [ roomUsers, setRoomUsers ] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    
    socket.on('receive_message', (data) => {
      console.log(data);
      setMessagesReceived((state) => [
        ...state,
        {
          message: data.message,
          username: data.username,
          __createdtime__: data.__createdtime__,
        },
      ]);
    });

    socket.on('chatroom_users', (data) => {
      console.log(data);
      setRoomUsers(data);
    });

	// Remove event listener on component unmount
    return () => {
      socket.off('receive_message');
      socket.off('chatroom_users');
      // Set Room to null to recuce sideeffects
    }
  }, [socket]);

  function formatDateFromTimestamp(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleString();
  }

  const leaveRoom = () => {
    const username = user.name;
    const __createdtime__ = Date.now();
    socket.emit('leave_room', { username, room, __createdtime__ });
    setRoom("")
    navigate('/chat', { replace: true });
  };

  const sendMessage = () => {
    const username = user.name;
    if (message !== '') {
      const __createdtime__ = Date.now();
      socket.emit('send_message', { username, room, message, __createdtime__ });
      setMessage('');
    }
  };

  const handleChange = (event, label) => {
    let value = event.target.value;
    if(label==="message"){
      setMessage(value)
    }
  }

  const handleSubmit = () => {
    sendMessage()
  }

  const handleLeave = () => {
    leaveRoom()
  }

  return (
    room === "" ? <Navigate to="/chat" /> :
    <div className='Chatroom'>
      
      <div>
        {messagesRecieved.map((msg, i) => (
          <div key={i}>
            <div>
              <span>{msg.username}</span>
              <span>
                {formatDateFromTimestamp(msg.__createdtime__)}
              </span>
            </div>
            <p>{msg.message}</p>
            <br />
          </div>
        ))}

        <TextField value={message} action={(e)=>handleChange(e,"message")} label={"Message"} />
        <SubmitButton action={handleSubmit} value={"Send"} />
      </div>

      <div className='sidebar'>
        <ChatRoomBar room={room} roomUsers={roomUsers} onLeave={handleLeave} />
      </div>

    </div>
  )
}

export default Chatroom