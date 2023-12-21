require('dotenv').config();
const cloudinary = require('cloudinary').v2;
const fs = require('fs');

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

const uploadPhoto = async (filename) => {
    try {
        const result = await cloudinary.uploader.upload(filename);
        console.log(`Photo uploaded to ${result.url}`);
        fs.unlinkSync(filename);
        return result.url;
    } catch (error) {
        console.error(`Error uploading photo: ${error.message}`);
    }
};

module.exports = uploadPhoto;