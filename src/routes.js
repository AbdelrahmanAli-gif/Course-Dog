import { createBrowserRouter } from "react-router-dom";
import Login from "./components/Login";
import OAuthSignUp from "./components/OAuthSignUp";
import ForgotPassword from "./components/ForgotPassword";
import MyCourses from "./components/MyCourses";
import CoursePage from "./components/CoursePage";
import Navbar from "./components/Navbar";
import OrganizationCourses from "./components/OrganizationCourses";
import App from "./App";

const ROUTER = createBrowserRouter([
    {
        element: <App />,
        children: [
            {
                path: '/',
                element: <Login />
            },
            {
                path: '/sign-up',
                element: <OAuthSignUp />
            },
            {
                path: '/forgot-password',
                element: <ForgotPassword />
            },
            {
                path: '/user',
                element: <Navbar />,
                children: [
                    {
                        path: 'my-courses',
                        element: <MyCourses />
                    },
                    {
                        path: 'oraganization-courses',
                        element: <OrganizationCourses />
                    },
                    {
                        path: 'my-courses/:id',
                        element: <CoursePage />,
                    }
                ]
            }
        ]
    }
]);

export default ROUTER;