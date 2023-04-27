import '../styles/Navbar.css'

function Navbar(){
    return (
        <div className='navbar'>
            <div className='navbar-list'>
                <div className='navbar-first-section'>
                    <div className='identity'>
                        <div className='logo-container'>
                            <img className='logo' src={require('../assests/logo.jpeg')} alt=''/>
                        </div>
                        <span className='title'>Course Dog</span>
                    </div>
                </div>
            </div>
            <div className='navbar-second-section'>
                <div className='search-field'>
                    <div className='search-icon'>
                        <img className='logo' src={require('../assests/search.png')} alt='' />
                    </div>
                    <input className='search-input' placeholder='Search' />
                </div>
                <div className='logo-container'>
                    <img className='logo' src={require('../assests/user.png')} alt='' />
                </div>
            </div>
            
        </div>
    )
}

export default Navbar;