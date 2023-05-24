import React from 'react'
import './css/TextField.css'

function TextField({label, type, value, error, action}) {
  return (
    <div className='TextField'>
        <label>{label ? label : "Input"}</label>
        <input value={value} onChange={action} className={`${error ? "error" : ""}`} type={`${type ? type : "text"}`} />
    </div>
  )
}

export default TextField