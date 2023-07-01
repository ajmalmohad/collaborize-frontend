import React, {useState, useEffect, useRef} from 'react'
import './css/Chatroom.css'
import { useAppContext } from './../contexts/AuthContext'
import { useNavigate, useParams } from 'react-router-dom'
import ChatRoomBar from '../components/ChatRoomBar'
import ChatField from '../components/ChatField'
import FormattedMessage from '../components/FormattedMessage'
import { GiHamburgerMenu } from 'react-icons/gi';

function Chatroom() {

  const { roomId } = useParams();

  const navigate = useNavigate();
  const BottomRef = useRef(null);
  const sidebarRef = useRef(null);

  const { socket,  user } = useAppContext();
  const [messagesRecieved, setMessagesReceived] = useState([]);
  const [ roomUsers, setRoomUsers ] = useState([]);
  const [message, setMessage] = useState('');
  const [toolopen, setToolOpen] = useState(true);

  useEffect(() => {
    let name = user.name
    let email = user.email

    if (roomId !== '' && user.name !== '') { 
      socket.emit('join_room', { name, email, roomId });
      socket.on('receive_message', (data) => {
        console.log(data);
        setMessagesReceived((state) => [
          ...state,
          {
            message: data.message,
            name: data.name,
            email: data.email,
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
      const __createdtime__ = Date.now();
      socket.off('receive_message');
      socket.off('chatroom_users');
      socket.emit('leave_room', { name, email, roomId, __createdtime__ });
    }
  }, [socket, user, roomId]);

  useEffect(() => {
    BottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messagesRecieved])
  

  const leaveRoom = () => {
    const name = user.name;
    const email = user.email
    const __createdtime__ = Date.now();
    socket.emit('leave_room', { name, email, roomId, __createdtime__ });
    navigate('/chat', { replace: true });
  };

  const sendMessage = () => {
    const name = user.name;
    const email = user.email;
    if (message !== '') {
      const __createdtime__ = Date.now();
      socket.emit('send_message', { name, email, roomId, message, __createdtime__ });
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
            <div key={i} className={`chat ${(msg.email===user.email) ? "myside" : ""}`}>
              <FormattedMessage isMe={(msg.email===user.email)} name={msg.name} email={msg.email} time={msg.__createdtime__} message={msg.message} />
            </div>
          ))}
          <div ref={BottomRef} />
        </div>

        <div className='sender'>
          <ChatField textvalue={message} textaction={handleChange} submitaction={handleSubmit} />
        </div>

      </div>

      <div className='sidebar' ref={sidebarRef} style={{position: toolopen ? "relative" : "absolute", right: toolopen ? "0%" : "-35%"}}>
        <ChatRoomBar room={roomId} roomUsers={roomUsers} onLeave={handleLeave} />
      </div>

      <div className='open-hamburger' onClick={()=>{setToolOpen(prev => !prev)}}>
          <GiHamburgerMenu />
      </div>

    </div>
  )
}

export default Chatroom