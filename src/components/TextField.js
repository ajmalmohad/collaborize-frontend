import React from 'react'
import './css/TextField.css'

function TextField({label, type, value, error, action, placeholder}) {
  return (
    <div className='TextField'>
        <label>{label ? label : "Input"}</label>
        <input value={value} placeholder={placeholder ? placeholder : ""} onChange={action} className={`${error ? "error" : ""}`} type={`${type ? type : "text"}`} />
    </div>
  )
}

export default TextField