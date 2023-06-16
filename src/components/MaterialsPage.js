import CourseNavbar from "./CourseNavbar";
import '../styles/CoursePage.css';
import { useParams } from "react-router-dom";
import axios from '../api/axios';
import { getAuthUser } from '../services/Storage';
import { useState, useEffect } from 'react';
import MaterialCard from "./MaterialCard";

function CoursePage(props){
    const { id } = useParams();
    const [materials, setMaterials] = useState([]);
    const [courseName, setCourseName] = useState('');
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
            setMaterials(response.data['materials']);
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
                        <CourseNavbar activeMaterials={true}/>
                        <div className="materials-container">
                            {
                                materials.map((value) => {
                                    return (
                                        <MaterialCard key={value.id}
                                            fileName = {value.file_name}
                                            fileLink = {value.file}
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