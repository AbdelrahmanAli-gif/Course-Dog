import '../styles/CourseCard.css'

import ClassroomLogo from '../assests/classroom.svg';
import Subscribe from '../assests/add.svg';
import Unsubscribe from '../assests/remove.svg'

function CourseCard({subscribed, cname, description}){
    return (
        <div className="card">
            <div className='card-image-container'>
                <img className="card-image" src={require('../assests/abstract-dark-blue-luxury-background-free-vector.jpg')} alt=""/>
                <button className='course-subscribe'>
                    <img className='course-subscribe-img' src={subscribed ? Unsubscribe : Subscribe}/>
                </button>
            </div>
            <div className='course-data'>
                <div className='course-info'>
                    <h5 className='course-year'>Spring 2023</h5>
                    <h3 className='course-title'>{cname}</h3>
                    <p className='course-instructor'>Dr. Godzilla</p>
                </div>
                <div className='platform-logo-container'>
                    <img className='platform-logo' src={ClassroomLogo} alt=''/>
                </div>
            </div>
        </div>
    )
}

export default CourseCard;