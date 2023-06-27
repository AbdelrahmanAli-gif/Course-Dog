import '../styles/Identity.css'
import { CourseDog } from '../images/Images';

function Identity() {
    return (
        <div className='identity'>
            <img className='logo' src={CourseDog} alt="logo" />
            <h2 className='title'>Course Dog</h2>
        </div>
    )
}

export default Identity;