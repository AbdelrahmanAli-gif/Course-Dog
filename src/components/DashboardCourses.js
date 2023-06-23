import { useEffect, useState } from "react";
import { getAuthUser } from "../services/Storage";
import axios from "../api/axios";
import CourseDetails from "./CourseDetails";
import { Link } from "react-router-dom";

function DashboardCourses() {
    const ORGANIZATION_COURSES = 'organization/manage-organization-courses/';
    const user = getAuthUser();
    const config = {
        headers: {
            'Authorization': `Token ${user}`
        }
    };

    const [courses, setCourses] = useState([]);
    useEffect(() => {
        getCourses();
    }, []);

    const getCourses = async () => {
        try {
            const response = await axios.get(
                ORGANIZATION_COURSES,
                config
            );
            setCourses(response.data);
        }
        catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="dashboard-container">
            <div className="dashboard-heading">
                <h1 className="dashboard-title">Courses</h1>
                <Link to={`/courses/add-course`}>
                    <button className="dashboard-btn">Add Course</button>
                </Link>
            </div>
            <div className="results-container">
                {
                    courses.map((value) => {
                        return (
                            <CourseDetails key={value.id}
                                courseName={value.name}
                                courseCode={value.code}
                            />
                        )
                    })
                }
            </div>
        </div>
    )
}

export default DashboardCourses;