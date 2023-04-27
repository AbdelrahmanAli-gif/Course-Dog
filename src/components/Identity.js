import '../styles/Identity.css'

function Identity(){
    return (
        <div className='identity'>
            <img className='logo' src={require('../assests/logo.jpeg')} alt="logo" />
            <h2 className='title'>Course Dog</h2>
        </div>
    )
}

export default Identity;