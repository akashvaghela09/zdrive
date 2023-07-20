import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { supabase } from '../supabase-config';
import { bucketName, s3 } from '../storJ-config';

const Download = () => {
    const { 'fileId': fileId } = useParams();
    const [name, setName] = useState("");
    const [size, setSize] = useState(0);
    const [count, setCount] = useState(0);

    function formatFileSize(number) {
        if (number < 1024) {
            return number + ' B';
        } else if (number < 1048576) {
            const kbSize = (number / 1024).toFixed(2);
            return kbSize + ' KB';
        } else if (number < 1073741824) {
            const mbSize = (number / 1048576).toFixed(2);
            return mbSize + ' MB';
        } else {
            const gbSize = (number / 1073741824).toFixed(2);
            return gbSize + ' GB';
        }
    }

    // const 
    const handleDownload = async () => {
        let newCount = count + 1;

        const params = {
            Bucket: bucketName,
            Key: fileId
        }

        try {
            const url = s3.getSignedUrl("getObject", params);

            await fetch(url).then(async (res) => {
                if (res.status === 200) {
                    const blob = await res.blob();
                    const link = document.createElement("a");
                    link.href = window.URL.createObjectURL(blob);
                    link.download = name;

                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);

                    const { data, error } = await supabase
                        .from('anon-files')
                        .update({ "downloads": newCount })
                        .eq('s3_key', fileId)
                        .select()

                    setCount(newCount);
                } else if (res.status === 404) {
                    alert("File not found");
                } else {
                    alert("Something went wrong");
                }
            })
                .catch((err) => {
                    console.log("falied to fetch : ", err)
                });
        } catch (error) {
            console.log(`Error deleting file from S3: ${error}`);
        }
    }

    const fetchFileData = async () => {

        console.log("fileId => ", fileId);

        let { data, error } = await supabase
            .from('anon-files')
            .select('*')
            .eq('s3_key', fileId)
        console.log(data, error);

        let file = data[0];
        let size = formatFileSize(file.size);
        setName(file.name);
        setCount(file.downloads);
        setSize(size);
    }

    useEffect(() => {
        fetchFileData();
    }, [count])

    return (
        <div>
            <h1>Download Page</h1>
            <p>File Name: <b>{name}</b></p>
            <p>File Size: <b>{size}</b></p>
            <p>Download Count: <b>{count}</b></p>
            <button onClick={() => handleDownload()} className='green'>Download</button>
        </div>
    )
}

export { Download }