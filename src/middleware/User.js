import { Navigate, Outlet } from "react-router-dom";
import { getAuthUser } from "../services/Storage";

function User(){

    const authUser = getAuthUser();

    return (
        <>
            {
                authUser ? <Navigate to={'/my-courses'} /> : <Outlet />
            }
        </>
    );
}

export default User;