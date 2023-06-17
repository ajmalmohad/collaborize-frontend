import React, {useState, useRef, useEffect} from 'react'
import './css/ChatBot.css'
import ChatField from '../components/ChatField'
import { useAppContext } from './../contexts/AuthContext'
import { postData } from '../api/post'
import FormattedMessage from '../components/FormattedMessage'

function ChatBot() {
    const { user } = useAppContext();
    const [message, setMessage] = useState('');
    const [locked, setLocked] = useState(false);
    const [messagesRecieved, setMessagesReceived] = useState([]);
    const BottomRef = useRef(null);

    const handleChange = (event) => {
        let value = event.target.value;
        setMessage(value)
    }
    
    const handleSubmit = () => {
        if(message !== "" && !message.replace(/\s/g, '').length !== 0 && !locked){
            setLocked(true);
            setMessagesReceived((state) => [
                ...state,
                {
                  message: message,
                  email: user.email,
                  name: user.name
                },
            ]);

            setMessagesReceived((state) => [
                ...state,
                {
                  message: "Typing...",
                  email: "bot@collaborizer.com",
                  name: "Collaborizer Bot"
                },
            ]);
            
            postData("/bot/ask", { prompt: message, email: user.email })
            .then((data)=>{
                if(data.message){
                    setMessagesReceived((state) => [
                        ...state.slice(0, -1),
                        {
                          message: data.message,
                          email: "bot@collaborizer.com",
                          name: "Collaborizer Bot"
                        },
                    ]);
                }else{
                    setMessagesReceived(messagesRecieved.slice(0, -1));
                    setMessagesReceived((state) => [
                        ...state.slice(0, -1),
                        {
                          message: "Can you repeat?",
                          email: "bot@collaborizer.com",
                          name: "Collaborizer Bot"
                        },
                    ]);
                }
                setMessage('');
                setLocked(false);
            })
            .catch((err)=>{
                setMessage('');
                setLocked(false);
            })
            setMessage('');
            setLocked(false);
        }
    }

    useEffect(() => {
        BottomRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messagesRecieved])

  return (
    <div className='ChatBot'>
        <div className='chats no-scrollbar'>
            {messagesRecieved.map((msg, i) => (
                <div key={i} className={`chat ${(msg.email===user.email) ? "myside" : ""}`}>
                    <FormattedMessage isMe={(msg.email===user.email)} name={msg.name} email={msg.email} time={Date.now()} message={msg.message} />
                </div>
            ))}
            <div ref={BottomRef} />
        </div>
        <div className='sender'>
          <ChatField textvalue={message} textaction={handleChange} submitaction={handleSubmit} />
        </div>
    </div>
  )
}

export default ChatBot