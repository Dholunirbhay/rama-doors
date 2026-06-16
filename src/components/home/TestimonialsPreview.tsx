import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    id: '1',
    customer_name: 'Rajesh Patel',
    location: 'Ahmedabad',
    message: 'Exceptional quality and craftsmanship. The teak wood door transformed our home entrance. The finish is impeccable and the grain is simply beautiful.',
    rating: 5,
  },
  {
    id: '2',
    customer_name: 'Priya Sharma',
    location: 'Surat',
    message: 'Professional service and stunning designs. Rama Door delivered exactly what we envisioned. Their attention to detail is truly remarkable.',
    rating: 5,
  },
  {
    id: '3',
    customer_name: 'Amit Mehta',
    location: 'Rajkot',
    message: 'Using Rama Door products for our commercial projects. Consistent quality and a very responsive team. Exceeded our expectations every time.',
    rating: 5,
  },
];

export default function TestimonialsPreview() {
  return (
    <section className="section-padding bg-white dark:bg-brand-900">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="section-badge mb-4 inline-flex">Testimonials</span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-brand-900 dark:text-white mt-2 mb-4">
            What Our Customers Say
          </h2>
          <p className="text-neutral-500 dark:text-neutral-400 max-w-2xl mx-auto">
            Trusted by homeowners and builders across Gujarat for premium quality teak wood doors.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, index) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-brand-50 dark:bg-brand-800 rounded-2xl p-7 border border-brand-100 dark:border-brand-700"
            >
              <Quote className="w-8 h-8 text-accent-400/40 mb-4" />
              <div className="flex gap-1 mb-4">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                ))}
              </div>
              <p className="text-neutral-600 dark:text-neutral-300 text-sm leading-relaxed italic mb-6">
                "{t.message}"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-500 to-accent-400 flex items-center justify-center text-white font-bold">
                  {t.customer_name[0]}
                </div>
                <div>
                  <p className="font-semibold text-brand-900 dark:text-white text-sm">{t.customer_name}</p>
                  <p className="text-neutral-400 text-xs">{t.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
