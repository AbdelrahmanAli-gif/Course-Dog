import CourseCard from './CourseCard';
import '../styles/MyCourses.css';
import { Link, useParams } from 'react-router-dom';
import axios from '../api/axios';
import { getAuthUser } from '../services/Storage';
import { useState, useEffect } from 'react';

function SubCourses() {

    const { id } = useParams();

    const GET_SUBCOURSES_URL = `courses/sub-courses/${id}/`;
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
                GET_SUBCOURSES_URL,
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
                    <h1 className='page-title'>SUB COURSES</h1>
                    <div className='courses-btns-container'>
                        <Link className='courses-btn' to={'/import-course'}>Import Course</Link>
                        {/* <Link className='courses-btn' to={'/organization-courses'}>Organization Courses</Link> */}
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
                                    childId={value.id}
                                    code={value.code}
                                    parentId={id}
                                    caller={'subcourses'}
                                />
                            );
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default SubCourses;