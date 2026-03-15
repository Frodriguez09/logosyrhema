import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import StripeDonation from '../components/StripeDonation';


export default function SinglePost() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchPost();
  }, [slug]);

  const fetchPost = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`/api/posts/${slug}`);
      setPost(res.data);
    } catch (error) {
      console.error("Error al cargar post:", error);
      setError("Post no encontrado");
    } finally {
      setLoading(false);
    }
  };

  // Extraer ID de video de YouTube
  const getYouTubeVideoId = (url) => {
    if (!url) return null;
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-white pt-24 pb-12 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-brand-gold border-t-transparent"></div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-brand-white pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="bg-red-50 border-2 border-red-200 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-red-600 mb-4">
              Post no encontrado
            </h2>
            <Link
              to="/blog"
              className="text-brand-gold hover:text-brand-yellow font-semibold"
            >
              ← Volver al blog
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const videoId = getYouTubeVideoId(post.videoUrl);

  return (
    <div className="min-h-screen bg-brand-white pt-24 pb-12">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <Link
            to="/blog"
            className="text-brand-gold hover:text-brand-yellow font-semibold"
          >
            ← Volver al blog
          </Link>
        </nav>

        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-4 py-1 bg-brand-gold text-brand-white text-sm rounded-full font-semibold">
              {post.category?.name || "General"}
            </span>
            <span className="text-brand-black/60 text-sm">
              {new Date(post.createdAt).toLocaleDateString("es-MX", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-brand-black mb-4">
            {post.title}
          </h1>

          <div className="flex items-center gap-4 text-brand-black/60">
            <span className="flex items-center gap-2">
              <span className="text-xl">✍️</span>
              {post.author?.username || "Anónimo"}
            </span>
            <span className="flex items-center gap-2">
              <span className="text-xl">👁️</span>
              {post.views} vistas
            </span>
          </div>
        </header>

        {/* Imagen destacada */}
        {post.image && (
          <div className="mb-8 rounded-xl overflow-hidden border-2 border-brand-gold/30">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-auto object-cover"
              loading="eager"
              decoding="async"
            />
          </div>
        )}

        {/* Video de YouTube */}
        {videoId && (
          <div className="mb-8">
            <div className="relative pb-[56.25%] h-0 rounded-xl overflow-hidden border-2 border-brand-gold/30">
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src={`https://www.youtube.com/embed/${videoId}`}
                title="YouTube video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        )}

        {/* Contenido */}
        <div className="prose prose-lg max-w-none mb-12">
          <div
            className="text-brand-black/80 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: post.content }}
          ></div>
        </div>

        {/* Donación con Stripe */}
        {post.showDonation && <StripeDonation message={post.donationMessage} />}

        {/* Footer del post */}
        <footer className="border-t-2 border-brand-gold/30 pt-8">
          <div className="flex items-center justify-between">
            <Link
              to="/blog"
              className="px-6 py-3 bg-brand-gold text-brand-white rounded-lg hover:bg-brand-yellow hover:text-brand-black transition-all font-semibold"
            >
              ← Ver más artículos
            </Link>

            <div className="flex gap-3">
              <button
                className="text-2xl hover:scale-110 transition-transform"
                title="Compartir en Facebook"
              >
                📘
              </button>
            </div>
          </div>
        </footer>
      </article>
    </div>
  );
}
