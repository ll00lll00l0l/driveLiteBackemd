const mongoose = require('mongoose');

const SectionSchema = new mongoose.Schema({
    page: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Page',
    required: true,
  },
  title: {
    type: String,
    required: false,
  },
  subtitle: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
  imagepath: {
    type: String,
    required: false,
  },
  button: {
    type: String,
    required: false,
  },
  link: {
    type: String,
    required: false,
  },
  sectionname: {
    type: String,
    required: false,
  },
  status: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true });

const Section = mongoose.model('Section', SectionSchema);

module.exports = Section;
