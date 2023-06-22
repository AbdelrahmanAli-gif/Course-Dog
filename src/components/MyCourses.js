import CourseCard from './CourseCard';
import '../styles/MyCourses.css';
import { Link } from 'react-router-dom';
import axios from '../api/axios';
import { getAuthUser } from '../services/Storage';
import { useState, useEffect } from 'react';

function MyCourses() {
    const GET_USER_COURSES_URL = "courses/list-user-courses/";
    const user = getAuthUser();

    const [courses, setCourses] = useState([])

    useEffect(() => {
        getCourses();
    }, [])

    const config = {
        headers: {
            'Authorization': `Token ${user}`
        }
    };

    const getCourses = async () => {

        try {
            const response = await axios.get(
                GET_USER_COURSES_URL,
                config
            )
            setCourses(response.data);
        }
        catch (error) {
            console.log(error);
        };
    }

    return (
        <div className='container'>
            <div className='content'>
                <div className='courses-btn-container'>
                    <h1 className='page-title'>MY COURSES</h1>
                    <div className='courses-btns-container'>
                        <Link className='courses-btn' to={'/import-course'}>Import Course</Link>
                        <Link className='courses-btn' to={'/organization-courses'}>Organization Courses</Link>
                    </div>
                </div>
                <div className='courses-container'>
                    {
                        courses.map((value) => {
                            return (
                                <CourseCard key={value.id}
                                    subscribed={true}
                                    name={value.name}
                                    description={value.description}
                                    id={value.code}
                                    code={value.code}
                                />
                            );
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default MyCourses;