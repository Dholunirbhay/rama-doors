import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { useAuth } from './context/useAuth';
import { SettingsProvider } from './context/SettingsContext';
import Layout from './components/layout/Layout';
import { LoadingPage } from './components/ui/Loading';
import BackToTop from './components/ui/BackToTop';

// Pages
import HomePage from './pages/home/HomePage';
import AboutPage from './pages/about/AboutPage';
import ProductsPage from './pages/products/ProductsPage';
import ProductDetailPage from './pages/products/ProductDetailPage';
import GalleryPage from './pages/gallery/GalleryPage';
import ProcessPage from './pages/process/ProcessPage';
import ContactPage from './pages/contact/ContactPage';

// Admin Pages
import AdminLogin from './pages/admin/AdminLogin';
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProducts from './pages/admin/AdminProducts';
import AdminProductForm from './pages/admin/AdminProductForm';
import AdminGallery from './pages/admin/AdminGallery';
import AdminInquiries from './pages/admin/AdminInquiries';
import AdminSettings from './pages/admin/AdminSettings';
import { ReactElement, useEffect } from 'react';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.history.scrollRestoration = 'manual';

    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });

    const timer = setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    }, 100);

    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
}

function ProtectedRoute({ children }: { children: ReactElement }) {
  const { isAdmin, loading } = useAuth();

  if (loading) {
    return <LoadingPage />;
  }

  if (!isAdmin) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}

function AdminRoutes() {
  return (
    <ProtectedRoute>
      <AdminLayout>
        <Routes>
          <Route index element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="products/new" element={<AdminProductForm />} />
          <Route path="products/edit/:id" element={<AdminProductForm />} />
          <Route path="gallery" element={<AdminGallery />} />
          <Route path="inquiries" element={<AdminInquiries />} />
          <Route path="settings" element={<AdminSettings />} />
        </Routes>
      </AdminLayout>
    </ProtectedRoute>
  );
}

function AppRoutes() {
  return (
    <>
    
    <Routes>
      {/* Public Routes */}
      <Route
        path="/"
        element={
          <Layout>
            <HomePage />
          </Layout>
        }
      />
      <Route
        path="/about"
        element={
          <Layout>
            <AboutPage />
          </Layout>
        }
      />
      <Route
        path="/products"
        element={
          <Layout>
            <ProductsPage />
          </Layout>
        }
      />
      <Route
        path="/products/:designCode"
        element={
          <Layout>
            <ProductDetailPage />
          </Layout>
        }
      />
      <Route
        path="/gallery"
        element={
          <Layout>
            <GalleryPage />
          </Layout>
        }
      />
      <Route
        path="/process"
        element={
          <Layout>
            <ProcessPage />
          </Layout>
        }
      />
      <Route
        path="/contact"
        element={
          <Layout>
            <ContactPage />
          </Layout>
        }
      />

      {/* Admin Routes */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/*" element={<AdminRoutes />} />

      {/* 404 */}
      <Route
  path="*"
  element={
    <Layout>
      <div className="min-h-[80vh] flex items-center justify-center bg-brand-gradient px-4">
        <div className="text-center max-w-2xl">
          <h1 className="text-8xl md:text-9xl font-display font-bold text-white mb-4">
            404
          </h1>

          <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
            Door Not Found
          </h2>

          <p className="text-brand-200 text-lg mb-8">
            Looks like you've opened a door that doesn't exist.
            Let's get you back to the right entrance.
          </p>

          <a
            href="/"
            className="inline-flex items-center justify-center px-8 py-4 rounded-xl font-semibold bg-white text-brand-700 hover:bg-brand-50 shadow-xl transition-all"
          >
            Return to Home
          </a>
        </div>
      </div>
    </Layout>
  }
/>
    </Routes>

    
    </>
  );
}

function App() {
  return (
     
    <ThemeProvider>
      <AuthProvider>
        <SettingsProvider>
          <Router>
            <ScrollToTop />
            <AppRoutes />
          </Router>
        </SettingsProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
