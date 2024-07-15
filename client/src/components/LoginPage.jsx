import NotificationMessage from './NotificationMessage';
import UserForm from './UserForm';
import '../styles/loginPage.css';
import { Link, useNavigate } from "react-router-dom";
import { login } from "../connections/loginService";

const LoginPage = ({setUser, setToken, notification, setNotification, isError, setIsError}) => {
    const navigate = useNavigate();
    const sendLoginRequest = async (username, password) => {
        try {
          const response = await login(username, password);
          console.log('before doing anything else, after sending login request response is: ', response);
          if (response.authToken) {
            setUser(response.user);
            setToken(response.authToken);
            localStorage.setItem('user', JSON.stringify(response));
            navigate("/");
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
          setNotification("Server Error, please try again later");
          setIsError(true);
          setTimeout(() => {
            setNotification("");
            setIsError(false);
          }, 5000);
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