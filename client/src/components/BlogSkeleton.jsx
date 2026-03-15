export default function BlogSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
        <div key={i} className="bg-brand-white border-2 border-brand-gold/30 rounded-xl overflow-hidden animate-pulse">
          {/* Imagen skeleton */}
          <div className="h-48 bg-linear-to-br from-brand-yellow/20 to-brand-gold/20"></div>
          
          {/* Contenido skeleton */}
          <div className="p-6 space-y-3">
            {/* Título */}
            <div className="h-6 bg-brand-gold/20 rounded w-3/4"></div>
            <div className="h-6 bg-brand-gold/20 rounded w-1/2"></div>
            
            {/* Descripción */}
            <div className="space-y-2 pt-2">
              <div className="h-4 bg-brand-gold/20 rounded"></div>
              <div className="h-4 bg-brand-gold/20 rounded w-5/6"></div>
              <div className="h-4 bg-brand-gold/20 rounded w-4/5"></div>
            </div>
            
            {/* Footer */}
            <div className="flex justify-between pt-4">
              <div className="h-3 bg-brand-gold/20 rounded w-1/4"></div>
              <div className="h-3 bg-brand-gold/20 rounded w-1/4"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}