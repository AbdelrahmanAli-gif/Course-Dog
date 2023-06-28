import CourseNavbar from "./CourseNavbar";
import '../styles/CoursePage.css';
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import MaterialCard from "./MaterialCard";
import { getCourseAnnouncements, getCourseMaterials, getSubCourseAnnouncements, getSubCourseMaterials } from "../services/CourseData";
import AnnouncementCard from "./AnnouncementCard";

function CourseDataPage(props) {
    const { id, subId } = useParams();
    const [data, setData] = useState([]);
    const [courseName, setCourseName] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const [error, setError] = useState({});

    const getData = async (id, subId) => {
        let courseData;
        if (props.caller === 'course') {
            if (props.data === 'materials') {
                courseData = await getCourseMaterials(id);
            } else {
                courseData = await getCourseAnnouncements(id);
            }
        } else {
            if (props.data === 'materials') {
                courseData = await getSubCourseMaterials(id, subId);
            } else {
                courseData = await getSubCourseAnnouncements(id, subId);
            }
        }
        setData(courseData.data);
        setCourseName(courseData.name);
        setIsAdmin(courseData.admin);
        setError(courseData.error);
    }

    useEffect(() => {
        getData(id, subId);
    }, [props.caller, props.data]);

    return (
        <>
            {
                !error.errorState ? (
                    <div className="container">
                        <div className="content">
                            <div className="course-header">
                                <h1 className="page-title">{courseName.toUpperCase()}</h1>
                                <div className="course-header-btns">
                                    {
                                        props.caller === 'course' ? (
                                            <>
                                                <Link to={`/my-courses/${id}/sub-courses`} className="post-btn">Sub Courses</Link>
                                                <Link to={props.data === 'materials' ? `/my-courses/${id}/materials/add` : `/my-courses/${id}/announcements/add`} className="post-btn" style={isAdmin ? { display: 'block' } : { display: 'none' }}>{props.data === 'materials' ? 'Add Material' : 'Add Announcement'}</Link>
                                            </>
                                        ) : null
                                    }
                                </div>
                            </div>
                            <CourseNavbar caller={props.caller} data={props.data} />
                            <div className="materials-container">
                                {
                                    props.data === 'materials' ? (
                                        data.map((value) => {
                                            return (
                                                <MaterialCard key={value.id}
                                                    fileName={value.file_name}
                                                    fileLink={value.file}
                                                    id={value.id}
                                                    admin={isAdmin}
                                                    creationDate={value.creation_date}
                                                    title={value.title}
                                                />
                                            );
                                        })
                                    ) : (
                                        data.map((value) => {
                                            return (
                                                <AnnouncementCard key={value.id}
                                                    announcement={value.content}
                                                    id={value.id}
                                                    title={value.title}
                                                    admin={isAdmin}
                                                    creationDate={value.creation_date}
                                                />
                                            );
                                        })
                                    )
                                }
                            </div>
                        </div>
                    </div>
                ) : <h1>{error.errorMsg}</h1>
            }
        </>
    )
}

export default CourseDataPage;