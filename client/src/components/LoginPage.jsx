import { useState } from "react";
import NotificationMessage from './NotificationMessage';
import UserForm from './UserForm';
import '../styles/loginPage.css';
import { Link } from "react-router-dom";
import { login } from "../connections/loginService";

const LoginPage = ({ setUser, notification, setNotification, isError, setIsError}) => {
   
    const sendLoginRequest = async (username, password) => {
        try {
          const response = await login(username, password);
          if (response.authToken) {
            setUser(response.user);
            localStorage.setItem('user', JSON.stringify(response));
            console.log("server response is: ", response)
          } else {
            setNotification(response.error);
            setIsError(true);
            setTimeout(() => {
              setNotification("");
              setIsError(false);
            }, 3000);
          }
        } catch (error) {
          console.error(error.message);
        }
      }
    

    return (
        <>
        {notification ? <NotificationMessage notification={notification} isError={isError} /> : <></>}
        <UserForm requestHandler={sendLoginRequest} formAction="Log In"/>
        <Link to="/register"> New User? Register Here! </Link>
        </>
    )
}

export default LoginPage;