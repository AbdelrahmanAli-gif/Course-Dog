import React from "react";
import '../styles/SearchResultCard.css'

export function SearchResultCard({course}){
    return (
        <a className="result">
            <h2>{course.courseName}</h2>
            <h3>{course.instructor}</h3>
            <h4>{course.semester}</h4>
        </a>
    )
}