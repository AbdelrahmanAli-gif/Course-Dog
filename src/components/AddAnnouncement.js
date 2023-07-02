import { useEffect, useRef, useState } from 'react';
import '../styles/AddAnnouncement.css';
import { useNavigate, useParams } from 'react-router-dom';
import { getAuthUser } from '../services/Storage';
import { baseURL } from '../api/axios';

function AddAnnouncement() {

    const { id } = useParams();
    const navigate = useNavigate();

    const titleRef = useRef();
    const announcementRef = useRef();

    const [title, setTitle] = useState('');
    const [announcement, setAnnouncement] = useState('');

    useEffect(() => {
        titleRef.current.focus();
    }, []);

    useEffect(() => {
    }, [title, announcement]);

    const user = getAuthUser();

    const handleSubmit = async (e) => {
        e.preventDefault();
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Token ${user}`);
        var formdata = new FormData();
        formdata.append("announcement", announcement);
        formdata.append("title", title);
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };
        fetch(`${baseURL}announcements/manage-announcements/${id}/`, requestOptions)
            .then(response => navigate(`/my-courses/${id}/announcements`))
            .catch(error => console.log('error', error));
    }

    return (
        <div className='announcement-main-content'>
            <h1 className='page-header'>ADD ANNOUNCEMENT</h1>
            <form className="form-content" onSubmit={handleSubmit}>
                <div className="title-container">
                    <label htmlFor="title" className='form-label'>Announcement Title</label>
                    <input
                        id="title"
                        type="text"
                        className='form-input'
                        ref={titleRef}
                        onChange={(e) => setTitle(e.target.value)}
                        autoComplete='off'
                    />
                </div>
                <div className="body-container">
                    <label htmlFor="body" className='form-label'>Announcement</label>
                    <textarea
                        id="body"
                        type="text"
                        required
                        className='form-input announcement-body'
                        ref={announcementRef}
                        onChange={(e) => { setAnnouncement(e.target.value) }}
                        autoComplete='off'
                    />
                </div>
                <input type='submit' value='Add Announcement' className='submit-btn' />
            </form>
        </div>
    )
}

export default AddAnnouncement;