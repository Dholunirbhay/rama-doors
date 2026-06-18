import { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, Send, MessageCircle, CheckCircle, FileText } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useSettings } from '../../context/SettingsContext';
import { getWhatsAppUrl, getTelUrl, getMailtoUrl, getGoogleMapsUrl } from '../../lib/utils';
import emailjs from '@emailjs/browser';

export default function ContactPage() {
  const { settings } = useSettings();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { error } = await supabase.from('inquiries').insert([
  {
    name: formData.name,
    email: formData.email,
    mobile: formData.phone,
    message: formData.message,
  },
]);

if (error) throw error;
      await emailjs.send(
        'service_taufasf',
        'template_2olpyyl',
        {
          name: formData.name,
          mobile: formData.phone,
          email: formData.email,
          message: formData.message,
        },
        'dEEWRCj3g6d_Mcpin'
      );
      setSuccess(true);
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (err) {
      setError('Failed to send message. Please try again or contact us directly.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="pt-10">
      {/* Hero */}
      <section className="section-padding bg-brand-gradient text-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-accent-300 text-sm font-medium mb-6">
              Get in Touch
            </span>
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-5">
              Contact Us
            </h1>
            <p className="text-xl text-brand-200 leading-relaxed">
              Ready to transform your entrance? Reach out to us for inquiries,
              quotes, or any questions about our teak wood doors.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section-padding bg-brand-50 dark:bg-brand-950">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="bg-white dark:bg-brand-800 rounded-2xl p-8 shadow-lg border border-brand-100 dark:border-brand-700">
                <h2 className="text-2xl font-display font-bold text-brand-900 dark:text-white mb-6">
                  Send Us a Message
                </h2>

                {success ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
                    </div>
                    <h3 className="text-xl font-display font-semibold text-brand-900 dark:text-white mb-2">
                      Message Sent!
                    </h3>
                    <p className="text-neutral-600 dark:text-neutral-400 mb-6">
                      Thank you for contacting us. We'll get back to you soon.
                    </p>
                    <button
                      onClick={() => setSuccess(false)}
                      className="btn-primary"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-brand-700 dark:text-brand-300 mb-2">
                        Your Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        placeholder="Enter your name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-brand-200 dark:border-brand-700 bg-white dark:bg-brand-900 text-brand-900 dark:text-white focus:ring-2 focus:ring-accent-400 focus:border-transparent outline-none transition-all"
                      />
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-brand-700 dark:text-brand-300 mb-2">
                          Email Address
                        </label>
                        <input
                          type="email"
                          name="email"
                          placeholder="Enter your email"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border border-brand-200 dark:border-brand-700 bg-white dark:bg-brand-900 text-brand-900 dark:text-white focus:ring-2 focus:ring-accent-400 focus:border-transparent outline-none transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-brand-700 dark:text-brand-300 mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          placeholder="Enter your phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border border-brand-200 dark:border-brand-700 bg-white dark:bg-brand-900 text-brand-900 dark:text-white focus:ring-2 focus:ring-accent-400 focus:border-transparent outline-none transition-all"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-brand-700 dark:text-brand-300 mb-2">
                        Your Message
                      </label>
                      <textarea
                        name="message"
                        placeholder="How can we help you?"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        className="w-full px-4 py-3 rounded-xl border border-brand-200 dark:border-brand-700 bg-white dark:bg-brand-900 text-brand-900 dark:text-white focus:ring-2 focus:ring-accent-400 focus:border-transparent outline-none transition-all resize-none"
                      />
                    </div>
                    {error && (
                      <p className="text-red-500 text-sm">{error}</p>
                    )}
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl font-semibold bg-brand-600 hover:bg-brand-700 text-white shadow-brand hover:shadow-brand-lg transition-all disabled:opacity-50"
                    >
                      {loading ? (
                        <span className="flex items-center gap-2">
                          <span className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
                          Sending...
                        </span>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          Send Message
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-8"
            >
              {/* Quick Contact */}
              <div>
                <h2 className="text-2xl font-display font-bold text-brand-900 dark:text-white mb-6">
                  Quick Contact
                </h2>
                <div className="grid gap-4">
                  <a
                    href={getTelUrl(settings.mobile)}
                    className="flex items-center gap-4 p-4 bg-white dark:bg-brand-800 rounded-xl shadow-md border border-brand-100 dark:border-brand-700 hover:border-brand-400 dark:hover:border-accent-400 transition-colors"
                  >
                    <div className="w-12 h-12 rounded-full bg-brand-100 dark:bg-brand-700/50 flex items-center justify-center">
                      <Phone className="w-6 h-6 text-brand-600 dark:text-accent-300" />
                    </div>
                    <div>
                      <p className="text-sm text-neutral-500 dark:text-neutral-400">Phone</p>
                      <p className="font-semibold text-brand-900 dark:text-white">{settings.mobile}</p>
                    </div>
                  </a>

                  <a
                    href={getWhatsAppUrl(settings.whatsapp, 'Hello! I am interested in your teak wood doors. Please share more details.')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 bg-white dark:bg-brand-800 rounded-xl shadow-md border border-brand-100 dark:border-brand-700 hover:border-accent-500 dark:hover:border-accent-400 transition-colors"
                  >
                    <div className="w-12 h-12 rounded-full bg-accent-100 dark:bg-accent-900/30 flex items-center justify-center">
                      <MessageCircle className="w-6 h-6 text-brand-600 dark:text-accent-300" />
                    </div>
                    <div>
                      <p className="text-sm text-neutral-500 dark:text-neutral-400">WhatsApp</p>
                      <p className="font-semibold text-brand-900 dark:text-white">{settings.whatsapp}</p>
                    </div>
                  </a>

                  <a
                    href={getMailtoUrl(settings.email, 'Inquiry about Teak Wood Doors')}
                    className="flex items-center gap-4 p-4 bg-white dark:bg-brand-800 rounded-xl shadow-md border border-brand-100 dark:border-brand-700 hover:border-brand-400 dark:hover:border-accent-400 transition-colors"
                  >
                    <div className="w-12 h-12 rounded-full bg-brand-100 dark:bg-brand-700/50 flex items-center justify-center">
                      <Mail className="w-6 h-6 text-brand-600 dark:text-accent-300" />
                    </div>
                    <div>
                      <p className="text-sm text-neutral-500 dark:text-neutral-400">Email</p>
                      <p className="font-semibold text-brand-900 dark:text-white">{settings.email}</p>
                    </div>
                  </a>
                </div>
              </div>

              {/* Address & Hours */}
              <div className="bg-white dark:bg-brand-800 rounded-xl p-6 shadow-md border border-brand-100 dark:border-brand-700">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-brand-100 dark:bg-brand-700/50 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-brand-600 dark:text-accent-300" />
                  </div>
                  <div>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-1">Address</p>
                    <a
                      href={getGoogleMapsUrl(settings.address)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-brand-900 dark:text-white hover:text-brand-600 dark:hover:text-accent-300 transition-colors"
                    >
                      {settings.address}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-brand-100 dark:bg-brand-700/50 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-brand-600 dark:text-accent-300" />
                  </div>
                  <div>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-1">Working Hours</p>
                    <p className="font-medium text-brand-900 dark:text-white">{settings.working_hours}</p>
                  </div>
                </div>
                {settings.gst_number && (
                <div className="flex items-start gap-4 mt-6">
                  <div className="w-12 h-12 rounded-full bg-brand-100 dark:bg-brand-700/50 flex items-center justify-center flex-shrink-0">
                    <FileText className="w-6 h-6 text-brand-600 dark:text-accent-300" />
                  </div>
                  <div>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-1">GST Number</p>
                    <p className="font-medium text-brand-900 dark:text-white">{settings.gst_number}</p>
                  </div>
                </div>
                )}

                {settings.pan_number && (
                <div className="flex items-start gap-4 mt-6">
                  <div className="w-12 h-12 rounded-full bg-brand-100 dark:bg-brand-700/50 flex items-center justify-center flex-shrink-0">
                    <FileText className="w-6 h-6 text-brand-600 dark:text-accent-300" />
                  </div>
                  <div>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-1">PAN Number</p>
                    <p className="font-medium text-brand-900 dark:text-white">{settings.pan_number}</p>
                  </div>
                </div>
                )}


              </div>
            </motion.div>
          </div>

          {/* Map Placeholder */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16"
          >
            <h2 className="text-2xl font-display font-bold text-brand-900 dark:text-white mb-6">
              Find Us
            </h2>
            <div className="rounded-xl overflow-hidden h-80 shadow-lg">
              <iframe
                src={settings.google_map_url}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Rama Doors Location"
              />
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
