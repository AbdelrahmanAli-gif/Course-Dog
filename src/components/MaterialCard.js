import '../styles/MaterialCard.css';
import ClassroomLogo from '../assests/classroom.svg';
import FileLogo from '../assests/file.svg'
import Delete from '../assests/delete.svg';
import { useState, useEffect } from 'react';
import axios from '../api/axios';
import { useParams } from 'react-router-dom';
import { getAuthUser } from '../services/Storage';

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
    
    const user = getAuthUser();
    const { id } = useParams();
    const DELETE_URL = `materials/delete-material/${id}/${props.id}/`;
    const config = {
        headers: {
            'Authorization': `Token ${user}`
        }
    };

    const handleDelete = async () => {
        try {
            await axios.delete(
                DELETE_URL,
                config,
                {
                    announcement_id: props.id
                }
            );
            window.location.reload(true);
        }
        catch(error){
            console.log(error);
        }
    }

    var blob = new Blob([pdf], { type: 'application/pdf' });
    var blobURL = URL.createObjectURL(blob);

    const handleDownload = () => {
        const linkTag = document.createElement('a');
        if (fileType === 'pdf'){
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
        <div className='card-container'>
            <button className='material-card' onClick={handleDownload}>
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
            </button>
            <button className='delete-btn' style={props.admin ? {display: 'inline'} : {display: 'none'}} onClick={handleDelete}>
                <img className='delete-icon' src={Delete}/>
            </button>
        </div>
    )
}

export default MaterialCard;