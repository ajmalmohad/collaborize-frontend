import React, {useState, useEffect, useRef} from 'react'
import './css/Chatroom.css'
import { useAppContext } from './../contexts/AuthContext'
import { useNavigate, useParams } from 'react-router-dom'
import ChatRoomBar from '../components/ChatRoomBar'
import ChatField from '../components/ChatField'
import FormattedMessage from '../components/FormattedMessage'

function Chatroom() {

  const { roomId } = useParams();
  const room = roomId;

  const navigate = useNavigate();
  const BottomRef = useRef(null);

  const { socket,  user, } = useAppContext();
  const [messagesRecieved, setMessagesReceived] = useState([]);
  const [ roomUsers, setRoomUsers ] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {

    if (room !== '' && user.name !== '') {
      let username = user.name
      socket.emit('join_room', { username , room });
      
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

    }

    return () => {
      socket.off('receive_message');
      socket.off('chatroom_users');
    }
  }, [socket, user, room]);

  useEffect(() => {
    BottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messagesRecieved])
  

  const leaveRoom = () => {
    const username = user.name;
    const __createdtime__ = Date.now();
    socket.emit('leave_room', { username, room, __createdtime__ });
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

  const handleChange = (event) => {
    let value = event.target.value;
    setMessage(value)
  }

  const handleSubmit = () => {
    sendMessage()
  }

  const handleLeave = () => {
    leaveRoom()
  }

  return (
    <div className='Chatroom'>
      
      <div className='chatwindow'>
        <div className='chats no-scrollbar'>
          {messagesRecieved.map((msg, i) => (
            <FormattedMessage key={i} username={msg.username} time={msg.__createdtime__} message={msg.message} />
          ))}
          <div ref={BottomRef} />
        </div>

        <div className='sender'>
          <ChatField textvalue={message} textaction={handleChange} submitaction={handleSubmit} />
        </div>

      </div>

      <div className='sidebar'>
        <ChatRoomBar room={room} roomUsers={roomUsers} onLeave={handleLeave} />
      </div>

    </div>
  )
}

export default Chatroom