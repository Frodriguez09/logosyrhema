import { useState } from 'react';

// Links generados desde tu dashboard de Stripe
// https://dashboard.stripe.com/payment-links
const STRIPE_LINKS = {
  20:  import.meta.env.VITE_STRIPE_LINK_20  || '#',
  50:  import.meta.env.VITE_STRIPE_LINK_50  || '#',
  100: import.meta.env.VITE_STRIPE_LINK_100 || '#',
};

export default function StripeDonation({ message }) {
  const [amount, setAmount] = useState(50);
  const amounts = [20, 50, 100];

  const handleDonate = () => {
    const link = STRIPE_LINKS[amount];
    if (!link || link === '#') {
      alert('La configuración de pagos no está lista aún.');
      return;
    }
    window.open(link, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="my-8 p-6 bg-linear-to-br from-brand-yellow/10 to-brand-gold/10 border-2 border-brand-gold/30 rounded-xl">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-brand-black mb-3">
          Apoya este ministerio ❤️
        </h3>
        <p className="text-brand-black/80 leading-relaxed">
          {message || defaultMessage}
        </p>
      </div>

      {/* Montos predefinidos */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6 ">
        {amounts.map((amt) => (
          <button
            key={amt}
            onClick={() => setAmount(amt)}
            className={`py-3 rounded-lg font-bold transition-all ${
              amount === amt
                ? 'bg-brand-gold text-brand-white shadow-md'
                : 'bg-brand-white text-brand-black border-2 border-brand-gold/30 hover:border-brand-gold'
            }`}
          >
            ${amt} MXN
          </button>
        ))}
      </div>

      {/* Monto personalizado */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-brand-black mb-2">
          O ingresa un monto personalizado:
        </label>
        <div className="flex gap-2">
          <span className="px-4 py-3 bg-brand-white border-2 border-brand-gold/30 rounded-lg font-bold">
            $
          </span>
          <input
            type="number"
            min="10"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="flex-1 px-4 py-3 border-2 border-brand-gold/30 rounded-lg focus:ring-2 focus:ring-brand-gold focus:border-brand-gold bg-brand-white text-brand-black font-semibold"
          />
          <span className="px-4 py-3 bg-brand-white border-2 border-brand-gold/30 rounded-lg font-bold">
            MXN
          </span>
        </div>
      </div>

      {/* Botón de donación */}
      <button
        onClick={handleDonate}
        className="w-full py-4 bg-brand-gold text-brand-white rounded-lg font-bold text-lg hover:bg-brand-yellow hover:text-brand-black transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
      >
        💳 Donar ${amount} MXN con Stripe
      </button>

      <p className="text-center text-sm text-brand-black/60 mt-4">
        Pagos seguros procesados por Stripe
      </p>
    </div>
  );
}