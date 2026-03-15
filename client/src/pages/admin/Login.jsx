import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';

export default function Login() {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, user, token } = useContext(AuthContext);
  const navigate = useNavigate();

  // Debug: ver estado actual
  useEffect(() => {
    console.log('Estado de autenticación:', { user, token });
    if (token && user) {
      console.log('✅ Usuario autenticado, redirigiendo...');
      navigate('/admin/nuevo-post');
    }
  }, [token, user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      console.log('Intentando login con:', credentials.email);
      const res = await axios.post('/api/auth/login', credentials);
      console.log('Respuesta del servidor:', res.data);
      
      login(res.data.user, res.data.token);
      
      // Forzar navegación inmediata
      setTimeout(() => {
        navigate('/admin/nuevo-post', { replace: true });
      }, 100);
    } catch (err) {
      console.error('Error de login:', err);
      setError(err.response?.data?.message || 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-brand-white via-brand-yellow/10 to-brand-gold/20 px-4 pt-20">
      <div className="max-w-md w-full bg-brand-white rounded-2xl shadow-xl p-8 border border-brand-gold/20">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-brand-gold rounded-xl mx-auto mb-4 flex items-center justify-center">
            <span className="text-brand-white text-2xl font-bold">🔐</span>
          </div>
          <h2 className="text-3xl font-bold text-brand-black">
            Admin Login
          </h2>
          <p className="text-brand-black/60 mt-2">Acceso exclusivo para administradores</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-lg mb-6 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-brand-black mb-2">
              Email
            </label>
            <input
              type="email"
              value={credentials.email}
              onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
              className="w-full px-4 py-3 border-2 border-brand-gold/30 rounded-lg focus:ring-2 focus:ring-brand-gold focus:border-brand-gold transition-all bg-brand-white text-brand-black"
              placeholder="admin@logosrhema.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-brand-black mb-2">
              Contraseña
            </label>
            <input
              type="password"
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              className="w-full px-4 py-3 border-2 border-brand-gold/30 rounded-lg focus:ring-2 focus:ring-brand-gold focus:border-brand-gold transition-all bg-brand-white text-brand-black"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 bg-brand-gold text-brand-white rounded-lg font-bold transition-all duration-200 ${
              loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-brand-yellow hover:text-brand-black hover:shadow-lg transform hover:-translate-y-1'
            }`}
          >
            {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-brand-black/50">
          <p>Acceso restringido solo para administradores</p>
        </div>
      </div>
    </div>
  );
}