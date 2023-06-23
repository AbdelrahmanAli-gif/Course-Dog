import { Link } from "react-router-dom";
import { getAuthUser } from "../services/Storage";
import axios from "../api/axios";
import '../styles/DashboardCard.css';
import '../styles/CourseDetails.css';

function CourseDetails(props) {

    const DELETE_COURSE = 'organization/manage-organization-courses/';
    const user = getAuthUser();
    const config = {
        headers: {
            'Authorization': `Token ${user}`
        },
        data: {
            course_code: props.courseCode
        }
    };

    const deleteCourse = async () => {
        try {
            await axios.delete(
                DELETE_COURSE,
                config
            );
            window.location.reload(true);
        }
        catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="dashboard-card-container course-details-container">
            <Link to={`/courses/${props.courseCode}`}>
                {props.courseName} - {props.courseCode}
            </Link>
            <button onClick={deleteCourse} className="dashboard-btn">Delete Course</button>
        </div>
    )
}

export default CourseDetails;