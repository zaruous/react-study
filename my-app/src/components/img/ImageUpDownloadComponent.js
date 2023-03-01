import React, { useState } from 'react';
import axios from 'axios';
import Request from "../../api/Request";

export default function ImageUpDownloadComponent(props) {
    const [selectedFiles, setSelectedFiles] = useState(null);

    const fileSelectedHandler = (event) => {
        setSelectedFiles(event.target.files);
    };

    const updateImg = function(){
        props.updateImg();
    }
    const fileUploadHandler = () => {
        const formData = new FormData();

        for (let i = 0; i < selectedFiles.length; i++) {
            formData.append('files', selectedFiles[i], encodeURIComponent(selectedFiles[i].name));
        }

        axios.post('/img/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(res => {
            console.log(res.data);
            updateImg();
        })
        .catch(err => {
            console.error(err);
        });
    };

    return (
        <div>
            <input type="file" multiple={true} onChange={fileSelectedHandler} />
            <button onClick={fileUploadHandler}>Upload</button>
        </div>
    );
}

