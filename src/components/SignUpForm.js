import '../styles/LoginForm.css';
// import '../styles/SignUpPage.css';
import Identity from "./Identity";
import { useRef, useState, useEffect, useContext } from "react";
import AuthContext from "../context/AuthProvider";
import axios from "../api/axios";

const SIGNUP_URL = 'auth/auth/users/';

function SignUpForm() {
    const { setAuth } = useContext(AuthContext);
    const userRef = useRef();
    const emailRef = useRef();
    const errorRef = useRef();

    const [user, setUser] = useState('');
    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        // setErrorMsg('');
    }, [user, email, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                SIGNUP_URL,
                {
                    username: user,
                    email: email,
                    password: pwd
                }
            );
            const responseEmail = response?.data?.email;
            const responseUser = response?.data?.username;
            console.log(responseEmail, " ", responseUser);
            setEmail("");
            setUser("");
            setPwd("");
            setAuth({ user, email, pwd });
            setSuccess(true);
            setErrorMsg('Success');
        } catch (err) {
            setErrorMsg("Failed");
            errorRef.current.focus();
            setUser('');
            setPwd('');
            setEmail('');
        }
    }

    return (

        <div className="mainContent">
            <Identity />
            <div className="formContainer">
                <h1 className='formHeader'>Sign Up</h1>
                <p
                    ref={errorRef}
                    className={errorMsg ? "errorMsg" : "offscreen"}
                    aria-live="assertive"
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
            </div>
        </div>
    )
}

export default SignUpForm;