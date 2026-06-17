import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Phone, MessageCircle, Star, Shield, TreePine } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import type { Product } from '../../types';
import { useSettings } from '../../context/SettingsContext';
import { getWhatsAppUrl, getTelUrl } from '../../lib/utils';
import ProductCard from '../../components/products/ProductCard';

const FALLBACK = 'https://images.pexels.com/photos/2635038/pexels-photo-2635038.jpeg?auto=compress&cs=tinysrgb&w=900';

export default function ProductDetailPage() {
  const { designCode } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [related, setRelated] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { settings } = useSettings();

  useEffect(() => {
  async function fetchProduct() {
    if (!designCode) return;

    setLoading(true);

    const formattedCode = designCode.replace('-', ' ');
    

    const { data, error } = await supabase
      .from('products')
      .select('*')
      .ilike('design_code', formattedCode)
      .single();

    if (error || !data) {
      console.error(error);
      setProduct(null);
      setLoading(false);
      return;
    }

    setProduct(data);

    const { data: relatedData } = await supabase
      .from('products')
      .select('*')
      .neq('id', data.id)
      .limit(3);

    setRelated(relatedData || []);
    setLoading(false);
  }

  fetchProduct();
}, [designCode]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20 bg-brand-50 dark:bg-brand-950">
        <div className="animate-spin w-10 h-10 rounded-full border-4 border-brand-600 border-t-transparent" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20 bg-brand-50 dark:bg-brand-950">
        <div className="text-center">
          <h2 className="text-2xl font-display font-bold text-brand-900 dark:text-white mb-4">Product Not Found</h2>
          <Link to="/products" className="btn-primary">Back to Products</Link>
        </div>
      </div>
    );
  }

  const waMessage = `Hello! I'm interested in ${product.name} (${product.design_code}). Please share pricing and availability details.`;

  return (
    <div className="pt-20 bg-brand-50 dark:bg-brand-950 min-h-screen">
      <section className="section-padding">
        <div className="container-custom">
          {/* Breadcrumb */}
          <motion.nav initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <div className="flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400">
              <Link to="/" className="hover:text-brand-600">Home</Link>
              <span>/</span>
              <Link to="/products" className="hover:text-brand-600">Products</Link>
              <span>/</span>
              <span className="text-brand-700 dark:text-accent-300 font-medium">{product.design_code}</span>
            </div>
          </motion.nav>

          <div className="grid lg:grid-cols-2 gap-12 mb-20">
            {/* Image */}
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
              <div className="rounded-3xl overflow-hidden shadow-brand-lg bg-white dark:bg-brand-800">
                <img
                  src={product.image_url || FALLBACK}
                  alt={product.name}
                  className="w-full aspect-[4/3] object-cover"
                  onError={(e) => { (e.target as HTMLImageElement).src = FALLBACK; }}
                />
              </div>
            </motion.div>

            {/* Info */}
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
              <div>
                <span className="inline-block bg-brand-600 text-white px-4 py-1.5 rounded-full text-sm font-bold mb-4">
                  {product.design_code}
                </span>
                {product.is_featured && (
                  <span className="inline-flex items-center gap-1 bg-accent-400 text-white px-3 py-1.5 rounded-full text-sm font-bold ml-2 mb-4">
                    <Star className="w-3 h-3" />
                    Featured
                  </span>
                )}
                <h1 className="text-3xl md:text-4xl font-display font-bold text-brand-900 dark:text-white mb-2">
                  {product.name}
                </h1>
                <p className="text-2xl font-bold text-brand-600 dark:text-accent-300">
                  {product.price_label}
                </p>
              </div>

              {/* Specs */}
              <div className="flex flex-wrap gap-3">
                {product.size && (
                  <div className="bg-white dark:bg-brand-800 px-4 py-2.5 rounded-xl border border-brand-100 dark:border-brand-700">
                    <span className="text-neutral-400 text-xs block mb-0.5">Size</span>
                    <span className="font-semibold text-brand-900 dark:text-white text-sm">{product.size}</span>
                  </div>
                )}
                {product.material && (
                  <div className="bg-white dark:bg-brand-800 px-4 py-2.5 rounded-xl border border-brand-100 dark:border-brand-700">
                    <span className="text-neutral-400 text-xs block mb-0.5">Material</span>
                    <span className="font-semibold text-brand-900 dark:text-white text-sm">{product.material}</span>
                  </div>
                )}
                <div className="bg-white dark:bg-brand-800 px-4 py-2.5 rounded-xl border border-brand-100 dark:border-brand-700">
                  <span className="text-neutral-400 text-xs block mb-0.5">Category</span>
                  <span className="font-semibold text-brand-900 dark:text-white text-sm">{product.category}</span>
                </div>
              </div>

              {/* Description */}
              {product.description && (
                <div className="bg-white dark:bg-brand-800 rounded-2xl p-6 border border-brand-100 dark:border-brand-700">
                  <h3 className="font-semibold text-brand-900 dark:text-white mb-2">About This Design</h3>
                  <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed text-sm">
                    {product.description}
                  </p>
                </div>
              )}

              {/* Features */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { icon: TreePine, label: 'Solid Teak Wood' },
                  { icon: Shield, label: 'Quality Assured' },
                  { icon: Star, label: 'Handcrafted' },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="flex flex-col items-center gap-2 bg-brand-50 dark:bg-brand-800/50 rounded-xl p-3 text-center">
                    <Icon className="w-5 h-5 text-brand-600 dark:text-accent-300" />
                    <span className="text-xs font-medium text-brand-700 dark:text-neutral-300">{label}</span>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <a
                  href={getWhatsAppUrl(settings.whatsapp, waMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-semibold text-white bg-brand-600 hover:bg-brand-700 shadow-brand hover:shadow-brand-lg transform hover:-translate-y-0.5 transition-all"
                >
                  <MessageCircle className="w-5 h-5" />
                  WhatsApp Inquiry
                </a>
                <a
                  href={getTelUrl(settings.mobile)}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-semibold border-2 border-brand-600 text-brand-600 dark:text-accent-300 dark:border-accent-400 hover:bg-brand-600 hover:text-white transition-all"
                >
                  <Phone className="w-5 h-5" />
                  Call for Price
                </a>
              </div>
            </motion.div>
          </div>

          {/* Related Products */}
          {related.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-display font-bold text-brand-900 dark:text-white">
                  You May Also Like
                </h2>
                <Link to="/products" className="text-sm text-brand-600 dark:text-accent-300 hover:underline flex items-center gap-1">
                  View All
                  <ArrowLeft className="w-4 h-4 rotate-180" />
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {related.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
