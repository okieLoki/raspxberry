const takePhoto = require('./takePhoto');
const uploadPhoto = require('./uploadPhoto');
const axios = require('axios');

const takePhotoAndUpload = () => {
    takePhoto();
    const url = uploadPhoto('photo.jpg');

    // tiwari ki script se aayega data
    data = {
        oreGrade: 'A',
        silicon: 0.5,
        iron: 0.5,
    }

    // send data to server
    const response = axios.post('https://oresense.onrender.com/data/photo', {
        "ml_detail": JSON.stringify(data),
        "image_url": url
    })

    console.log(response.data);
}

setInterval(takePhotoAndUpload, 10000);