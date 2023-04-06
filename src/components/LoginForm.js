import "../styles/LoginForm.css";
import Identity from "./Identity";
import { useRef, useState, useEffect, useContext } from "react";
import AuthContext from "../context/AuthProvider";
import axios from "../api/axios";
// import { Router, Routes, Route, Link } from "react-router-dom";
// import SignUpForm from './SignUpForm';


function LoginForm() {
    const LOGIN_URL = "auth/auth/token/login/"; // Backend Auth URL

    const { setAuth } = useContext(AuthContext);
    const userRef = useRef();
    const errorRef = useRef();

    const [user, setUser] = useState("");
    const [pwd, setPwd] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        // setErrorMsg('');
    }, [user, pwd])

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
            console.log(accessToken);
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
            ) : (
                <div className="mainContent">
                    <Identity />
                    <div className="formContainer">
                        <p
                            ref={errorRef}
                            className={errorMsg ? "errorMsg" : "offscreen"}
                            aria-live="assertive"
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
                            <h5 className="forgotPassword">Forgot password?</h5>
                            {/* <Link to="/forget-password" className="forgetPassword">Forgot password?</Link> */}
                        </form>
                        <div className="line"></div>
                        <button className="signUp">Sign Up</button>
                        {/* <Link to="/signup" className="signUp">Sign Up</Link> */}
                    </div>
                    {/* <Routes> 
                        <Route path="/signup" element={<SignUpForm />}></Route>
                    </Routes>  */}
                </div>
            )}
        </>
    );
}

export default LoginForm;