import CourseCard from './CourseCard';
import '../styles/MyCourses.css';
import { Link } from 'react-router-dom';
import axios from '../api/axios';
import { getAuthUser } from '../services/Storage';
import { useState, useEffect } from 'react';

function OrganizationCourses() {
    const GET_ORG_COURSES_URL = "courses/list-courses/";
    const GET_USER_COURSES_URL = "courses/list-user-courses/";
    const GET_USER_FULL_INFO_URL = 'auth/user-info/';
    const user = getAuthUser();

    const [courses, setCourses] = useState([]);
    const [orgCourses, setOrgCourses] = useState([]);
    const [userOrg, setUserOrg] = useState('');


    useEffect(() => {
        getCourses();
        getOrgCourses();
        getUserOrg();
    }, [])

    const config = {
        headers: { 
            'Authorization': `Token ${user}`
        }
    };

    const getUserOrg = async () => {

        try {
            const response = await axios.get(
                GET_USER_FULL_INFO_URL,
                config
            );
            setUserOrg(response.data['organization']);
        }
        catch (error) {
            console.log(error);
        }
    }

    const getOrgCourses = async () => {

        try {
            const response = await axios.get(
                GET_ORG_COURSES_URL,
                config
            );
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
            );
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

    return (
        <div className='container'>
            <div className='content'>
                <div className='courses-btn-container'>
                    <h1 className='page-title'>{`${userOrg} COURSES`.toUpperCase()}</h1>
                    <Link className='courses-btn' to={'/my-courses'}>My Courses</Link>
                </div>
                <div className='courses-container'>
                    {
                        orgCourses.map((value) => {
                            return (
                                <CourseCard key={value.id}
                                    subscribed = {findElement(value.id)}
                                    name = {value.name}
                                    description = {value.description}
                                    id = {value.code}
                                />
                            );
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default OrganizationCourses;