import '../styles/LoginForm.css';
import Identity from "./Identity";
import { useRef, useState, useEffect, useContext } from "react";
import AuthContext from "../context/AuthProvider";
import axios from "../api/axios";
import Login from './Login';


function SignUp() {
    const SIGNUP_URL = 'auth/auth/users/';

    const { setAuth } = useContext(AuthContext);
    const userRef = useRef();
    const emailRef = useRef();
    const errorRef = useRef();

    const [user, setUser] = useState('');
    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [signUp, setSignUp] = useState(true);
    const [errorColor, setErrorColor] = useState("");

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        // setErrorMsg('');
    }, [user, email, pwd])

    useEffect(() =>{
    }, [errorColor])

    const handleErrorColor = (color) => {
        setErrorColor(color);
    }

    const handleLogIn = () => {
        setSignUp(false);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post(
                SIGNUP_URL,
                {
                    username: user,
                    email: email,
                    password: pwd
                }
            );
            setEmail("");
            setUser("");
            setPwd("");
            setAuth({ user, email, pwd });
            setErrorMsg('Sign up successful. A verification mail has been sent to your email, please verify your email.');
            handleErrorColor('#4BB543');
        } catch (err) {
            if (err.response?.status === 400){
                // setErrorMsg('A user with that username already exists.');
                const error = Object.values(err.response.data);
                setErrorMsg(error);
            } else {
                setErrorMsg("Failed");
            }
            errorRef.current.focus();
            handleErrorColor('#FF3333');
            // setUser('');
            setPwd('');
            // setEmail('');
        }
    }

    return (
        <>
            {
                signUp ? (
                    <div className="mainContent">
                        <Identity />
                        <div className="formContainer">
                            <h1 className='formHeader'>Sign Up</h1>
                            <p
                                ref={errorRef}
                                className={errorMsg ? "errorMsg" : "offscreen"}
                                aria-live="assertive"
                                style={{backgroundColor: errorColor}}
                            >
                                {errorMsg}
                            </p>
                            <form className='formContent' onSubmit={handleSubmit}>
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
                                <input className='formSubmit' type="submit" value="Sign Up" />
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

export default SignUp;