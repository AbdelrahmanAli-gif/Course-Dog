import '../styles/SearchResultCard.css'

import ClassroomLogo from '../assests/classroom.svg';

export function SearchResultCard({course}){
    return (
        <div className="result">
            <div className="course-search-result-info">
                <h2>{course.courseName}</h2>
                <h4 className="course-search-result-instructor">{course.instructor}</h4>
                <h5 className="course-search-result-year">{course.semester}</h5>
            </div>
            <div className="course-search-result-platform-container">
                <img className="course-search-result-platform-image" src={ClassroomLogo} />
            </div>
            
        </div>
    )
}