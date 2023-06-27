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
import SubCourses from "./components/SubCourses";
import SubCourseMaterials from "./components/SubCourseMaterials";
import SubCourseAnnouncements from "./components/SubCourseAnnouncements";
import Admin from "./middleware/Admin";

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
                                element: <MyCourses />
                            },
                            {
                                path: 'organization-courses',
                                element: <OrganizationCourses />
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
                                element: <MaterialsPage />,
                            },
                            {
                                path: 'my-courses/:id/announcements',
                                element: <AnnouncementsPage />,
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
                                element: <SubCourses />
                            },
                            {
                                path: 'my-courses/:id/sub-courses/:subId/materials',
                                element: <SubCourseMaterials />
                            },
                            {
                                path: 'my-courses/:id/sub-courses/:subId/announcements',
                                element: <SubCourseAnnouncements />
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