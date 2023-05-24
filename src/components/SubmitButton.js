import React from 'react'
import './css/SubmitButton.css'

function SubmitButton({value, action}) {
  return (
    <div className='SubmitButton'>
        <button onClick={action}>
            {value ? value : "Submit"}
        </button>
    </div>
  )
}

export default SubmitButton