const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  image: { type: String },
  videoUrl: { type: String },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  slug: { type: String, unique: true },
  views: { type: Number, default: 0 },
  published: { type: Boolean, default: true },
  showDonation: { type: Boolean, default: false },  
  donationMessage: { type: String } 
}, { timestamps: true });

module.exports = mongoose.model('Post', postSchema);