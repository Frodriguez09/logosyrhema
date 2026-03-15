import { Link } from "react-router-dom";
import CallToAction from '../components/CallToAction';


export default function Services() {
  const services = [
    {
      title: 'Cursos Biblicos',
      description: 'Cursos bíblicos diseñados a la medida de cada iglesia, con enseñanza fiel a las Escrituras y enfoque práctico para el crecimiento espiritual del creyente.',
      features: ['Enseñanza bíblica fundamentada', 'Contenido claro y estructurado', 'Adaptable a distintos niveles', 'Enfoque formativo y espiritual'],
      icon: '📖'
    },
    {
      title: 'Capacitación para Líderes',
      description: 'Programas de formación orientados a pastores, líderes y servidores, enfocados en desarrollar carácter, liderazgo y servicio cristiano.',
      features: ['Desarrollo de liderazgo cristiano', 'Formación en carácter y servicio', 'Enfoque ministerial y pastoral', 'Aplicación en la iglesia local'],
      icon: '👥'
    },
    {
      title: 'Fundamentos de la Fe',
      description: 'Capacitaciones que fortalecen las verdades esenciales del cristianismo, proporcionando una base sólida para una fe firme y bien fundamentada.',
      features: ['Doctrinas esenciales', 'Base bíblica sólida', 'Ideal para nuevos creyentes', 'Afirmación de la fe cristiana'],
      icon: '✝️'
    },
    {
      title: 'Talleres y Seminarios',
      description: 'Espacios formativos diseñados para abordar temas bíblicos y ministeriales específicos, con un enfoque práctico y edificante.',
      features: ['Temas bíblicos y ministeriales', 'Modalidad presencial o virtual', 'Enfoque práctico y dinámico', 'Edificación congregacional'],
      icon: '🎓'
    },
    {
      title: 'Asesoria en Enseñanza',
      description: 'Acompañamos a iglesias en la planificación y estructuración de programas de enseñanza, discipulado y formación continua.',
      features: ['Planes de enseñanza personalizados', 'Apoyo en discipulado', 'Alineación con la visión ministerial', 'Acompañamiento continuo'],
      icon: '🧭'
    },
    {
      title: 'Recursos Didácticos',
      description: 'Provisión de material bíblico y educativo de alta calidad para apoyar procesos de enseñanza en iglesias y ministerios.',
      features: ['Material bíblico confiable', 'Enfoque didáctico y claro', 'Uso en clases y grupos pequeños', 'Apoyo para formadores'],
      icon: '📚'
    }
  ];

   return (
    <div className="min-h-screen bg-brand-white pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-brand-black mb-4">
            Nuestros Servicios
          </h1>
        </div>

        {/* Grid de Servicios */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-linear-to-br from-brand-white to-brand-yellow/10 border-2 border-brand-gold/30 rounded-xl p-8 hover:shadow-xl hover:border-brand-gold transition-all duration-300 transform hover:-translate-y-2 group"
            >
              <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>
              <h3 className="text-2xl font-bold mb-3 text-brand-black group-hover:text-brand-gold transition-colors">
                {service.title}
              </h3>
              <p className="text-brand-black/70 mb-6 leading-relaxed">
                {service.description}
              </p>
              <ul className="space-y-2">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-brand-black">
                    <span className="text-brand-gold mr-2 font-bold">✓</span>
                    <span className="font-medium">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Sección de Proceso */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-black mb-4">
              Nuestro Proceso
            </h2>
            <p className="text-lg text-brand-black/70">
              Metodología probada para garantizar el éxito de tu proyecto
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: '01', title: 'Diagnóstico Ministerial', desc: 'Escuchamos, comprendemos las necesidades de formación y definimos los objetivos espirirutales y de liderezgo a fortalecer.', icon: '🧭' },
              { step: '02', title: 'Plan de Formación', desc: 'Diseñamos un programa de enseñanza bíblica y capacitación adaptado a la realidad y visión de la congregación.', icon: '📋' },
              { step: '03', title: 'Capacitación y Enseñanza', desc: 'Impartimos los cursos, talleres o seminarios con enfoque práctico, bíblico y formativo.', icon: '🎓' },
              { step: '04', title: 'Acompañamiento y Seguimiento', desc: 'Damos apoyo continuo para reforzar el aprendizaje, resolver dudas y ayudar a la enseñanza en la iglesia.', icon: '🤝✨' }
            ].map((item, idx) => (
              <div key={idx} className="relative">
                <div className="bg-linear-to-br from-brand-yellow/20 to-brand-gold/20 border-2 border-brand-gold/30 rounded-xl p-6 text-center hover:shadow-lg transition-all">
                  <div className="text-5xl font-bold text-brand-gold mb-2">{item.step}</div>
                  <div className="text-4xl mb-3">{item.icon}</div>
                  <h4 className="text-xl font-bold text-brand-black mb-2">{item.title}</h4>
                  <p className="text-brand-black/70 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <CallToAction
            title='¿Estás listo para cumplir tu llamado?'
            description='Da el siguiente paso en tu crecimiento y prepárate para servir con firmeza y propósito. “Id y haced discípulos a todas las naciones…” (Mt. 28:19). Estamos aquí para ayudarte a formarte, liderar y fortalecer tu iglesia'
            secondaryButtonText = "Ver Nosotros"
            secondaryButtonLink = "/nosotros"
        />
      </div>
    </div>
  );
}