import '../styles/CourseCard.css'

function CourseCard(){
    return (
        <div className="card">
            <div className='card-image-container'>
                <img className="card-image" src={require('../assests/abstract-dark-blue-luxury-background-free-vector.jpg')} alt=""/>
            </div>
            <div className='course-data'>
                <div className='course-info'>
                    <h5 className='course-year'>Spring 2023</h5>
                    <h3 className='course-title'>Theory of Computations</h3>
                    <p className='course-instructor'>Dr. Godzilla</p>
                </div>
                <div className='platform-logo-container'>
                    <img className='platform-logo' src={require('../assests/pngwing 1.png')} alt=''/>
                </div>
            </div>
        </div>
    )
}

export default CourseCard;