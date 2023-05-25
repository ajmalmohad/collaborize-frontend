import React from 'react'
import './css/FormattedMessage.css'

function FormattedMessage({username, message, time}) {

    function formatDateFromTimestamp(timestamp) {
        const date = new Date(timestamp);
        return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    }
    
  return (
    <div className='FormattedMessage'>
        <div className='header'>
            <p className='username'>{username}</p>
            <p>{formatDateFromTimestamp(time)}</p>
        </div>
        <p className='message'>
            {message}
        </p>
    </div>
  )
}

export default FormattedMessage