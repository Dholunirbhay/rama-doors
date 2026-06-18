import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, MessageCircle, Star, Shield, Award } from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';
import { getWhatsAppUrl } from '../../lib/utils';

export default function HeroSection() {
  const { settings } = useSettings();

  return (
    <section className="relative min-h-[100svh] flex items-center overflow-hidden bg-brand-gradient">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="grid" patternUnits="userSpaceOnUse" width="8" height="8">
              <path d="M8 0L0 0 0 8" fill="none" stroke="white" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#grid)" />
        </svg>
      </div>

      {/* Gradient orbs */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-accent-400/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-500/20 rounded-full blur-2xl pointer-events-none" />

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left — Text Content */}
          <div className="text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-accent-300 text-sm font-medium mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-accent-400 animate-pulse" />
              Kutch's Finest Teak Wood Doors
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-[64px] font-display font-bold text-white leading-[1.1] mb-6"
            >
              {settings.hero_title || 'Premium Teak Wood Doors'}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg sm:text-xl text-brand-200 mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed"
            >
              {settings.hero_subtitle || 'Handcrafted Luxury for Your Home'} — Various designs and customized designs crafted by skilled artisans in Kutch, Gujarat.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Link
                to="/products"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl font-semibold text-brand-900 bg-white hover:bg-brand-50 shadow-xl hover:shadow-2xl transform hover:-translate-y-0.5 transition-all duration-300 group"
              >
                View All Designs
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href={getWhatsAppUrl(settings.whatsapp, 'Hello! I am interested in your premium teak wood doors. Please share more details.')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl font-semibold text-white border-2 border-white/30 hover:bg-white/10 hover:border-white/50 transition-all duration-300"
              >
                <MessageCircle className="w-5 h-5" />
                WhatsApp Inquiry
              </a>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-12 flex flex-wrap gap-6 justify-center lg:justify-start"
            >
              {[
                { icon: Star, text: 'Various designs and customized designs' },
                { icon: Shield, text: 'Premium Quality' },
                { icon: Award, text: 'Handcrafted' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2 text-brand-300 text-sm">
                  <Icon className="w-4 h-4 text-accent-400" />
                  <span>{text}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="relative aspect-[3/4] max-w-md mx-auto">
              {/* Main image */}
              <div className="rounded-3xl overflow-hidden shadow-2xl h-full">
                <img
                  src="public/images/hero-door.png"
                  alt="Premium Teak Wood Door"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-900/40 via-transparent to-transparent" />
              </div>

              {/* Floating info card */}
              <motion.div
                initial={{ opacity: 0, x: 30, y: 0 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ delay: 0.7 }}
                className="absolute -right-8 top-1/3 bg-white dark:bg-brand-800 rounded-2xl p-4 shadow-2xl max-w-[180px]"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-full bg-brand-100 flex items-center justify-center">
                    <Award className="w-4 h-4 text-brand-600" />
                  </div>
                  <span className="text-xs font-semibold text-brand-900 dark:text-white">Premium Quality</span>
                </div>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">100% Solid Teak Wood</p>
              </motion.div>

              {/* Design code badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-brand-600 text-white px-6 py-3 rounded-2xl shadow-xl text-center whitespace-nowrap"
              >
                
                <p className="text-brand-200 text-xs">Exclusive Door Collection</p>
              </motion.div>
            </div>

            {/* Decorative ring */}
            <div className="absolute -inset-6 -z-10 rounded-[40px] border border-white/10" />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-1.5">
          <motion.div
            animate={{ y: [0, 14, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="w-1 h-2.5 rounded-full bg-accent-400"
          />
        </div>
      </motion.div>
    </section>
  );
}
