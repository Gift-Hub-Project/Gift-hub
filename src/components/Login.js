import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import  userLogin  from "../ajaxHelpers/users";

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
    <div className="flex-center w-75">
      <h3>Login</h3>
      <form className="flex-center" onSubmit={handleSubmit}>
        <input placeholder="username" value={usernameInput} onChange={handleChange}/>
        <input placeholder="password" value={passwordInput} onChange={handleChange} />
        <button >Submit</button>
        <p className="text-danger">{errorMessage}</p>
        <p><Link to='/register'>Register</Link> New Account</p>
      </form>
    </div>
  )
}

export default Login;