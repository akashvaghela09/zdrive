import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { supabase} from '../supabase-config';
import { bucketName, s3 } from '../storJ-config';


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

            <div className='upload_wrapper'>
                <input type="file" onChange={(e) => handleFileChange(e)} />
                <button onClick={() => handleUpload()}>Upload</button>
            </div>
            {/* <div className='button_container'>
                <button className='red' onClick={() => handleDelete()}>Delete</button>
                <button className='gray' onClick={() => handleLog()}>Log Data</button>
            </div> */}
        </div>
    )
}

export { Upload };