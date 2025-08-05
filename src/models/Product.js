const mongoose = require('mongoose');
const { Schema, Types } = mongoose;

const FileSchema = new Schema({
  url: String,
  type: String, // e.g., "image/png", "application/pdf"
  name: String,
  uploadedAt: { type: Date, default: Date.now }
});

// Key-value field system
const FieldSchema = new Schema({
  key: { type: String, required: true }, // e.g. 'rate', 'color', 'reaction'
  value: Schema.Types.Mixed,
  type: { type: String, enum: ['static', 'computed'], default: 'static' },
  dependsOn: [String],  // Field keys this one depends on
  formula: String       // For computed logic, can be parsed by your app/AI
});

// Tags for NLP or AI categorization
const TagSchema = new Schema({
  label: { type: String, required: true },
  confidence: { type: Number, default: 1.0 }, // for AI-based suggestions
  source: { type: String, default: 'manual' } // 'ai', 'manual', etc.
});

// Relationships for product graphs
// const RelationshipSchema = new Schema({
//   relatedProduct: { type: Types.ObjectId, ref: 'Product' },
//   relationType: { type: String }, // e.g. 'variant', 'accessory', 'substitute'
// });

// Version/Change log
const ChangelogSchema = new Schema({
  changedAt: { type: Date, default: Date.now },
  changedBy: { type: String }, // user ID or name
  changes: Schema.Types.Mixed  // diff or updated fields
});

const ProductSchema = new Schema({
  name: { type: String, required: true },
  description: String,

  // 📦 Standard fields
  category: { type: String, index: true },
  standardRate: { type: Number },
  margin: { type: Number },

  // 🧠 Dynamic & computed fields
  fields: [FieldSchema],

  // 🗂 AI/ML metadata
  tags: [TagSchema],

  // 📎 Attachments
  files: [FileSchema],

  // 🧬 Graph-like relationships
  // relatedProducts: [RelationshipSchema],

  // 🕓 Audits
  changelogs: [ChangelogSchema],

  // 📅 Timestamps
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Product', ProductSchema);
