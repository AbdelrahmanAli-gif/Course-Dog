import { createBrowserRouter } from "react-router-dom";
import Login from "./components/Login";
import OAuthSignUp from "./components/OAuthSignUp";
import ForgotPassword from "./components/ForgotPassword";
import Navbar from "./components/Navbar";
import App from "./App";
import Guest from "./middleware/Guest";
import User from "./middleware/User";
import AddAnnouncement from "./components/AddAnnouncement";
import AddMaterial from "./components/AddMaterial";
import UserProfile from "./components/UserProfile";
import EditProfile from "./components/EditProfile";
import ImportCourse from "./components/ImportCourse";
import Dashboard from "./components/Dashboard";
import DashboardCourses from "./components/DashboardCourses";
import CourseAdmins from "./components/CourseAdmins";
import AddAdmin from "./components/AddAdmin";
import AddCourse from "./components/AddCourse";
import OrganizationAdmins from "./components/OrganizationAdmins";
import Subdomains from "./components/Subdomains";
import AddSubdomain from "./components/AddSubdomain";
import Admin from "./middleware/Admin";
import CoursesPage from "./components/CoursesPage";
import CourseDataPage from "./components/CourseDataPage";

const ROUTER = createBrowserRouter([
    {
        element: <App />,
        children: [
            {
                element: <User />,
                children: [
                    {
                        element: <Navbar />,
                        children: [
                            {
                                path: 'my-courses',
                                element: <CoursesPage caller='user' />
                            },
                            {
                                path: 'organization-courses',
                                element: <CoursesPage caller='organization' />
                            },
                            {
                                path: 'profile',
                                element: <UserProfile />
                            },
                            {
                                path: 'profile/edit-profile',
                                element: <EditProfile />
                            },
                            {
                                path: 'my-courses/:id/materials',
                                element: <CourseDataPage caller='course' data='materials' />,
                            },
                            {
                                path: 'my-courses/:id/announcements',
                                element: <CourseDataPage caller='course' data='announcements' />,
                            },
                            {
                                path: 'my-courses/:id/materials/add',
                                element: <AddMaterial />
                            },
                            {
                                path: 'my-courses/:id/announcements/add',
                                element: <AddAnnouncement />
                            },
                            {
                                path: 'my-courses/:id/sub-courses',
                                element: <CoursesPage caller='subcourse' />
                            },
                            {
                                path: 'my-courses/:id/sub-courses/:subId/materials',
                                element: <CourseDataPage caller='subcourse' data='materials' />
                            },
                            {
                                path: 'my-courses/:id/sub-courses/:subId/announcements',
                                element: <CourseDataPage caller='subcourse' data='announcements' />
                            },
                            {
                                path: 'import-course',
                                element: <ImportCourse />
                            }
                        ]
                    }
                ]
            },
            {
                element: <Guest />,
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
            },
            {
                element: <Admin />,
                children: [
                    {
                        element: <Dashboard />,
                        children: [
                            {
                                path: '/courses',
                                element: <DashboardCourses />
                            },
                            {
                                path: '/courses/add-course',
                                element: <AddCourse />
                            },
                            {
                                path: '/courses/:id',
                                element: <CourseAdmins />
                            },
                            {
                                path: '/courses/:id/add-course-admin',
                                element: <AddAdmin caller='course' />
                            },
                            {
                                path: '/organization-admins',
                                element: <OrganizationAdmins />
                            },
                            {
                                path: '/organization-admins/add-organization-admin',
                                element: <AddAdmin caller='organization' />
                            },
                            {
                                path: '/subdomains',
                                element: <Subdomains />
                            },
                            {
                                path: '/subdomains/add-subdomain',
                                element: <AddSubdomain />
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        path: '*',
        element: <h1>Not Found</h1>
    },
]);

export default ROUTER;