import React from 'react'
import './css/FormattedMessage.css'

function FormattedMessage({name, email, message, time}) {

    function formatDateFromTimestamp(timestamp) {
        const date = new Date(timestamp);
        return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    }
    
  return (
    <div className='FormattedMessage'>
        <div className='header'>
            <p className='username'><dfn title={email}>{name}</dfn></p>
            <p>{formatDateFromTimestamp(time)}</p>
        </div>
        <p className='message'>
            {message}
        </p>
    </div>
  )
}

export default FormattedMessage