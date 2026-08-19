import React from 'react';
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import AdminLogin from './admin/Login';
import AdminLayout from './admin/AdminLayout';
import DashboardHome from './admin/pages/DashboardHome';
import CategoryManager from './admin/pages/CategoryManager';
import AlbumManager from './admin/pages/AlbumManager';
import AlbumEditor from './admin/pages/AlbumEditor';
import './App.css';

const ProtectedAdminRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('isAdminAuthenticated') === 'true';

  return isAuthenticated
    ? children
    : <Navigate to="/admin/login" replace />;
};

function AppContent() {
  const location = useLocation();
  const isAdminRoute = location.pathname.toLowerCase().startsWith('/admin');

  return (
    <div className="App">
      {!isAdminRoute && <Header />}

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about-me" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />

          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin"
            element={
              <ProtectedAdminRoute>
                <AdminLayout />
              </ProtectedAdminRoute>
            }
          >
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<DashboardHome />} />
            <Route path="categories" element={<CategoryManager />} />
            <Route path="albums" element={<AlbumManager />} />
            <Route path="albums/create" element={<AlbumEditor />} />
            <Route path="albums/edit/:id" element={<AlbumEditor />} />
            <Route path="*" element={<Navigate to="dashboard" replace />} />
          </Route>
        </Routes>
      </main>

      {!isAdminRoute && <Footer />}
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
