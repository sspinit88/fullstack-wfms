const multer = require('multer');
const moment = require('moment');


const storage = multer.diskStorege({
  destination(req, file, cb) {
    cb(null, 'uploads/')
  },
  filename(req, file, cb) {
    const date = moment.format('DDMMYY-HHmmss_SSS');
    cb(null, `${date}-${file.originalname}`);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const limits  = {
  fileSize: 1024 * 1024 * 5,
};

module.exports = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: limits
});
