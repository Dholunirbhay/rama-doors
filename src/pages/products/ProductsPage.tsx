import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, X } from 'lucide-react';
import { productsStore } from '../../lib/localStore';
import type { Product } from '../../types';
import ProductCard from '../../components/products/ProductCard';

const CATEGORIES = ['All', 'Teak Wood Door', 'Premium Teak Wood Door', 'Custom Door'];

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);

  useEffect(() => {
    setProducts(productsStore.getAll());
  }, []);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchSearch =
        !searchTerm ||
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.design_code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (p.description || '').toLowerCase().includes(searchTerm.toLowerCase());
      const matchCategory = activeCategory === 'All' || p.category === activeCategory;
      const matchFeatured = !showFeaturedOnly || p.is_featured;
      return matchSearch && matchCategory && matchFeatured;
    });
  }, [products, searchTerm, activeCategory, showFeaturedOnly]);

  const clearFilters = () => {
    setSearchTerm('');
    setActiveCategory('All');
    setShowFeaturedOnly(false);
  };

  const hasFilters = searchTerm || activeCategory !== 'All' || showFeaturedOnly;

  return (
    <div className="pt-10">
      {/* Hero */}
      <section className="section-padding bg-brand-gradient text-white">
        <div className="container-custom text-center max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-accent-300 text-sm font-medium mb-6">
              Our Collection
            </span>
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-5">
              Premium Teak Wood Doors
            </h1>
            <p className="text-xl text-brand-200 leading-relaxed">
              Explore all 31 exclusive designs — from classic heritage panels to
              contemporary minimalist entrances, each handcrafted to perfection.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-20 z-30 bg-white/95 dark:bg-brand-950/95 backdrop-blur-lg border-b border-brand-100 dark:border-brand-800 py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              type="text"
              placeholder="Search by name or design code…"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-brand-200 dark:border-brand-700 bg-white dark:bg-brand-800 text-brand-900 dark:text-white focus:ring-2 focus:ring-accent-400 focus:border-transparent text-sm outline-none"
            />
          </div>

          {/* Category Pills */}
          <div className="flex gap-2 flex-wrap">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeCategory === cat
                    ? 'bg-brand-600 text-white shadow-brand'
                    : 'bg-brand-50 dark:bg-brand-800 text-neutral-600 dark:text-neutral-400 hover:bg-brand-100 dark:hover:bg-brand-700'
                }`}
              >
                {cat}
              </button>
            ))}
            <button
              onClick={() => setShowFeaturedOnly(!showFeaturedOnly)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1 ${
                showFeaturedOnly
                  ? 'bg-accent-500 text-white'
                  : 'bg-brand-50 dark:bg-brand-800 text-neutral-600 dark:text-neutral-400 hover:bg-brand-100 dark:hover:bg-brand-700'
              }`}
            >
              <Filter className="w-3 h-3" />
              Featured
            </button>
            {hasFilters && (
              <button
                onClick={clearFilters}
                className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-red-500 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 flex items-center gap-1"
              >
                <X className="w-3 h-3" />
                Clear
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="section-padding bg-brand-50 dark:bg-brand-950">
        <div className="container-custom">
          {/* Count */}
          <div className="flex items-center justify-between mb-8">
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              Showing <span className="font-semibold text-brand-700 dark:text-accent-300">{filtered.length}</span> of {products.length} designs
            </p>
          </div>

          {filtered.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-24"
            >
              <div className="w-20 h-20 rounded-2xl bg-brand-100 dark:bg-brand-800 flex items-center justify-center mx-auto mb-6">
                <Search className="w-10 h-10 text-brand-400" />
              </div>
              <h3 className="text-xl font-display font-semibold text-brand-900 dark:text-white mb-2">No designs found</h3>
              <p className="text-neutral-500 dark:text-neutral-400 mb-6">Try adjusting your search or filters</p>
              <button onClick={clearFilters} className="btn-primary">Clear Filters</button>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.04 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
