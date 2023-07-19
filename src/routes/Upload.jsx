import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import S3 from "aws-sdk/clients/s3";

const Upload = () => {

    const [fileId, setFileId] = useState("");
    const [file, setFile] = useState("");
    const [fileName, setFileName] = useState("");
    const [fileType, setFileType] = useState("");
    const [fileSize, setFileSize] = useState(0);

    const handleFileChange = (e) => {
        let rawFile = e.target.files[0];
        setFileId(uuidv4().split('-').join(''));
        setFile(rawFile);
        setFileName(rawFile.name);
        setFileType(rawFile.type);
        setFileSize(rawFile.size);
    }

    const handleUpload = (e) => { }

    const handleDownload = (e) => { }

    const handleDelete = (e) => { }

    const handleLog = (e) => {
        console.log(fileId);
        console.log(file);
        console.log(fileName);
        console.log(fileType);
        console.log(fileSize);
    }

    return (
        <div>
            <h1>Upload Page</h1>

            <div>
                <input type="file" onChange={(e) => handleFileChange(e)} />
                <button onClick={() => handleUpload()}>Upload</button>
            </div>
            <div className='button_container'>
                <button className='green' onClick={() => handleDownload()}>Download</button>
                <button className='red' onClick={() => handleDelete()}>Delete</button>
                <button className='gray' onClick={() => handleLog()}>Log Data</button>
            </div>
        </div>
    )
}

export { Upload };