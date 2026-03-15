export default function Hero(){
    return(
        <section className="relative min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 via-white to bg-purple-50 overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -left-40 w-80 bg-blue-300 rounded-full mix-blend-multiply filter-blur-xl opacity-70 animate-blob"></div>
                <div className="absolute -top-40 -left-40 w-80 bg-blue-300 rounded-full mix-blend-multiply filter-blur-xl opacity-70 animate-blob animation-delay-2000"></div>
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="text-center">
                    <h1 className="text-4xl md:text-6xl lg-text-7xl font-bold text-gray-900 mb-6 animate-fade-in-up">
                        Bienvenidos a
                        <span className="block bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            Logos y Rhema
                        </span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto animate-fade-in-up animation-delay-200">
                        Transformando ideas en experiencias digitales extraordinaras
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animation-delay-400">
                        <a href="/servicios"
                            className="px-8 py-4 bg-linear-to-r from-blue-600 to bg-purple-600 text-white rounded-lg font-semibold hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200"
                        >
                            Nuestros Servicios
                        </a>
                        <a href="/contacto"
                            className="px-8 py-4 bg-white text-gray-800 rounded-lg font-semibold border-2 border-gray-200 hover:border-blue-600 hover:shadow-lg transition-all duration-200"
                        >
                        Contactanos
                        </a>
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes blob{
                    0%, 100% {transform: translate(0px, 0px) scale(1); }
                    33% {transform: translate(30px, -50px) scale(1.1); }
                    66% {transform: translate(-20px, 20px) scale(0.9); }
                }
                @keyframes fade-in-up{
                    from{
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-blob {animation: blob 7s infinite; }
                .animation-delay-2000 {animation-delay: 2s; }
                .animation-fade-in-up {animation: fade-in-up 0.6s ease-out forwards; }
                .animation-delay-200 { animation-delay: 0.2s; opacity: 0; }
                .animation-delay-400 { animation-delay: 0.4s; opacity: 0; }
            `}</style>
        </section>
    );
}