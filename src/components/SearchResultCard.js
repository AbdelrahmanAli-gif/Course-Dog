import MaterialSearchResultCard from "./MaterialSearchResultCard";
import ClassroomLogo from '../assests/classroom.svg';
import { Link } from 'react-router-dom';
import AnnouncementSearchResultCard from "./AnnouncementSearchResultCard";

export function SearchResultCard(props) {
    console.log(props.course);
    return (
        <>
            {
                props.caller === 'materials' ? (
                    <MaterialSearchResultCard course={props.course} />
                ) : (
                    props.caller === 'announcements' ? (
                        <AnnouncementSearchResultCard course={props.course} />
                    ) :
                        (
                            <Link className='search-result-link' to={`/my-courses/${props.course.code}/materials`}>
                                <div className="result">
                                    <div className="course-search-result-info">
                                        <h2 className="course-search-result-title">{props.course.name}</h2>
                                        <h4 className="course-search-result-instructor">{props.course.instructor}</h4>
                                        <h5 className="course-search-result-year">{props.course.semester}</h5>
                                    </div>
                                    <div className="course-search-result-platform-container">
                                        <img className="course-search-result-platform-image" src={ClassroomLogo} />
                                    </div>
                                </div>
                            </Link>
                        )
                )
            }
        </>
    )

}