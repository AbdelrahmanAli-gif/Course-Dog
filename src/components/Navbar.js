import '../styles/Navbar.css'
import Logo from '../assests/logo.svg';
import SearchIcon from '../assests/search.svg';
import UserIcon from '../assests/user.svg';
import HamburgerMenu from '../assests/hamburger.svg';
import Close from '../assests/close.svg';
import { useEffect, useRef, useState } from 'react';
import { CourseSearchService } from '../services/CourseSearchService';
import { SearchResultCard } from './SearchResultCard';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { getAuthUser, removeAuthGroup, removeAuthOrg, removeAuthUser } from '../services/Storage';
import axios from '../api/axios';

function Navbar() {

    // const searchService = new CourseSearchService()

    const navigator = useNavigate();

    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const searchInputRef = useRef();

    const [clicked, setClicked] = useState(false);

    useEffect(() => {
        initiateSearch()
    }, [searchTerm])

    useEffect(() => {
        setSearchResults([]);
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

    const GET_USER_COURSES_URL = "courses/list-user-courses/";
    const user = getAuthUser();
    const config = {
        headers: {
            'Authorization': `Token ${user}`
        }
    };

    async function initiateSearch() {
        // searchService.seachCourses(searchTerm)
        //     .then((data) => {
        //         setSearchResults(data)
        //     })
        if (searchTerm === "") return [];
        try {
            const response = await axios.get(
                GET_USER_COURSES_URL,
                config
            );
            const courses = response.data;
            setSearchResults(courses.filter((course) => {
                return course.name.toLowerCase().includes(searchTerm);
            }));
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

    return (
        <>
            <div className='navbar'>
                <div className='navbar-list'>
                    <div className='navbar-first-section'>
                        <div className='navbar-identity'>
                            <div className='navbar-logo-container'>
                                <img className='navbar-logo' src={Logo} alt='' />
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
                                <img className='navbar-logo' src={SearchIcon} alt='' />
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
                                    searchResults.map((result) => {
                                        return <SearchResultCard course={result} className="result" key={result.id}/>
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
                            <img className='navbar-logo' src={SearchIcon} alt='' />
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
                                searchResults.map((result) => {
                                    return <SearchResultCard course={result} className="result" key={result.id}/>
                                })
                            }
                        </div>
                    </div>
                    <div className='user-logo-container'>
                        <Link className='user-logo-btn' to={'/profile'}>
                            <img className='user-logo' src={UserIcon} alt='' />
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