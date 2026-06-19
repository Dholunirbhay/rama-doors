import { ReactNode } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  Package,
  Image,
  MessageSquare,
  Settings,
  LogOut,
  Menu,
  X,
  Sun,
  Moon,
} from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../../context/useAuth';
import Logo from '../../components/ui/Logo';
import { useTheme } from '../../context/ThemeContext';

interface AdminLayoutProps {
  children: ReactNode;
}

const adminLinks = [
  { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
  { name: 'Products', path: '/admin/products', icon: Package },
  { name: 'Gallery', path: '/admin/gallery', icon: Image },
  { name: 'Inquiries', path: '/admin/inquiries', icon: MessageSquare },
  { name: 'Settings', path: '/admin/settings', icon: Settings },
];

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  const handleSignOut = () => {
    signOut();
    navigate('/admin/login');
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-brand-50 dark:bg-brand-950">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:w-64 lg:bg-brand-900 lg:flex lg:flex-col">
        <div className="flex items-center justify-between p-4 border-b border-brand-800">
          <Link to="/admin">
            <Logo size="md" className="text-white [&_img]:brightness-0 [&_img]:invert" />
          </Link>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {adminLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                isActive(link.path)
                  ? 'bg-brand-600 text-white shadow-brand'
                  : 'text-brand-300 hover:bg-brand-800 hover:text-white'
              }`}
            >
              <link.icon className="w-5 h-5" />
              {link.name}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-brand-800">
          <button
            onClick={toggleTheme}
            className="flex items-center gap-3 px-4 py-2 rounded-xl text-brand-300 hover:bg-brand-800 hover:text-white transition-colors w-full mb-2"
          >
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            Toggle Theme
          </button>
          <button
            onClick={handleSignOut}
            className="flex items-center gap-3 px-4 py-2 rounded-xl text-red-400 hover:bg-red-900/30 transition-colors w-full"
          >
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 bg-brand-900 dark:bg-brand-950 z-40 border-b border-brand-800">
        <div className="flex items-center justify-between p-4">
          <Link to="/admin">
            <Logo size="md" className="text-white [&_img]:brightness-0 [&_img]:invert" />
          </Link>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg text-white"
          >
            {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="lg:hidden fixed inset-0 z-50 bg-brand-900/95 backdrop-blur-sm pt-20"
        >
          <nav className="p-4 space-y-1">
            {adminLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                  isActive(link.path)
                    ? 'bg-brand-600 text-white'
                    : 'text-brand-300 hover:bg-brand-800 hover:text-white'
                }`}
              >
                <link.icon className="w-5 h-5" />
                {link.name}
              </Link>
            ))}
            <button
              onClick={toggleTheme}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-brand-300 hover:bg-brand-800 hover:text-white transition-colors w-full"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              Toggle Theme
            </button>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-900/30 transition-colors w-full"
            >
              <LogOut className="w-5 h-5" />
              Sign Out
            </button>
          </nav>
        </motion.div>
      )}

      {/* Main Content */}
      <main className="lg:ml-64 pt-20 lg:pt-0">
        <div className="p-4 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
