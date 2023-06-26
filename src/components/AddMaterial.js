import { useRef, useState } from 'react';
import '../styles/AddMaterial.css';
import { getAuthUser } from '../services/Storage';
import { useNavigate, useParams } from 'react-router-dom';

function AddMaterial() {

    const [file, setFile] = useState(null);
    const fileRef = useRef();
    const user = getAuthUser();
    const { id } = useParams();
    const navigator = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Token ${user}`);
        var formdata = new FormData();
        formdata.append("file", file);
        formdata.append("file_name", file.name);
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        fetch(`http://127.0.0.1:8000/materials/upload-material/${id}/`, requestOptions)
            .then(response => navigator(`/my-courses/${id}/materials`))
            .catch(error => console.log('error', error));
    }

    return (
        <div className='content-container'>
            <h1 className='page-header'>ADD MATERIAL</h1>
            <form className='material-main-content' onSubmit={handleSubmit}>
                <div className='select-file-container'>
                    <label className='form-label' htmlFor='selected-file'>Select File</label>
                    <input
                        type='file'
                        className='form-input'
                        id='selected-file'
                        ref={fileRef}
                        required
                        onChange={(e) => setFile(e.target.files[0])}
                    />
                </div>
                <div className='file-details-container'>
                    {
                        file ? (
                            <div>
                                <p>{file.name}</p>
                                <p>{file.type}</p>
                                {/* <p>{file.lastModifiedDate.toDateString()}</p> */}
                            </div>
                        ) : (
                            <p>No file uploaded</p>
                        )
                    }
                </div>
                <input type='submit' className='submit-btn' value='Upload Material' />
            </form>
        </div>
    )
}

export default AddMaterial;