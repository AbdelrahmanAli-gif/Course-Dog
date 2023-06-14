import '../styles/CourseCard.css'
import ClassroomLogo from '../assests/classroom.svg';
import Subscribe from '../assests/add.svg';
import Unsubscribe from '../assests/remove.svg'
import { useState } from 'react';
import { Link } from 'react-router-dom';

function CourseCard(props){

    const [subscribtion, setSubscribtion] = useState(props.subscribed);
    const handleSubscribtion = (e) => {
        if (subscribtion){
            setSubscribtion(false);
        } else {
            setSubscribtion(true);
        }
    }

    return (
        <div className="card">
            <button className='course-subscribe' onClick={handleSubscribtion}>
                <img className='course-subscribe-img' src={subscribtion ? Unsubscribe : Subscribe}/>
            </button>
            <Link to={`/my-courses/${props.id}`} className='course-link'>
                <div className='card-image-container'>
                    <img className="card-image" src={require('../assests/abstract-dark-blue-luxury-background-free-vector.jpg')} alt=""/>
                </div>
                <div className='course-data'>
                    <div className='course-info'>
                        <h5 className='course-year'>Spring 2023</h5>
                        <h3 className='course-title'>{props.name}</h3>
                        <p className='course-instructor'>Dr. Godzilla</p>
                    </div>
                    <div className='platform-logo-container'>
                        <img className='platform-logo' src={ClassroomLogo} alt=''/>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default CourseCard;