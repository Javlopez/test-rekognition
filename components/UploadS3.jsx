require('dotenv').config()

import S3 from './s3'

const SimpleUpload = (buffer, key) => {
    const params = {
        ACL: 'public-read',
        Bucket: process.env.AWS_BUCKET,
        Body: buffer,
        Key: key
    };

    return S3.upload(params).promise().then(data => data).catch(err => err)
}
export { SimpleUpload }
