import CourseNavbar from "./CourseNavbar";
import AnnouncementCard from "./AnnouncementCard";
import '../styles/CoursePage.css';
import { useParams } from "react-router-dom";

function CoursePage(props){

    const { id } = useParams();

    return (
        <div className="container">
            <div className="content">
                <h1 className="page-title">THEORY OF COMPUTATIONS</h1>
                <CourseNavbar />
                <div className="materials-container">
                    <h1>{id}</h1>
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