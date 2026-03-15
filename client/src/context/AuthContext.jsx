import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
      // Aquí podrías verificar el token con el backend
      setLoading(false);
    } else {
      localStorage.removeItem('token');
      setLoading(false);
    }
  }, [token]);

  const login = (userData, userToken) => {
    console.log('✅ Login exitoso:', userData); // Para debug
    setUser(userData);
    setToken(userToken);
  };

  const logout = () => {
    console.log('👋 Logout'); // Para debug
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};