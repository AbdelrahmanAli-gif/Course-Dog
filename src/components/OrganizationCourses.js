import CourseCard from './CourseCard';
import '../styles/MyCourses.css';
import { Link } from 'react-router-dom';
import axios from '../api/axios';
import { getAuthUser } from '../services/Storage';
import { useState, useEffect } from 'react';

function OrganizationCourses() {
    const GET_ORG_COURSES_URL = "courses/list-courses/";
    const GET_USER_COURSES_URL = "courses/list-user-courses/";
    const user = getAuthUser();

    const [courses, setCourses] = useState([])
    const [orgCourses, setOrgCourses] = useState([])


    useEffect(() => {
        getCourses();
        getOrgCourses();
    }, [])

    const config = {
        headers: { 
            'Authorization': `Token ${user}`
        }
    };

    const getOrgCourses = async () => {

        try {
            const response = await axios.get(
                GET_ORG_COURSES_URL,
                config
            )
            setOrgCourses(response.data);
        }
        catch(error){
            console.log(error);
        };
    }

    const getCourses = async () => {

        try {
            const response = await axios.get(
                GET_USER_COURSES_URL,
                config
            )
            setCourses(response.data);
        }
        catch(error){
            console.log(error);
        };
    }

    const findElement = (courseId) => {
        for (let i = 0; i < courses.length; i++){
            if (courses[i].id === courseId){
                return true;
            }
        }
        return false;
    }

    // getCourses();
    // getOrgCourses();

    return (
        <div className='container'>
            <div className='content'>
                <div className='courses-btn-container'>
                    <h1 className='page-title'>FCAI-CU COURSES</h1>
                    <Link className='courses-btn' to={'/user/my-courses'}>My Courses</Link>
                </div>
                <div className='courses-container'>
                    {
                        orgCourses.map((value) => {
                            return (
                                <Link to={`/user/my-courses/${value.id}`} key={value.id}>
                                    <CourseCard
                                        subscribed = {findElement(value.id)}
                                        cname = {value.name}
                                        description = {value.description}
                                    />
                                </Link>
                                
                            );
                        })
                    }
                </div>
            </div>
            
        </div>
    )
}

export default OrganizationCourses;