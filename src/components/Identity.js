import '../styles/Identity.css'
import Logo from '../assests/logo.svg'

function Identity(){
    return (
        <div className='identity'>
            <img className='logo' src={Logo} alt="logo" />
            <h2 className='title'>Course Dog</h2>
        </div>
    )
}

export default Identity;