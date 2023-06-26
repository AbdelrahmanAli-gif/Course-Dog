import '../styles/SearchResultCard.css'
import ClassroomLogo from '../assests/classroom.svg';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from '../api/axios';

function AnnouncementSearchResultCard(props) {
    return (
        <div className="result">
            <div className="course-search-result-info">
                {/* <h2 className="course-search-result-title">{props.course.title}</h2> */}
                <h4 className="course-search-result-instructor">{props.course.content}</h4>
                <h5 className="course-search-result-year">{props.course.semester}</h5>
            </div>
            <div className="course-search-result-platform-container">
                <img className="course-search-result-platform-image" src={ClassroomLogo} />
            </div>
        </div>
    )
}

export default AnnouncementSearchResultCard;