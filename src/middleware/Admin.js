import { Navigate, Outlet } from "react-router-dom";
import { getAuthUser, getAuthGroup } from "../services/Storage";

function Admin(){

    const authUser = getAuthUser();
    const authGroup = getAuthGroup();

    return (
        <>
            {
                authUser ? (
                    authGroup === 'OrganizationAdmin' ?
                        <Outlet /> : <Navigate to={'/my-courses'} />
                ) : <Navigate to={'/'} />
            }
        </>
    );
}

export default Admin;