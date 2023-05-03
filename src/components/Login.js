import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { userLogin } from "../ajaxHelpers/users";
import '../css/login.css';

const Login = ({setLoginOut}) =>{

  const [ usernameInput, setUsernameInput ] = useState('');
  const [ passwordInput, setPasswordInput ] = useState('');
  const [ errorMessage, setErrorMessage ] = useState('');

  const navigate = useNavigate();

  const handleChange = (event) =>{
    if(event.target.placeholder === 'username') setUsernameInput(event.target.value)
    else setPasswordInput(event.target.value);
  } 
  const handleSubmit = (event) =>{
    event.preventDefault();
    if(usernameInput === '' && passwordInput === '') setErrorMessage('Please enter username and password');
    else if(usernameInput === '' && passwordInput !== '') setErrorMessage('Please enter username');
    else if(usernameInput !== '' && passwordInput === '') setErrorMessage('Please enter password');
    else if(usernameInput !== '' && passwordInput !== '' && !window.localStorage.getItem('token')){
      userLogin(usernameInput, passwordInput, setLoginOut, navigate, setErrorMessage)
    }
  }

  return(
    <div className="container">
      <form className="flex-center" onSubmit={handleSubmit}>
      <h3>Login</h3>
        <input id="user" placeholder="username" value={usernameInput} onChange={handleChange}/>
        <input id="pass" placeholder="password" value={passwordInput} onChange={handleChange} />
        <button id="submit" >Submit</button>
        <p className="text-danger">{errorMessage}</p>
        <p><Link className="logregister" to='/register'>Register</Link> New Account</p>
      </form>
    </div>
  )
}

export default Login;