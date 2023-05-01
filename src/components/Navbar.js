import '../styles/Navbar.css'

import Logo from '../assests/logo.svg';
import SearchIcon from '../assests/search.svg';
import UserIcon from '../assests/user.svg';

function Navbar(){
    return (
        <div className='navbar'>
            <div className='navbar-list'>
                <div className='navbar-first-section'>
                    <div className='identity'>
                        <div className='logo-container'>
                            <img className='logo' src={Logo} alt=''/>
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
                    <input className='search-input' placeholder='Search' />
                </div>
                <div className='logo-container'>
                    <img className='logo' src={UserIcon} alt='' />
                </div>
            </div>
        </div>
    )
}

export default Navbar;