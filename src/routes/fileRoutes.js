const express = require('express');
const router = express.Router();
const { uploadFile, getAllFiles, getFileById, deleteFile } = require('../controllers/fileController');
const authenticateUser = require('../middleware/authMiddleware');
const upload = require('../middleware/s3UploadMiddleware.js');


router.post('/upload', authenticateUser, upload.single('file'), uploadFile);
router.get('/', authenticateUser, getAllFiles);
router.get('/:id', authenticateUser, getFileById);
router.delete('/:id', authenticateUser, deleteFile);

module.exports = router;
