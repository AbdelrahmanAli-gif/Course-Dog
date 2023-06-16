import CourseNavbar from "./CourseNavbar";
import '../styles/CoursePage.css';
import { useParams } from "react-router-dom";
import axios from '../api/axios';
import { getAuthUser } from '../services/Storage';
import { useState, useEffect } from 'react';
import AnnoundementCard from "./AnnouncementCard";

function CoursePage(props){
    const { id } = useParams();
    const [materials, setMaterials] = useState([]);
    const [courseName, setCourseName] = useState('');
    const [error, setError] = useState({});
    const user = getAuthUser();

    const GET_COURSE_ANNOUNCEMENTS = `announcements/manage-announcements/${id}/`;

    useEffect(() => {
        getMaterials();
    }, [])

    const config = {
        headers: { 
            'Authorization': `Token ${user}`
        }
    };

    const getMaterials = async () => {

        try {
            const response = await axios.get(
                GET_COURSE_ANNOUNCEMENTS,
                config
            )
            setCourseName(response.data['course']['name'])
            setMaterials(response.data['announcements']);
            setError({
                errorState: false,
                errorMsg: ""
            })
        }
        catch(err){
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
                        <h1 className="page-title">{courseName.toUpperCase()}</h1>
                        <CourseNavbar activeMaterials={false}/>
                        <div className="materials-container">
                            {
                                materials.map((value) => {
                                    return (
                                        <AnnoundementCard key={value.id}
                                            announcement = {value.announcement}
                                            id = {value.id}
                                            title = {value.title}
                                        />
                                    );
                                })
                            }
                        </div>
                    </div>
                </div>
            ): <h1>{error.errorMsg}</h1>
        }
        </>
    )
}

export default CoursePage;