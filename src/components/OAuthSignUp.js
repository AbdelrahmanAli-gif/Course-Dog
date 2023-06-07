import '../styles/LoginForm.css';
import Identity from "./Identity";
import { useState } from "react";
import { Link } from 'react-router-dom';



function OAuthSignUp() {
    const OAUTH_URL = "http://127.0.0.1:8000/accounts/google/login/?process=login";
    // const SIGNUP_URL = 'auth/auth/users/';
    const [errorMsg, setErrorMsg] = useState("");
    const [errorColor, setErrorColor] = useState("");

    const handleOpenOAuthWindow = () => {
        window.open(OAUTH_URL, '_blank');
    }

    return (
        <>
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
                    <Link to={'/'} className='signUp'>Sign in</Link>
                </div>
            </div>
        </>
    )
}

export default OAuthSignUp;