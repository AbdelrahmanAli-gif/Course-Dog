import { Link, Outlet, useNavigate } from "react-router-dom";
import '../styles/Dashboard.css';
import { removeAuthGroup, removeAuthOrg, removeAuthUser } from "../services/Storage";
import { CourseDog } from "../images/Images";

function Dashboard() {

    const navigator = useNavigate();

    const handleLogout = () => {
        removeAuthUser();
        removeAuthGroup();
        removeAuthOrg();
        navigator('/');
    }

    const url = window.location.href;

    return (
        <div>
            <div className="dashboard-navbar">
                <div className="btns-container">
                    <div className='dashboard-navbar-first-section'>
                        <div className='navbar-identity'>
                            <div className='navbar-logo-container'>
                                <img className='navbar-logo' src={CourseDog} alt='' />
                            </div>
                            <span className='navbar-title'>Course Dog</span>
                        </div>
                    </div>
                    <Link to={'/courses'} className="dashboard-navbar-link">
                        <button className={url.includes('courses') ? 'navbar-active navbar-dashboard-btn' : 'navbar-dashboard-btn'}>Courses</button>
                    </Link>
                    <Link to={'/organization-admins'} className="dashboard-navbar-link">
                        <button className={url.includes('organization-admins') ? 'navbar-active navbar-dashboard-btn' : 'navbar-dashboard-btn'}>Organization Admins</button>
                    </Link>
                    <Link to={'/subdomains'} className="dashboard-navbar-link">
                        <button className={url.includes('subdomains') ? 'navbar-active navbar-dashboard-btn' : 'navbar-dashboard-btn'}>Subdomains</button>
                    </Link>
                    <button className="navbar-dashboard-btn dashboard-logout" onClick={handleLogout}>Logout</button>
                </div>
                
                <div className="dashboard-header">
                    <h1 className="dashboard-title">Dashboard</h1>
                </div>
            </div>
            <Outlet />
        </div>
    )
}

export default Dashboard;