import { Link, Outlet } from "react-router-dom";
import '../styles/Dashboard.css';

function Dashboard() {
    return (
        <div>
            <div className="dashboard-navbar">
                <h1>Dashboard</h1>
                <div className="btns-container">
                    <Link to={'/courses'} className="dashboard-navbar-link">
                        <button className="dashboard-btn">Courses</button>
                    </Link>
                    <Link to={'/organization-admins'} className="dashboard-navbar-link">
                        <button className="dashboard-btn">Organization Admins</button>
                    </Link>
                    <Link to={'/subdomains'} className="dashboard-navbar-link">
                        <button className="dashboard-btn">Subdomains</button>
                    </Link>
                </div>
            </div>
            <Outlet />
        </div>
    )
}

export default Dashboard;