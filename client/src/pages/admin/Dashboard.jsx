import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';

export default function Dashboard() {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('posts'); // 'posts' o 'categories'
  const { token } = useContext(AuthContext);

  useEffect(() => {
    fetchPosts();
    fetchCategories();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await axios.get('/api/posts/admin/all', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPosts(res.data);
    } catch (error) {
      console.error('Error al cargar posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get('/api/categories');
      setCategories(res.data);
    } catch (error) {
      console.error('Error al cargar categorías:', error);
    }
  };

  const handleDeletePost = async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar este post?')) return;
    
    try {
      await axios.delete(`/api/posts/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPosts(posts.filter(p => p._id !== id));
      alert('Post eliminado exitosamente');
    } catch (error) {
      console.error('Error al eliminar post:', error);
      alert('Error al eliminar el post');
    }
  };

  const handleDeleteCategory = async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar esta categoría?')) return;
    
    try {
      await axios.delete(`/api/categories/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCategories(categories.filter(c => c._id !== id));
      alert('Categoría eliminada exitosamente');
    } catch (error) {
      console.error('Error al eliminar categoría:', error);
      alert('Error al eliminar la categoría');
    }
  };

  return (
    <div className="min-h-screen bg-brand-white pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-brand-black mb-4">
            Panel de Administración
          </h1>
          <div className="flex gap-4">
            <Link
              to="/admin/nuevo-post"
              className="px-6 py-3 bg-brand-gold text-brand-white rounded-lg hover:bg-brand-yellow hover:text-brand-black transition-all font-bold"
            >
              + Nuevo Post
            </Link>
            <Link
              to="/admin/nueva-categoria"
              className="px-6 py-3 bg-brand-black text-brand-white rounded-lg hover:bg-brand-gold transition-all font-bold"
            >
              + Nueva Categoría
            </Link>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-8 border-b-2 border-brand-gold/30">
          <div className="flex gap-4">
            <button
              onClick={() => setActiveTab('posts')}
              className={`px-6 py-3 font-bold transition-all ${
                activeTab === 'posts'
                  ? 'text-brand-gold border-b-4 border-brand-gold'
                  : 'text-brand-black/60 hover:text-brand-black'
              }`}
            >
              Posts ({posts.length})
            </button>
            <button
              onClick={() => setActiveTab('categories')}
              className={`px-6 py-3 font-bold transition-all ${
                activeTab === 'categories'
                  ? 'text-brand-gold border-b-4 border-brand-gold'
                  : 'text-brand-black/60 hover:text-brand-black'
              }`}
            >
              Categorías ({categories.length})
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-brand-gold border-t-transparent"></div>
          </div>
        ) : (
          <>
            {/* Lista de Posts */}
            {activeTab === 'posts' && (
              <div className="bg-brand-white border-2 border-brand-gold/30 rounded-xl overflow-hidden">
                <table className="w-full">
                  <thead className="bg-brand-gold/10">
                    <tr>
                      <th className="px-6 py-4 text-left text-brand-black font-bold">Título</th>
                      <th className="px-6 py-4 text-left text-brand-black font-bold">Categoría</th>
                      <th className="px-6 py-4 text-left text-brand-black font-bold">Vistas</th>
                      <th className="px-6 py-4 text-left text-brand-black font-bold">Fecha</th>
                      <th className="px-6 py-4 text-center text-brand-black font-bold">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {posts.length === 0 ? (
                      <tr>
                        <td colSpan="5" className="px-6 py-8 text-center text-brand-black/60">
                          No hay posts creados
                        </td>
                      </tr>
                    ) : (
                      posts.map((post) => (
                        <tr key={post._id} className="border-t border-brand-gold/20 hover:bg-brand-yellow/10">
                          <td className="px-6 py-4 text-brand-black font-semibold">
                            {post.title}
                          </td>
                          <td className="px-6 py-4 text-brand-black/70">
                            {post.category?.name || 'Sin categoría'}
                          </td>
                          <td className="px-6 py-4 text-brand-black/70">
                            {post.views}
                          </td>
                          <td className="px-6 py-4 text-brand-black/70">
                            {new Date(post.createdAt).toLocaleDateString('es-MX')}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex gap-2 justify-center">
                              <Link
                                to={`/blog/${post.slug}`}
                                className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors text-sm font-semibold"
                              >
                                Ver
                              </Link>
                              <Link
                                to={`/admin/editar-post/${post._id}`}
                                className="px-3 py-1 bg-brand-gold text-white rounded hover:bg-brand-yellow hover:text-brand-black transition-colors text-sm font-semibold"
                              >
                                Editar
                              </Link>
                              <button
                                onClick={() => handleDeletePost(post._id)}
                                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors text-sm font-semibold"
                              >
                                Eliminar
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}

            {/* Lista de Categorías */}
            {activeTab === 'categories' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories.length === 0 ? (
                  <div className="col-span-full text-center p-12 bg-linear-to-br from-brand-yellow/20 to-brand-gold/20 border-2 border-brand-gold/30 rounded-xl">
                    <p className="text-brand-black/60 text-lg">No hay categorías creadas</p>
                  </div>
                ) : (
                  categories.map((category) => (
                    <div
                      key={category._id}
                      className="bg-brand-white border-2 border-brand-gold/30 rounded-xl p-6 hover:shadow-lg transition-all"
                    >
                      <h3 className="text-xl font-bold text-brand-black mb-2">
                        {category.name}
                      </h3>
                      <p className="text-brand-black/70 mb-4">
                        {category.description || 'Sin descripción'}
                      </p>
                      <div className="flex gap-2">
                        <Link
                          to={`/admin/editar-categoria/${category._id}`}
                          className="flex-1 px-4 py-2 bg-brand-gold text-white rounded-lg hover:bg-brand-yellow hover:text-brand-black transition-colors text-center font-semibold"
                        >
                          Editar
                        </Link>
                        <button
                          onClick={() => handleDeleteCategory(category._id)}
                          className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-semibold"
                        >
                          Eliminar
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}