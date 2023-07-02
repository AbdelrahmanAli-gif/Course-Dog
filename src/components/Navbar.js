import '../styles/Navbar.css'
import { useEffect, useRef, useState } from 'react';
import { CourseSearchService } from '../services/CourseSearchService';
import { SearchResultCard } from './SearchResultCard';
import { Link, Outlet, useNavigate, useParams } from 'react-router-dom';
import { getAuthUser, removeAuthGroup, removeAuthOrg, removeAuthUser } from '../services/Storage';
import axios from '../api/axios';
import { CourseDog, HamburgerMenu, Search, User, Close } from '../images/Images';

function Navbar() {

    // const searchService = new CourseSearchService()

    const navigator = useNavigate();
    const url = window.location.href;

    const [searchTerm, setSearchTerm] = useState("");
    const [courses, setCourses] = useState([]);
    const [materials, setMaterials] = useState([]);
    const [announcements, setAnnouncements] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const searchInputRef = useRef();

    const [clicked, setClicked] = useState(false);

    useEffect(() => {
        initiateSearch()
    }, [searchTerm])

    useEffect(() => {
        setSearchResults([]);
        setSearchTerm('');
        if (url.includes('materials')) {
            getMaterials();
        } else if (url.includes('announcements')) {
            getAnnouncements();
        } else {
            getCourses();
        }
    }, [navigator])

    function updateSearchTerm(newTerm) {
        setSearchTerm(newTerm);
        initiateSearch();
    }

    function handleSearchInputFocus(isFocused) {
        // return;
        let domEle = searchInputRef.current
        if (isFocused) {
            domEle.classList.add("search-input-focus")
            initiateSearch()
        } else {
            domEle.classList.remove("search-input-focus")
            // setSearchResults([])
        }
    }

    const { id } = useParams();
    const GET_COURSE_MATERIALS = `materials/upload-material/${id}/`;
    const GET_COURSE_ANNOUNCEMENTS = `announcements/manage-announcements/${id}/`;
    const GET_USER_COURSES_URL = "courses/list-user-courses/";
    const user = getAuthUser();
    const config = {
        headers: {
            'Authorization': `Token ${user}`
        }
    };

    const getCourses = async () => {
        const response = await axios.get(
            GET_USER_COURSES_URL,
            config
        );
        setCourses(response.data);
    }

    const getMaterials = async () => {
        const response = await axios.get(
            GET_COURSE_MATERIALS,
            config
        );
        setMaterials(response.data['materials']);
    }

    const getAnnouncements = async () => {
        const response = await axios.get(
            GET_COURSE_ANNOUNCEMENTS,
            config
        );
        setAnnouncements(response.data['announcements']);
    }

    async function initiateSearch() {
        // searchService.seachCourses(searchTerm)
        //     .then((data) => {
        //         setSearchResults(data)
        //     })
        if (searchTerm === "") return [];
        try {
            if (url.includes('materials')) {
                if (searchTerm === "") setSearchResults([]);
                // const response = await axios.get(
                //     GET_COURSE_MATERIALS,
                //     config
                // );
                // const materials = response.data['materials'];
                setSearchResults(materials.filter((material) => {
                    return material.file_name.toLowerCase().includes(searchTerm.toLowerCase());
                }));
            }
            else if (url.includes('announcement')) {
                if (searchTerm === "") return [];
                // const response = await axios.get(
                //     GET_COURSE_ANNOUNCEMENTS,
                //     config
                // );
                // const announcements = response.data['announcements'];
                setSearchResults(announcements.filter((announcement) => {
                    return announcement.content.toLowerCase().includes(searchTerm.toLocaleLowerCase())
                }));
            }
            else {
                if (searchTerm === "") return [];
                // const response = await axios.get(
                //     GET_USER_COURSES_URL,
                //     config
                // );
                // const courses = response.data;
                setSearchResults(courses.filter((course) => {
                    return course.name.toLowerCase().includes(searchTerm.toLowerCase());
                }));
            }
        }
        catch (error) {
            console.log(error);
        };
    }

    const handleMobileNavbar = () => {
        setClicked(!clicked);
    }

    const handleLogout = () => {
        removeAuthUser();
        removeAuthGroup();
        removeAuthOrg();
        navigator('/');
    }

    const clearSearch = () => {
        setSearchResults([]);
        setSearchTerm('');
    }

    return (
        <>
            <div className='navbar'>
                <div className='navbar-list'>
                    <div className='navbar-first-section'>
                        <div className='navbar-identity'>
                            <div className='navbar-logo-container'>
                                <img className='navbar-logo' src={CourseDog} alt='' />
                            </div>
                            <span className='navbar-title'>Course Dog</span>
                        </div>
                    </div>
                </div>
                <button className='hamburger-icon-container' onClick={handleMobileNavbar}>
                    <img className='hamburger-icon' src={clicked ? Close : HamburgerMenu} />
                </button>
                <div className='mobile-navbar' style={clicked ? { display: 'block' } : { display: 'none' }}>
                    <div className='mobile-navbar-list'>
                        <Link className='navbar-link' to={'/my-courses'}>My Courses</Link>
                        <Link className='navbar-link' to={'/organization-courses'}>Organization Courses</Link>
                        <Link className='navbar-link' to={'/profile'}>Profile</Link>
                        <button className='mobile-logout' onClick={handleLogout}>Logout</button>
                        <div className='search-field'>
                            <div className='search-icon'>
                                <img className='navbar-logo' src={Search} alt='' />
                            </div>
                            <div className='clear-icon' onClick={clearSearch} style={{ display: searchTerm !== '' ? 'block' : 'none' }}>
                                <img className='navbar-logo' src={Close} />
                            </div>
                            <input
                                className='search-input'
                                placeholder='Search'
                                onChange={(event) => updateSearchTerm(event.target.value)}
                                onBlur={() => handleSearchInputFocus(false)}
                                onFocus={() => handleSearchInputFocus(true)}
                                ref={searchInputRef}
                                value={searchTerm}
                            />
                            <div className='search-results'>
                                {
                                    url.includes('materials') ?
                                        searchResults.map((result) => {
                                            return <SearchResultCard caller='materials' course={result} className="result" key={result.id} />
                                        }) : url.includes('announcements') ?
                                            searchResults.map((result) => {
                                                return <SearchResultCard caller='announcements' course={result} className="result" key={result.id} />
                                            }) : searchResults.map((result) => {
                                                return <SearchResultCard caller='course' course={result} className="result" key={result.id} />
                                            })
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className='links-section'>
                    <Link className='navbar-link' to={'/my-courses'}>My Courses</Link>
                    <Link className='navbar-link' to={'/organization-courses'}>Organization Courses</Link>
                    {/* <Link className='navbar-link' to={'/profile'}>Profile</Link> */}
                </div>
                <div className='navbar-second-section'>
                    <div className='search-field'>
                        <div className='search-icon'>
                            <img className='navbar-logo' src={Search} alt='' />
                        </div>
                        <div className='clear-icon' onClick={clearSearch} style={{ display: searchTerm !== '' ? 'block' : 'none' }}>
                            <img className='navbar-logo' src={Close} />
                        </div>
                        <input
                            className='search-input'
                            placeholder='Search'
                            onChange={(event) => updateSearchTerm(event.target.value)}
                            onBlur={() => handleSearchInputFocus(false)}
                            onFocus={() => handleSearchInputFocus(true)}
                            ref={searchInputRef}
                            value={searchTerm}
                        />
                        <div className='search-results'>
                            {
                                url.includes('materials') ?
                                    searchResults.map((result) => {
                                        return <SearchResultCard caller='materials' course={result} className="result" key={result.id} />
                                    }) : url.includes('announcements') ?
                                        searchResults.map((result) => {
                                            return <SearchResultCard caller='announcements' course={result} className="result" key={result.id} />
                                        }) : searchResults.map((result) => {
                                            return <SearchResultCard caller='course' course={result} className="result" key={result.id} />
                                        })
                            }
                        </div>
                    </div>
                    <div className='user-logo-container'>
                        <Link className='user-logo-btn' to={'/profile'}>
                            <img className='user-logo' src={User} alt='' />
                        </Link>
                        <select className='logout' onChange={handleLogout} defaultValue={''}>
                            <option value={''} disabled hidden></option>
                            <option>Logout</option>
                        </select>
                    </div>
                </div>
            </div>
            <Outlet />
        </>
    )
}

export default Navbar;