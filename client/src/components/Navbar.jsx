import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import logo from '../assets/LogoIsotipo.png';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, logout } = useContext(AuthContext);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Inicio', path: '/' },
    { name: 'Nosotros', path: '/nosotros' },
    { name: 'Servicios', path: '/servicios' },
    { name: 'Blog', path: '/blog' },
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-brand-white shadow-lg py-3' 
          : 'bg-brand-white/95 backdrop-blur-sm py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-3">
            <img 
              src={logo} 
              alt="Logos & Rhema" 
              className="h-12 w-auto object-contain"
            />
            {/* <span className="text-2xl font-bold text-brand-black">
              Logos & Rhema
            </span> */}
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-brand-black hover:text-brand-gold transition-colors duration-200 font-semibold relative group"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-gold group-hover:w-full transition-all duration-300"></span>
              </Link>
            ))}
            
            {/* Botón de Contacto con estilo destacado */}
            <Link
              to="/contacto"
              className="px-6 py-2 bg-brand-gold text-brand-white rounded-lg hover:bg-brand-yellow hover:text-brand-black transition-all duration-200 font-bold shadow-md hover:shadow-lg"
            >
              Contacto
            </Link>

            {/* Mostrar opciones de admin solo si está logueado */}
            {user && (
              <>
                <Link
                  to="/admin/dashboard"
                  className="px-4 py-2 bg-brand-black text-brand-white rounded-lg hover:bg-brand-gold transition-all duration-200 font-semibold"
                >
                  Dashboard
                </Link>
                <button
                  onClick={logout}
                  className="text-brand-black hover:text-red-600 transition-colors font-semibold"
                >
                  Salir
                </button>
              </>
            )}
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden relative w-10 h-10 focus:outline-none"
            aria-label="Toggle menu"
          >
            <div className="absolute w-6 transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
              <span
                className={`absolute h-0.5 w-6 bg-brand-black transform transition duration-300 ease-in-out ${
                  isOpen ? 'rotate-45 delay-200' : '-translate-y-2'
                }`}
              ></span>
              <span
                className={`absolute h-0.5 bg-brand-black transform transition-all duration-200 ease-in-out ${
                  isOpen ? 'w-0 opacity-0' : 'w-6 delay-200 opacity-100'
                }`}
              ></span>
              <span
                className={`absolute h-0.5 w-6 bg-brand-black transform transition duration-300 ease-in-out ${
                  isOpen ? '-rotate-45 delay-200' : 'translate-y-2'
                }`}
              ></span>
            </div>
          </button>
        </div>

        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="pt-4 pb-3 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="block px-4 py-3 text-brand-black hover:bg-brand-yellow/20 hover:text-brand-gold rounded-lg transition-all duration-200 font-semibold"
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/contacto"
              onClick={() => setIsOpen(false)}
              className="block px-4 py-3 bg-brand-gold text-brand-white rounded-lg hover:bg-brand-yellow hover:text-brand-black transition-colors text-center font-bold"
            >
              Contacto
            </Link>
            {user && (
              <Link
                to="/admin/dashboard"
                onClick={() => setIsOpen(false)}
                className="block px-4 py-3 bg-brand-black text-brand-white rounded-lg hover:bg-brand-gold transition-colors text-center font-semibold"
              >
                Dashboard
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}