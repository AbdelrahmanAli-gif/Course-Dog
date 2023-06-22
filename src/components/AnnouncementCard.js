import '../styles/AnnouncementCard.css';
import ClassroomLogo from '../assests/classroom.svg';
import Delete from '../assests/delete.svg';
import { useParams } from 'react-router-dom';
import { getAuthUser } from '../services/Storage';
import axios from '../api/axios';
import { useState } from 'react';
import SimilarAnnouncemetCard from './SimilarAnnouncementCard';

function AnnouncementCard(props) {

    const { id } = useParams();
    const DELETE_URL = `announcements/manage-announcements/${id}/`;
    const [similarAnnouncements, setSimilarAnnouncements] = useState([]);
    const SIMILAR_ANNOUNCEMENTS_URL = `announcements/similar-announcements/${props.id}/`
    const user = getAuthUser();
    const config = {
        headers: {
            'Authorization': `Token ${user}`
        },
        data: {
            announcement_id: props.id
        }
    };

    const handleDelete = async () => {
        try {
            await axios.delete(
                DELETE_URL,
                config
            );
            window.location.reload(true);
        }
        catch (error) {
            console.log(error);
        }
    }

    const getSimilarAnnouncements = async () => {
        try {
            const response = await axios.get(
                SIMILAR_ANNOUNCEMENTS_URL,
                config
            );
            setSimilarAnnouncements(response.data['similar_announcements']);
            document.getElementById(props.id).style.display = 'flex';
        }
        catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='announcement-container'>
            <div className='announcement-card-container'>
                <div className='announcement-card'>
                    <div className='user-info'>
                        <div className='user-image-container'>
                            <img className='user-image' src={ClassroomLogo} />
                        </div>
                        <h2 className='announcement-publisher'>{props.title}</h2>
                    </div>
                    <h5 className='announcement-date'>01/05/2023</h5>
                    <p className='announcement-content'>
                        {props.announcement}
                    </p>
                </div>
                <button className='similar-btn' onClick={getSimilarAnnouncements}>Get Similar Announcements</button>
                <button className='delete-btn' style={props.admin ? { display: 'inline' } : { display: 'none' }} onClick={handleDelete}>
                    <img className='delete-icon' src={Delete} />
                </button>
            </div>
            <div className='similar-announcements' id={props.id}>
                {
                    similarAnnouncements.length === 0 ? 'No similar announcements' : (
                        <>
                            {
                                similarAnnouncements.map((value) => {
                                    return <SimilarAnnouncemetCard key={value.id}
                                        similarAnnouncementId={value.id}
                                        similarAnnouncement={value.content}
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

export default AnnouncementCard;