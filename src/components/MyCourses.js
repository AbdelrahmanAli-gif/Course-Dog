import CourseCard from './CourseCard';
import '../styles/MyCourses.css';

function MyCourses(){

    return(
        <div className='container'>
            <div className='content'>
                <h1 className='page-title'>MY COURSES</h1>
                <div className='courses-container'>
                    <CourseCard />
                    <CourseCard />
                    <CourseCard />
                    <CourseCard />
                    <CourseCard />
                    <CourseCard />
                    <CourseCard />
                </div>
            </div>
            
        </div>
    )
}

export default MyCourses;