import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, CheckCircle, Trash2, Search } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import type { ContactInquiry } from '../../types';
import { getWhatsAppUrl, getMailtoUrl } from '../../lib/utils';

export default function AdminInquiries() {
  const [inquiries, setInquiries] = useState<ContactInquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchInquiries();
  }, []);

  async function fetchInquiries() {
  setLoading(true);

  const { data, error } = await supabase
    .from('inquiries')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error(error);
    setInquiries([]);
  } else {
    console.log('Supabase inquiries data:', data);
    setInquiries(data || []);
  }

  setLoading(false);
}

  async function markAsRead(id: string) {
  const { error } = await supabase
    .from('inquiries')
    .update({ is_read: true })
    .eq('id', id);

  if (error) {
  console.error(error);
  alert(JSON.stringify(error));
  return;
}

  setInquiries(
    inquiries.map((i) => (i.id === id ? { ...i, is_read: true } : i))
  );
}

  async function handleDelete(id: string) {
  const { error } = await supabase
    .from('inquiries')
    .delete()
    .eq('id', id);

  if (error) {
    console.error(error);
    alert('Failed to delete inquiry');
    return;
  }

  setInquiries(inquiries.filter((i) => i.id !== id));
}

  const filteredInquiries = inquiries.filter((i) => {
  const matchesFilter =
    filter === 'unread' ? !i.is_read :
    filter === 'read' ? i.is_read :
    true;

  const searchText = search.toLowerCase();

  const matchesSearch =
    i.name?.toLowerCase().includes(searchText) ||
    i.email?.toLowerCase().includes(searchText) ||
    i.mobile?.toLowerCase().includes(searchText) ||
    i.message?.toLowerCase().includes(searchText);

  return matchesFilter && matchesSearch;
});

  const unreadCount = inquiries.filter((i) => !i.is_read).length;

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-brand-900 dark:text-white">
            Contact Inquiries
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400 mt-1">
            {unreadCount} unread message{unreadCount !== 1 ? 's' : ''}
          </p>
        </div>
        <div className="flex gap-2">
          {(['all', 'unread', 'read'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === f
                  ? 'bg-brand-600 text-white shadow-brand'
                  : 'bg-brand-100 dark:bg-brand-800 text-brand-700 dark:text-brand-300 hover:bg-brand-200 dark:hover:bg-brand-700'
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </div>
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />

        <input
          type="text"
          placeholder="Search by name, email, phone or message..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-3 rounded-xl border border-brand-200 dark:border-brand-700 bg-white dark:bg-brand-800 text-brand-900 dark:text-white focus:ring-2 focus:ring-accent-400 focus:border-transparent outline-none"
          />
      </div>    
      {loading ? (
        <div className="text-center py-12 text-neutral-500">Loading...</div>
      ) : filteredInquiries.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-brand-800 rounded-2xl border border-brand-100 dark:border-brand-700">
          <Mail className="w-12 h-12 text-neutral-400 mx-auto mb-4" />
          <p className="text-neutral-500 dark:text-neutral-400">
            No inquiries{filter !== 'all' ? ` (${filter})` : ''} found
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredInquiries.map((inquiry) => (
            <motion.div
              key={inquiry.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`bg-white dark:bg-brand-800 rounded-2xl p-6 shadow-sm border ${
                inquiry.is_read
                  ? 'border-brand-100 dark:border-brand-700'
                  : 'border-brand-400 dark:border-accent-500'
              }`}
            >
              <div className="flex items-start gap-3 min-w-0">
                <div
                  className={`w-3 h-3 rounded-full mt-2 flex-shrink-0 ${
                    inquiry.is_read ? 'bg-brand-300' : 'bg-accent-500'
                  }`}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                    <div>
                      <h3 className="font-semibold text-brand-900 dark:text-white">
                        {inquiry.name}
                      </h3>
                      <div className="flex flex-wrap gap-4 mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                        {inquiry.email && (
                          <a
                            href={getMailtoUrl(inquiry.email)}
                            className="flex items-center gap-1 hover:text-brand-600 dark:hover:text-accent-300 transition-colors"
                          >
                            <Mail className="w-4 h-4" />
                            {inquiry.email}
                          </a>
                        )}
                        {inquiry.mobile && (
                          <a
                            href={getWhatsAppUrl(inquiry.mobile)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 hover:text-accent-500 transition-colors"
                          >
                            <Phone className="w-4 h-4" />
                            {inquiry.mobile}
                          </a>
                        )}
                      </div>
                    </div>
                    <span className="text-xs sm:text-sm text-neutral-400 flex-shrink-0">
                      {new Date(inquiry.created_at).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>
                  <p className="text-neutral-700 dark:text-neutral-300 mt-4 whitespace-pre-wrap">
                    {inquiry.message}
                  </p>
                  <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-brand-100 dark:border-brand-700">
                    {!inquiry.is_read && (
                      <button
                        onClick={() => markAsRead(inquiry.id)}
                        className="flex items-center justify-center gap-1 text-xs sm:text-sm text-brand-600 dark:text-accent-300 hover:underline text-center"
                      >
                        <CheckCircle className="w-4 h-4" />
                        Mark as read
                      </button>
                    )}
                    {inquiry.mobile && (
                      <a
                        href={getWhatsAppUrl(
                          inquiry.mobile,
                          `Hi ${inquiry.name}, thank you for your inquiry. `
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-1 text-xs sm:text-sm text-brand-600 dark:text-accent-300 hover:underline text-center"
                      >
                        Reply on WhatsApp
                      </a>
                    )}
                    <button
                      onClick={() => handleDelete(inquiry.id)}
                      className="flex items-center justify-center gap-1 text-xs sm:text-sm text-red-500 hover:underline"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
