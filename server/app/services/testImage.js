const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');
const imageService = require('./imageService');



// Get the absolute path to the file in the same folder as the script
const FILE_PATH = path.resolve(__dirname, 'test.jpg');

async function uploadFile() {
    const upload = await imageService.upload('test.jpg')
    const PUT_URL = upload.putSignedUrl

    try {
        const response = await fetch(PUT_URL, {
            method: 'PUT',
            body: fs.createReadStream(FILE_PATH)
        });

        if (response.ok) {
            console.log('File uploaded successfully!');
        } else {
            console.error('Failed to upload file:', response.statusText);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

uploadFile();