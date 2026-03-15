import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop'; // ← Importar
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import SinglePost from './pages/SinglePost';
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import NewPost from './pages/admin/NewPost';
import EditPost from './pages/admin/EditPost';
import NewCategory from './pages/admin/NewCategory';
import EditCategory from './pages/admin/EditCategory';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ScrollToTop /> {/* ← Agregar aquí */}
        <div className="min-h-screen bg-brand-white flex flex-col">
          <Navbar />
          <main className="grow">
            <Routes>
              {/* Rutas PÚBLICAS */}
              <Route path="/" element={<Home />} />
              <Route path="/nosotros" element={<About />} />
              <Route path="/servicios" element={<Services />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<SinglePost />} />
              <Route path="/contacto" element={<Contact />} />
              
              {/* Login (ruta secreta) */}
              <Route path="/admin/login" element={<Login />} />
              
              {/* Rutas PROTEGIDAS (solo admin) */}
              <Route 
                path="/admin/dashboard" 
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/nuevo-post" 
                element={
                  <ProtectedRoute>
                    <NewPost />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/editar-post/:id" 
                element={
                  <ProtectedRoute>
                    <EditPost />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/nueva-categoria" 
                element={
                  <ProtectedRoute>
                    <NewCategory />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/editar-categoria/:id" 
                element={
                  <ProtectedRoute>
                    <EditCategory />
                  </ProtectedRoute>
                } 
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;