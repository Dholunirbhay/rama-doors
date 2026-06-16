import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { SettingsProvider } from './context/SettingsContext';
import Layout from './components/layout/Layout';
import LoadingPage from './components/ui/Loading';

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
import { ReactElement } from 'react';

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
            <div className="min-h-[60vh] flex items-center justify-center">
              <div className="text-center">
                <h1 className="text-6xl font-display font-bold text-brand-700 mb-4">404</h1>
                <p className="text-neutral-600 dark:text-neutral-400 mb-6">Page not found</p>
                <a href="/" className="btn-primary">
                  Go Home
                </a>
              </div>
            </div>
          </Layout>
        }
      />
    </Routes>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <SettingsProvider>
          <Router>
            <AppRoutes />
          </Router>
        </SettingsProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
