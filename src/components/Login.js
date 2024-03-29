import "../styles/LoginForm.css";
import Identity from "./Identity";
import { useRef, useState, useEffect, useContext } from "react";
import AuthContext from "../context/AuthProvider";
import axios from "../api/axios";
import { Link, useNavigate } from "react-router-dom";
import { setAuthGroup, setAuthOrg, setAuthUser } from "../services/Storage";


function Login() {
    const LOGIN_URL = "auth/auth/token/login/"; // Backend Auth URL
    const LOAD_COURSES_URL = 'courses/load-courses/';
    const GET_USER_INFO = 'auth/user-info/';

    const navigate = useNavigate();

    // const { setAuth } = useContext(AuthContext);
    const userRef = useRef();
    const errorRef = useRef();

    const [user, setUser] = useState("");
    const [pwd, setPwd] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [errorColor, setErrorColor] = useState("");

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        // setErrorMsg('');
    }, [user, pwd])

    useEffect(() => {
    }, [errorColor])

    const handleErrorColor = (color) => {
        setErrorColor(color);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                LOGIN_URL,
                {
                    email: user,
                    password: pwd,
                }
            );
            const accessToken = response?.data?.auth_token;
            const config = {
                headers: { 
                    'Authorization': `Token ${accessToken}`
                }
            };

            const info = await axios.get(
                GET_USER_INFO,
                config
            );

            const group = info.data['groups'][0];
            const org = info.data['organization'];
            setAuthUser(accessToken);
            setAuthGroup(group);
            setAuthOrg(org);

            if (group === 'OrganizationAdmin'){
                navigate('/courses');
            } else {
                await axios.get(
                    LOAD_COURSES_URL,
                    config
                );
                navigate('/my-courses');
            }
            // setAuth({ user, pwd });
            
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
            <div className="mainContent">
                <Identity />
                <div className="formContainer">
                    <p
                        ref={errorRef}
                        className={errorMsg ? "errorMsg" : "offscreen"}
                        aria-live="assertive"
                        style={{ backgroundColor: errorColor }}
                    >
                        {errorMsg}
                    </p>
                    <h1 className="formHeader">Sign in</h1>
                    <form className="formContent" onSubmit={handleSubmit}>
                        <label className="formLabel" htmlFor="username">
                            Email
                        </label>
                        <input
                            className="formInput"
                            placeholder="Enter your email"
                            type="email"
                            id="username"
                            ref={userRef}
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
                        <Link to={'/forgot-password'} className="forgotPassword">Forgot Password?</Link>
                    </form>
                    <div className="line"></div>
                    <Link to={'/sign-up'} className="signUp">Sign Up</Link>
                </div>
            </div>
        </>
    );
}

export default Login;