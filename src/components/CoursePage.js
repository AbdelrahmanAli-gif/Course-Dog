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
    const user = getAuthUser();

    const GET_COURSE_MATERIALS = `courses/upload-material/${id}`;

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
            setMaterials(response.data);
        }
        catch(error){
            console.log(error);
        };
    }

    return (
        <div className="container">
            <div className="content">
                <h1 className="page-title">THEORY OF COMPUTATIONS</h1>
                <CourseNavbar />
                <div className="materials-container">
                    {
                        materials.map((value) => {
                            return (
                                <MaterialCard
                                    fileName = {value.file_name}
                                />
                            );
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default CoursePage;