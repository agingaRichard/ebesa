import * as React from "react";
import axios from "axios";
//import { setAuthToken } from "../helpers/setAuthToken";

const register = async (f, x) => {
  f.preventDefault();
  try {
    const regResponse = await axios.post(
      "http://localhost:5000/api/client/signup",
      x
    );
    //get token, user from response
    const token = await regResponse.data.token;
    const user = await regResponse.data.user;
    //set JWT token and user to local
    localStorage.setItem("token", token);

    //set token to axios common header
    //setAuthToken(token);
    await alert("Signed up successfully.");

    return user;
  } catch (err) {
    alert(`An error occurred: ${err}`);
  }
};

export default register;
