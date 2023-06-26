import { useEffect, useState } from "react";
import { getAuthUser } from "../services/Storage";
import axios from "../api/axios";
import AdminDetails from "./AdminDetails";
import { Link } from "react-router-dom";

function OrganizationAdmins() {

    const ORGANIZATION_ADMINS = 'organization/organization-admins/';
    const user = getAuthUser();
    const config = {
        headers: {
            'Authorization': `Token ${user}`
        }
    };
    const [admins, setAdmins] = useState([]);
    useEffect(() => {
        getAdmins();
    }, []);

    const getAdmins = async () => {
        try {
            const response = await axios.get(
                ORGANIZATION_ADMINS,
                config
            );
            setAdmins(response.data);
        }
        catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="dashboard-container">
            <div className="dashboard-heading">
                <h1 className="dashboard-title">Organization Admins</h1>
                <Link to={`/organization-admins/add-organization-admin`}>
                    <button className="dashboard-btn">Add Admin</button>
                </Link>
            </div>
            <div className="results-container">
                {
                    admins.length === 0 ? 'No admins' :
                    admins.map((value) => {
                        return (
                            <AdminDetails key={value.id}
                                userName={value.username}
                                email={value.email}
                                caller='organization'
                            />
                        )
                    })
                }
            </div>
        </div>
    )
}

export default OrganizationAdmins;