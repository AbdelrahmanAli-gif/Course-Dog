import '../styles/CourseNavbar.css';

function CourseNavbar(){
    return (
        <>
            <div className="course-navbar">
                <h2 className='course-navbar-title active'>Materials</h2>
                <h2 className='course-navbar-title'>Announcements</h2>
            </div>
            <div className='line'></div>
        </>
    )
}

export default CourseNavbar;