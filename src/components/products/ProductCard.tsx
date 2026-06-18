import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, MessageCircle, Star } from 'lucide-react';
import type { Product } from '../../types';
import { useSettings } from '../../context/SettingsContext';
import { getWhatsAppUrl } from '../../lib/utils';

const FALLBACK_IMAGE = '/images/default-door.webp';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { settings } = useSettings();
  const designPath = `/products/${product.design_code.toLowerCase().replace(' ', '-')}`;

  return (
    <motion.article
      whileHover={{ y: -6 }}
      className="group bg-white dark:bg-brand-800 rounded-2xl overflow-hidden shadow-md hover:shadow-brand-lg border border-brand-100 dark:border-brand-700 transition-all duration-300 flex flex-col"
    >
      {/* Image */}
      <Link to={designPath} className="block relative overflow-hidden aspect-[4/3]">
        <img
          src={product.image_url || FALLBACK_IMAGE}
          alt={product.name}
          className="w-full h-full object-contain bg-white group-hover:scale-105 transition-transform duration-700"
          onError={(e) => { (e.target as HTMLImageElement).src = FALLBACK_IMAGE; }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-900/60 via-brand-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-brand-600 text-white">
            {product.design_code}
          </span>
          {product.is_featured && (
            <span className="px-2 py-1 rounded-full text-xs font-bold bg-accent-400 text-white flex items-center gap-1">
              <Star className="w-3 h-3" />
              Featured
            </span>
          )}
        </div>

        {/* Hover CTA */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-white/95 backdrop-blur-sm text-brand-700 text-sm font-semibold px-4 py-2 rounded-full opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 whitespace-nowrap">
          <Eye className="w-4 h-4" />
          View Details
        </div>
      </Link>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col">
        <Link to={designPath}>
          <h3 className="font-display font-semibold text-lg text-brand-900 dark:text-white mb-1.5 hover:text-brand-600 dark:hover:text-accent-300 transition-colors line-clamp-1">
            {product.name}
          </h3>
        </Link>

        <div className="flex flex-wrap gap-2 mb-3">
          {product.size && (
            <span className="text-xs text-neutral-500 dark:text-neutral-400 bg-brand-50 dark:bg-brand-700/50 px-2.5 py-1 rounded-full">
              {product.size}
            </span>
          )}
          {product.material && (
            <span className="text-xs text-neutral-500 dark:text-neutral-400 bg-brand-50 dark:bg-brand-700/50 px-2.5 py-1 rounded-full">
              {product.material}
            </span>
          )}
        </div>

        {product.description && (
          <p className="text-neutral-500 dark:text-neutral-400 text-sm mb-4 line-clamp-2 leading-relaxed flex-1">
            {product.description}
          </p>
        )}

        <div className="flex items-center justify-between pt-3 border-t border-brand-100 dark:border-brand-700 mt-auto">
          <span className="font-semibold text-brand-600 dark:text-accent-300">
            {product.price_label}
          </span>
          <a
            href={getWhatsAppUrl(settings.whatsapp, `Hello! I'm interested in ${product.name} (${product.design_code}). Please share details.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm font-medium text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            Inquire
          </a>
        </div>
      </div>
    </motion.article>
  );
}
