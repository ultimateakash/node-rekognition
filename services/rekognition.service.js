const { first } = require('lodash');
const { CompareFacesCommand } = require('@aws-sdk/client-rekognition');

const client = require('../utils/rekognition.util');

exports.compareFaces = (sourceImageBytes, targetImageBytes) => {
    const input = {
        SourceImage: {
            Bytes: sourceImageBytes
        },
        TargetImage: {
            Bytes: targetImageBytes
        },
        SimilarityThreshold: 70
        /**
         * only faces with a similarity score of greater than or equal to 70% are returned in the response. 
         * You can change this value by specifying the SimilarityThreshold parameter.
         */
    }
    const command = new CompareFacesCommand(input);
    return client.send(command)
        .then(result => {
            return first(result.FaceMatches)?.Similarity || 0;
        })
        .catch(error => {
            /**
             * If no faces are detected in the source or target images, 
             * CompareFaces returns an InvalidParameterException error.
             * return similarity = 0
             */ 
            if (error.Code == 'InvalidParameterException') {
                return 0;
            } else {
                throw error;
            }
        });
}

exports.compareFacesS3 = (sourceImageName, targetImageName) => {
    const input = {
        SourceImage: {
            S3Object: {
                Bucket: process.env.AWS_BUCKET,
                Name: sourceImageName
            }
        },
        TargetImage: {
            S3Object: {
                Bucket: process.env.AWS_BUCKET,
                Name: targetImageName
            }
        },
        SimilarityThreshold: 70
        /**
         * only faces with a similarity score of greater than or equal to 70% are returned in the response. 
         * You can change this value by specifying the SimilarityThreshold parameter.
         */
    }
    const command = new CompareFacesCommand(input);
    return client.send(command)
        .then(result => {
            return first(result.FaceMatches)?.Similarity || 0;
        })
        .catch(error => {
            /**
             * If no faces are detected in the source or target images, 
             * CompareFaces returns an InvalidParameterException error.
             * return similarity = 0
             */
            if (error.Code == 'InvalidParameterException') {
                return 0;
            } else {
                throw error;
            }
        });
}