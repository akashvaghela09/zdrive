import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import S3 from "aws-sdk/clients/s3";
import { createClient } from '@supabase/supabase-js'

const Upload = () => {

    const [fileId, setFileId] = useState("");
    const [file, setFile] = useState("");
    const [fileName, setFileName] = useState("");
    const [fileType, setFileType] = useState("");
    const [fileSize, setFileSize] = useState(0);

    const {
        REACT_APP_ACCESS_KEY_ID,
        REACT_APP_SECRET_ACCESS_KEY,
        REACT_APP_BASE_URL,
        REACT_APP_SUPABASE_KEY
    } = process.env;

    // Storj
    const accessKeyId = REACT_APP_ACCESS_KEY_ID;
    const secretAccessKey = REACT_APP_SECRET_ACCESS_KEY;
    const endpoint = "https://gateway.storjshare.io";
    const bucketName = "anon-upload";

    // Supabase
    const supabaseUrl = REACT_APP_BASE_URL;
    const supabaseKey = REACT_APP_SUPABASE_KEY;

    // Create a new instance of S3
    const s3 = new S3({
        accessKeyId,
        secretAccessKey,
        endpoint,
        s3ForcePathStyle: true,
        signatureVersion: "v4",
        connectTimeout: 0,
        httpOptions: { timeout: 0 },
    });

    // Create a new instance of Supabase
    const supabase = createClient(supabaseUrl, supabaseKey)

    const handleFileChange = (e) => {
        let rawFile = e.target.files[0];
        setFileId(uuidv4().split('-').join(''));
        setFile(rawFile);
        setFileName(rawFile.name);
        setFileType(rawFile.type);
        setFileSize(rawFile.size);
    }

    const handleUpload = async (e) => {
        const params = {
            Bucket: bucketName,
            Key: fileId,
            Body: file
        };

        try {
            let res = await s3.upload(params, {
                partSize: 64 * 1024 * 1024
            }).promise();

            console.log(res);
            console.log("Successfully uploaded file");

            const { data, error } = await supabase
            .from('anon-files')
            .insert([
                {
                    name: fileName,
                    size: fileSize,
                    type: fileType,
                    s3_key: fileId,
                },
            ])
            .select()

        console.log(data, error)
        } catch (err) {
            console.error(err);
        }
    }

    const handleDownload = (e) => { }

    const handleDelete = (e) => { }

    const handleLog = async (e) => {
        console.log(fileId);
        console.log(file);
        console.log(fileName);
        console.log(fileType);
        console.log(fileSize);

        const { data, error } = await supabase
            .from('anon-files')
            .insert([
                {
                    name: fileName,
                    size: fileSize,
                    type: fileType,
                    s3_key: fileId,
                },
            ])
            .select()

        console.log(data, error)
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