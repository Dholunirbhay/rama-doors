import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Package, Image, MessageSquare, Settings } from 'lucide-react';
import { productsStore, galleryStore, inquiriesStore } from '../../lib/localStore';

interface Stats {
  products: number;
  gallery: number;
  inquiries: number;
  unreadInquiries: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    products: 0,
    gallery: 0,
    inquiries: 0,
    unreadInquiries: 0,
  });
  const [recentInquiries, setRecentInquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const products = productsStore.getAll();
    const gallery = galleryStore.getAll();
    const inquiries = inquiriesStore.getAll();

    setStats({
      products: products.length,
      gallery: gallery.length,
      inquiries: inquiries.length,
      unreadInquiries: inquiries.filter((i) => !i.is_read).length,
    });

    setRecentInquiries(inquiries.slice(0, 5));
    setLoading(false);
  }, []);

  const statCards = [
    { name: 'Products', value: stats.products, icon: Package, path: '/admin/products', color: 'brand' },
    { name: 'Gallery Images', value: stats.gallery, icon: Image, path: '/admin/gallery', color: 'accent' },
    { name: 'Inquiries', value: stats.inquiries, icon: MessageSquare, path: '/admin/inquiries', color: 'brand', badge: stats.unreadInquiries },
    { name: 'Settings', value: '', icon: Settings, path: '/admin/settings', color: 'accent' },
  ];

  const colorClasses = {
    brand: 'bg-brand-100 dark:bg-brand-800 text-brand-600 dark:text-accent-300',
    accent: 'bg-accent-100 dark:bg-accent-900/30 text-brand-600 dark:text-accent-400',
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-brand-900 dark:text-white">
          Dashboard
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400 mt-1">
          Welcome to the Rama Door admin panel
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {loading ? (
          [...Array(4)].map((_, i) => (
            <div key={i} className="animate-pulse bg-white dark:bg-brand-800 rounded-2xl p-6">
              <div className="h-12 bg-brand-200 dark:bg-brand-700 rounded-xl mb-4" />
              <div className="h-8 bg-brand-200 dark:bg-brand-700 rounded w-1/2" />
            </div>
          ))
        ) : (
          statCards.map((stat, index) => (
            <motion.div
              key={stat.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                to={stat.path}
                className="block bg-white dark:bg-brand-800 rounded-2xl p-6 shadow-sm hover:shadow-brand transition-shadow border border-brand-100 dark:border-brand-700"
              >
                <div className="flex items-center justify-between">
                  <div className={`w-12 h-12 rounded-xl ${colorClasses[stat.color as keyof typeof colorClasses]} flex items-center justify-center`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                  {stat.badge && stat.badge > 0 && (
                    <span className="px-2 py-1 text-xs font-medium bg-red-500 text-white rounded-full">
                      {stat.badge} new
                    </span>
                  )}
                </div>
                <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-4">{stat.name}</p>
                <p className="text-3xl font-display font-bold text-brand-900 dark:text-white mt-1">
                  {stat.value}
                </p>
              </Link>
            </motion.div>
          ))
        )}
      </div>

      {/* Recent Inquiries */}
      <div className="bg-white dark:bg-brand-800 rounded-2xl shadow-sm border border-brand-100 dark:border-brand-700">
        <div className="p-6 border-b border-brand-100 dark:border-brand-700">
          <h2 className="text-lg font-display font-semibold text-brand-900 dark:text-white">
            Recent Inquiries
          </h2>
        </div>
        {loading ? (
          <div className="p-6 text-center text-neutral-500">Loading...</div>
        ) : recentInquiries.length === 0 ? (
          <div className="p-6 text-center text-neutral-500 dark:text-neutral-400">
            No inquiries yet
          </div>
        ) : (
          <div className="divide-y divide-brand-100 dark:divide-brand-700">
            {recentInquiries.map((inquiry) => (
              <div key={inquiry.id} className="p-6 flex items-start gap-4">
                <div className={`w-2 h-2 rounded-full mt-2 ${inquiry.is_read ? 'bg-brand-300' : 'bg-accent-500'}`} />
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium text-brand-900 dark:text-white">
                        {inquiry.name}
                      </p>
                      {inquiry.email && (
                        <p className="text-sm text-neutral-500 dark:text-neutral-400">
                          {inquiry.email}
                        </p>
                      )}
                    </div>
                    <span className="text-xs text-neutral-400">
                      {new Date(inquiry.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-neutral-600 dark:text-neutral-400 text-sm mt-2 line-clamp-2">
                    {inquiry.message}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
        <Link
          to="/admin/inquiries"
          className="block text-center py-4 border-t border-brand-100 dark:border-brand-700 text-brand-600 dark:text-accent-300 hover:bg-brand-50 dark:hover:bg-brand-700 transition-colors font-medium rounded-b-2xl"
        >
          View All Inquiries
        </Link>
      </div>
    </div>
  );
}
