import { createBrowserRouter } from "react-router-dom";
import Login from "./components/Login";
import OAuthSignUp from "./components/OAuthSignUp";
import ForgotPassword from "./components/ForgotPassword";
import MyCourses from "./components/MyCourses";
import MaterialsPage from "./components/MaterialsPage";
import AnnouncementsPage from "./components/AnnouncementsPage";
import Navbar from "./components/Navbar";
import OrganizationCourses from "./components/OrganizationCourses";
import App from "./App";
import Guest from "./middleware/Guest";
import User from "./middleware/User";

const ROUTER = createBrowserRouter([
    {
        element: <App />,
        children: [
            {
                element: <Guest />,
                children: [
                    {
                        element: <Navbar />,
                        children: [
                            {
                                path: 'my-courses',
                                element: <MyCourses />
                            },
                            {
                                path: 'organization-courses',
                                element: <OrganizationCourses />
                            },
                            {
                                path: 'my-courses/:id/materials',
                                element: <MaterialsPage />,
                            },
                            {
                                path: 'my-courses/:id/announcements',
                                element: <AnnouncementsPage />,
                            }
                        ]
                    }
                ]
            },
            {
                element: <User />,
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
                ]
            }
        ]
    },
    {
        path: '*',
        element: <h1>Not Found</h1>
    }
]);

export default ROUTER;