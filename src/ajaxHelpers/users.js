const APIURL = "http://localhost:8080"

const registerNewUser = (username, password, email, setLoginOut, navigator, errorSetter) =>{
  fetch(`${APIURL}/api/users/register`,{
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

export const userLogin = async(username, password, setLoginOut, navigator,errorSetter) =>{
  fetch(`${APIURL}/api/users`,{

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
      console.log("result",result)
      if(result.success){
        window.localStorage.setItem('token', result.token);
        window.localStorage.setItem('username', username);
        setLoginOut('Logout')
        navigator('/')
      }
      else errorSetter('Invalid credentials')
    }).catch(console.error);
}

export const getUser = async (token) => {
  try {
    const response =await fetch (`${APIURL}/api/users/myaccount`, {
     method : "GET",
     headers : {
      "Content-type" : "application/json",
      "Authorization" : `Bearer ${token}`
     } 
    })
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}
export default registerNewUser;
