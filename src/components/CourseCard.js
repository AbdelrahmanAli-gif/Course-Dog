import '../styles/CourseCard.css'
import ClassroomLogo from '../assests/classroom.svg';
import Subscribe from '../assests/add.svg';
import Unsubscribe from '../assests/remove.svg'
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../api/axios';
import { getAuthUser } from '../services/Storage';
import CourseDogLogo from '../assests/logo.svg';
import WebHooks from '../assests/webhooks.svg';
import ImagesArray from '../images/Images';

function CourseCard(props) {
    const SUBSCRIBTION_URL = `courses/manage-user-courses/${props.id}/`;
    const ADMIN_URL = `courses/course-admins/${props.id}/`;
    const user = getAuthUser();

    const [subscribtion, setSubscribtion] = useState(props.subscribed);

    const config = {
        headers: {
            'Authorization': `Token ${user}`
        }
    };

    const [courseAdmins, setCourseAdmins] = useState([]);
    useEffect(() => {
        getCourseAdmins();
    }, []);

    const getCourseAdmins = async () => {
        try {
            const response = axios.get(
                ADMIN_URL,
                config
            );
            setCourseAdmins((await response).data['course_admins']);
        }
        catch (error){
            console.log(error);
        }
    }

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

    const imageNumber = Math.floor(Math.random() * 11);

    return (
        <div className="card">
            <button className='course-subscribe' onClick={handleSubscribtion}>
                <img className='course-subscribe-img' src={subscribtion ? Unsubscribe : Subscribe} />
            </button>
            <Link to={props.caller === 'subcourses' ? `/my-courses/${props.parentId}/sub-courses/${props.childId}/materials` : `/my-courses/${props.id}/materials`} className='course-link'>
                <div className='card-image-container'>
                    <img className="card-image" src={ImagesArray[Math.floor(Math.random() * 11)]} alt="" />
                </div>
                <div className='course-data'>
                    <div className='course-info'>
                        <h5 className='course-year'>{props.code}</h5>
                        <h3 className='course-title'>{props.name}</h3>
                        <p className='course-instructor'>{courseAdmins.join(' - ')}</p>
                    </div>
                    <div className='platform-logo-container'>
                        <img className='platform-logo' src={props.caller !== 'subcourses' ? CourseDogLogo : props.name.includes('Course Admin') ? CourseDogLogo : props.name.includes('Webhooks') ? WebHooks : ClassroomLogo} alt='' />
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default CourseCard;