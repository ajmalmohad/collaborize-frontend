import React from 'react'
import './css/ChatField.css'
import {IoMdSend} from 'react-icons/io'

function ChatField({textvalue, textaction, submitaction}) {
  return (
    <div className='ChatField'>
        <input value={textvalue} onChange={textaction} />
        <button onClick={submitaction}><IoMdSend/></button>
    </div>
  )
}

export default ChatField