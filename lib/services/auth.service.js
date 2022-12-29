import axios from 'axios';
import { setAuthToken } from "../helpers/setAuthToken"

class AuthService {
  // login logout signup getcurentuser
  const login = async (f, x) => {
  f.preventDefault();
try{
  await alert("Sending login request...")
  const serverResponse = await axios.post('http://localhost:5000/api/client/signin', x);
//get token and user from response
const token = await serverResponse.data.token;
const user = await serverResponse.data.user;

//set JWT token to local
localStorage.setItem('token', token);
//set token to axios common header
setAuthToken(token);
//redirect user to home page
if(user.id){window.location.href = '/'} else {alert ('Login failed.')}
  return serverResponse
} catch (error) {alert(`An error occurred: ${error}`)}
}

  const logout = () => {
    localStorage.removeItem("user");
  }
  
  const register = async (f, x) => {
  f.preventDefault();
try{
  alert('Now submitting form.')
  const regResponse = await axios.post('http://localhost:5000/api/client/signup', x);
//get token from response
const token = await regResponse.data.token;
//set JWT token to local
localStorage.setItem('token', token);
//set token to axios common header
setAuthToken(token);
//redirect user to home page
if(token){window.location.href = '/'} else {alert ('Registration failed.')}

  return regResponse
} catch(err){alert(`An error occurred: ${err}`)}
}

  const getCurrentUser () => {
    return JSON.parse(localStorage.getItem('user'));;
  }
}

export default new AuthService();