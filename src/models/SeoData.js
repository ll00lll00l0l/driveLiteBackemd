// models/SeoData.js
const mongoose = require('mongoose');

const SeoDataSchema = new mongoose.Schema({
  page: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Page',
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  content: {
    type: String, 
    required: false,
  },
}, {
  timestamps: true
});

module.exports = mongoose.model('SeoData', SeoDataSchema);
