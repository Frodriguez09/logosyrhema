const express = require('express');
const router = express.Router();
const {
  createPost,
  getPosts,
  getPost,
  updatePost,
  deletePost,
  getAllPostsAdmin,
  getAvailableYears,
  getBlogStats
} = require('../controllers/postController');
const authMiddleware = require('../middleware/auth');

// Rutas públicas
router.get('/', getPosts);
router.get('/years', getAvailableYears);
router.get('/stats', getBlogStats);
router.get('/:slug', getPost);

// Rutas protegidas (solo admin)
router.get('/admin/all', authMiddleware, getAllPostsAdmin);
router.post('/', authMiddleware, createPost);
router.put('/:id', authMiddleware, updatePost);
router.delete('/:id', authMiddleware, deletePost);

module.exports = router;