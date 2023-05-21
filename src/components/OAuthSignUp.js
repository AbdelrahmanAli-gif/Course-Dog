import '../styles/LoginForm.css';
import Identity from "./Identity";
import { useRef, useState, useEffect, useContext } from "react";
import AuthContext from "../context/AuthProvider";
import axios from "../api/axios";
import Login from './Login';



function OAuthSignUp() {
    const OAUTH_URL = "http://127.0.0.1:8000/accounts/google/login/?process=login";
    // const SIGNUP_URL = 'auth/auth/users/';
    const [errorMsg, setErrorMsg] = useState("");
    const [signUp, setSignUp] = useState(true);
    const [errorColor, setErrorColor] = useState("");

    const handleLogIn = () => {
        setSignUp(false);
    }

    const handleOpenOAuthWindow = () => {
        window.open(OAUTH_URL, '_blank');
    }

    return (
        <>
            {
                    signUp ? (
                        <div className="mainContent">
                            <Identity />
                            <div className="formContainer">
                                <h1 className='formHeader'>Sign Up With Google</h1>
                                <p
                                    className={errorMsg ? "errorMsg" : "offscreen"}
                                    aria-live="assertive"
                                    style={{ backgroundColor: errorColor }}
                                >
                                </p>
                                <form className='formContent'>
                                    
                                    <input className='formSubmit' type="submit" value="Sign Up" onClick={handleOpenOAuthWindow}/>
                                </form>
                                <div className="line"></div>
                                <h6 className='haveAccount'>Already have an account?</h6>
                                <button className="signUp" onClick={handleLogIn}>Sign in</button>
                            </div>
                        </div>
                    ) : (
                    <>
                        <Login />
                    </>
                )
            }
        </>
    )
}

export default OAuthSignUp;