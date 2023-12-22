const { exec } = require('child_process');
require('dotenv').config();
const cloudinary = require('cloudinary').v2;
const axios = require('axios');

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

const takeAndUploadPhoto = async () => {
    const command = `rpicam-jpeg -o photo.jpg -t 2000 --width 640 --height 480 --ev 0.5`;
    await new Promise((resolve, reject) => {
        exec(command, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error taking photo: ${error.message}`);
                reject(error);
            }
            if (stderr) {
                console.error(`Error: ${stderr}`);
                reject(stderr);
            }
            console.log(`Photo taken and saved as photo.jpg`);
            resolve();
        });
    });

    const result = await cloudinary.uploader.upload("photo.jpg");
    console.log(result.url);

    const data = {
        oreGrade: 'A',
        silicon: 0.5,
        iron: 0.5,
    };

    const response = await axios.post('4.227.178.188:3001/data/photo', {
        ml_detail: JSON.stringify(data),
        image_url: result.url
    });

    console.log(response.data);
};

takeAndUploadPhoto();
