import '../styles/AnnouncementCard.css';

import UserLogo from '../assests/user.svg'

function AnnouncementCard(){
    return (
        <div className='announcement-card'>
            <div className='user-info'>
                <div className='user-image-container'>
                    <img className='user-image' src={UserLogo} />
                </div>
                <h2 className='announcement-publisher'>Dr. Godzilla</h2>
            </div>
            <h5 className='announcement-date'>01/05/2023</h5>
            <p className='announcement-content'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum orci lorem, suscipit venenatis auctor eu, porta sit amet urna. Sed nulla turpis, volutpat sit amet arcu sit amet, pulvinar fringilla risus. In lobortis cursus ullamcorper. Suspendisse vulputate dapibus vehicula. Cras vitae venenatis ex, sed sollicitudin felis. Ut eu metus posuere, sodales lectus at, posuere augue. Pellentesque id cursus ex. Vivamus sed elit id nunc semper vehicula. Nullam posuere nisi ut pretium egestas. Sed volutpat, tortor et vulputate gravida, dui nisi vulputate arcu, 
            </p>
        </div>
    )
}

export default AnnouncementCard;