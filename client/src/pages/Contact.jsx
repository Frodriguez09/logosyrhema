import { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';

export default function Contact() {
  const form = useRef();
  const [formData, setFormData] = useState({
    from_name: '',
    from_email: '',
    message: ''
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setStatus({ type: '', message: '' });

    try {
      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,   
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,  
        form.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY   
      );

      setStatus({
        type: 'success',
        message: '¡Mensaje enviado exitosamente! Te contactaremos pronto.'
      });
      setFormData({ from_name: '', from_email: '', message: '' });
    } catch (error) {
      console.error('Error al enviar email:', error);
      setStatus({
        type: 'error',
        message: 'Hubo un error al enviar el mensaje. Por favor intenta de nuevo.'
      });
    } finally {
      setSending(false);
      setTimeout(() => setStatus({ type: '', message: '' }), 5000);
    }
  };

  return (
    <div className="min-h-screen bg-brand-white pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-brand-black mb-4">
            Contáctanos
          </h1>
          <p className="text-2xl text-brand-black/70">
            Completa el formulario y platiquemos sobre nuevas oportunidades de formación para tu congregación.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <form 
              ref={form}
              onSubmit={handleSubmit} 
              className="bg-linear-to-br from-brand-white to-brand-yellow/10 border-5 border-brand-gold/40 rounded-xl shadow-lg p-8"
            >
              <div className="mb-6">
                <label className="block text-sm font-bold text-brand-black mb-2">
                  Nombre *
                </label>
                <input
                  type="text"
                  name="from_name"
                  value={formData.from_name}
                  onChange={(e) => setFormData({ ...formData, from_name: e.target.value })}
                  className="w-full px-4 py-3 border-3 border-brand-gold/40 rounded-lg focus:ring-2 focus:ring-brand-gold focus:border-brand-gold bg-brand-white text-brand-black"
                  required
                  disabled={sending}
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-bold text-brand-black mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  name="from_email"
                  value={formData.from_email}
                  onChange={(e) => setFormData({ ...formData, from_email: e.target.value })}
                  className="w-full px-4 py-3 border-3 border-brand-gold/40 rounded-lg focus:ring-2 focus:ring-brand-gold focus:border-brand-gold bg-brand-white text-brand-black"
                  required
                  disabled={sending}
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-bold text-brand-black mb-2">
                  Mensaje *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={6}
                  className="w-full px-4 py-3 border-3 border-brand-gold/40 rounded-lg focus:ring-2 focus:ring-brand-gold focus:border-brand-gold bg-brand-white text-brand-black resize-none"
                  required
                  disabled={sending}
                />
              </div>

              <button
                type="submit"
                disabled={sending}
                className={`w-full py-3 rounded-lg font-bold transition-all duration-200 ${
                  sending
                    ? 'bg-brand-gold/50 text-brand-white cursor-not-allowed'
                    : 'bg-brand-gold text-brand-white hover:bg-brand-yellow hover:text-brand-black hover:shadow-xl'
                }`}
              >
                {sending ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Enviando...
                  </span>
                ) : (
                  'Enviar Mensaje'
                )}
              </button>

              {status.message && (
                <div className={`mt-4 p-4 rounded-lg text-center font-semibold border-2 ${
                  status.type === 'success'
                    ? 'bg-green-50 text-green-600 border-green-200'
                    : 'bg-red-50 text-red-600 border-red-200'
                }`}>
                  {status.message}
                </div>
              )}
            </form>
          </div>

          <div className="space-y-8">
            <div className="bg-linear-to-br from-brand-white to-brand-yellow/10 border-5 border-brand-gold/40 rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-bold mb-6 text-brand-black">Información de Contacto</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <span className="text-3xl mr-4">📧</span>
                  <div>
                    <h4 className="font-bold mb-1 text-brand-black">Email</h4>
                    <a href="mailto:info@logosrhema.com" className="text-brand-black/70 hover:text-brand-gold transition-colors">
                      info@logosyrhema.org
                    </a>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-3xl mr-4">📍</span>
                  <div>
                    <h4 className="font-bold mb-1 text-brand-black">Ubicación</h4>
                    <p className="text-brand-black/70">San Luis Rio Colorado, Sonora, México</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}