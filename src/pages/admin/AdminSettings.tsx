import { useState } from 'react';
import { motion } from 'framer-motion';
import { Save } from 'lucide-react';
import { settingsStore } from '../../lib/localStore';
import type { AppSettings } from '../../types';
import { useSettings } from '../../context/SettingsContext';

export default function AdminSettings() {
  const { settings: currentSettings, refreshSettings } = useSettings();
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<AppSettings>(currentSettings);
  const [success, setSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccess(false);

    try {
      settingsStore.save(formData);
      refreshSettings();
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error('Error saving settings:', error);
      alert('Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-brand-900 dark:text-white">
          Settings
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400 mt-1">
          Manage your website settings and content
        </p>
      </div>

      {success && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-4 py-3 rounded-xl mb-6"
        >
          Settings saved successfully!
        </motion.div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Contact Information */}
        <div className="bg-white dark:bg-brand-800 rounded-2xl p-6 shadow-sm border border-brand-100 dark:border-brand-700">
          <h2 className="text-lg font-display font-semibold text-brand-900 dark:text-white mb-6">
            Contact Information
          </h2>
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-brand-700 dark:text-brand-300 mb-2">
                  Company Name
                </label>
                <input
                  type="text"
                  name="company_name"
                  value={formData.company_name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-brand-200 dark:border-brand-700 bg-white dark:bg-brand-900 text-brand-900 dark:text-white focus:ring-2 focus:ring-accent-400 focus:border-transparent outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-brand-700 dark:text-brand-300 mb-2">
                  Mobile Number
                </label>
                <input
                  type="text"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-brand-200 dark:border-brand-700 bg-white dark:bg-brand-900 text-brand-900 dark:text-white focus:ring-2 focus:ring-accent-400 focus:border-transparent outline-none"
                />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-brand-700 dark:text-brand-300 mb-2">
                  WhatsApp Number
                </label>
                <input
                  type="text"
                  name="whatsapp"
                  value={formData.whatsapp}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-brand-200 dark:border-brand-700 bg-white dark:bg-brand-900 text-brand-900 dark:text-white focus:ring-2 focus:ring-accent-400 focus:border-transparent outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-brand-700 dark:text-brand-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-brand-200 dark:border-brand-700 bg-white dark:bg-brand-900 text-brand-900 dark:text-white focus:ring-2 focus:ring-accent-400 focus:border-transparent outline-none"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-brand-700 dark:text-brand-300 mb-2">
                Address
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-brand-200 dark:border-brand-700 bg-white dark:bg-brand-900 text-brand-900 dark:text-white focus:ring-2 focus:ring-accent-400 focus:border-transparent outline-none"
              />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-brand-700 dark:text-brand-300 mb-2">
                  Working Hours
                </label>
                <input
                  type="text"
                  name="working_hours"
                  value={formData.working_hours}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-brand-200 dark:border-brand-700 bg-white dark:bg-brand-900 text-brand-900 dark:text-white focus:ring-2 focus:ring-accent-400 focus:border-transparent outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-brand-700 dark:text-brand-300 mb-2">
                  Instagram URL
                </label>
                <input
                  type="url"
                  name="instagram"
                  value={formData.instagram}
                  onChange={handleChange}
                  placeholder="https://instagram.com/ramadoor"
                  className="w-full px-4 py-3 rounded-xl border border-brand-200 dark:border-brand-700 bg-white dark:bg-brand-900 text-brand-900 dark:text-white focus:ring-2 focus:ring-accent-400 focus:border-transparent outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <div className="bg-white dark:bg-brand-800 rounded-2xl p-6 shadow-sm border border-brand-100 dark:border-brand-700">
          <h2 className="text-lg font-display font-semibold text-brand-900 dark:text-white mb-6">
            Hero Section
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-brand-700 dark:text-brand-300 mb-2">
                Hero Title
              </label>
              <input
                type="text"
                name="hero_title"
                value={formData.hero_title}
                onChange={handleChange}
                placeholder="Premium Teak Wood Doors"
                className="w-full px-4 py-3 rounded-xl border border-brand-200 dark:border-brand-700 bg-white dark:bg-brand-900 text-brand-900 dark:text-white focus:ring-2 focus:ring-accent-400 focus:border-transparent outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-brand-700 dark:text-brand-300 mb-2">
                Hero Subtitle
              </label>
              <input
                type="text"
                name="hero_subtitle"
                value={formData.hero_subtitle}
                onChange={handleChange}
                placeholder="Handcrafted Excellence for Your Home"
                className="w-full px-4 py-3 rounded-xl border border-brand-200 dark:border-brand-700 bg-white dark:bg-brand-900 text-brand-900 dark:text-white focus:ring-2 focus:ring-accent-400 focus:border-transparent outline-none"
              />
            </div>
          </div>
        </div>

        {/* About Content */}
        <div className="bg-white dark:bg-brand-800 rounded-2xl p-6 shadow-sm border border-brand-100 dark:border-brand-700">
          <h2 className="text-lg font-display font-semibold text-brand-900 dark:text-white mb-6">
            About Content
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-brand-700 dark:text-brand-300 mb-2">
                About Description
              </label>
              <textarea
                name="about_content"
                value={formData.about_content}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 rounded-xl border border-brand-200 dark:border-brand-700 bg-white dark:bg-brand-900 text-brand-900 dark:text-white focus:ring-2 focus:ring-accent-400 focus:border-transparent outline-none resize-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-brand-700 dark:text-brand-300 mb-2">
                Mission Statement
              </label>
              <input
                type="text"
                name="about_mission"
                value={formData.about_mission}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-brand-200 dark:border-brand-700 bg-white dark:bg-brand-900 text-brand-900 dark:text-white focus:ring-2 focus:ring-accent-400 focus:border-transparent outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-brand-700 dark:text-brand-300 mb-2">
                Vision Statement
              </label>
              <input
                type="text"
                name="about_vision"
                value={formData.about_vision}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-brand-200 dark:border-brand-700 bg-white dark:bg-brand-900 text-brand-900 dark:text-white focus:ring-2 focus:ring-accent-400 focus:border-transparent outline-none"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold bg-brand-600 hover:bg-brand-700 text-white shadow-brand hover:shadow-brand-lg transition-all disabled:opacity-50"
          >
            {saving ? (
              <span className="flex items-center gap-2">
                <span className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
                Saving...
              </span>
            ) : (
              <>
                <Save className="w-5 h-5" />
                Save Settings
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
