import Navbar from "./Navbar";
import CourseNavbar from "./CourseNavbar";
import MaterialCard from "./MaterialCard";
import AnnouncementCard from "./AnnouncementCard";

import '../styles/CoursePage.css';

function CoursePage(props){
    return (
        <div className="container">
            <Navbar />
            <div className="content">
                <h1 className="page-title">THEORY OF COMPUTATIONS</h1>
                <CourseNavbar />
                <div className="materials-container">
                    <AnnouncementCard />
                    <AnnouncementCard />
                    <AnnouncementCard />
                    <AnnouncementCard />
                    <AnnouncementCard />
                    <AnnouncementCard />
                    <AnnouncementCard />
                    <AnnouncementCard />
                    <AnnouncementCard />
                    <AnnouncementCard />
                    <AnnouncementCard />
                </div>
            </div>
        </div>
    )
}

export default CoursePage;