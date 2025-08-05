const mongoose = require('mongoose');

const PageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  meta_data: {
    type: mongoose.Schema.Types.Mixed,
    default: {},
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
}, { timestamps: true });

const Page = mongoose.model('Page', PageSchema);

module.exports = Page;
