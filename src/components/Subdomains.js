import { useEffect, useState } from "react";
import { getAuthOrg, getAuthUser } from "../services/Storage";
import axios from "../api/axios";
import { Link } from "react-router-dom";

function Subdomains() {

    const org = getAuthOrg();
    const user = getAuthUser();
    const GET_SUBDOMAINS = `organization/organization-data/${org}/`;
    const [subdomains, setSubdomains] = useState([]);
    const config = {
        headers: {
            'Authorization': `Token ${user}`
        }
    };

    useEffect(() => {
        getSubdomains();
    }, []);

    const getSubdomains = async () => {
        try {
            const response = await axios.get(
                GET_SUBDOMAINS,
                config
            );
            setSubdomains(response.data['subdomains']);
        }
        catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="dashboard-container">
            <div className="dashboard-heading">
                <h1 className="dashboard-title">Subdomains</h1>
                <Link to={'/subdomains/add-subdomain'}>
                    <button className="dashboard-btn">Add Subdomain</button>
                </Link>
            </div>
            <div className="results-container">
                {
                    subdomains.map((value) => {
                        return <p key={value.subdomain}>{value.subdomain}</p>
                    })
                }
            </div>
        </div>
    )
}

export default Subdomains;