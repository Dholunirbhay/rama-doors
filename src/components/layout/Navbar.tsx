

import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon, Phone } from 'lucide-react';
import Logo from '../ui/Logo';
import { useTheme } from '../../context/ThemeContext';
import { useSettings } from '../../context/useSettings';
import { getTelUrl } from '../../lib/utils';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Products', path: '/products' },
  { name: 'Gallery', path: '/gallery' },
  { name: 'Process', path: '/process' },
  { name: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const { settings } = useSettings();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    document.body.style.overflow = '';
  }, [location]);

  const toggleMenu = () => {
    setIsOpen(v => {
      document.body.style.overflow = !v ? 'hidden' : '';
      return !v;
    });
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/97 dark:bg-brand-950/97 backdrop-blur-lg shadow-brand border-b border-brand-100 dark:border-brand-800'
          : 'bg-white/95 dark:bg-brand-950/95 backdrop-blur-lg shadow-sm border-b border-brand-100 dark:border-brand-800'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex-shrink-0 group" aria-label="Rama Door Home">
            <Logo
              size="md"
              className="transition-all duration-300 group-hover:opacity-85"
            />
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
                  isActive(link.path)
                    ? 'text-brand-600 dark:text-accent-300 bg-brand-50 dark:bg-brand-900/50'
                    : 'text-neutral-700 dark:text-neutral-300 hover:text-brand-600 dark:hover:text-accent-300 hover:bg-brand-50 dark:hover:bg-brand-900/30'
                }`}
              >
                {link.name}
                {isActive(link.path) && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full bg-accent-400"
                  />
                )}
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-neutral-600 dark:text-neutral-400 hover:bg-brand-50 dark:hover:bg-brand-800 transition-all duration-200"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            <a
              href={getTelUrl(settings.mobile)}
              className="hidden xl:flex items-center gap-2 text-sm font-medium text-brand-600 dark:text-accent-300 transition-all"
            >
              <Phone className="w-4 h-4" />
              {settings.mobile}
            </a>

            <Link
              to="/contact"
              className="px-5 py-2.5 rounded-xl font-semibold text-sm bg-brand-600 hover:bg-brand-700 text-white shadow-brand hover:shadow-brand-lg transform hover:-translate-y-0.5 transition-all duration-300"
            >
              Get Quote
            </Link>
          </div>

          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-neutral-700 dark:text-neutral-300 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            <button
              onClick={toggleMenu}
              className="p-2 rounded-lg text-neutral-700 dark:text-neutral-300 transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="lg:hidden overflow-hidden bg-white dark:bg-brand-950 border-t border-brand-100 dark:border-brand-800 shadow-xl"
          >
            <div className="px-4 py-4 space-y-1">
              <div className="pb-3 mb-3 border-b border-brand-100 dark:border-brand-800">
                <Logo size="md" />
              </div>

              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center px-4 py-3 rounded-xl font-medium transition-all ${
                    isActive(link.path)
                      ? 'text-brand-600 dark:text-accent-300 bg-brand-50 dark:bg-brand-900/50'
                      : 'text-neutral-700 dark:text-neutral-300 hover:text-brand-600 dark:hover:text-accent-300 hover:bg-brand-50 dark:hover:bg-brand-900/30'
                  }`}
                >
                  {link.name}
                </Link>
              ))}

              <div className="pt-3 mt-3 border-t border-brand-100 dark:border-brand-800 space-y-2">
                <a
                  href={getTelUrl(settings.mobile)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-brand-700 dark:text-accent-300 font-medium bg-brand-50 dark:bg-brand-900/30"
                >
                  <Phone className="w-5 h-5" />
                  {settings.mobile}
                </a>

                <Link
                  to="/contact"
                  className="block w-full text-center px-4 py-3 rounded-xl bg-brand-600 text-white font-semibold"
                >
                  Get a Quote
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}