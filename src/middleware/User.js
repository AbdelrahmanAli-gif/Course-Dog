import { Navigate, Outlet } from "react-router-dom";
import { getAuthGroup, getAuthUser } from "../services/Storage";

function User() {

    const authUser = getAuthUser();
    const authGroup = getAuthGroup();

    return (
        <>
            {
                authUser ? (
                    authGroup === 'Student' || authGroup === 'CourseAdmin' ?
                        <Outlet /> : <Navigate to={'/courses'} />
                ) : <Navigate to={'/'} />
            }
        </>
    );
}

export default User;