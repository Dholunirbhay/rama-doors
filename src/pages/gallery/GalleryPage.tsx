import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react';
import { galleryStore } from '../../lib/localStore';
import type { GalleryImage } from '../../types';

const FALLBACK = 'https://images.pexels.com/photos/2635038/pexels-photo-2635038.jpeg?auto=compress&cs=tinysrgb&w=800';

export default function GalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    setImages(galleryStore.getAll());
  }, []);

  const categories = ['All', ...Array.from(new Set(images.map(i => i.category).filter(Boolean)))];
  const filtered = activeCategory === 'All' ? images : images.filter(i => i.category === activeCategory);

  const openLightbox = (index: number) => {
    setSelectedIndex(index);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedIndex(null);
    document.body.style.overflow = '';
  };

  const prev = () => setSelectedIndex(i => (i != null ? (i - 1 + filtered.length) % filtered.length : null));
  const next = () => setSelectedIndex(i => (i != null ? (i + 1) % filtered.length : null));

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [selectedIndex, filtered.length]);

  return (
    <div className="pt-10">
      {/* Hero */}
      <section className="section-padding bg-brand-gradient text-white">
        <div className="container-custom text-center max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-accent-300 text-sm font-medium mb-6">
              Our Portfolio
            </span>
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-5">
              Gallery of Excellence
            </h1>
            <p className="text-xl text-brand-200 leading-relaxed">
              A visual journey through our handcrafted doors, artisan workshops,
              and premium installations across Gujarat.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <div className="sticky top-20 z-20 bg-white/95 dark:bg-brand-950/95 backdrop-blur-lg border-b border-brand-100 dark:border-brand-800 py-4 px-4">
        <div className="max-w-7xl mx-auto flex gap-2 flex-wrap justify-center">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat || 'All')}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeCategory === (cat || 'All')
                  ? 'bg-brand-600 text-white shadow-brand'
                  : 'bg-brand-50 dark:bg-brand-800 text-neutral-600 dark:text-neutral-400 hover:bg-brand-100'
              }`}
            >
              {cat || 'All'}
            </button>
          ))}
        </div>
      </div>

      {/* Gallery Grid */}
      <section className="section-padding bg-brand-50 dark:bg-brand-950">
        <div className="container-custom">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map((image, index) => (
              <motion.div
                key={image.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.04 }}
                className="group relative aspect-square rounded-2xl overflow-hidden bg-brand-200 dark:bg-brand-800 cursor-pointer shadow-md hover:shadow-brand-lg transition-shadow"
                onClick={() => openLightbox(index)}
              >
                <img
                  src={image.image_url}
                  alt={image.title || 'Gallery'}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  onError={(e) => { (e.target as HTMLImageElement).src = FALLBACK; }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-900/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <div className="flex items-center gap-2 text-white text-sm font-medium">
                    <ZoomIn className="w-4 h-4" />
                    {image.title || 'View'}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20 text-neutral-500">No images in this category.</div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            {/* Close */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-10"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Prev / Next */}
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-4 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-10"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-4 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-10"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Image */}
            <motion.div
              key={selectedIndex}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="max-w-5xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={filtered[selectedIndex]?.image_url}
                alt={filtered[selectedIndex]?.title || 'Gallery'}
                className="w-full max-h-[80vh] object-contain rounded-2xl"
                onError={(e) => { (e.target as HTMLImageElement).src = FALLBACK; }}
              />
              {filtered[selectedIndex]?.title && (
                <p className="text-center text-white mt-4 font-medium">
                  {filtered[selectedIndex].title}
                </p>
              )}
              <p className="text-center text-neutral-500 text-sm mt-1">
                {selectedIndex + 1} / {filtered.length}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
