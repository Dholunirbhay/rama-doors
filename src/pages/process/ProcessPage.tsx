import { motion } from 'framer-motion';
import {
  Search, Ruler, PenTool, Cpu, Hammer, Zap, Sparkles, ShieldCheck, Package, Truck
} from 'lucide-react';
import { Link } from 'react-router-dom';

const steps = [
  {
    id: 1,
    icon: Search,
    title: 'Teak Wood Selection',
    subtitle: 'Sourcing the Finest Grade A Teak',
    description: 'Our process begins with hand-selecting premium Grade A teak logs. We inspect each piece for grain uniformity, density, natural oil content, and freedom from defects. Only the finest timber that meets our exacting standards makes it to the next stage.',
    image: '/process/step1.webp',
    color: 'from-green-500 to-teal-600',
    lightColor: 'bg-green-50 dark:bg-green-900/20 text-green-600',
  },
  {
    id: 2,
    icon: Ruler,
    title: 'Cutting & Sizing',
    subtitle: 'Precision Dimensional Cutting',
    description: 'Selected logs are cut to precise measurements using calibrated industrial saws. We account for wood expansion and contraction, ensuring your door maintains perfect fit across all seasons and climatic conditions prevalent in Gujarat.',
    image: '/process/step2.webp',
    color: 'from-blue-500 to-brand-600',
    lightColor: 'bg-blue-50 dark:bg-blue-900/20 text-blue-600',
  },
  {
    id: 3,
    icon: PenTool,
    title: 'Design Planning',
    subtitle: 'Blueprint & Pattern Creation',
    description: 'Our design team works on detailed blueprints for each door specification. Whether it\'s one of our 31 signature designs or a custom creation, every panel, groove, and carving is carefully planned before a single chisel touches the wood.',
    image: '/process/step3.webp',
    color: 'from-purple-500 to-indigo-600',
    lightColor: 'bg-purple-50 dark:bg-purple-900/20 text-purple-600',
  },
  {
    id: 4,
    icon: Cpu,
    title: 'CNC Precision Work',
    subtitle: 'Computer-Aided Accuracy',
    description: 'Complex geometric patterns, decorative grooves, and panel recesses are executed on our CNC machines with sub-millimetre accuracy. This combination of technology and tradition ensures every door is perfectly consistent with the approved design.',
    image: '/process/step4.webp',
    color: 'from-cyan-500 to-accent-600',
    lightColor: 'bg-cyan-50 dark:bg-cyan-900/20 text-cyan-600',
  },
  {
    id: 5,
    icon: Hammer,
    title: 'Hand Crafting',
    subtitle: 'Artisan Detailing by Expert Hands',
    description: 'The soul of every Rama Door is added by our master craftsmen. Intricate carvings, decorative motifs, and fine detailing are done entirely by hand. Each artisan brings decades of experience, infusing every door with unmatched character.',
    image: '/process/step5.webp',
    color: 'from-amber-500 to-orange-600',
    lightColor: 'bg-amber-50 dark:bg-amber-900/20 text-amber-600',
  },
  {
    id: 6,
    icon: Zap,
    title: 'Sanding',
    subtitle: 'Multiple-Stage Surface Preparation',
    description: 'We use a progressive 4-stage sanding process — starting from coarse (40-grit) to ultra-fine (320-grit). This eliminates all tool marks, opens the wood grain evenly, and creates the perfectly smooth canvas required for premium finishing.',
    image: '/process/step6.webp',
    color: 'from-rose-500 to-pink-600',
    lightColor: 'bg-rose-50 dark:bg-rose-900/20 text-rose-600',
  },
  {
    id: 7,
    icon: Sparkles,
    title: 'Polishing & Finishing',
    subtitle: 'Premium Protective Surface Treatment',
    description: 'Multiple coats of premium teak oil and protective lacquer are applied, with light sanding between each coat. This seals the wood, enhances the natural grain, adds depth to the colour, and provides lasting protection against moisture and UV.',
    image: '/process/step7.webp',
    color: 'from-brand-500 to-accent-600',
    lightColor: 'bg-brand-50 dark:bg-brand-900/30 text-brand-600',
  },
  {
    id: 8,
    icon: ShieldCheck,
    title: 'Quality Inspection',
    subtitle: '25-Point Quality Control Check',
    description: 'Before leaving our facility, every door undergoes our rigorous 25-point quality inspection. We check dimensional accuracy, finish quality, hardware fitment, panel alignment, hinge positions, and structural integrity to ensure perfection.',
    image: '/process/step8.webp',
    color: 'from-teal-500 to-green-600',
    lightColor: 'bg-teal-50 dark:bg-teal-900/20 text-teal-600',
  },
  {
    id: 9,
    icon: Package,
    title: 'Packaging',
    subtitle: 'Protective Multi-Layer Packaging',
    description: 'Approved doors are carefully wrapped in multi-layer protective packaging — foam padding, stretch film, and hardboard corner guards. This ensures your door arrives at your site in pristine, showroom condition, free from any transit damage.',
    image: '/process/step9.webp',
    color: 'from-neutral-500 to-neutral-700',
    lightColor: 'bg-neutral-50 dark:bg-neutral-800/50 text-neutral-600',
  },
  {
    id: 10,
    icon: Truck,
    title: 'Delivery',
    subtitle: 'Safe & Timely Door-to-Site Delivery',
    description: 'We arrange secure transport directly to your site across Gujarat and beyond. Our delivery team handles the unloading with care. We also offer installation guidance and a dedicated after-sales support line for any post-delivery queries.',
    image: '/process/step10.webp',
    color: 'from-brand-600 to-brand-800',
    lightColor: 'bg-brand-50 dark:bg-brand-900/30 text-brand-600',
  },
];

export default function ProcessPage() {
  return (
    <div className="pt-10">
      {/* Hero */}
      <section className="section-padding bg-brand-gradient text-white">
        <div className="container-custom text-center max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-accent-300 text-sm font-medium mb-6">
              Behind the Craft
            </span>
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-5">
              Our Manufacturing Process
            </h1>
            <p className="text-xl text-brand-200 leading-relaxed">
              Every Rama Door is the result of a meticulous 10-step journey from raw
              teak log to finished masterpiece — crafted with passion in Kutch, Gujarat.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="section-padding bg-brand-50 dark:bg-brand-950">
        <div className="container-custom">
          <div className="space-y-20">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6 }}
                className={`grid lg:grid-cols-2 gap-10 items-center ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Image — swap sides for odd steps */}
                <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                  <div className="relative rounded-3xl overflow-hidden shadow-brand-lg group">
                    <img
                      src={step.image}
                      alt={step.title}
                      className="w-full aspect-[16/10] object-cover group-hover:scale-105 transition-transform duration-700"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.pexels.com/photos/2635038/pexels-photo-2635038.jpeg?auto=compress&cs=tinysrgb&w=700';
                      }}
                    />
                    {/* Step number overlay */}
                    <div className={`absolute top-4 left-4 w-12 h-12 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center text-white font-bold text-lg shadow-lg`}>
                      {step.id}
                    </div>
                  </div>
                </div>

                {/* Text */}
                <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                  <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl ${step.lightColor} text-sm font-medium mb-4`}>
                    <step.icon className="w-4 h-4" />
                    Step {step.id}
                  </div>
                  <h2 className="text-3xl font-display font-bold text-brand-900 dark:text-white mb-2">
                    {step.title}
                  </h2>
                  <p className="text-accent-500 dark:text-accent-400 font-medium mb-4">
                    {step.subtitle}
                  </p>
                  <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed text-[15px]">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="section-padding bg-brand-600">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-display font-bold text-white mb-4">
              Ready to Order Your Premium Door?
            </h2>
            <p className="text-brand-200 mb-8 max-w-xl mx-auto">
              Browse our collection of various designs and customized designs or get in touch to discuss
              your custom requirements.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/products"
                className="inline-flex items-center justify-center px-7 py-4 rounded-xl font-semibold bg-white text-brand-700 hover:bg-brand-50 shadow-xl transition-all"
              >
                Browse All Designs
              </Link>
              <a
                href="/catalogue/rama-door-catalogue.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-7 py-4 rounded-xl font-semibold text-white border-2 border-white/30 hover:bg-white/10 transition-all"
              >
                Download Catalogue
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
