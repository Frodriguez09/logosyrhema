import { Link } from 'react-router-dom';

export default function CallToAction({ 
  title = "¿Estás listo para cumplir tu llamado?",
  description = "Da el siguiente paso en tu crecimiento y prepárate para servir con firmeza y propósito. “Id y haced discípulos a todas las naciones…” (Mateo 28:19). Estamos aquí para ayudarte a formarte, liderar y fortalecer tu iglesia.",
  primaryButtonText = "Contáctanos Ahora",
  primaryButtonLink = "/contacto",
  secondaryButtonText = "Ver Servicios",
  secondaryButtonLink = "/servicios",
}) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-brand-gold via-brand-yellow to-brand-gold p-1 shadow-2xl">
      <div className="bg-brand-white rounded-xl p-12 md:p-16 text-center">
        <h2 className="text-3xl md:text-5xl font-bold text-brand-black mb-6">
          {title}
        </h2>
        <p className="text-xl text-brand-black/70 mb-8 max-w-2xl mx-auto">
          {description}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to={primaryButtonLink}
            className="px-8 py-4 bg-brand-gold text-brand-white rounded-lg font-bold hover:bg-brand-yellow hover:text-brand-black hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 inline-flex items-center justify-center gap-2"
          >
            {primaryButtonText}
            <span className="text-xl">📞</span>
          </Link>
          <Link
            to={secondaryButtonLink}
            className="px-8 py-4 bg-brand-white text-brand-black border-2 border-brand-gold rounded-lg font-bold hover:bg-brand-gold hover:text-brand-white hover:shadow-xl transition-all duration-200"
          >
            {secondaryButtonText}
          </Link>
        </div>
      </div>
    </div>
  );
}