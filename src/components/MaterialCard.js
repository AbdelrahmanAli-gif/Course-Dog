import '../styles/MaterialCard.css';
import ClassroomLogo from '../assests/classroom.svg';
import FileLogo from '../assests/file.svg'
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from '../api/axios';

function MaterialCard(props){

    const FILE_URL = 'http://127.0.0.1:8000' + props.fileLink;
    const MATERIAL_URL = `files/course_material/${props.fileName}`;
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
    console.log(blobURL)

    return (
        <Link to={fileType === 'pdf'? blobURL : FILE_URL} target='_blank' className='material-card'>
            <div className='material-info'>
                <div className='material-image-container'>
                    <img className='file-image' src={FileLogo} />
                </div>
                <div className='material-data'>
                    <h3 className='material-title'>{props.fileName}</h3>
                    <h4 className='material-provider'>Dr. Godzilla</h4>
                    <h5 className='material-date'>01/05/2023</h5>
                </div>
            </div>
            <div className='platform-image-container'>
                <img className='platform-image' src={ClassroomLogo} />
            </div>
        </Link>
    )
}

export default MaterialCard;