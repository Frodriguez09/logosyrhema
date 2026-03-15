import { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';

export default function EditCategory() {
  const { id } = useParams();
  const [category, setCategory] = useState({
    name: '',
    description: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategory();
  }, [id]);

  const fetchCategory = async () => {
    try {
      setLoading(true);
      const res = await axios.get('/api/categories');
      const foundCategory = res.data.find(c => c._id === id);
      if (foundCategory) {
        setCategory({
          name: foundCategory.name,
          description: foundCategory.description || ''
        });
      }
    } catch (error) {
      console.error('Error al cargar categoría:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSubmitting(true);
      await axios.put(`/api/categories/${id}`, category, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Categoría actualizada exitosamente');
      navigate('/admin/dashboard');
    } catch (error) {
      console.error('Error al actualizar categoría:', error);
      alert('Error al actualizar la categoría');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-white pt-24 pb-12 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-brand-gold border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-white pt-24 pb-12">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 text-brand-black">Editar Categoría</h1>
        
        <form onSubmit={handleSubmit} className="bg-linear-to-br from-brand-white to-brand-yellow/10 border-2 border-brand-gold/30 rounded-xl shadow-lg p-8 space-y-6">
          <div>
            <label className="block text-sm font-bold text-brand-black mb-2">
              Nombre de la Categoría *
            </label>
            <input
              type="text"
              value={category.name}
              onChange={(e) => setCategory({ ...category, name: e.target.value })}
              className="w-full px-4 py-3 border-2 border-brand-gold/30 rounded-lg focus:ring-2 focus:ring-brand-gold focus:border-brand-gold bg-brand-white text-brand-black"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-brand-black mb-2">
              Descripción (opcional)
            </label>
            <textarea
              value={category.description}
              onChange={(e) => setCategory({ ...category, description: e.target.value })}
              rows={4}
              className="w-full px-4 py-3 border-2 border-brand-gold/30 rounded-lg focus:ring-2 focus:ring-brand-gold focus:border-brand-gold bg-brand-white text-brand-black"
            />
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={submitting}
              className={`flex-1 py-3 bg-brand-gold text-brand-white rounded-lg font-bold transition-all ${
                submitting
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:bg-brand-yellow hover:text-brand-black hover:shadow-xl'
              }`}
            >
              {submitting ? 'Actualizando...' : 'Actualizar Categoría'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/admin/dashboard')}
              className="px-6 py-3 bg-brand-white text-brand-black border-2 border-brand-gold/30 rounded-lg hover:border-brand-gold transition-all font-bold"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}