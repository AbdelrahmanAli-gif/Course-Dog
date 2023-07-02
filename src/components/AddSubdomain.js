import { useRef, useState, useEffect } from "react";
import { getAuthOrg, getAuthUser } from "../services/Storage";
import { baseURL } from "../api/axios";

function AddSubdomain() {

    const subdomainRef = useRef();
    const [subdomain, setSubdomain] = useState('');
    const user = getAuthUser();
    const org = getAuthOrg();
    const errorRef = useRef();
    const [errorMsg, setErrorMsg] = useState("");
    const [errorColor, setErrorColor] = useState("");
    useEffect(() => {
    }, [errorColor])

    const handleErrorColor = (color) => {
        setErrorColor(color);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Token ${user}`);

        var formdata = new FormData();
        formdata.append("subdomain", subdomain);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        await fetch(`${baseURL}organization/organization-data/${org}/`, requestOptions)
            .then(async (response) => { // to resolve the promise

                const res = await response.json(); // to get the data
                console.log(res);
                console.log(res['message']); // to get the message

                console.log(response.ok); // to get the status in boolean

                if (response.ok) {
                    handleErrorColor('#4BB543');
                    setErrorMsg(res['message']);
                } else {
                    handleErrorColor('#FF3333');
                    setErrorMsg(res['message']);
                }
            })
            .catch(error => console.log('error', error));
    }

    return (
        <div className="dashboard-form-container">
            <form onSubmit={handleSubmit} className="dashboard-form">
                <h1 className="form-title">Add Subdomain</h1>
                <p
                    ref={errorRef}
                    className={errorMsg ? "error-msg" : "offscreen"}
                    aria-live="assertive"
                    style={{ backgroundColor: errorColor }}
                >
                    {errorMsg}
                </p>
                <div className="dashboard-input-label-container">
                    <label className="dashboard-form-label" htmlFor="subdomain">Subdomain</label>
                    <input
                        className="dashboard-form-input"
                        placeholder="Enter Subdomain"
                        type="text"
                        required
                        id="subdomain"
                        ref={subdomainRef}
                        onChange={(e) => setSubdomain(e.target.value)}
                    />
                </div>
                <input type="submit" value='Add Subdomain' className="dashboard-btn dashboard-submit" />
            </form>
        </div>
    )
}

export default AddSubdomain;