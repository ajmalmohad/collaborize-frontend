import React from 'react'
import './css/Signup.css'
import PreNavbar from '../components/PreNavbar'
import TextField from '../components/TextField'
import { Link } from 'react-router-dom'
import SubmitButton from '../components/SubmitButton'

function Signup() {
  return (
    <div className='Signup'>
      <div className='background'></div>
      <div className='content'>
        <PreNavbar />
        <div className='form'>
            <h1>Create<span className='continue'> new account</span><span className='dot'>.</span></h1>
            <div className='redirect'>
              <p className='label'>Already a user?</p><Link to="/login"><p>Login</p></Link>
            </div>
            <TextField label={"Email"} type={"email"}/>
            <TextField label={"Name"} type={"text"}/>
            <TextField label={"Password"} type={"password"}/>
            <SubmitButton value={"Create New Account"}/>
        </div>
      </div>
    </div>
  )
}

export default Signup