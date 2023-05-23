import React from 'react'
import './css/TextField.css'

function TextField({label, type}) {
  return (
    <div className='TextField'>
        <label>{label ? label : "Input"}</label>
        <input type={`${type ? type : "text"}`} />
    </div>
  )
}

export default TextField