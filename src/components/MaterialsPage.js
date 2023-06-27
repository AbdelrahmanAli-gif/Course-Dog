import CourseNavbar from "./CourseNavbar";
import '../styles/CoursePage.css';
import { useParams, Link } from "react-router-dom";
import axios from '../api/axios';
import { getAuthUser } from '../services/Storage';
import { useState, useEffect } from 'react';
import MaterialCard from "./MaterialCard";

function MaterialPage() {
    const { id } = useParams();
    const [materials, setMaterials] = useState([]);
    const [courseName, setCourseName] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const [error, setError] = useState({});
    const user = getAuthUser();

    const GET_COURSE_MATERIALS = `materials/upload-material/${id}/`;

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
                GET_COURSE_MATERIALS,
                config
            )
            setCourseName(response.data['course']['name'])
            setMaterials(response.data['materials'].reverse());
            setIsAdmin(response.data['is_course_admin']);
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
                                <div className="course-header-btns">
                                    <Link to={`/my-courses/${id}/sub-courses`} className="post-btn">Sub Courses</Link>
                                    <Link to={`/my-courses/${id}/materials/add`} className="post-btn" style={isAdmin ? { display: 'block' } : { display: 'none' }}>Add Material</Link>
                                </div>
                            </div>
                            <CourseNavbar activeMaterials={true} />
                            <div className="materials-container">
                                {
                                    materials.map((value) => {
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
                                }
                            </div>
                        </div>
                    </div>
                ) : <h1>{error.errorMsg}</h1>
            }
        </>
    )
}

export default MaterialPage;