import React from 'react'
import './css/Login.css'
import PreNavbar from '../components/PreNavbar'
import TextField from '../components/TextField'
import { Link } from 'react-router-dom'
import SubmitButton from '../components/SubmitButton'

function Login() {
  return (
    <div className='Login'>
      <div className='background'></div>
      <div className='content'>
        <PreNavbar />
        <div className='form'>
            <h1>Login<span className='continue'> existing account</span><span className='dot'>.</span></h1>
            <div className='redirect'>
              <p className='label'>First time?</p><Link to="/signup"><p>Sign Up</p></Link>
            </div>
            <TextField label={"Email"} type={"email"}/>
            <TextField label={"Password"} type={"password"}/>
            <SubmitButton value={"Login"}/>
        </div>
      </div>
    </div>
  )
}

export default Login