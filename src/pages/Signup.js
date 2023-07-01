import React, { useState, useEffect } from 'react'
import './css/Signup.css'
import PreNavbar from '../components/PreNavbar'
import TextField from '../components/TextField'
import { Link } from 'react-router-dom'
import SubmitButton from '../components/SubmitButton'
import { toast } from 'react-hot-toast'
import { useAppContext } from './../contexts/AuthContext'
import { postData } from './../api/post'

function Signup() {

  const [disabled, setDisabled] = useState(false);

  let { setIsLoggedIn, setUser } = useAppContext();

  useEffect(() => {
    return () => {
      toast.dismiss();
    }
  }, [])

  const [errors, setErrors] = useState({
    email: false,
    name: false,
    password: false
  })

  const [fields, setFields] = useState({
    email: "",
    name: "",
    password: ""
  })

  const handleChange = (event, label) => {
    let value = event.target.value;
    switch(label){
      case "email": setFields(prev => ({ ...prev, email: value })); break;
      case "name": setFields(prev => ({ ...prev, name: value })); break;
      case "password": setFields(prev => ({ ...prev, password: value })); break;
      default: break;
    }
  }

  const isErrors = () => {
      const emailRegex = /\S+@\S+\.\S+/;
      const passwordRegex = /.{8,}/;

      if(fields.email === ""){ 
        toast.error("Email shouldn't be empty.")
        setErrors(prev => ({...prev, email: true }))
        return true;
      }else if(emailRegex.test(fields.email)===false){
        toast.error("Email format not correct.")
        setErrors(prev => ({...prev, email: true }))
        return true;
      }

      if(fields.name === ""){ 
        toast.error("Name shouldn't be empty.");
        setErrors(prev => ({...prev, email: false, name: true }))
        return true;
      }
 
      if(fields.password === ""){ 
        toast.error("Password shouldn't be empty.");
        setErrors({email: false, name: false, password: true })
        return true;
      }else if(passwordRegex.test(fields.password)===false){
        toast.error("Password length should be atleast 8. ");
        setErrors({email: false, name: false, password: true })
        return true;
      }
      
      setErrors({email: false, name: false, password: false })
      return false;
  }

  const submitForm = () => {
    setDisabled(true);
    toast.dismiss();
    const toastId = toast.loading('Processing...');
    postData("/auth/signup", { user: fields })
    .then((data)=>{
      if(!data.userId){
        if(data.message){
          toast.error(data.message, { id: toastId });
          console.error(data.message);
        }else{
          toast.error("Request Failed", { id: toastId });
          console.error("Request Failed");
        }
      }else {
        setIsLoggedIn(true);
        setUser(data);
      }
      setDisabled(false);
    })
    .catch((err)=>{
      console.log(err);
      setDisabled(false);
    })
  }
  

  const handleSubmit = () => {
    if(!isErrors() && !disabled){
      submitForm()
    }else{
      console.log("Error");
    }
  }

  return (
    <div className='Signup'>
      <div className='content'>
        <PreNavbar />
        <div className='form'>
            <h1>Create<span className='continue'> new account</span><span className='dot'>.</span></h1>
            <div className='redirect'>
              <p className='label'>Already a user?</p><Link to="/login"><p>Login</p></Link>
            </div>
            <TextField value={fields.email} action={(e)=>handleChange(e,"email")} error={errors.email} label={"Email"} type={"email"}/>
            <TextField value={fields.name} action={(e)=>handleChange(e,"name")}  error={errors.name} label={"Name"} type={"text"}/>
            <TextField value={fields.password} action={(e)=>handleChange(e,"password")}  error={errors.password} label={"Password"} type={"password"}/>
            <SubmitButton action={handleSubmit} value={"Create New Account"}/>
        </div>
      </div>
    </div>
  )
}

export default Signup