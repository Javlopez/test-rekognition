require('dotenv').config()

import aws from 'aws-sdk'

const Rekognition = new aws.Rekognition({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
})

export default Rekognition

