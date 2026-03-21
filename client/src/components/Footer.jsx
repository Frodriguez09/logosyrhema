export default function Footer() {
  return (
    <footer className="bg-brand-black text-brand-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 text-brand-yellow">Logos & Rhema</h3>
            <p className="text-brand-white/80">
              Palabra que forma, Palabra que transforma.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4 text-brand-gold">Enlaces</h4>
            <ul className="space-y-2">
              <li><a href="/" className="text-brand-white/80 hover:text-brand-yellow transition-colors">Inicio</a></li>
              <li><a href="/nosotros" className="text-brand-white/80 hover:text-brand-yellow transition-colors">Nosotros</a></li>
              <li><a href="/servicios" className="text-brand-white/80 hover:text-brand-yellow transition-colors">Servicios</a></li>
              <li><a href="/blog" className="text-brand-white/80 hover:text-brand-yellow transition-colors">Blog</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4 text-brand-gold">Contacto</h4>
            <ul className="space-y-2 text-brand-white/80">
              <li>Email: info@logosyrhema.org</li>
              <li>San Luis Rio Colorado, Son, México</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-brand-white/20 mt-8 pt-8 text-center text-brand-white/60">
          <p>&copy; {new Date().getFullYear()} Logos & Rhema. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}