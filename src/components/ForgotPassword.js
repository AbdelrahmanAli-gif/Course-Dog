import "../styles/LoginForm.css";
import Identity from "./Identity";
import { useRef, useState, useEffect, useContext } from "react";
import AuthContext from "../context/AuthProvider";
import axios from "../api/axios";
import SignUp from "./SignUp";

function ForgotPassword() {
    const FORGOT_PASSWORD_URL = 'auth/auth/users/reset_password/' // Backend Auth URL

    const { setAuth } = useContext(AuthContext);
    const emailRef = useRef();
    const errorRef = useRef();

    const [email, setEmail] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [forgotPassword, setForgotPassword] = useState(true);
    const [errorColor, setErrorColor] = useState("");

    useEffect(() =>{
    }, [errorColor])

    useEffect(() => {
        emailRef.current.focus();
    }, [])

    useEffect(() => {
        // setErrorMsg('');
    }, [email])

    const handleErrorColor = (color) => {
        setErrorColor(color);
    }

    const handleSignUp = () => {
        setForgotPassword(false);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post(
                FORGOT_PASSWORD_URL, {
                    email: email
                }
            );
            setEmail('');
            setAuth({ email });
            setErrorMsg('A mail has been sent to your email to reset your password.');
            handleErrorColor('#4BB543');
        } catch (err) {
            setErrorMsg('Failed');
            handleErrorColor('#FF3333')
            errorRef.current.focus();
            setEmail('');
        }
    }

    return (
        <>
            {
                forgotPassword ? (
                    <div className="mainContent">
                        <Identity />
                        <div className="formContainer">
                            <p
                                ref={errorRef}
                                className={errorMsg ? "errorMsg" : "offscreen"}
                                aria-live="assertive"
                                style={{backgroundColor: errorColor}}
                            >
                                {errorMsg}
                            </p>
                            <h1 className="formHeader">Forgot Password</h1>
                            <form className="formContent" onSubmit={handleSubmit}>
                                <label className="formLabel" htmlFor="email">
                                    Email
                                </label>
                                <input
                                    className="formInput"
                                    placeholder="Enter your email"
                                    type="email"
                                    id="email"
                                    ref={emailRef}
                                    autoComplete="off"
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                    required
                                />
                                <input className="formSubmit" type="submit" value="Send Reset Email" />
                            </form>
                            <div className="line"></div>
                            <h6 className='haveAccount'>Don't have an account?</h6>
                            <button className="signUp" onClick={handleSignUp}>Sign up</button>
                        </div>
                    </div>
                ) : (
                    <>
                        <SignUp />
                    </>
                )
            }
        </>
    )
}

export default ForgotPassword;