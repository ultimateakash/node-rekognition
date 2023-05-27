const multer = require('multer'); 
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'storage/')
    },
    filename: (req, file, cb) => {
        const fileName = `${Date.now()}_${Math.round(Math.random() * 1E9)}`;
        cb(null, `${fileName}${path.extname(file.originalname)}`); 
    }
});

const upload = multer({ storage: storage }); 

module.exports = upload;

