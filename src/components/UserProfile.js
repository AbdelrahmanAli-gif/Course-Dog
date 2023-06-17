import { useEffect, useState } from 'react';
import { getAuthUser } from '../services/Storage';
import '../styles/UserProfile.css';
import axios from '../api/axios';
import { Link } from 'react-router-dom';

function UserProfile() {

    const user = getAuthUser();
    const [whatsAppNumber, setWhatsAppNumber] = useState('');
    const [facebookId, setFacebookId] = useState('');
    const [admin, setAdmin] = useState('');
    const GET_USER_DATA_URL = 'user-profile/profile/';
    const REQUEST_VERIFICATION_URL = 'user-profile/verify/';
    const config = {
        headers: {
            'Authorization': `Token ${user}`
        }
    };

    const getUserData = async () => {
        
        try {
            const response = await axios.get(
                GET_USER_DATA_URL,
                config
            );
            setWhatsAppNumber(response.data['whatsapp_number']);
            setFacebookId(response.data['facebook_id']);
            setAdmin(response.data['is_admin']);
        }
        catch (error){
            console.log(error);
        }
    }

    useEffect(() => {
        getUserData();
    }, []);

    const handleVerification = async () => {
        try {
            await axios.get(
                REQUEST_VERIFICATION_URL,
                config
            );
        }
        catch (error){
            console.log(error);
        }
    }

    return(
        <div className="profile-content-container">
            <h1 className='page-header'>PROFILE</h1>
            <div className="profile-main-content">
                <div className='btns-container'>
                    {
                        !admin ? (
                            <button className='btn' onClick={handleVerification}>
                                Request Verification
                            </button>
                        ) : (
                            null
                        )
                    }
                    <Link className='btn edit-profile' to={'edit-profile'}>Edit Profile</Link>
                </div>
                <div className='user-data'>
                    <p>WhatsApp Number: {whatsAppNumber ? whatsAppNumber : 'null'}</p>
                    <p>Facebook ID: {facebookId ? facebookId : 'null'}</p>
                    <p>Is Admin: {admin ? 'true' : 'false'}</p>
                </div>
            </div>
        </div>
    )
}

export default UserProfile;