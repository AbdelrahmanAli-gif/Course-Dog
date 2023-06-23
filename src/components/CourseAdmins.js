import AdminDetails from "./AdminDetails";
import axios from "../api/axios";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getAuthUser } from "../services/Storage";

function CourseAdmins() {

    const { id } = useParams();
    const GET_COURSE_ADMINS = `organization/manage-course-admins/${id}/`;
    const user = getAuthUser();
    const config = {
        headers: {
            'Authorization': `Token ${user}`
        }
    };

    const [admins, setAdmins] = useState([]);
    useEffect(() => {
        getAdmins();
    }, []);

    const getAdmins = async () => {
        try {
            const response = await axios.get(
                GET_COURSE_ADMINS,
                config
            );
            setAdmins(response.data);
        }
        catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="dashboard-container">
            <div className="dashboard-heading">
                <h1 className="dashboard-title">{id} Admins</h1>
                <Link to={`/courses/${id}/add-course-admin`}>
                    <button className="dashboard-btn">Add Admin</button>
                </Link>
            </div>
            <div className="results-container">
                {
                    admins.map((value) => {
                        return (
                            <div key={value.id}>
                                <AdminDetails
                                    userName={value.username}
                                    email={value.email}
                                    caller='course'
                                />
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default CourseAdmins;