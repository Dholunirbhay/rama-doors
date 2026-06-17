import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2, Image as ImageIcon } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import type { GalleryImage } from '../../types';

export default function AdminGallery() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ title: '', image_url: '', category: '' });
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    fetchGallery();
  }, []);

  async function fetchGallery() {
  setLoading(true);

  const { data, error } = await supabase
    .from('gallery')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error(error);
    setImages([]);
  } else {
    setImages(data || []);
  }

  setLoading(false);
}

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const { error } = await supabase
        .from('gallery')
        .insert([formData]);

      if (error) throw error;
      setFormData({ title: '', image_url: '', category: '' });
      setShowForm(false);
      fetchGallery();
    } catch (error) {
      console.error('Error adding image:', error);
      alert('Failed to add image');
    } finally {
      setSaving(false);
    }
  };

  async function handleDelete(id: string) {
  const { error } = await supabase
    .from('gallery')
    .delete()
    .eq('id', id);

  if (error) {
    console.error(error);
    alert('Delete failed');
    return;
  }

  setImages(images.filter((i) => i.id !== id));
  setDeleteId(null);
}

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-brand-900 dark:text-white">
            Gallery
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400 mt-1">
            Manage your gallery images
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold bg-brand-600 hover:bg-brand-700 text-white shadow-brand transition-all"
        >
          <Plus className="w-5 h-5" />
          Add Image
        </button>
      </div>

      {/* Add Image Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-brand-800 rounded-2xl p-6 max-w-md w-full border border-brand-200 dark:border-brand-700"
          >
            <h3 className="text-lg font-semibold text-brand-900 dark:text-white mb-4">
              Add New Image
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-brand-700 dark:text-brand-300 mb-2">
                  Image URL
                </label>
                <input
                  type="url"
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  required
                  placeholder="https://..."
                  className="w-full px-4 py-3 rounded-xl border border-brand-200 dark:border-brand-700 bg-white dark:bg-brand-900 text-brand-900 dark:text-white focus:ring-2 focus:ring-accent-400 focus:border-transparent outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-brand-700 dark:text-brand-300 mb-2">
                  Title (optional)
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Image title"
                  className="w-full px-4 py-3 rounded-xl border border-brand-200 dark:border-brand-700 bg-white dark:bg-brand-900 text-brand-900 dark:text-white focus:ring-2 focus:ring-accent-400 focus:border-transparent outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-brand-700 dark:text-brand-300 mb-2">
                  Category (optional)
                </label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  placeholder="e.g., Entrance Doors"
                  className="w-full px-4 py-3 rounded-xl border border-brand-200 dark:border-brand-700 bg-white dark:bg-brand-900 text-brand-900 dark:text-white focus:ring-2 focus:ring-accent-400 focus:border-transparent outline-none"
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 px-4 py-3 rounded-xl border border-brand-200 dark:border-brand-700 text-brand-700 dark:text-white hover:bg-brand-50 dark:hover:bg-brand-700 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 px-4 py-3 rounded-xl font-semibold bg-brand-600 hover:bg-brand-700 text-white transition-all disabled:opacity-50"
                >
                  {saving ? 'Adding...' : 'Add Image'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* Gallery Grid */}
      {loading ? (
        <div className="text-center py-12 text-neutral-500">Loading...</div>
      ) : images.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-brand-800 rounded-2xl border border-brand-100 dark:border-brand-700">
          <ImageIcon className="w-12 h-12 text-neutral-400 mx-auto mb-4" />
          <p className="text-neutral-500 dark:text-neutral-400 mb-4">No images yet</p>
          <button
            onClick={() => setShowForm(true)}
            className="btn-primary"
          >
            Add First Image
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {images.map((image) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="group relative aspect-square bg-white dark:bg-brand-800 rounded-2xl overflow-hidden shadow-sm border border-brand-100 dark:border-brand-700"
            >
              <img
                src={image.image_url}
                alt={image.title || 'Gallery Image'}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button
                  onClick={() => setDeleteId(image.id)}
                  className="p-3 rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
              {image.title && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                  <p className="text-white text-sm">{image.title}</p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-brand-800 rounded-2xl p-6 max-w-sm w-full border border-brand-200 dark:border-brand-700"
          >
            <h3 className="text-lg font-semibold text-brand-900 dark:text-white mb-2">
              Delete Image?
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-6">
              This action cannot be undone.
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
