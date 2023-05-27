const fs = require('fs');
const util = require('util');
const path = require('path'); 
const readFile = util.promisify(fs.readFile);
const { compareFaces, compareFacesS3 } = require('../services/rekognition.service');

exports.faceAuthentication = async (req, res) => {
    const sourceImageBytes = await readFile(path.join(__dirname, '../storage/image1.jpeg')); // Already stored.
    const targetImageBytes = await readFile(path.join(__dirname, `../storage/${req.file.filename}`));
    const similarity = await compareFaces(sourceImageBytes, targetImageBytes); 
    let message;
    if (similarity) { 
        message = 'Face authentication successful';
    } else {
        message = 'Face authentication failed'; 
    }
    return res.json({ message, similarity });
}

exports.faceAuthenticationS3 = async (req, res) => {
    const sourceImageName = 'image1.jpeg'; // Already uploaded on S3 bucket.
    const targetImageName = req.file.key;
    const similarity = await compareFacesS3(sourceImageName, targetImageName); 
    let message;
    if (similarity) { 
        message = 'Face authentication successful';
    } else {
        message = 'Face authentication failed'; 
    }
    return res.json({ message, similarity });
}