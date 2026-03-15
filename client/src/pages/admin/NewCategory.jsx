import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';

export default function NewCategory() {
  const [category, setCategory] = useState({
    name: '',
    description: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSubmitting(true);
      await axios.post('/api/categories', category, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Categoría creada exitosamente');
      navigate('/admin/dashboard');
    } catch (error) {
      console.error('Error al crear categoría:', error);
      alert(error.response?.data?.message || 'Error al crear la categoría');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-white pt-24 pb-12">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 text-brand-black">Crear Nueva Categoría</h1>
        
        <form onSubmit={handleSubmit} className="bg-linear-to-br from-brand-white to-brand-yellow/10 border-2 border-brand-gold/30 rounded-xl shadow-lg p-8 space-y-6">
          {/* Nombre */}
          <div>
            <label className="block text-sm font-bold text-brand-black mb-2">
              Nombre de la Categoría *
            </label>
            <input
              type="text"
              value={category.name}
              onChange={(e) => setCategory({ ...category, name: e.target.value })}
              placeholder="Ej: Tecnología, Diseño, Marketing"
              className="w-full px-4 py-3 border-2 border-brand-gold/30 rounded-lg focus:ring-2 focus:ring-brand-gold focus:border-brand-gold bg-brand-white text-brand-black"
              required
            />
          </div>

          {/* Descripción */}
          <div>
            <label className="block text-sm font-bold text-brand-black mb-2">
              Descripción (opcional)
            </label>
            <textarea
              value={category.description}
              onChange={(e) => setCategory({ ...category, description: e.target.value })}
              rows={4}
              placeholder="Breve descripción de la categoría"
              className="w-full px-4 py-3 border-2 border-brand-gold/30 rounded-lg focus:ring-2 focus:ring-brand-gold focus:border-brand-gold bg-brand-white text-brand-black"
            />
          </div>

          {/* Botones */}
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
              {submitting ? 'Creando...' : 'Crear Categoría'}
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