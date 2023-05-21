import "../styles/LoginForm.css";
import Identity from "./Identity";
import { useRef, useState, useEffect, useContext } from "react";
import AuthContext from "../context/AuthProvider";
import axios from "../api/axios";
import OAuthSignUp from "./OAuthSignUp";
import ForgotPassword from "./ForgotPassword";


function Login() {
    const LOGIN_URL = "auth/auth/token/login/"; // Backend Auth URL

    const { setAuth } = useContext(AuthContext);
    const userRef = useRef();
    const errorRef = useRef();

    const [user, setUser] = useState("");
    const [pwd, setPwd] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [success, setSuccess] = useState(false);
    const [logIn, setLogIn] = useState(true);
    const [signUp, setSignUp] = useState(false);
    const [errorColor, setErrorColor] = useState("");

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        // setErrorMsg('');
    }, [user, pwd])

    useEffect(() =>{
    }, [errorColor])

    const handleErrorColor = (color) => {
        setErrorColor(color);
    }

    const handleSignUp = () => {
        setSignUp(true);
        setLogIn(false);
    }

    const handleForgotPassword = () => {
        setLogIn(false);
        setSignUp(false);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                LOGIN_URL,
                {
                    username: user,
                    password: pwd,
                }
            );
            const accessToken = response?.data?.auth_token;
            localStorage.setItem('authToken', accessToken)
            setAuth({ user, pwd });
            setUser("");
            setPwd("");
            setSuccess(true);
        } catch (err) {
            if (!err?.response) {
                setErrorMsg("No Server Response");
            } else if (err.response?.status === 400) {
                setErrorMsg("Wrong Email or Password");
            } else if (err.response?.status === 401) {
                setErrorMsg("Unauthorized");
            } else {
                setErrorMsg("Login Failed");
            }
            handleErrorColor('#FF3333');
            errorRef.current.focus();
            setUser('');
            setPwd('');
        }
    };

    return (
        <>
            {success ? (
                <div>
                    <h1>Homepage</h1>
                </div>
            ) : logIn ? (
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
                        <h1 className="formHeader">Sign in</h1>
                        <form className="formContent" onSubmit={handleSubmit}>
                            <label className="formLabel" htmlFor="username">
                                Username
                            </label>
                            <input
                                className="formInput"
                                placeholder="Enter your username"
                                type="text"
                                id="username"
                                ref={userRef}
                                autoComplete="off"
                                onChange={(e) => setUser(e.target.value)}
                                value={user}
                                required
                            />
                            <label className="formLabel" htmlFor="password">
                                Password
                            </label>
                            <input
                                className="formInput"
                                type="password"
                                placeholder="Enter your password"
                                id="password"
                                onChange={(e) => setPwd(e.target.value)}
                                value={pwd}
                                required
                            />
                            <input className="formSubmit" type="submit" value="Login" />
                            <button className="forgotPassword" onClick={handleForgotPassword}>Forgot password?</button>
                        </form>
                        <div className="line"></div>
                        <button className="signUp" onClick={handleSignUp}>Sign Up</button>
                    </div>
                </div>
            ) : signUp ? (
                <>
                    <OAuthSignUp />
                </>
            ) : (
                <>
                    <ForgotPassword />
                </>
            )}
        </>
    );
}

export default Login;