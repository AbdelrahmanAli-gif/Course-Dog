import CourseCard from './CourseCard';
import '../styles/MyCourses.css';
import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getSubscribedCourses, getOrganizationCourses, getSubCourses } from '../services/Courses';
import { getAuthOrg } from '../services/Storage';

function CoursesPage(props) {

    const { id } = useParams();
    const [courses, setCourses] = useState([]);
    const userOrg = getAuthOrg();

    const getCourses = async () => {
        setCourses(await getSubscribedCourses());
    }

    const getOrgCourses = async () => {
        setCourses(await getOrganizationCourses());
    }

    const getCourseSubCourses = async (id) => {
        setCourses(await getSubCourses(id));
    }

    useEffect(() => {
        if (props.caller === 'user') {
            getCourses();
        } else if (props.caller === 'organization') {
            getOrgCourses();
        } else {
            getCourseSubCourses(id);
        }
    }, [props.caller]);

    console.log(courses);
    console.log(id);

    return (
        <div className='container'>
            <div className='content'>
                <div className='courses-btn-container'>
                    <h1 className='page-title'>{props.caller === 'user' ? 'MY COURSES' : props.caller === 'organization' ? `${userOrg.toUpperCase()} COURSES` : 'SUB COURSES'}</h1>
                    <div className='courses-btns-container'>
                        <Link className='courses-btn' to={'/import-course'}>Import Course</Link>
                        {
                            props.caller === 'user' || props.caller === 'organization' ? (
                                <Link className='courses-btn' to={'/organization-courses'}>Organization Courses</Link>
                            ) : null
                        }
                    </div>
                </div>
                <div className='courses-container'>
                    {
                        courses.map((value) => {
                            return (
                                <CourseCard key={value.id}
                                    subscribed={props.caller === 'user' || props.caller === 'subcourse' ? true : value.statusCode}
                                    name={value.name}
                                    description={value.description}
                                    id={value.code}
                                    code={value.code}
                                    caller={props.caller}
                                    parentId={id}
                                    childId={value.id}
                                />
                            );
                        })
                    }
                </div>
            </div>
        </div>
    )

}

export default CoursesPage;