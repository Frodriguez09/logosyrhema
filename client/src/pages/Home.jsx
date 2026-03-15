import { Link } from 'react-router-dom';
import heroImage from '../assets/hero.jpg'; // Ajusta la extensión según tu imagen

export default function Home() {
  return (
    <>
      {/* Hero Section con Imagen */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Imagen de fondo */}
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="Logos & Rhema Hero" 
            className="w-full h-full object-cover"
            loading="lazy"  // Para hero usa "eager", para otras imágenes usa "lazy"
          />
          
          {/* Degradado superior con color de marca */}
          <div className="absolute inset-0 bg-linear-to-b from-brand-white via-brand-black/20 to-transparent"></div>

          {/* Degradado inferior */}
          <div className="absolute inset-0 bg-linear-to-t from-brand-white via-brand-gold/35 to-transparent"></div>

          {/* Overlay dorado */}
          <div className="absolute inset-0 bg-brand-gold/15"></div>
          
          {/* Elementos decorativos animados */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-20 right-20 w-72 h-72 bg-brand-gold/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
            <div className="absolute bottom-32 left-20 w-72 h-72 bg-brand-yellow/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
          </div>
        </div>

        {/* Contenido del Hero */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-brand-yellow border-brand-gold animate-fade-in-up drop-shadow-lg mb-4 ">
              Instituto Biblico Logos y Rhema
          </h1>
          <h2 className='text-5xl md:text-7xl font-semibold text-brand-white animate-fade-in-up drop-shadow-2xl'>
            Palabra que forma,
          </h2>
          <h2 className='text-5xl md:text-7xl font-semibold text-brand-white mb-3 animate-fade-in-up drop-shadow-2xl'> 
            Palabra que transforma
          </h2>
          <p className="text-xl md:text-2xl text-brand-white mb-8 max-w-3xl mx-auto animate-fade-in-up animation-delay-200 font-normal drop-shadow-lg">
            Capacitando a creyentes para servir con excelencia y verdad
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animation-delay-200">
            <Link
              to="/servicios"
              className="px-8 py-4 bg-brand-gold text-brand-white rounded-lg font-bold hover:bg-brand-yellow hover:text-brand-black hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-200 shadow-lg"
            >
              Nuestros Servicios
            </Link>
            <Link
              to="/contacto"
              className="px-8 py-4 bg-brand-white text-brand-black rounded-lg font-bold border-2 border-brand-white hover:bg-brand-black hover:text-brand-white hover:border-brand-yellow hover:shadow-2xl transition-all duration-200 shadow-lg"
            >
              Contáctanos
            </Link>
          </div>
        </div>

        {/* Indicador de scroll */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-10">
          <svg 
            className="w-6 h-6 text-brand-white drop-shadow-lg" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </section>

      {/* Intro de nosotros */}
      <section className='py-20 bg-brand-white'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <h2 className="text-4xl font-bold text-center mb-16 text-brand-black">
            ¿Quienes somos?
          </h2>
          <div className='p-8 bg-linear-to-br from-brand-yellow/10 to-brand-gold/10 rounded-xl border-2 border-brand-gold/30 hover:shadow-xl hover:border-brand-gold transition-all duration-300 transform hover:-translate-y-2'>
            <p className='text-brand-black/80 text-lg leading-relaxed mb-4'>
              Somos un proyecto comprometido con fortalecer al creyente mediante la provisión de recursos fundamentales de enseñanza bíblica, 
              con el propósito de apoyar su crecimiento espiritual y el cumplimiento de la misión de la iglesia local. Actuamos con integridad, 
              verdad y servicio, ofreciendo material bíblico fiel a las Escrituras, de alta calidad y con un enfoque didáctico, para formar creyentes y
               líderes sólidos que vivan y compartan el mensaje de la Gran Comisión.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-brand-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-16 text-brand-black">
            ¿Por qué elegirnos?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Estudios Bíblicos',
                description: 'Ofrecemos estudios bíblicos fieles a las Escrituras, claros y prácticos, diseñados para profundizar en la Palabra de Dios y fortalecer la vida espiritual del creyente.',
                icon: '📖'
              },
              {
                title: 'Fundamentos de la Fe',
                description: 'Brindamos una base sólida en las verdades esenciales del cristianismo, ayudando a cada creyente a afirmar su fe con convicción, claridad y fundamento bíblico.',
                icon: '✝️'
              },
              {
                title: 'Liderazgo Cristiano',
                description: 'Formamos líderes con carácter, visión y servicio, capacitados para influir positivamente en su iglesia y comunidad, guiados por principios bíblicos y una fe íntegra.',
                icon: '👥'
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="p-8 bg-linear-to-br from-brand-yellow/10 to-brand-gold/10 rounded-xl border-2 border-brand-gold/30 hover:shadow-xl hover:border-brand-gold transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-2xl font-bold mb-3 text-brand-black">{feature.title}</h3>
                <p className="text-brand-black/70 text-lg">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-blob { animation: blob 7s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animate-fade-in-up { animation: fade-in-up 0.6s ease-out forwards; }
        .animation-delay-200 { animation-delay: 0.2s; opacity: 0; }
        .animation-delay-400 { animation-delay: 0.4s; opacity: 0; }
      `}</style>
    </>
  );
}