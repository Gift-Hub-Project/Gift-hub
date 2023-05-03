import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import registerNewUser from '../ajaxHelpers/users';
import '../css/register.css';

const Register = ({setLoginOut}) => {

  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [registrationErrorMessage, setRegistrationErrorMessage] = useState('');
  
  const navigate = useNavigate();
  
  const handleChange = (event) => {
    if(event.target.placeholder === "email") setEmail(event.target.value);
    else if (event.target.placeholder === "Username" ) setUsername(event.target.value);
    else if (event.target.placeholder === "Password" ) setPassword(event.target.value);
    else if (event.target.placeholder === "Confirm Password" ) setConfirmPassword(event.target.value);
    else setEmail(event.target.value)
  }

  const handleSubmit = (event) => {
  
    event.preventDefault();
      if(email === "" ||  username === '' || 
         password === '' || confirmPassword === '' ) setRegistrationErrorMessage('Please finish filling out registration form')
      else if(password !== confirmPassword) setRegistrationErrorMessage('Passwords do not match')
      else if(email !== "" && username !== '' && 
      password !== '' && confirmPassword !== '' ){
        registerNewUser(username, password, email, setLoginOut, navigate, setRegistrationErrorMessage)
      }
    }
  
    return (
        <div id='register'>
          <form className ="registerform" onSubmit= {handleSubmit}>
          <header className="registerhead">
            Register Here
          </header>
          <input className ="regisuser" onChange = {handleChange} placeholder="Username" value={username} />
          <input className ="regispass" onChange = {handleChange} placeholder="Password" value={password} />
          <input className ="regisconfirm" onChange = {handleChange} placeholder = "Confirm Password" value={confirmPassword} />
          <input className = "email" onChange = {handleChange} placeholder = "Email Address" value={email} />
          <button className = "regisbutton" type= 'submit' >Submit</button>
          <p className='text-danger' >{registrationErrorMessage}</p>
          </form>
        </div>
    )
  }
  
  export default Register