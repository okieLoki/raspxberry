require('dotenv').config();
const cloudinary = require('cloudinary').v2;
const fs = require('fs');

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

const uploadPhoto = (filename) => {
    cloudinary.uploader.upload(filename, (error, result) => {
        if (error) {
            console.error(`Error uploading photo: ${error.message}`);
            return;
        }
        console.log(`Photo uploaded to ${result.url}`);
        fs.unlinkSync(filename);
        return result.url;
    });
}

module.exports = uploadPhoto;