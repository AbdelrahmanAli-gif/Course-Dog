import { useEffect, useRef, useState } from "react";
import '../styles/ImportCourse.css';
import Image from '../assests/Untitled.png';
import { getAuthUser } from "../services/Storage";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

function ImportCourse() {

    const driveIdRef = useRef();
    const courseNameRef = useRef();
    const courseCodeRef = useRef();
    const [driveId, setDriveId] = useState('');
    const [courseName, setCourseName] = useState('');
    const [courseCode, setCourseCode] = useState('');
    const [source, setSource] = useState('');
    const [courses, setCourses] = useState([]);
    // const navigator = useNavigate();
    const errorRef = useRef();
    const [errorMsg, setErrorMsg] = useState("");
    const [errorColor, setErrorColor] = useState("");

    useEffect(() => {
    }, [errorColor])

    const handleErrorColor = (color) => {
        setErrorColor(color);
    }

    const LOAD_COURSES_URL = 'courses/load-courses/';
    const user = getAuthUser();
    const config = {
        headers: {
            'Authorization': `Token ${user}`
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (source === 'drive') {
            var myHeaders = new Headers();
            myHeaders.append("Authorization", `Token ${user}`);

            var formdata = new FormData();
            formdata.append("folder_id", driveId);
            formdata.append("code", courseCode);
            formdata.append("name", courseName);

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: formdata,
                redirect: 'follow'
            };

            await fetch("http://127.0.0.1:8000/courses/load-drive/", requestOptions)
                .then(async (response) => { // to resolve the promise

                    const res = await response.json(); // to get the data
                    console.log(res);
                    console.log(res['message']); // to get the message

                    console.log(response.ok); // to get the status in boolean

                    if (response.ok) {
                        handleErrorColor('#5E5E5E');
                        setErrorMsg(res['message']);
                    } else {
                        handleErrorColor('#FF3333');
                        setErrorMsg(res['message']);
                    }
                })
                .catch(error => console.log('error', error));

        }
        else {
            var myHeaders = new Headers();
            myHeaders.append("Authorization", `Token ${user}`);

            var formdata = new FormData();
            formdata.append("name", courseName);
            formdata.append("code", courseCode);
            formdata.append("classroom_id", driveId);

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: formdata,
                redirect: 'follow'
            };

            await fetch("http://127.0.0.1:8000/courses/load-classroom/", requestOptions)
                .then(async (response) => { // to resolve the promise

                    const res = await response.json(); // to get the data
                    console.log(res);
                    console.log(res['message']); // to get the message

                    console.log(response.ok); // to get the status in boolean

                    if (response.ok) {
                        handleErrorColor('#5E5E5E');
                        setErrorMsg(res['message']);
                    } else {
                        handleErrorColor('#FF3333');
                        setErrorMsg(res['message']);
                    }
                })
                .catch(error => console.log('error', error));
        }
    }

    const getCourses = async () => {
        const response = await axios.get(
            LOAD_COURSES_URL,
            config
        );
        setCourses(response.data['Courses']['courses']);
    }

    useEffect(() => {
        getCourses();
    }, []);

    const handleSource = (e) => {
        setSource(e.target.value);
    }

    return (
        <div className="import-container">
            <h1 className="page-header">Import Course</h1>
            <form className="import-form" onSubmit={handleSubmit}>
                <p
                    ref={errorRef}
                    className={errorMsg ? "errorMsg" : "offscreen"}
                    aria-live="assertive"
                    style={{ backgroundColor: errorColor }}
                >
                    {errorMsg}
                </p>
                <div className="form-source-container">
                    <label className="form-label" htmlFor="source">Import from</label>
                    <select className="form-select" id="source" onChange={handleSource}>
                        <option className="form-option" value='' hidden></option>
                        <option className="form-option" value='drive'>Drive</option>
                        <option className="form-option" value='classroom'>Classroom</option>
                    </select>
                </div>
                {
                    source === '' ? null :
                        (
                            <>
                                <div className="drive-id-container">
                                    {source === 'drive' ? <img className="id-image" src={Image} /> : null}
                                    <label className="form-label" htmlFor="drive-id">{source === 'drive' ? 'Drive ID' : 'Classroom ID'}</label>
                                    {source === 'drive' ?
                                        (
                                            <input
                                                className="form-input"
                                                id="drive-id"
                                                required
                                                type="text"
                                                ref={driveIdRef}
                                                onChange={(e) => setDriveId(e.target.value)}
                                            />
                                        ) :
                                        (
                                            <select
                                                className="form-select"
                                                id="drive-id"
                                                required
                                                ref={driveIdRef}
                                                onChange={(e) => setDriveId(e.target.value)}
                                            >
                                                <option className="form-option" value='' hidden></option>
                                                {
                                                    courses.map((value) => {
                                                        return (
                                                            <option key={value.id} value={value.id}>{value.name}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        )
                                    }
                                </div>
                                <div className="course-name-container">
                                    <label className="form-label" htmlFor="course-name">Course Name</label>
                                    <input
                                        className="form-input"
                                        id="course-name"
                                        required
                                        type="text"
                                        ref={courseNameRef}
                                        onChange={(e) => setCourseName(e.target.value)}
                                    />
                                </div>
                                <div className="course-code-container">
                                    <label className="form-label" htmlFor="course-code">Course Code</label>
                                    <input
                                        className="form-input"
                                        id="course-code"
                                        required
                                        type="text"
                                        ref={courseCodeRef}
                                        onChange={(e) => setCourseCode(e.target.value)}
                                    />
                                </div>
                                <input type="submit" className="submit-btn" value='Import Course' />
                            </>
                        )
                }

            </form>
        </div>
    )
}

export default ImportCourse;