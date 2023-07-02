import { useRef, useState, useEffect } from "react";
import { getAuthUser } from "../services/Storage";
import '../styles/DashboardAdd.css';

function AddCourse() {

    const nameRef = useRef();
    const [name, setName] = useState('');
    const codeRef = useRef();
    const [code, setCode] = useState('');
    const descriptionRef = useRef();
    const [description, setDescription] = useState('');
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
        formdata.append("name", name);
        formdata.append("code", code);
        formdata.append("description", description);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        await fetch(`${baseURL}organization/manage-organization-courses/`, requestOptions)
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

    return (
        <div className="dashboard-form-container">
            <form onSubmit={handleSubmit} className="dashboard-form">
                <h1 className="form-title">Add Course</h1>
                <p
                    ref={errorRef}
                    className={errorMsg ? "error-msg" : "offscreen"}
                    aria-live="assertive"
                    style={{ backgroundColor: errorColor }}
                >
                    {errorMsg}
                </p>
                <div className="dashboard-input-label-container">
                    <label className="dashboard-form-label" htmlFor="name">Course Name</label>
                    <input
                        className="dashboard-form-input"
                        required
                        type="text"
                        id="name"
                        placeholder="Enter Course Name"
                        ref={nameRef}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="dashboard-input-label-container">
                    <label className="dashboard-form-label" htmlFor="code">Course Code</label>
                    <input
                        className="dashboard-form-input"
                        required
                        type="text"
                        id="code"
                        placeholder="Enter Course Code"
                        ref={codeRef}
                        onChange={(e) => setCode(e.target.value)}
                    />
                </div>
                <div className="dashboard-input-label-container">
                    <label className="dashboard-form-label" htmlFor="description">Course Description</label>
                    <input
                        className="dashboard-form-input"
                        required
                        type="text"
                        id="description"
                        placeholder="Enter Course Description"
                        ref={descriptionRef}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <input type="submit" value='Add Course' className="dashboard-btn dashboard-submit"/>
            </form>
        </div>
    )
}

export default AddCourse;