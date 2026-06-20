import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { useSettings } from '../../context/useSettings';

const highlights = [
  '100% Solid Teak Wood — No MDF or Plywood',
  'Hand-crafted by master artisans',
  'Various designs and customized designs',
  'Custom sizes available on request',
  'Quality inspected before delivery',
];

export default function AboutPreview() {
  const { settings } = useSettings();

  return (
    <section className="section-padding bg-white dark:bg-brand-900">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">

          {/* Image Collage */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="rounded-2xl overflow-hidden shadow-xl aspect-[3/4]">
                  <img
                    src="/images/about/rd01.webp"
                    alt="Workshop craftsmanship"
                    className="w-full h-full object-contain hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="rounded-2xl overflow-hidden shadow-xl aspect-square">
                  <img
                    src="/images/about/rd13.webp"
                    alt="Teak wood grain"
                    className="w-full h-full object-contain hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
              <div className="pt-8 space-y-4">
                <div className="rounded-2xl overflow-hidden shadow-xl aspect-square">
                  <img
                    src="/images/about/rd20.webp"
                    alt="Door detail carving"
                    className="w-full h-full object-contain hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="rounded-2xl overflow-hidden shadow-xl aspect-[3/4]">
                  <img
                    src="/images/about/rd30.webp"
                    alt="Premium door"
                    className="w-full h-full object-contain hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
            </div>

            {/* Stat badge */}
            {/* Stat badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="mt-4 mx-auto bg-brand-600 text-white px-4 py-3 rounded-2xl shadow-brand-lg text-center w-fit max-w-[230px] sm:absolute sm:-bottom-5 sm:left-1/2 sm:-translate-x-1/2 sm:mt-0 sm:px-8 sm:py-4 sm:max-w-none"
            >
              <p className="text-base sm:text-3xl font-display font-bold leading-tight">
                Customized designs
              </p>

              <p className="text-brand-200 text-xs sm:text-sm">
                All Handcrafted
              </p>
            </motion.div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-badge mb-4 inline-flex">About Us</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-brand-900 dark:text-white mt-2 mb-5">
              Crafting Excellence in Every Door
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6">
              {settings.about_content || 'Rama Door is a premier teak wood door manufacturing company based in Kutch, Gujarat. Founded by Pratik Keshrani and Kewal Keshrani, we combine traditional craftsmanship with modern design.'}
            </p>
            <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed mb-8">
              Every door that leaves our workshop carries the mark of exceptional craftsmanship,
              quality materials, and unwavering attention to detail.
            </p>

            <ul className="space-y-3 mb-9">
              {highlights.map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm">
                  <CheckCircle className="w-5 h-5 text-accent-500 flex-shrink-0" />
                  <span className="text-neutral-700 dark:text-neutral-300">{item}</span>
                </li>
              ))}
            </ul>

            <Link
              to="/about"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold border-2 border-brand-600 text-brand-600 dark:text-accent-300 dark:border-accent-400 hover:bg-brand-600 hover:text-white dark:hover:bg-accent-500 dark:hover:text-white transition-all duration-300 group"
            >
              Learn About Us
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
