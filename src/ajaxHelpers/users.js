const registerNewUser = (username, password, email, setLoginOut, navigator, errorSetter) =>{
  fetch('/api/users/register',{
    method:"POST",
    headers:{
      "Content-type": "application/json"
    },
    body: JSON.stringify({
      username,
      password,
      email,
    })
  }).then(response => response.json())
    .then(result =>{
      errorSetter('')
      if(result.success){
        setLoginOut('Logout');
        window.localStorage.setItem('token', result.token);
        window.localStorage.setItem('username', username);
        navigator('/');
    }
    else if(result.error) errorSetter(result.error);
    else errorSetter('Registration Error!')
    }).catch(console.error);
}

export const userLogin = async(event) =>{
  fetch('/api/users/login',{
    method:"POST",
    headers:{
      "Content-type": "application/json"
    },
    body: JSON.stringify({
      username,
      password
    })
  }).then(response => response.json())
    .then(result =>{
      if(result.success){
        window.localStorage.setItem('token', response.data.token);
        window.localStorage.setItem('username', username);
        setLoginOut('Logout')
        navigator('/')
      }
      else errorSetter('Invalid credentials')
    }).catch(console.error);
}

export default registerNewUser;
