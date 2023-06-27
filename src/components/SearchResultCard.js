import MaterialSearchResultCard from "./MaterialSearchResultCard";
import { Link } from 'react-router-dom';
import AnnouncementSearchResultCard from "./AnnouncementSearchResultCard";
import { useState, useEffect } from "react";
import axios from '../api/axios';
import { getAuthUser } from '../services/Storage';
import { CourseDog } from "../images/Images";

export function SearchResultCard(props) {

    const ADMIN_URL = `courses/course-admins/${props.course.code}/`;
    const [courseAdmins, setCourseAdmins] = useState([]);
    const user = getAuthUser();

    const config = {
        headers: {
            'Authorization': `Token ${user}`
        }
    };
    
    useEffect(() => {
        getCourseAdmins();
    }, []);

    const getCourseAdmins = async () => {
        try {
            const response = axios.get(
                ADMIN_URL,
                config
            );
            setCourseAdmins((await response).data['course_admins']);
        }
        catch (error){
            console.log(error);
        }
    }

    return (
        <>
            {
                props.caller === 'materials' ? (
                    <MaterialSearchResultCard course={props.course} />
                ) : (
                    props.caller === 'announcements' ? (
                        <AnnouncementSearchResultCard course={props.course} />
                    ) :
                        (
                            <Link className='search-result-link' to={`/my-courses/${props.course.code}/materials`}>
                                <div className="result">
                                    <div className="course-search-result-info">
                                        <h2 className="course-search-result-title">{`${props.course.code} - ${props.course.name}`}</h2>
                                        <h4 className="course-search-result-instructor">{courseAdmins.join(' - ')}</h4>
                                    </div>
                                    <div className="course-search-result-platform-container">
                                        <img className="course-search-result-platform-image" src={CourseDog} />
                                    </div>
                                </div>
                            </Link>
                        )
                )
            }
        </>
    )

}