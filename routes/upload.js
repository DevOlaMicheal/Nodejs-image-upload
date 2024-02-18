const express = require('express')
const router = express.Router()
const path =require('path')
const cloudinary = require('cloudinary').v2
const fs = require('fs')

router.post('/local', async (req, res) => {

    try {
        // additional checks
        // no files available
        console.log(req.files);
        if(!req.files) {
            throw new Error("File is required")
        }

        let productImage = req.files.images

        // check image format
        if(!productImage.mimetype.startsWith('image')) {
            throw new Error("Upload a valid image")
        }

        const maxSize = 5000000
        if(productImage.size > maxSize) {
            throw new Error("image must be lesss than 5mb")
        }
        const imagePath = path.join(__dirname, '../public/uploads/' + `${productImage.name}`)
        console.log(imagePath);
        await productImage.mv(imagePath)

        res.status(200).json({image: {src: `/uploads/${productImage.name}`}})

    } catch (error) {
        res.send(error.message)
    }

})

router.post('/cloud', async (req, res) => {
    try {
        const result = await cloudinary.uploader.upload(

            req.files.image.tempFilePath,
            {use_filename: true, folder: 'test'}
        )
        
        console.log(result);
        fs.unlinkSync(req.files.image.tempFilePath)
       

        res.status(201).json({image: {src: result.secure_url}})
    } catch (error) {
        res.send(error)
    }
})

module.exports = router