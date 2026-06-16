import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import type { Product } from '../../types';

export default function AdminProductForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<Partial<Product>>({
    name: '',
    design_code: '',
    size: '',
    material: 'Teak Wood',
    description: '',
    image_url: '',
    price_label: 'Call for Price',
    category: 'Teak Wood Door',
    is_featured: false,
  });

 useEffect(() => {
  if (id) {
    loadProduct();
  }
}, [id]);

async function loadProduct() {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !data) {
    navigate('/admin/products');
    return;
  }

  setFormData(data);
}

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checkValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setFormData((prev) => ({
      ...prev,
      [name]: checkValue,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (id) {
  const { error } = await supabase
    .from('products')
    .update(formData)
    .eq('id', id);

  if (error) throw error;
} else {
  const { error } = await supabase
    .from('products')
    .insert([formData]);

  if (error) throw error;
}
      navigate('/admin/products');
    } catch (error: any) {
  console.error('Error saving product:', error);
  alert(JSON.stringify(error));
} finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <button
        onClick={() => navigate('/admin/products')}
        className="flex items-center gap-2 text-brand-600 dark:text-accent-300 hover:text-brand-700 mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Products
      </button>

      <div className="bg-white dark:bg-brand-800 rounded-2xl shadow-sm border border-brand-100 dark:border-brand-700 p-6">
        <h1 className="text-2xl font-display font-bold text-brand-900 dark:text-white mb-6">
          {id ? 'Edit Product' : 'Add New Product'}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-brand-700 dark:text-brand-300 mb-2">
                Product Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="e.g., Royal Heritage Door"
                className="w-full px-4 py-3 rounded-xl border border-brand-200 dark:border-brand-700 bg-white dark:bg-brand-900 text-brand-900 dark:text-white focus:ring-2 focus:ring-accent-400 focus:border-transparent outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-brand-700 dark:text-brand-300 mb-2">
                Design Code
              </label>
              <input
                type="text"
                name="design_code"
                value={formData.design_code}
                onChange={handleChange}
                required
                placeholder="e.g., RD 32"
                className="w-full px-4 py-3 rounded-xl border border-brand-200 dark:border-brand-700 bg-white dark:bg-brand-900 text-brand-900 dark:text-white focus:ring-2 focus:ring-accent-400 focus:border-transparent outline-none"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-brand-700 dark:text-brand-300 mb-2">
                Size
              </label>
              <input
                type="text"
                name="size"
                value={formData.size}
                onChange={handleChange}
                placeholder="e.g., 3.5 x 7 ft"
                className="w-full px-4 py-3 rounded-xl border border-brand-200 dark:border-brand-700 bg-white dark:bg-brand-900 text-brand-900 dark:text-white focus:ring-2 focus:ring-accent-400 focus:border-transparent outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-brand-700 dark:text-brand-300 mb-2">
                Material
              </label>
              <input
                type="text"
                name="material"
                value={formData.material}
                onChange={handleChange}
                placeholder="e.g., Premium Teak Wood"
                className="w-full px-4 py-3 rounded-xl border border-brand-200 dark:border-brand-700 bg-white dark:bg-brand-900 text-brand-900 dark:text-white focus:ring-2 focus:ring-accent-400 focus:border-transparent outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-brand-700 dark:text-brand-300 mb-2">
              Image URL
            </label>
            <input
              type="url"
              name="image_url"
              value={formData.image_url}
              onChange={handleChange}
              placeholder="Enter image URL"
              className="w-full px-4 py-3 rounded-xl border border-brand-200 dark:border-brand-700 bg-white dark:bg-brand-900 text-brand-900 dark:text-white focus:ring-2 focus:ring-accent-400 focus:border-transparent outline-none"
            />
          </div>

          {formData.image_url && (
            <div className="rounded-xl overflow-hidden border border-brand-200 dark:border-brand-700">
              <img
                src={formData.image_url}
                alt="Preview"
                className="w-48 h-36 object-cover"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-brand-700 dark:text-brand-300 mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-3 rounded-xl border border-brand-200 dark:border-brand-700 bg-white dark:bg-brand-900 text-brand-900 dark:text-white focus:ring-2 focus:ring-accent-400 focus:border-transparent outline-none resize-none"
              placeholder="Enter product description..."
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-brand-700 dark:text-brand-300 mb-2">
                Price Label
              </label>
              <input
                type="text"
                name="price_label"
                value={formData.price_label}
                onChange={handleChange}
                placeholder="Call for Price"
                className="w-full px-4 py-3 rounded-xl border border-brand-200 dark:border-brand-700 bg-white dark:bg-brand-900 text-brand-900 dark:text-white focus:ring-2 focus:ring-accent-400 focus:border-transparent outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-brand-700 dark:text-brand-300 mb-2">
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-brand-200 dark:border-brand-700 bg-white dark:bg-brand-900 text-brand-900 dark:text-white focus:ring-2 focus:ring-accent-400 focus:border-transparent outline-none"
              >
                <option value="Teak Wood Door">Teak Wood Door</option>
                <option value="Premium Teak Wood Door">Premium Teak Wood Door</option>
                <option value="Custom Door">Custom Door</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="is_featured"
              name="is_featured"
              checked={formData.is_featured}
              onChange={handleChange}
              className="w-4 h-4 rounded border-brand-300 text-brand-600 focus:ring-accent-400"
            />
            <label htmlFor="is_featured" className="text-brand-700 dark:text-brand-300">
              Featured Product (shown on homepage)
            </label>
          </div>

          <div className="flex justify-end gap-4 pt-4 border-t border-brand-200 dark:border-brand-700">
            <button
              type="button"
              onClick={() => navigate('/admin/products')}
              className="px-6 py-3 rounded-xl border border-brand-200 dark:border-brand-700 text-brand-700 dark:text-white hover:bg-brand-50 dark:hover:bg-brand-700 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold bg-brand-600 hover:bg-brand-700 text-white shadow-brand transition-all disabled:opacity-50"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
                  Saving...
                </span>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  {id ? 'Update Product' : 'Create Product'}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
