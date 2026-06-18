import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ZoomIn } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import type { GalleryImage } from '../../types';

export default function GalleryPreview() {
  const [images, setImages] = useState<GalleryImage[]>([]);

  useEffect(() => {
  async function fetchGallery() {
    const { data, error } = await supabase
      .from('gallery')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(9);

    if (error) {
      console.error(error);
      return;
    }

    setImages(data || []);
  }

  fetchGallery();
}, []);

  return (
    <section className="section-padding bg-brand-gradient">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-accent-300 text-sm font-medium uppercase tracking-wide mb-4">
            Our Work
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white mt-2 mb-4">
            Gallery of Excellence
          </h2>
          <p className="text-brand-200 max-w-2xl mx-auto leading-relaxed">
            Browse our portfolio of completed projects — a testament to the
            craftsmanship that goes into every door we create.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {images.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.07 }}
              className={`group relative rounded-2xl overflow-hidden bg-white cursor-pointer ${
                index === 0 ? 'row-span-2 col-span-1' : 'aspect-square'
              }`}
              style={index === 0 ? undefined : undefined}
            >
              <img
                src={image.image_url}
                alt={image.title || 'Gallery'}
                className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-700"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.pexels.com/photos/2635038/pexels-photo-2635038.jpeg?auto=compress&cs=tinysrgb&w=600';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-900/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                <div className="flex items-center gap-2 text-white text-sm font-medium">
                  <ZoomIn className="w-4 h-4" />
                  {image.title || 'View'}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <Link
            to="/gallery"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50 transition-all duration-300 group"
          >
            View Full Gallery
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
