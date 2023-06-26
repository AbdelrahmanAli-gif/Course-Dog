import '../styles/SearchResultCard.css'
import ClassroomLogo from '../assests/classroom.svg';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from '../api/axios';

function MaterialSearchResultCard(props) {

    const FILE_URL = 'http://127.0.0.1:8000' + props.course.file;
    const MATERIAL_URL = `files/course_material/${props.file_name}`;
    const fileType = FILE_URL.substring(FILE_URL.length - 3);
    const [pdf, setPDF] = useState();

    useEffect(() => {
        getPDF();
    }, [])

    const getPDF = async () => {

        let config = {
            responseType: 'blob'
        }

        try {
            const response = await axios.get(
                MATERIAL_URL,
                config
            );
            setPDF(response.data);
        }
        catch (error) {
            console.log(error);
        }
    }
    var blob = new Blob([pdf], { type: 'application/pdf' });
    var blobURL = URL.createObjectURL(blob);

    return (
        <Link className='search-result-link' to={fileType === 'pdf' ? '/' + blobURL : FILE_URL} download={fileType === 'pdf' ? true : false}>
            <div className="result">
                <div className="course-search-result-info">
                    <h2 className="course-search-result-title">{props.course.file_name}</h2>
                    <h4 className="course-search-result-instructor">{props.course.instructor}</h4>
                    <h5 className="course-search-result-year">{props.course.semester}</h5>
                </div>
                <div className="course-search-result-platform-container">
                    <img className="course-search-result-platform-image" src={ClassroomLogo} />
                </div>
            </div>
        </Link>
    )
}

export default MaterialSearchResultCard;