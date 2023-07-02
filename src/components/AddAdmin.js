import { useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getAuthUser } from "../services/Storage";
import '../styles/DashboardAdd.css';
import { baseURL } from "../api/axios";

function AddCourseAdmin(props) {

    const emailRef = useRef();
    const [email, setEmail] = useState('');
    const { id } = useParams();
    const user = getAuthUser();
    const errorRef = useRef();
    const [errorMsg, setErrorMsg] = useState("");
    const [errorColor, setErrorColor] = useState("");
    useEffect(() => {
    }, [errorColor])

    const handleErrorColor = (color) => {
        setErrorColor(color);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Token ${user}`);

        var formdata = new FormData();
        formdata.append("email", email);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        if (props.caller === 'course') {
            await fetch(`${baseURL}organization/manage-course-admins/${id}/`, requestOptions)
                .then(async (response) => { // to resolve the promise

                    const res = await response.json(); // to get the data
                    console.log(res);
                    console.log(res['message']); // to get the message

                    console.log(response.ok); // to get the status in boolean

                    if (response.ok) {
                        handleErrorColor('#4BB543');
                        setErrorMsg(res['message']);
                    } else {
                        handleErrorColor('#FF3333');
                        setErrorMsg(res['message']);
                    }
                })
                .catch(error => console.log('error', error));
        }
        else {
            await fetch(`${baseURL}organization/organization-admins/`, requestOptions)
                .then(async (response) => { // to resolve the promise

                    const res = await response.json(); // to get the data
                    console.log(res);
                    console.log(res['message']); // to get the message

                    console.log(response.ok); // to get the status in boolean

                    if (response.ok) {
                        handleErrorColor('#4BB543');
                        setErrorMsg(res['message']);
                    } else {
                        handleErrorColor('#FF3333');
                        setErrorMsg(res['message']);
                    }
                })
                .catch(error => console.log('error', error));
        }
    }

    return (
        <div className="dashboard-form-container">
            <form onSubmit={handleSubmit} className="dashboard-form">
                <h1 className="form-title">Add Admin</h1>
                <p
                    ref={errorRef}
                    className={errorMsg ? "error-msg" : "offscreen"}
                    aria-live="assertive"
                    style={{ backgroundColor: errorColor }}
                >
                    {errorMsg}
                </p>
                <div className="dashboard-input-label-container">
                    <label className="dashboard-form-label" htmlFor="email">Email</label>
                    <input
                        className="dashboard-form-input"
                        required
                        type="email"
                        id="email"
                        placeholder="Enter Email"
                        ref={emailRef}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <input type="submit" value='Add Admin' className="dashboard-btn dashboard-submit" />
            </form>
        </div>
    )
}

export default AddCourseAdmin;