import { Link } from 'react-router-dom';
import '../styles/CourseNavbar.css';

function CourseNavbar(props){
    return (
        <>
            {
                props.activeMaterials ? (
                    <div className="course-navbar">
                        <h2 className='course-navbar-title active'>Materials</h2>
                        <Link to={'/my-courses/560746507509/announcements'} className='nav-link'>
                            <h2 className='course-navbar-title'>Announcements</h2>
                        </Link>
                    </div>
                ) : (
                    <div className="course-navbar">
                        <Link to={'/my-courses/560746507509/materials'} className='nav-link'>
                            <h2 className='course-navbar-title'>Materials</h2>
                        </Link>
                        <h2 className='course-navbar-title active'>Announcements</h2>
                    </div>
                )
            }
            <div className='line'></div>
        </>
    )
}

export default CourseNavbar;