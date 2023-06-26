import CourseNavbar from "./CourseNavbar";
import '../styles/CoursePage.css';
import { useParams, Link } from "react-router-dom";
import axios from '../api/axios';
import { getAuthUser } from '../services/Storage';
import { useState, useEffect } from 'react';
import AnnoundementCard from "./AnnouncementCard";

function SubCourseAnnouncements() {
    const { id, subId } = useParams();
    const [materials, setMaterials] = useState([]);
    const [courseName, setCourseName] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const [error, setError] = useState({});
    const user = getAuthUser();
    const GET_COURSE_ANNOUNCEMENTS = `announcements/sub-courses/${id}/${subId}/`;

    useEffect(() => {
        getAnnouncements();
    }, [])

    const config = {
        headers: {
            'Authorization': `Token ${user}`
        }
    };

    const getAnnouncements = async () => {

        try {
            const response = await axios.get(
                GET_COURSE_ANNOUNCEMENTS,
                config
            )
            setCourseName(response.data['course']['name'])
            setMaterials(response.data['announcements']);
            // setIsAdmin(response.data['is_course_admin']);
            setError({
                errorState: false,
                errorMsg: ""
            })
        }
        catch (err) {
            setError({
                errorState: true,
                errorMsg: err.message
            })
        };
    }

    return (
        <>
            {
                !error.errorState ? (
                    <div className="container">
                        <div className="content">
                            <div className="course-header">
                                <h1 className="page-title">{courseName.toUpperCase()}</h1>
                            </div>
                            <CourseNavbar activeMaterials={false} caller='subcourse' />
                            <div className="materials-container">
                                {
                                    materials.map((value) => {
                                        return (
                                            <AnnoundementCard key={value.id}
                                                announcement={value.content}
                                                id={value.id}
                                                title={value.title}
                                                admin={isAdmin}
                                                creationDate={value.creation_date}
                                            />
                                        );
                                    })
                                }
                            </div>
                        </div>
                    </div>
                ) : <h1>{error.errorMsg}</h1>
            }
        </>
    )
}

export default SubCourseAnnouncements;