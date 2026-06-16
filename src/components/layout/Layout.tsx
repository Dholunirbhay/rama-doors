import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import Navbar from './Navbar';
import Footer from './Footer';

interface LayoutProps {
  children: ReactNode;
  hideNavbar?: boolean;
  hideFooter?: boolean;
}

export default function Layout({ children, hideNavbar, hideFooter }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-beige-50 dark:bg-navy-950 transition-colors duration-300">
      {!hideNavbar && <Navbar />}
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className={`flex-grow ${!hideNavbar ? 'pt-20' : ''}`}
      >
        {children}
      </motion.main>
      {!hideFooter && <Footer />}
    </div>
  );
}
