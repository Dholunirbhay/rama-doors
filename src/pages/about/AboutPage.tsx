import { motion } from 'framer-motion';
import { Award, Target, Eye, Users } from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';
import CTASection from '../../components/home/CTASection';

const teamMembers = [
  {
    name: 'Pratik Keshrani',
    role: 'Chairman',
    image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    name: 'Kewal Keshrani',
    role: 'Co-Founder',
    image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
];

export default function AboutPage() {
  const { settings } = useSettings();

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
              Our Story
            </span>
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-5">
              Crafting Excellence in Teak Wood Doors
            </h1>
            <p className="text-xl text-brand-200 leading-relaxed">
              A legacy of quality craftsmanship and dedication to creating
              beautiful entrances for homes and businesses.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="section-padding bg-white dark:bg-brand-900">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-brand-600 dark:text-accent-400 font-medium text-sm uppercase tracking-wider">
                Our Journey
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-brand-900 dark:text-white mt-2 mb-6">
                The Rama Door Story
              </h2>
              <div className="space-y-4 text-neutral-600 dark:text-neutral-400">
                <p className="leading-relaxed">
                  {settings.about_content || 'Rama Door is a premier teak wood door manufacturing company based in Kutch, Gujarat. Founded by Pratik Keshrani and Kewal Keshrani, we have been crafting exquisite wooden doors that combine traditional craftsmanship with modern design aesthetics.'}
                </p>
                <p className="leading-relaxed">
                  Located in Meghpar (Borichi), Anjar, Kutch, Gujarat, we have established ourselves as a trusted name in the industry, delivering premium quality teak wood doors that enhance the beauty and security of homes and businesses.
                </p>
                <p className="leading-relaxed">
                  Our journey began with a simple vision: to create doors that are not just entryways but statements of elegance and craftsmanship. Today, we continue to honor that vision with every door we create.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="rounded-3xl overflow-hidden shadow-brand-lg">
                <img
                  src="public/images/about-page.webp"
                  alt="Rama Door Workshop"
                  className="w-full h-[500px] object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-brand-600 text-white p-6 rounded-2xl shadow-brand-lg">
                
                <p className="text-brand-200">Customized Designs</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding bg-brand-50 dark:bg-brand-950">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-brand-800 rounded-2xl p-8 shadow-lg border border-brand-100 dark:border-brand-700"
            >
              <div className="w-14 h-14 rounded-xl bg-accent-100 dark:bg-accent-900/30 flex items-center justify-center mb-6">
                <Target className="w-7 h-7 text-brand-600 dark:text-accent-400" />
              </div>
              <h3 className="text-2xl font-display font-bold text-brand-900 dark:text-white mb-4">
                Our Mission
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                {settings.about_mission || 'To deliver premium quality teak wood doors that enhance the beauty and security of homes and businesses.'}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white dark:bg-brand-800 rounded-2xl p-8 shadow-lg border border-brand-100 dark:border-brand-700"
            >
              <div className="w-14 h-14 rounded-xl bg-brand-100 dark:bg-brand-700/50 flex items-center justify-center mb-6">
                <Eye className="w-7 h-7 text-brand-600 dark:text-accent-300" />
              </div>
              <h3 className="text-2xl font-display font-bold text-brand-900 dark:text-white mb-4">
                Our Vision
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                {settings.about_vision || 'To become the leading manufacturer of handcrafted wooden doors in India.'}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quality Section */}
      <section className="section-padding bg-white dark:bg-brand-900">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-100 dark:bg-brand-800 text-brand-600 dark:text-accent-300 text-sm font-medium mb-4">
              Quality Assurance
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-brand-900 dark:text-white mb-4">
              Quality We Stand Behind
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400">
              Every door we create undergoes rigorous quality checks to ensure
              it meets our high standards of craftsmanship and durability.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Award,
                title: 'Premium Materials',
                description: 'We source only the finest quality teak wood, known for its durability, resistance to weather, and beautiful grain patterns.',
              },
              {
                icon: Users,
                title: 'Expert Craftsmen',
                description: 'Our team of skilled artisans brings decades of experience in traditional woodworking techniques combined with modern precision.',
              },
              {
                icon: Target,
                title: 'Quality Control',
                description: 'Each door undergoes multiple quality checks at every stage of production to ensure perfection in every detail.',
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 rounded-full bg-brand-100 dark:bg-brand-800 flex items-center justify-center mx-auto mb-6">
                  <item.icon className="w-8 h-8 text-brand-600 dark:text-accent-300" />
                </div>
                <h3 className="text-xl font-display font-semibold text-brand-900 dark:text-white mb-3">
                  {item.title}
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section-padding bg-brand-50 dark:bg-brand-950">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-100 dark:bg-brand-800 text-brand-600 dark:text-accent-300 text-sm font-medium mb-4">
              Our Team
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-brand-900 dark:text-white">
              Meet the Founders
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-brand-800 rounded-2xl p-8 shadow-lg text-center border border-brand-100 dark:border-brand-700"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-32 h-32 rounded-full object-cover mx-auto mb-6 border-4 border-brand-200 dark:border-brand-700"
                />
                <h3 className="text-xl font-display font-semibold text-brand-900 dark:text-white mb-2">
                  {member.name}
                </h3>
                <p className="text-brand-600 dark:text-accent-300">
                  {member.role}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
}
