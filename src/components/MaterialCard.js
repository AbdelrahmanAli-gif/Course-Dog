import '../styles/MaterialCard.css';

import ClassroomLogo from '../assests/classroom.svg';
import FileLogo from '../assests/file.svg'

function MaterialCard(props){
    return (
        <div className='material-card'>
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
        </div>
    )
}

export default MaterialCard;