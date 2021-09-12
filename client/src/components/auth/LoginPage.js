import { useState, useEffect } from "react";
import './LoginPage.css'
import Sawo from "sawo";
import  { Redirect } from 'react-router-dom'
require('dotenv').config()
const SAWO_API_KEY = process.env.REACT_APP_SAWO_API_KEY;

const LoginPage = ()=>{
  const [isUserLoggedIn, setUserLoggedIn] = useState(false);
  useEffect(() => {
      var config = {
        containerID: "sawo-container",
        identifierType: "email",
        apiKey: SAWO_API_KEY,
        onSuccess: (payload) => {
          setUserLoggedIn(true);
          localStorage.setItem("user",JSON.stringify(payload))
          window.location.reload();
        },
      };
      let sawo = new Sawo(config);
      sawo.showForm();
    }, []);
    return (
      <div className="containerStyle">
          {!isUserLoggedIn ? (
            <div className="formContainer" id="sawo-container"></div>
          ) : (
            <Redirect to = '/'/>
          )}
      </div>
    );
};

export default LoginPage;