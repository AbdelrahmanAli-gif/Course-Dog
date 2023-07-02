import { useRef, useState } from 'react';
import '../styles/EditProfile.css';
import { getAuthUser } from '../services/Storage';
import { useNavigate } from 'react-router-dom';
import { baseURL } from '../api/axios';

function EditProfile() {

    const [whatsAppNumber, setWhatsAppNumber] = useState('');
    const [facebookId, setFacebookId] = useState('');
    const whatsAppRef = useRef();
    const facebookRef = useRef();
    const user = getAuthUser();
    const navigator = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Token ${user}`);
        var formdata = new FormData();
        formdata.append("whatsapp_number", whatsAppNumber);
        formdata.append("facebook_id", facebookId);
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };
        fetch(`${baseURL}user-profile/profile/`, requestOptions)
            .then(response => navigator('/profile'))
            .catch(error => console.log('error', error));
    }

    return (
        <div className='edit-profile-main-container'>
            <h1 className='page-header'>EDIT PROFILE</h1>
            <form className='edit-profile-content' onSubmit={handleSubmit}>
                <div className='whatsapp-container'>
                    <label className='form-label' htmlFor='whatsapp'>WhatsApp Number</label>
                    <input
                        id='whatsapp'
                        className='form-input'
                        type='tel'
                        ref={whatsAppRef}
                        onChange={(e) => setWhatsAppNumber(e.target.value)}
                    />
                </div>
                <div className='facebook-container'>
                    <label className='form-label' htmlFor='facebook'>Facebook ID</label>
                    <input
                        id='facebook'
                        className='form-input'
                        type='tel'
                        ref={facebookRef}
                        onChange={(e) => setFacebookId(e.target.value)}
                    />
                </div>
                <input type='submit' className='submit-btn' value='Submit' />
            </form>
        </div>
    )
}

export default EditProfile;