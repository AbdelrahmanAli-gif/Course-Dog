import '../styles/CourseCard.css'
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../api/axios';
import { getAuthUser } from '../services/Storage';
import { Classroom, WebHooks, Subscribe, Unsubscribe, CourseDog, getRandomImage } from '../images/Images';

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

    return (
        <div className="card">
            <button className='course-subscribe' onClick={handleSubscribtion}>
                <img className='course-subscribe-img' src={subscribtion ? Unsubscribe : Subscribe} />
            </button>
            <Link to={props.caller === 'subcourses' ? `/my-courses/${props.parentId}/sub-courses/${props.childId}/materials` : `/my-courses/${props.id}/materials`} className='course-link'>
                <div className='card-image-container'>
                    <img className="card-image" src={getRandomImage()} alt="" />
                </div>
                <div className='course-data'>
                    <div className='course-info'>
                        <h5 className='course-year'>{props.code}</h5>
                        <h3 className='course-title'>{props.name}</h3>
                        <p className='course-instructor'>{courseAdmins.join(' - ')}</p>
                    </div>
                    <div className='platform-logo-container'>
                        <img className='platform-logo' src={props.caller !== 'subcourses' ? CourseDog : props.name.includes('Course Admin') ? CourseDog : props.name.includes('Webhooks') ? WebHooks : Classroom} alt='' />
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default CourseCard;