import S3 from "aws-sdk/clients/s3";

const {
    REACT_APP_ACCESS_KEY_ID,
    REACT_APP_SECRET_ACCESS_KEY,
    REACT_APP_BUCKET_NAME
} = process.env;

// Storj
const accessKeyId = REACT_APP_ACCESS_KEY_ID;
const secretAccessKey = REACT_APP_SECRET_ACCESS_KEY;
const bucketName = REACT_APP_BUCKET_NAME;
const endpoint = "https://gateway.storjshare.io";

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

export { s3, bucketName };