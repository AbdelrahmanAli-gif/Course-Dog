import '../styles/MaterialCard.css';
import ClassroomLogo from '../assests/classroom.svg';
import FileLogo from '../assests/file.svg'
import Delete from '../assests/delete.svg';
import { useState, useEffect } from 'react';
import axios from '../api/axios';
import { useParams } from 'react-router-dom';
import { getAuthUser } from '../services/Storage';
import SimilarMaterialCard from './SimilarMaterialCard';

function MaterialCard(props) {

    const FILE_URL = 'http://127.0.0.1:8000' + props.fileLink;
    const MATERIAL_URL = `files/course_material/${props.fileName}`;
    const fileType = FILE_URL.substring(FILE_URL.length - 3);
    const SIMILAR_FILES_URL = `materials/similar-materials/${props.id}/`;

    const [pdf, setPDF] = useState();
    const [similarFiles, setSimilarFiles] = useState([]);

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
        catch (error) {
            console.log(error);
        }
    }

    var blob = new Blob([pdf], { type: 'application/pdf' });
    var blobURL = URL.createObjectURL(blob);

    const handleDownload = () => {
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

    const getSimilarFiles = async () => {
        try {
            const response = await axios.get(
                SIMILAR_FILES_URL,
                config
            );
            setSimilarFiles(response.data['similar_materials']);
            document.getElementById(props.id).style.display = 'flex';
        }
        catch (error) {
            console.log(error);
        }
    }

    const parseDate = (creationDate) => {
        creationDate = creationDate.replaceAll('-', '/');
        creationDate = creationDate.substring(0, 10) + ' ' + creationDate.substring(11, 19);
        return creationDate;
    }

    return (
        <div className='material-container'>
            <div className='material-card-container'>
                <button className='material-card' onClick={handleDownload}>
                    <div className='material-info'>
                        <div className='material-image-container'>
                            <img className='file-image' src={FileLogo} />
                        </div>
                        <div className='material-data'>
                            <h3 className='material-title'>{props.fileName}</h3>
                            <h4 className='material-provider'>Dr. Godzilla</h4>
                            <h5 className='material-date'>{parseDate(props.creationDate)}</h5>
                        </div>
                    </div>
                    <div className='platform-image-container'>
                        <img className='platform-image' src={ClassroomLogo} />
                    </div>
                </button>
                <button className='similar-btn' onClick={getSimilarFiles}>Get Similar Materials</button>
                <button className='delete-btn' style={props.admin ? { display: 'inline' } : { display: 'none' }} onClick={handleDelete}>
                    <img className='delete-icon' src={Delete} />
                </button>
            </div>
            <div className='similar-files' id={props.id}>
                {
                    similarFiles.length === 0 ? 'No similar files' : (
                        <>
                            {
                                similarFiles.map((value) => {
                                    return <SimilarMaterialCard key={value.id}
                                        similarFileName={value.file_name}
                                        similarFileURL={value.file}
                                    />
                                })
                            }
                        </>
                    )
                }
            </div>
        </div>
    )
}

export default MaterialCard;