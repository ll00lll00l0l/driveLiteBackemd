const File = require('../models/File');
const path = require('path');

exports.uploadFile = async (req, res) => {
  try {
    const file = req.file;

    const newFile = new File({
      filename: file.filename,
      originalname: file.originalname,
      size: file.size,
      contentType: file.mimetype,
      url: `${req.protocol}://${req.get('host')}/media/uploads/${file.filename}`,
      user: req.user._id
    });

    await newFile.save();

    res.status(201).json({ status: true, message: 'File uploaded', data: newFile });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};

exports.getAllFiles = async (req, res) => {
  try {
    const { limit = 10, page = 1, fileType, } = req.query;
    const query = { user: req.user._id };

    if (fileType) query.contentType = fileType;
    const files = await File.find(query)
      .sort({ uploadedAt: -1 })
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit));

    const total = await File.countDocuments(query);

    res.json({
      status: true,
      total,
      page: parseInt(page),
      limit: parseInt(limit),
      data: files,
    });
  } catch (error) {
    res.status(500).json({ status: false, message: 'Failed to fetch files', error });
  }
};

exports.getFileById = async (req, res) => {
  const file = await File.findOne({ _id: req.params.id, user: req.user._id });
  if (!file) return res.status(404).json({ status: false, message: 'File not found' });
  res.json({ status: true, data: file });
};

exports.deleteFile = async (req, res) => {
  const file = await File.findOneAndDelete({ _id: req.params.id, user: req.user._id });
  if (!file) return res.status(404).json({ status: false, message: 'File not found or unauthorized' });

  const fs = require('fs');
  const filePath = path.join(__dirname, '..', 'uploads', file.filename);
  fs.unlink(filePath, err => {
    if (err) console.error('Error deleting file:', err.message);
  });

  res.json({ status: true, message: 'File deleted' });
};
