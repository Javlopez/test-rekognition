import express from 'express'
import multer from 'multer'
import uuid from 'uuid/v4'



import {SimpleUpload} from "../components/UploadS3";
import Rekognition from "../components/Rekognition";


const router = express.Router()
const upload = multer()

const getKey = file => `${uuid()}${file.originalname.substring(file.originalname.lastIndexOf('.'))}`


router.post('/upload', upload.single('photo'), async (req, res) => {
  try {

    //const result = await recogniseFromBuffer(req.file.buffer)


    const data = await SimpleUpload(req.file.buffer, getKey(req.file))

    const params = {
      Image: {
        S3Object: {
          Bucket: process.env.AWS_BUCKET,
          Name: data.Key
        },
      },
      Attributes: ['ALL']
    }

    const rekognitionData = await Rekognition.detectFaces(params).promise().then(data => data).catch(err => err)
    /*
    Rekognition.detectFaces(params, (err, response) => {
      if (err) {
        console.log(err, err.stack); // an error occurred
      } else {
        console.log(`Detected faces for: ${data.Location}`)
        response.FaceDetails.forEach()
      }
    });*/

    return res.status(200).json({
      success: true,
      data: data,
      rekData: rekognitionData
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      data: error.toString()
    })
  }
})

function Router(app) {
  app.use(`/api`, router)
}

export default Router
