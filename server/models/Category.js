const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true, 
    unique: true 
  },
  slug: { 
    type: String, 
    unique: true 
  },
  description: { 
    type: String 
  }
}, { timestamps: true });

// Generar slug automáticamente antes de guardar
categorySchema.pre('save', function(next) {
  if (this.name) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
  next();
});

module.exports = mongoose.model('Category', categorySchema);