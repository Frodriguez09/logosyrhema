import { Link } from 'react-router-dom';
import missionImage from '../assets/about_mission.jpg';
import visionImage from '../assets/about_vision.png';
import CallToAction from '../components/CallToAction';

export default function About() {
  return (
    <div className="min-h-screen bg-brand-white pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-brand-black mb-4">
            Sobre Nosotros
          </h1>
        </div>

        {/* Misión */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
          <div className="order-2 md:order-1">
            <div className="inline-block px-4 py-2 bg-brand-gold/20 rounded-full mb-4">
              <span className="text-brand-gold font-bold text-sm">NUESTRA MISIÓN</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-semibold mb-6 text-brand-black">
              "Fortalecer al creyente mediante la provisión de recursos de enseñanza bíblica de alta calidad."
            </h2>
            
          </div>
          <div className="order-1 md:order-2">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-brand-gold/30 group">
              <img 
                src={missionImage} 
                alt="Nuestra Misión" 
                className="w-full h-100 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-linear-to-t from-brand-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </div>
        </div>

        {/* Visión */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-brand-gold/30 group">
              <img 
                src={visionImage} 
                alt="Nuestra Visión" 
                className="w-full h-100 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-linear-to-t from-brand-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </div>
          <div>
            <div className="inline-block px-4 py-2 bg-brand-yellow/30 rounded-full mb-4">
              <span className="text-brand-gold font-bold text-sm">NUESTRA VISIÓN</span>
            </div>
            <h2 className="text-xl md:text-2xl font-semibold mb-6 text-brand-black">
              "Ser el recurso fundamental para que cada creyente desarrolle un liderazgo sólido, convirtiéndose en un apoyo clave para su iglesia local, sus pastores y líderes, contribuyendo así eficazmente al cumplimiento de la Gran Comisión."
            </h2>
            
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="text-brand-gold text-xl mt-1">🛡️</span>
                <div>
                  <h4 className="font-bold text-brand-black">Integridad</h4>
                  <p className="text-brand-black/70">Actuar con totalidad honestidad, transparencia y coherencia en la enseñanza y en todas nuestras operaciones.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-brand-gold text-xl mt-1">💡</span>
                <div>
                  <h4 className="font-bold text-brand-black">Verdad</h4>
                  <p className="text-brand-black/70">Comprometidos con la fidelidad inmutable de las Escrituras como base de todo nuestro material didáctico.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-brand-gold text-xl mt-1">🤝</span>
                <div>
                  <h4 className="font-bold text-brand-black">Servicio</h4>
                  <p className="text-brand-black/70">Dedicación a satisfacer la necesidades de formación bíblica del creyente con excelencia, diligencia y espíritu de ayuda.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <CallToAction
          title='¿Estás listo para cumplir tu llamado?'
          description='Da el siguiente paso en tu crecimiento y prepárate para servir con firmeza y propósito. “Id y haced discípulos a todas las naciones…” (Mt. 28:19). Estamos aquí para ayudarte a formarte, liderar y fortalecer tu iglesia.'
        />
      </div>
    </div>
  );
}