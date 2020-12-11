import React from 'react'
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { UploadPhotoAsync } from '../components/UploadPhotoAsync'

const Webcam = dynamic(import('../components/Webcam').then(instance => instance.Webcam), {
    ssr: false
})

const useStyles = makeStyles(theme => ({
    Layout: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    Card: {
        height: '200%',
        display: 'flex',
        flexDirection: 'column'
    },
    CardMedia: {
        paddingTop: '26.25%'
    },
    Paper: {
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(8),
            padding: `${theme.spacing(6)}px ${theme.spacing(4)}px`
        }
    },
    Container: {
        marginBottom: theme.spacing(10)
    },
    media: {
        height: 140,
    },
}))

const Index = () => {

    const classes = useStyles({})
    const [uploading, setUploading] = React.useState(false)
    //const [currentImage] = React.useState(null)
    const [photo, setPhoto] = React.useState('');
    const [faceDetails, setFaceDetails] = React.useState([]);


    const processImage = async image => {
        setUploading(true)

        const { success, data, rekData } = await UploadPhotoAsync('/api/upload', 'photo.jpeg', image)
        if (success) {
            console.log(data)
            setPhoto((photo) => data.Location);
            setFaceDetails((faceDetails) => [rekData.FaceDetails[0]]);
       }
        setUploading(false)
    }

    return (
      <Container className={classes.container}  maxWidth="md">
          <main className={classes.layout}>
              <Paper className={classes.paper} elevation={2}>
                  <Typography component="h1" variant="h4" align="center" gutterBottom>
                      Fetch data from your Face
                  </Typography>
                  <Typography component="h6" variant="h6" gutterBottom>
                      This application allow you get data from any photo
                  </Typography>

                  <Typography component="h6" gutterBottom>
                      Remember allow permission to access to the camera
                  </Typography>
                  <Webcam onCapture={processImage} isUploading={uploading} />
                  {photo &&
                  <>
                      <Box
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          flexDirection="column"
                          mb={3}
                      >
                          <Typography component="h3" variant="h4" align="center">
                              Processing your image!
                          </Typography>
                          <Typography component="h6"  align="center">
                              Results:
                              { JSON.stringify(faceDetails) }
                          </Typography>
                      </Box>
                  <Grid container spacing={4}>
                      <Card className={classes.Card} xs={12} sm={6} md={4}>
                          <Image
                              src={ photo }
                              width={640}
                              height={360}
                          />
                      </Card>
                  </Grid>
                  </>
                  }
              </Paper>
          </main>
      </Container>
    )
}
export default Index
