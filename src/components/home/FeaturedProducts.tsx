import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { productsStore } from '../../lib/localStore';
import type { Product } from '../../types';
import ProductCard from '../products/ProductCard';

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    setProducts(productsStore.getFeatured().slice(0, 6));
  }, []);

  return (
    <section className="section-padding bg-white dark:bg-brand-900">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="section-badge mb-4 inline-flex">Our Collection</span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-brand-900 dark:text-white mt-2 mb-4">
            Featured Door Designs
          </h2>
          <p className="text-neutral-500 dark:text-neutral-400 max-w-2xl mx-auto leading-relaxed">
            Explore our handpicked selection of premium teak wood doors, each crafted
            to bring elegance and security to your entrance.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            to="/products"
            className="inline-flex items-center gap-2 font-semibold text-brand-600 dark:text-accent-300 hover:text-brand-700 dark:hover:text-accent-200 group transition-colors"
          >
            View All 31+ Designs
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
