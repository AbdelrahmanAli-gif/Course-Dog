import '../styles/AnnouncementCard.css';

import UserLogo from '../assests/user.svg'
import ClassroomLogo from '../assests/classroom.svg';

function AnnouncementCard(props){
    return (
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
    )
}

export default AnnouncementCard;