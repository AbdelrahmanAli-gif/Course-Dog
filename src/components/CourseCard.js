import '../styles/CourseCard.css'
import ClassroomLogo from '../assests/classroom.svg';
import Subscribe from '../assests/add.svg';
import Unsubscribe from '../assests/remove.svg'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../api/axios';
import { getAuthUser } from '../services/Storage';

function CourseCard(props) {
    const SUBSCRIBTION_URL = `courses/manage-user-courses/${props.id}/`;
    const user = getAuthUser();

    const [subscribtion, setSubscribtion] = useState(props.subscribed);

    const config = {
        headers: {
            'Authorization': `Token ${user}`
        }
    };

    const handleSubscribtion = async () => {
        if (!subscribtion) {
            var myHeaders = new Headers();
            myHeaders.append("Authorization", `Token ${user}`);
            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                redirect: 'follow'
            };
            fetch(`http://127.0.0.1:8000/courses/manage-user-courses/${props.id}/`, requestOptions)
                .then(response => setSubscribtion(true))
                .catch(error => console.log('error', error));
        } else {
            try {
                await axios.delete(
                    SUBSCRIBTION_URL,
                    config
                );
                setSubscribtion(false);
            }
            catch (error) {
                console.log(error);
            }
        }
    }

    return (
        <div className="card">
            <button className='course-subscribe' onClick={handleSubscribtion}>
                <img className='course-subscribe-img' src={subscribtion ? Unsubscribe : Subscribe} />
            </button>
            <Link to={`/my-courses/${props.id}/materials`} className='course-link'>
                <div className='card-image-container'>
                    <img className="card-image" src={require('../assests/abstract-dark-blue-luxury-background-free-vector.jpg')} alt="" />
                </div>
                <div className='course-data'>
                    <div className='course-info'>
                        <h5 className='course-year'>Spring 2023</h5>
                        <h3 className='course-title'>{props.name}</h3>
                        <p className='course-instructor'>Dr. Godzilla</p>
                    </div>
                    <div className='platform-logo-container'>
                        <img className='platform-logo' src={ClassroomLogo} alt='' />
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default CourseCard;