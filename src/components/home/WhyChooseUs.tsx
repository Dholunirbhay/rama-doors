import { motion } from 'framer-motion';
import { TreePine, Award, Clock, Shield, Hammer, Sparkles } from 'lucide-react';

const features = [
  {
    icon: TreePine,
    title: 'Premium Teak Wood',
    description: 'We source only Grade A teak, prized for its exceptional durability, natural oils, and distinctive grain patterns that improve with age.',
    color: 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400',
  },
  {
    icon: Award,
    title: 'Skilled Craftsmen',
    description: 'Our artisans have decades of experience in traditional woodworking, combining ancestral techniques with modern precision tools.',
    color: 'bg-brand-50 dark:bg-brand-900/50 text-brand-600 dark:text-accent-300',
  },
  {
    icon: Sparkles,
    title: 'Modern Designs',
    description: 'From classic heritage panels to sleek contemporary pivots, our 31+ designs cater to every architectural style and taste.',
    color: 'bg-accent-50 dark:bg-accent-900/20 text-accent-600 dark:text-accent-300',
  },
  {
    icon: Hammer,
    title: 'Custom Manufacturing',
    description: 'Need a specific size or design? We create fully bespoke doors tailored to your exact specifications and vision.',
    color: 'bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400',
  },
  {
    icon: Shield,
    title: 'Long Durability',
    description: 'Teak wood\'s natural resistance to moisture, pests, and weathering ensures your door remains beautiful for decades.',
    color: 'bg-teal-50 dark:bg-teal-900/20 text-teal-600 dark:text-teal-400',
  },
  {
    icon: Clock,
    title: 'Elegant Finishing',
    description: 'Multiple sanding stages and premium finishing treatments bring out the wood\'s natural beauty and ensure a flawless surface.',
    color: 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400',
  },
];

export default function WhyChooseUs() {
  return (
    <section className="section-padding bg-brand-50 dark:bg-brand-950">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="section-badge mb-4 inline-flex">Why Choose Us</span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-brand-900 dark:text-white mt-2 mb-4">
            Why Choose Rama Door?
          </h2>
          <p className="text-neutral-500 dark:text-neutral-400 max-w-2xl mx-auto leading-relaxed">
            We combine traditional Indian woodworking heritage with contemporary design
            sensibilities to create doors that define your entrance.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="group bg-white dark:bg-brand-800 rounded-2xl p-7 shadow-md hover:shadow-brand border border-brand-100 dark:border-brand-700 transition-all duration-300"
            >
              <div className={`w-14 h-14 rounded-2xl ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-display font-semibold text-brand-900 dark:text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-neutral-500 dark:text-neutral-400 leading-relaxed text-sm">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
