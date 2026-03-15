import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import SimpleEditor from "../../components/SimpleEditor";

export default function EditPost() {
  const { id } = useParams();
  const [post, setPost] = useState({
    title: "",
    content: "",
    category: "",
    videoUrl: "",
    image: "",
    showDonation: false,
    donationMessage: "",
  });
  const [categories, setCategories] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const defaultDonationMessage =
    "Si este material ha sido de bendición para ti o para tu iglesia, y deseas apoyar para que sigamos creando más recursos de enseñanza bíblica, puedes hacerlo aquí. Tu aporte es voluntario y nos ayuda a continuar fortaleciendo a más creyentes. 🤍";

  useEffect(() => {
    fetchCategories();
    fetchPost();
  }, [id]);

  const fetchCategories = async () => {
    try {
      const res = await axios.get("/api/categories");
      setCategories(res.data);
    } catch (error) {
      console.error("Error al cargar categorías:", error);
    }
  };

  const fetchPost = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`/api/posts/admin/all`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const foundPost = res.data.find((p) => p._id === id);
      if (foundPost) {
        setPost({
          title: foundPost.title,
          content: foundPost.content,
          category: foundPost.category?._id || "",
          videoUrl: foundPost.videoUrl || "",
          image: foundPost.image || "",
          showDonation: foundPost.showDonation || false,
          donationMessage: foundPost.donationMessage || "",
        });
        if (foundPost.image) {
          setImagePreview(foundPost.image);
        }
      }
    } catch (error) {
      console.error("Error al cargar post:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const uploadImageToCloudinary = async () => {
    if (!imageFile) return null;

    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("upload_preset", "tu_upload_preset"); // Reemplaza
    formData.append("cloud_name", "tu_cloud_name"); // Reemplaza

    try {
      setUploading(true);
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/tu_cloud_name/image/upload", // Reemplaza
        formData,
      );
      return res.data.secure_url;
    } catch (error) {
      console.error("Error al subir imagen:", error);
      alert("Error al subir la imagen");
      return null;
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSubmitting(true);

      let imageUrl = post.image;
      if (imageFile) {
        imageUrl = await uploadImageToCloudinary();
        if (!imageUrl) return;
      }

      const postData = {
        ...post,
        image: imageUrl,
        donationMessage: post.showDonation
          ? post.donationMessage || defaultDonationMessage
          : "",
      };

      await axios.put(`/api/posts/${id}`, postData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("Post actualizado exitosamente");
      navigate("/admin/dashboard");
    } catch (error) {
      console.error("Error al actualizar post:", error);
      alert("Error al actualizar el post");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-white pt-24 pb-12 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-brand-gold border-t-transparent mx-auto mb-4"></div>
          <p className="text-brand-black/60 font-semibold">Cargando post...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-white pt-24 pb-12">
      <div className="max-w-5xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-brand-black mb-2">
            Editar Post
          </h1>
          <p className="text-brand-black/60">
            Modifica los campos que desees actualizar
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-linear-to-br from-brand-white to-brand-yellow/10 border-2 border-brand-gold/30 rounded-xl shadow-lg p-8 space-y-6"
        >
          {/* Título */}
          <div>
            <label className="block text-sm font-bold text-brand-black mb-2">
              Título del Artículo *
            </label>
            <input
              type="text"
              value={post.title}
              onChange={(e) => setPost({ ...post, title: e.target.value })}
              className="w-full px-4 py-3 border-2 border-brand-gold/30 rounded-lg focus:ring-2 focus:ring-brand-gold focus:border-brand-gold bg-brand-white text-brand-black"
              required
            />
          </div>

          {/* Categoría */}
          <div>
            <label className="block text-sm font-bold text-brand-black mb-2">
              Categoría *
            </label>
            <select
              value={post.category}
              onChange={(e) => setPost({ ...post, category: e.target.value })}
              className="w-full px-4 py-3 border-2 border-brand-gold/30 rounded-lg focus:ring-2 focus:ring-brand-gold focus:border-brand-gold bg-brand-white text-brand-black"
              required
            >
              <option value="">Selecciona una categoría</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Imagen destacada */}
          <div>
            <label className="block text-sm font-bold text-brand-black mb-2">
              Imagen Destacada
            </label>
            <div className="space-y-3">
              <input
                type="file"
                id="imageUpload"
                onChange={handleImageSelect}
                accept="image/*"
                className="hidden"
                disabled={uploading}
              />
              <label
                htmlFor="imageUpload"
                className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all cursor-pointer ${
                  uploading
                    ? "bg-gray-400 text-white cursor-not-allowed"
                    : "bg-brand-gold text-brand-white hover:bg-brand-yellow hover:text-brand-black shadow-md hover:shadow-lg"
                }`}
              >
                <span className="text-xl">📁</span>
                {uploading
                  ? "Subiendo..."
                  : imagePreview
                    ? "Cambiar Imagen"
                    : "Seleccionar Imagen"}
              </label>

              {imagePreview && (
                <div className="mt-4">
                  <p className="text-sm text-brand-black/60 mb-2">
                    Vista previa:
                  </p>
                  <div className="relative w-full max-w-md">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full rounded-lg border-2 border-brand-gold/30 shadow-md"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setImageFile(null);
                        setImagePreview("");
                        setPost({ ...post, image: "" });
                      }}
                      className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* URL de Video de YouTube */}
          <div>
            <label className="block text-sm font-bold text-brand-black mb-2">
              URL de Video de YouTube (opcional)
            </label>
            <input
              type="url"
              value={post.videoUrl}
              onChange={(e) => setPost({ ...post, videoUrl: e.target.value })}
              placeholder="https://www.youtube.com/watch?v=..."
              className="w-full px-4 py-3 border-2 border-brand-gold/30 rounded-lg focus:ring-2 focus:ring-brand-gold focus:border-brand-gold bg-brand-white text-brand-black"
            />
          </div>

          {/* Editor Manual */}
          <SimpleEditor
            value={post.content}
            onChange={(content) => setPost({ ...post, content })}
          />

          {/* Buy Me a Coffee */}
          <div className="border-2 border-brand-gold/30 rounded-lg p-6 bg-brand-white">
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="showDonation"
                checked={post.showDonation}
                onChange={(e) =>
                  setPost({ ...post, showDonation: e.target.checked })
                }
                className="mt-1 w-5 h-5 text-brand-gold focus:ring-brand-gold border-brand-gold/30 rounded"
              />
              <div className="flex-1">
                <label
                  htmlFor="showDonation"
                  className="font-bold text-brand-black cursor-pointer"
                >
                  Activar botón de donación "Stripe"
                </label>
                <p className="text-sm text-brand-black/70 mt-1">
                  {defaultDonationMessage}
                </p>

                {post.showDonation && (
                  <div className="mt-4">
                    <label className="block text-sm font-semibold text-brand-black mb-2">
                      Mensaje personalizado (opcional)
                    </label>
                    <textarea
                      value={post.donationMessage}
                      onChange={(e) =>
                        setPost({ ...post, donationMessage: e.target.value })
                      }
                      placeholder={defaultDonationMessage}
                      rows={3}
                      className="w-full px-4 py-3 border-2 border-brand-gold/30 rounded-lg focus:ring-2 focus:ring-brand-gold focus:border-brand-gold bg-brand-white text-brand-black"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Botones */}
          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={submitting || uploading}
              className={`flex-1 py-3 rounded-lg font-bold transition-all ${
                submitting || uploading
                  ? "bg-gray-400 text-white cursor-not-allowed"
                  : "bg-brand-gold text-brand-white hover:bg-brand-yellow hover:text-brand-black hover:shadow-xl"
              }`}
            >
              {submitting
                ? "Actualizando..."
                : uploading
                  ? "Subiendo imagen..."
                  : "Actualizar Post"}
            </button>
            <button
              type="button"
              onClick={() => navigate("/admin/dashboard")}
              className="px-8 py-3 bg-brand-white text-brand-black border-2 border-brand-gold/30 rounded-lg hover:border-brand-gold transition-all font-bold"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
