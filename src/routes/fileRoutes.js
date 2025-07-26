const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { uploadFile, getAllFiles, getFileById, deleteFile } = require('../controllers/fileController');
const authenticateUser = require('../middleware/authMiddleware');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'src/media/uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  }
});
const upload = multer({ storage: storage });

router.post('/upload', authenticateUser, upload.single('file'), uploadFile);
router.get('/', authenticateUser, getAllFiles);
router.get('/:id', authenticateUser, getFileById);
router.delete('/:id', authenticateUser, deleteFile);

module.exports = router;
