import { useParams } from "react-router-dom";
import { getAuthUser } from "../services/Storage";
import axios from "../api/axios";
import '../styles/DashboardCard.css';

function AdminDetails(props) {

    const user = getAuthUser();
    const { id } = useParams();
    const DELETE_COURSE_ADMIN = `organization/manage-course-admins/${id}/`;
    const DELETE_ORG_ADMIN = 'organization/organization-admins/';
    const config = {
        headers: {
            'Authorization': `Token ${user}`
        },
        data: {
            email: props.email
        }
    }

    const deleteAdmin = async () => {
        try {
            if (props.caller === 'organization') {
                await axios.delete(
                    DELETE_ORG_ADMIN,
                    config
                );
            }
            else {
                await axios.delete(
                    DELETE_COURSE_ADMIN,
                    config
                );
            }
            window.location.reload(true);
        }
        catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="dashboard-card-container">
            <div className="field-container">
                <p className="field-title">Username</p>
                <p className="field-value">{props.userName}</p>
            </div>
            <div className="field-container">
                <p className="field-title">Email</p>
                <p className="field-value">{props.email}</p>
            </div>
            <button onClick={deleteAdmin} className="dashboard-btn">Delete Admin</button>
        </div>
    )
}

export default AdminDetails;