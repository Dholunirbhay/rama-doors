import { motion } from 'framer-motion';
import { Search, Hammer, Sparkles, Truck, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const steps = [
  {
    icon: Search,
    title: 'Wood Selection',
    description: 'Premium Grade A teak sourced with care',
  },
  {
    icon: Hammer,
    title: 'Hand Crafting',
    description: 'Expert artisans, traditional techniques',
  },
  {
    icon: Sparkles,
    title: 'Finishing',
    description: 'Premium polish & protection',
  },
  {
    icon: Truck,
    title: 'Delivery',
    description: 'Safe doorstep delivery across Gujarat',
  },
];

export default function ProcessPreview() {
  return (
    <section className="section-padding bg-white dark:bg-brand-900">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-100 dark:bg-brand-800 text-brand-600 dark:text-accent-300 text-sm font-medium mb-4">
            Our Process
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-brand-900 dark:text-white mb-4">
            Crafted with Care in 10 Steps
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400">
            Every Rama Door goes through a meticulous 10-step process — from selecting the finest teak to safe delivery at your doorstep.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-brand-100 dark:bg-brand-800 flex items-center justify-center mx-auto mb-4">
                <step.icon className="w-7 h-7 text-brand-600 dark:text-accent-300" />
              </div>
              <h3 className="font-semibold text-brand-900 dark:text-white mb-1">
                {step.title}
              </h3>
              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Link
            to="/process"
            className="inline-flex items-center gap-2 text-brand-600 dark:text-accent-300 font-semibold hover:gap-3 transition-all"
          >
            View Full 10-Step Process
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
