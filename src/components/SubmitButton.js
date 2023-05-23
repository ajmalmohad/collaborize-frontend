import React from 'react'
import './css/SubmitButton.css'

function SubmitButton({value}) {
  return (
    <div className='SubmitButton'>
        <button>
            {value ? value : "Submit"}
        </button>
    </div>
  )
}

export default SubmitButton