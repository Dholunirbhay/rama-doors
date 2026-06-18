import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import type { Product } from '../../types';

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
  setLoading(true);

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('design_code', { ascending: true });

  if (error) {
    console.error(error);
    setProducts([]);
  } else {
    setProducts(data || []);
  }

  setLoading(false);
}

  async function handleDelete(id: string) {
  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', id);

  if (error) {
    console.error(error);
    alert('Product delete failed');
    return;
  }

  setProducts(products.filter((p) => p.id !== id));
  setDeleteId(null);
}

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.design_code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-brand-900 dark:text-white">
            Products
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400 mt-1">
            Manage your door collection
          </p>
        </div>
        <Link
          to="/admin/products/new"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold bg-brand-600 hover:bg-brand-700 text-white shadow-brand transition-all"
        >
          <Plus className="w-5 h-5" />
          Add Product
        </Link>
      </div>

      {/* Search */}
      <div className="max-w-md mb-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-brand-200 dark:border-brand-700 bg-white dark:bg-brand-800 text-brand-900 dark:text-white focus:ring-2 focus:ring-accent-400 focus:border-transparent outline-none"
          />
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white dark:bg-brand-800 rounded-2xl shadow-sm border border-brand-100 dark:border-brand-700 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-neutral-500">Loading...</div>
        ) : filteredProducts.length === 0 ? (
          <div className="p-8 text-center text-neutral-500 dark:text-neutral-400">
            No products found
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-brand-50 dark:bg-brand-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                    Image
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                    Design Code
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                    Size
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                    Featured
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-100 dark:divide-brand-700">
                {filteredProducts.map((product) => (
                  <motion.tr
                    key={product.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hover:bg-brand-50 dark:hover:bg-brand-700/50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <img
                        src={product.image_url || 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=100'}
                        alt={product.name}
                        className="w-16 h-12 object-contain rounded-lg"
                      />
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-brand-600 dark:text-accent-300">
                      {product.design_code}
                    </td>
                    <td className="px-6 py-4 text-sm text-brand-900 dark:text-white">
                      {product.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-neutral-600 dark:text-neutral-400">
                      {product.size || '-'}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 text-xs rounded-full font-medium ${
                          product.is_featured
                            ? 'bg-accent-100 text-brand-700 dark:bg-accent-900/30 dark:text-accent-300'
                            : 'bg-brand-100 text-neutral-500 dark:bg-brand-700 dark:text-neutral-400'
                        }`}
                      >
                        {product.is_featured ? 'Featured' : 'No'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          to={`/admin/products/edit/${product.id}`}
                          className="p-2 rounded-lg hover:bg-brand-100 dark:hover:bg-brand-700 transition-colors"
                        >
                          <Edit className="w-4 h-4 text-brand-600 dark:text-accent-300" />
                        </Link>
                        <button
                          onClick={() => setDeleteId(product.id)}
                          className="p-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-brand-800 rounded-2xl p-6 max-w-sm w-full border border-brand-200 dark:border-brand-700"
          >
            <h3 className="text-lg font-semibold text-brand-900 dark:text-white mb-2">
              Delete Product?
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-6">
              This action cannot be undone. The product will be permanently deleted.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteId(null)}
                className="flex-1 px-4 py-2 rounded-xl border border-brand-200 dark:border-brand-700 text-brand-700 dark:text-white hover:bg-brand-50 dark:hover:bg-brand-700 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteId)}
                className="flex-1 px-4 py-2 rounded-xl bg-red-500 hover:bg-red-600 text-white font-medium transition-colors"
              >
                Delete
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
