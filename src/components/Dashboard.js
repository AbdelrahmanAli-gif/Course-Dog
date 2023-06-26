import { Link, Outlet, useNavigate } from "react-router-dom";
import '../styles/Dashboard.css';
import { removeAuthGroup, removeAuthOrg, removeAuthUser } from "../services/Storage";

function Dashboard() {

    const navigator = useNavigate();

    const handleLogout = () => {
        removeAuthUser();
        removeAuthGroup();
        removeAuthOrg();
        navigator('/');
    }

    return (
        <div>
            <div className="dashboard-navbar">
                <div className="dashboard-header">
                    <h1 className="dashboard-title">Dashboard</h1>
                    <button className="dashboard-btn dashboard-logout" onClick={handleLogout}>Logout</button>
                </div>
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