import axios from "axios";
import { setAuthToken } from "../helpers/setAuthToken";

const login = async (f, x) => {
  f.preventDefault();
  try {
   
    const serverResponse = await axios.post(
      "http://localhost:5000/api/client/signin",
      x
    );
    //get token and user from response
    const token = await serverResponse.data.token;
    const user = await serverResponse.data.user;

    //set JWT token and user to local
    localStorage.setItem("token", token);

    //set token to axios common header
    setAuthToken(token);

    if (user.firstName) {
      return user;
    } else {
      alert("Password or email is incorrect.");
    }
    //return serverResponse
  } catch (error) {
    alert(`An error occurred: ${error}`);
  }
};

export default login;
