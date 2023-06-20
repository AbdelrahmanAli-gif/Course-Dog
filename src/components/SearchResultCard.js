import '../styles/SearchResultCard.css'
import ClassroomLogo from '../assests/classroom.svg';
import { Link } from 'react-router-dom';

export function SearchResultCard({ course }) {
    return (
        <Link className='search-result-link' to={`/my-courses/${course.id}/materials`}>
            <div className="result">
                <div className="course-search-result-info">
                    <h2 className="course-search-result-title">{course.name}</h2>
                    <h4 className="course-search-result-instructor">{course.instructor}</h4>
                    <h5 className="course-search-result-year">{course.semester}</h5>
                </div>
                <div className="course-search-result-platform-container">
                    <img className="course-search-result-platform-image" src={ClassroomLogo} />
                </div>

            </div>
        </Link>
    )
}