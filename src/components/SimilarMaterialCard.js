import '../styles/SimilarMaterialCard.css';
import { useState, useEffect } from 'react';
import axios from '../api/axios';

function SimilarMaterialCard(props) {

    const FILE_URL = 'http://127.0.0.1:8000' + props.similarFileURL;
    const MATERIAL_URL = `files/course_material/${props.similarFileName}`;
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

    const handleFile = () => {
        const linkTag = document.createElement('a');
        if (fileType === 'pdf') {
            linkTag.setAttribute('href', blobURL);
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
        <div className='similar-material-container'>
            <button className='similar-material' onClick={handleFile}>
                <h3 className='material-title'>{props.similarFileName}</h3>
            </button>
        </div>
    )
}

export default SimilarMaterialCard;