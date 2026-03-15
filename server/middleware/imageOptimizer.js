const sharp = require('sharp');
const path = require('path');

const optimizeImage = async (req, res, next) => {
  if (!req.file) return next();

  const filename = `optimized-${Date.now()}.webp`;
  const filepath = path.join('uploads', filename);

  try {
    await sharp(req.file.path)
      .resize(1200, 800, { fit: 'inside' })
      .webp({ quality: 80 })
      .toFile(filepath);

    req.file.filename = filename;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = optimizeImage;