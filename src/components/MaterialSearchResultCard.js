import '../styles/SearchResultCard.css'
import { useState, useEffect } from 'react';
import axios from '../api/axios';
import { Classroom, WebHooks } from '../images/Images';

function MaterialSearchResultCard(props) {

    const FILE_URL = 'http://127.0.0.1:8000' + props.course.file;
    const MATERIAL_URL = `files/course_material/${props.file_name}`;
    const fileType = FILE_URL.substring(FILE_URL.length - 3);
    const [pdf, setPDF] = useState();

    useEffect(() => {
        getPDF();
    }, []);

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

    const handleDownload = () => {
        const linkTag = document.createElement('a');
        if (fileType === 'pdf') {
            linkTag.setAttribute('href', FILE_URL);
        } else {
            linkTag.setAttribute('href', FILE_URL);
            linkTag.setAttribute('download', true);
        }
        linkTag.setAttribute('target', '_blank');
        document.body.appendChild(linkTag);
        linkTag.click();
        linkTag.remove();
    }

    return (
        <button className='search-result-link' onClick={handleDownload}>
            <div className="result">
                <div className="course-search-result-info">
                    <h2 className="course-search-result-title">{props.course.file_name}</h2>
                    {/* <h4 className="course-search-result-instructor">{props.course.instructor}</h4>
                    <h5 className="course-search-result-year">{props.course.semester}</h5> */}
                </div>
            </div>
        </button>
    )
}

export default MaterialSearchResultCard;