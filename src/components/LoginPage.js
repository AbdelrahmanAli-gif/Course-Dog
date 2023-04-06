import Identity from "./Identity";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import '../styles/LoginPage.css'

let login = true;
let signUp = false;
let forgetPassword = false;

function LoginPage(){
    return (
        <>
            {
                login ? <LoginForm /> : signUp ? <SignUpForm /> : <h1>Forget Password</h1>
            }
        </>
    )
}

export default LoginPage;