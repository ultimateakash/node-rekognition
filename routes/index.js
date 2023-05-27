const express = require('express');
const router = express.Router();
const upload = require('../helpers/upload.helper');
const uploadS3 = require('../helpers/uploads3.helper');
const rekognitionController = require('../controllers/rekognition.controller');

router.post('/face-authentication', upload.single('file'), rekognitionController.faceAuthentication);

router.post('/face-authentication-s3', uploadS3.single('file'), rekognitionController.faceAuthenticationS3);

module.exports = router;
