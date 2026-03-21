import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
} from "react";
import { Link } from "react-router-dom";
import { categoriesApi, postsApi } from "../utils/api";
import { debounce } from "lodash";
import BlogSkeleton from "../components/BlogSkeleton";
import { truncateText } from "../utils/stripHtml";

export default function Blog() {
  // Estados
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [years, setYears] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [viewMode, setViewMode] = useState("grid"); // 'grid' o 'list'

  // Ref para Infinite Scroll
  const observer = useRef();
  const lastPostRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && pagination?.hasMore) {
          setCurrentPage((prev) => prev + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, pagination],
  );

  const postsPerPage = 9;

  // Debounce para búsqueda
  const debouncedSearch = useMemo(
    () =>
      debounce((value) => {
        setSearchTerm(value);
        setCurrentPage(1);
        setPosts([]);
      }, 500),
    [],
  );

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  // Cargar datos iniciales
  useEffect(() => {
    fetchCategories();
    fetchYears();
  }, []);

  // Fetch posts cuando cambian filtros
  useEffect(() => {
    setCurrentPage(1);
    setPosts([]);
    fetchPosts(true);
  }, [selectedCategory, selectedYear, searchTerm]);

  // Fetch posts cuando cambia la página
  useEffect(() => {
    if (currentPage > 1) {
      fetchPosts(false);
    }
  }, [currentPage]);

  const fetchCategories = async () => {
    try {
      const res = await categoriesApi.getAll();
      setCategories(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error("Error al cargar categorías:", error);
      setCategories([]);
    }
  };

  const fetchYears = async () => {
    try {
      const res = await postsApi.getYears();
      setYears(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error("Error al cargar años:", error);
      setYears([]);
    }
  };

  const fetchPosts = async (reset = false) => {
    try {
      setLoading(true);
      const pageToFetch = reset ? 1 : currentPage;

    const res = await postsApi.getAll({
        page: pageToFetch,
        limit: postsPerPage,
        ...(selectedCategory && { category: selectedCategory }),
        ...(selectedYear && { year: selectedYear }),
        ...(searchTerm && { search: searchTerm }),
      });

      if (reset) {
        setPosts(res.data.posts || []);
      } else {
        // Infinite scroll: agregar posts
        setPosts((prevPosts) => [...prevPosts, ...(res.data.posts || [])]);
      }

      setPagination(res.data.pagination);
    } catch (error) {
      console.error("Error al cargar posts:", error);
    } finally {
      setLoading(false);
      setInitialLoading(false);
    }
  };

  const handleFilterChange = (type, value) => {
    setCurrentPage(1);
    setPosts([]);
    if (type === "category") setSelectedCategory(value);
    if (type === "year") setSelectedYear(value);
  };

  const clearFilters = () => {
    setSelectedCategory("");
    setSelectedYear("");
    setSearchTerm("");
    setSearchInput("");
    setCurrentPage(1);
    setPosts([]);
  };

  return (
    <div className="min-h-screen bg-brand-white pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-brand-black mb-4">
            Nuestro Blog
          </h1>
          <p className="text-lg text-brand-black/70">
            {pagination
              ? `${pagination.totalPosts} artículos publicados`
              : "Descubre nuestros últimos artículos"}
          </p>
        </div>

        {/* Barra de búsqueda */}
        <div className="mb-8">
          <form
            onSubmit={(e) => e.preventDefault()}
            className="max-w-2xl mx-auto"
          >
            <div className="relative">
              <input
                type="text"
                value={searchInput}
                onChange={(e) => {
                  setSearchInput(e.target.value);
                  debouncedSearch(e.target.value);
                }}
                placeholder="Buscar artículos..."
                className="w-full px-6 py-4 pr-12 border-2 border-brand-gold/30 rounded-full focus:ring-2 focus:ring-brand-gold focus:border-brand-gold bg-brand-white text-brand-black"
              />
              <button
                type="button"
                className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2 bg-brand-gold text-brand-white rounded-full hover:bg-brand-yellow hover:text-brand-black transition-all font-semibold"
              >
                🔍
              </button>
            </div>
          </form>

          {/* Indicador de búsqueda activa */}
          {searchTerm && (
            <div className="text-center mt-3">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-brand-yellow/30 border-2 border-brand-gold/30 rounded-full text-brand-black font-semibold text-sm">
                Buscando: "{searchTerm}"
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setSearchInput("");
                  }}
                  className="hover:text-red-600 transition-colors"
                >
                  ✕
                </button>
              </span>
            </div>
          )}
        </div>

        {/* Filtros */}
        <div className="mb-8 space-y-4">
          {/* Primera línea: Categorías */}
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="flex flex-wrap gap-3 items-center justify-center">
              <button
                onClick={() => handleFilterChange("category", "")}
                className={`px-5 py-2 rounded-full font-semibold transition-all text-sm ${
                  selectedCategory === ""
                    ? "bg-brand-gold text-brand-white shadow-md"
                    : "bg-brand-white text-brand-black border-2 border-brand-gold/30 hover:border-brand-gold"
                }`}
              >
                Todas las categorías
              </button>
              {categories.map((cat) => (
                <button
                  key={cat._id}
                  onClick={() => handleFilterChange("category", cat._id)}
                  className={`px-5 py-2 rounded-full font-semibold transition-all text-sm ${
                    selectedCategory === cat._id
                      ? "bg-brand-gold text-brand-white shadow-md"
                      : "bg-brand-white text-brand-black border-2 border-brand-gold/30 hover:border-brand-gold"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            {/* Segunda línea: Dropdown de años y botones de acción */}
            <div className="flex gap-3 items-center">
              <div className="flex gap-2 border-2 border-brand-gold/30 rounded-lg p-1 bg-brand-white">
                {/* Dropdown de años */}
                {years.length > 0 && (
                  <div className="relative">
                    <select
                      value={selectedYear}
                      onChange={(e) =>
                        handleFilterChange("year", e.target.value)
                      }
                      className="px-6 py-2 pr-10 bg-brand-white text-brand-black font-semibold cursor-pointer hover:border-brand-gold focus:ring-2 focus:ring-brand-gold focus:border-brand-gold transition-all appearance-none"
                    >
                      <option value="">📅 Todos los años</option>
                      {years.map((y) => (
                        <option key={y.year} value={y.year}>
                          {y.year} ({y.count} posts)
                        </option>
                      ))}
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                      <svg
                        className="w-4 h-4 text-brand-black"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
                )}

                {/* Toggle vista Grid/List */}
                <button
                  onClick={() => setViewMode("grid")}
                  className={`px-4 py-2 rounded font-semibold transition-all ${
                    viewMode === "grid"
                      ? "bg-brand-gold text-brand-white"
                      : "text-brand-black hover:bg-brand-gold/10"
                  }`}
                  title="Vista en cuadrícula"
                >
                  ⊞
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`px-4 py-2 rounded font-semibold transition-all ${
                    viewMode === "list"
                      ? "bg-brand-gold text-brand-white"
                      : "text-brand-black hover:bg-brand-gold/10"
                  }`}
                  title="Vista en lista"
                >
                  ☰
                </button>
              </div>

              {/* Limpiar filtros */}
              {(selectedCategory || selectedYear || searchTerm) && (
                <button
                  onClick={clearFilters}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all font-semibold text-sm shadow-md"
                >
                  Limpiar filtros ✕
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Grid/List de posts */}
        {initialLoading ? (
          <BlogSkeleton />
        ) : posts.length === 0 ? (
          <div className="text-center p-12 bg-linear-to-br from-brand-yellow/20 to-brand-gold/20 border-2 border-brand-gold/30 rounded-xl">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-brand-black/60 text-lg font-semibold">
              No se encontraron artículos
            </p>
            <p className="text-brand-black/50 text-sm mt-2">
              Intenta con otros filtros o búsqueda
            </p>
          </div>
        ) : (
          <>
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
                  : "space-y-6 mb-12"
              }
            >
              {posts.map((post, index) => {
                const isLastPost = posts.length === index + 1;
                const CardComponent =
                  viewMode === "grid" ? BlogCardGrid : BlogCardList;

                if (isLastPost) {
                  return (
                    <CardComponent
                      key={post._id}
                      post={post}
                      ref={lastPostRef}
                    />
                  );
                } else {
                  return <CardComponent key={post._id} post={post} />;
                }
              })}
            </div>

            {/* Loading indicator */}
            {loading && (
              <div className="flex flex-col items-center justify-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-brand-gold border-t-transparent mb-4"></div>
                <p className="text-brand-black/60 font-semibold">
                  Cargando más artículos...
                </p>
              </div>
            )}

            {/* Fin de resultados */}
            {!pagination?.hasMore && posts.length > 0 && (
              <div className="text-center py-8">
                <div className="inline-flex items-center gap-2 px-6 py-3 bg-linear-to-br from-brand-gold/20 to-brand-yellow/20 border-2 border-brand-gold/30 rounded-full">
                  <span className="text-2xl">✓</span>
                  <p className="text-brand-black font-semibold">
                    Has visto todos los artículos
                  </p>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

// Componente de tarjeta en grid con forwardRef
const BlogCardGrid = React.forwardRef(({ post }, ref) => {
  return (
    <Link
      ref={ref}
      to={`/blog/${post.slug}`}
      className="group bg-brand-white border-2 border-brand-gold/30 rounded-xl overflow-hidden hover:shadow-xl hover:border-brand-gold transition-all duration-300 transform hover:-translate-y-2"
    >
      <div className="relative h-48 overflow-hidden bg-linear-to-br from-brand-yellow/20 to-brand-gold/20">
        {post.image ? (
          <img
            src={post.image}
            alt={post.title}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-6xl">
            📝
          </div>
        )}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-brand-gold text-brand-white text-sm rounded-full font-semibold shadow-md">
            {post.category?.name || "General"}
          </span>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-brand-black mb-2 group-hover:text-brand-gold transition-colors line-clamp-2">
          {post.title}
        </h3>
        <p className="text-brand-black/70 mb-4 line-clamp-3">
          {truncateText(post.content || "" , 150)}
        </p>
        <div className="flex items-center justify-between text-sm text-brand-black/60">
          <span>{new Date(post.createdAt).toLocaleDateString("es-MX")}</span>
          <span className="flex items-center gap-1">
            <span>👁️</span>
            {post.views}
          </span>
        </div>
      </div>
    </Link>
  );
});

// Componente de tarjeta en lista con forwardRef
const BlogCardList = React.forwardRef(({ post }, ref) => {
  return (
    <Link
      ref={ref}
      to={`/blog/${post.slug}`}
      className="group flex flex-col md:flex-row gap-6 bg-brand-white border-2 border-brand-gold/30 rounded-xl overflow-hidden hover:shadow-xl hover:border-brand-gold transition-all duration-300 p-6"
    >
      <div className="relative w-full md:w-64 h-48 shrink-0 overflow-hidden rounded-lg bg-linear-to-br from-brand-yellow/20 to-brand-gold/20">
        {post.image ? (
          <img
            src={post.image}
            alt={post.title}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-6xl">
            📝
          </div>
        )}
      </div>

      <div className="flex-1">
        <div className="flex items-center gap-3 mb-3">
          <span className="px-3 py-1 bg-brand-gold text-brand-white text-sm rounded-full font-semibold">
            {post.category?.name || "General"}
          </span>
          <span className="text-sm text-brand-black/60">
            {new Date(post.createdAt).toLocaleDateString("es-MX")}
          </span>
        </div>
        <h3 className="text-2xl font-bold text-brand-black mb-3 group-hover:text-brand-gold transition-colors">
          {post.title}
        </h3>
        <p className="text-brand-black/70 mb-4 line-clamp-2">
          {truncateText(post.content || "" , 200)}
        </p>
        <div className="flex items-center gap-4 text-sm text-brand-black/60">
          <span className="flex items-center gap-1">
            <span>👁️</span>
            {post.views} vistas
          </span>
          <span>•</span>
          <span>{Math.ceil(post.content?.length || 0 / 1000)} min de lectura</span>
        </div>
      </div>
    </Link>
  );
});

BlogCardGrid.displayName = "BlogCardGrid";
BlogCardList.displayName = "BlogCardList";