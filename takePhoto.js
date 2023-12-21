const { exec } = require('child_process');

const takePhoto = () => {

    const command = `rpicam-jpeg -o photo.jpg -t 2000 --width 640 --height 480 --ev 0.5`;

    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error taking photo: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`Error: ${stderr}`);
            return;
        }
        console.log(`Photo taken and saved as ${filename}`);
    });
}


module.exports = takePhoto;