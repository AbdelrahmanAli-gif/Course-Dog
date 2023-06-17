import { Link, useParams } from 'react-router-dom';
import '../styles/CourseNavbar.css';

function CourseNavbar(props){

    const { id } = useParams();
    return (
        <>
            {
                props.activeMaterials ? (
                    <div className="course-navbar">
                        <h2 className='course-navbar-title active'>Materials</h2>
                        <Link to={`/my-courses/${id}/announcements`} className='nav-link'>
                            <h2 className='course-navbar-title'>Announcements</h2>
                        </Link>
                    </div>
                ) : (
                    <div className="course-navbar">
                        <Link to={`/my-courses/${id}/materials`} className='nav-link'>
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