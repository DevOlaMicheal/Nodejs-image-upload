const express = require('express')
const app = express()
const fileUpload = require('express-fileupload')
const path = require('path')
require('dotenv').config()
const upload = require('./routes/upload')
const cloudinary = require('cloudinary').v2

cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET
  });
 
app.use(express.static('./public'))
app.use(express.json())
app.use(fileUpload({useTempFiles: true}))


app.use('/upload', upload)

app.use((req, res) => {
    res.send('route not found')
})

app.listen(4000, () => console.log('app listening on port 4000'))
