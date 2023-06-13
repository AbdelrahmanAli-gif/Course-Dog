import { Navigate, Outlet } from "react-router-dom";
import { getAuthUser } from "../services/Storage";

function Guest(){

    const authUser = getAuthUser();

    return (
        <>
            {
                authUser ? <Outlet /> : <Navigate to={'/'} />
            }
        </>
    );
}

export default Guest;