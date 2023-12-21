const takePhoto = require('./takePhoto');
const uploadPhoto = require('./uploadPhoto');
const axios = require('axios');

const takePhotoAndUpload = async () => {
    takePhoto(async (filename) => {
        const url = await uploadPhoto(filename);

        if (url) {
            const data = {
                oreGrade: 'A',
                silicon: 0.5,
                iron: 0.5,
            };

            try {
                const response = await axios.post('https://oresense.onrender.com/data/photo', {
                    "ml_detail": JSON.stringify(data),
                    "image_url": url
                });
                console.log(response.data);
            } catch (error) {
                console.error(`Error posting data: ${error.message}`);
            }
        }
    });
};

setInterval(takePhotoAndUpload, 10000)