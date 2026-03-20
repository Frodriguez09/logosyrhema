const Post = require('../models/Post');

// Crear post
exports.createPost = async (req, res) => {
  try {
    const { title, content, category, videoUrl, showDonation, donationMessage } = req.body; 
    
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    
    const post = await Post.create({
      title,
      content,
      category,
      slug,
      videoUrl,
      author: req.userId,
      image: req.body.image || null,
      showDonation,  
      donationMessage  
    });

    const populatedPost = await Post.findById(post._id)
      .populate('author', 'username email')
      .populate('category', 'name slug');

    res.status(201).json(populatedPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener todos los posts con paginación y filtros
exports.getPosts = async (req, res) => {
  try {
    const { 
      category, 
      search, 
      year,
      page = 1, 
      limit = 9,
      sort = '-createdAt' 
    } = req.query;

    let query = { published: true };

    // Filtro por categoría
    if (category) query.category = category;

    // Filtro por búsqueda
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } }
      ];
    }

    // Filtro por año
    if (year) {
      const startDate = new Date(`${year}-01-01`);
      const endDate = new Date(`${year}-12-31T23:59:59`);
      query.createdAt = { $gte: startDate, $lte: endDate };
    }

    // Calcular skip para paginación
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Ejecutar query con paginación
    const posts = await Post.find(query)
      .populate('author', 'username')
      .populate('category', 'name slug')
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit));

    // Contar total de posts para paginación
    const total = await Post.countDocuments(query);

    res.json({
      posts,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / parseInt(limit)),
        totalPosts: total,
        hasMore: skip + posts.length < total,
        limit: parseInt(limit)
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener años disponibles (para filtro)
exports.getAvailableYears = async (req, res) => {
  try {
    const years = await Post.aggregate([
      { $match: { published: true } },
      {
        $group: {
          _id: { $year: '$createdAt' },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: -1 } }
    ]);

    const yearsData = years.map(y => ({
      year: y._id,
      count: y.count
    }));

    res.json(yearsData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener estadísticas del blog
exports.getBlogStats = async (req, res) => {
  try {
    const totalPosts = await Post.countDocuments({ published: true });
    const totalViews = await Post.aggregate([
      { $match: { published: true } },
      { $group: { _id: null, total: { $sum: '$views' } } }
    ]);

    const postsByCategory = await Post.aggregate([
      { $match: { published: true } },
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 }
        }
      },
      {
        $lookup: {
          from: 'categories',
          localField: '_id',
          foreignField: '_id',
          as: 'categoryInfo'
        }
      }
    ]);

    res.json({
      totalPosts,
      totalViews: totalViews[0]?.total || 0,
      postsByCategory
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener un post por slug
exports.getPost = async (req, res) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug })
      .populate('author', 'username email')
      .populate('category', 'name slug');
    
    if (!post) {
      return res.status(404).json({ message: 'Post no encontrado' });
    }

    // Incrementar vistas
    post.views += 1;
    await post.save();

    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualizar post
exports.updatePost = async (req, res) => {
  try {
    // Solo permitir campos específicos
    const allowedFields = ['title', 'content', 'category', 'videoUrl',
                           'showDonation', 'donationMessage', 'published', 'image'];
    const updateData = {};
    allowedFields.forEach(field => {
      if (req.body[field] !== undefined) {
        updateData[field] = req.body[field];
      }
    });

    // Regenerar slug si cambió el título
    if (updateData.title) {
      updateData.slug = updateData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
    }

    const post = await Post.findByIdAndUpdate(
      req.params.id,
      updateData, // ← Solo campos permitidos
      { new: true, runValidators: true }
    )
      .populate('author', 'username')
      .populate('category', 'name slug');

    if (!post) return res.status(404).json({ message: 'Post no encontrado' });
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Eliminar post
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    
    if (!post) {
      return res.status(404).json({ message: 'Post no encontrado' });
    }

    res.json({ message: 'Post eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener todos los posts (admin - incluye no publicados)
exports.getAllPostsAdmin = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('author', 'username')
      .populate('category', 'name slug')
      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};