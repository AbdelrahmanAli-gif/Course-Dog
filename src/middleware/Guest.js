import { Navigate, Outlet } from "react-router-dom";
import { getAuthUser, getAuthGroup } from "../services/Storage";

function Guest(){

    const authUser = getAuthUser();
    const authGroup = getAuthGroup();


    return (
        <>
            {
                authUser ? (
                    authGroup === 'Student' || authGroup === 'CourseAdmin' ?
                        <Navigate to={'/my-courses'} /> : <Navigate to={'/courses'} />
                ) : <Outlet />
            }
        </>
    );
}

export default Guest;