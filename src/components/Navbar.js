import '../styles/Navbar.css'

import Logo from '../assests/logo.svg';
import SearchIcon from '../assests/search.svg';
import UserIcon from '../assests/user.svg';
import { useEffect, useRef, useState } from 'react';
import { CourseSearchService } from '../services/CourseSearchService';
import { SearchResultCard } from './SearchResultCard';

function Navbar() {
    const searchService = new CourseSearchService()

    const [searchTerm, setSearchTerm] = useState("")
    const [searchResults, setSearchResults] = useState([])
    const searchInputRef = useRef()

    useEffect(() => {
        initiateSearch()
    }, [searchTerm])

    function updateSearchTerm(newTerm) {
        setSearchTerm(newTerm);
    }

    function handleSearchInputFocus(isFocused) {
        let domEle = searchInputRef.current
        if (isFocused) {
            domEle.classList.add("search-input-focus")
            initiateSearch()
        } else {
            domEle.classList.remove("search-input-focus")
            setSearchResults([])
        }
    }

    function initiateSearch() {
        searchService.seachCourses(searchTerm)
            .then((data) => {
                setSearchResults(data)
            })
    }

    return (
        <div className='navbar'>
            <div className='navbar-list'>
                <div className='navbar-first-section'>
                    <div className='identity'>
                        <div className='logo-container'>
                            <img className='logo' src={Logo} alt='' />
                        </div>
                        <span className='title'>Course Dog</span>
                    </div>
                </div>
            </div>
            <div className='navbar-second-section'>
                <div className='search-field'>
                    <div className='search-icon'>
                        <img className='logo' src={SearchIcon} alt='' />
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
                                return <SearchResultCard course={result} className="result" />
                            })
                        }
                    </div>
                </div>
                <div className='logo-container'>
                    <img className='logo' src={UserIcon} alt='' />
                </div>
            </div>
        </div>
    )
}

export default Navbar;