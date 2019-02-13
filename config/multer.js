const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
    cb(null, 'public/storage/')
  },
	filename: (req, file, cb) => {
		cb(null, file.originalname);
	}
});

module.exports = multer({ storage: storage });
