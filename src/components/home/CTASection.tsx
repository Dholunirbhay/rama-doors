import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';
import { getWhatsAppUrl, getTelUrl, getMailtoUrl, getGoogleMapsUrl } from '../../lib/utils';

export default function CTASection() {
  const { settings } = useSettings();

  return (
    <section className="section-padding bg-brand-gradient">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* CTA Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-center lg:text-left"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-accent-300 text-sm font-medium mb-6">
              Ready to Begin?
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
              Transform Your Entrance Today
            </h2>
            <p className="text-brand-200 mb-8 leading-relaxed max-w-lg mx-auto lg:mx-0">
              Contact us for a free consultation. Our team is available 9 AM – 8 PM to help
              you choose the perfect teak wood door for your home or project.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a
                href={getWhatsAppUrl(settings.whatsapp, 'Hello! I would like to inquire about your teak wood doors.')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl font-semibold bg-white text-brand-700 hover:bg-brand-50 shadow-xl hover:shadow-2xl transform hover:-translate-y-0.5 transition-all duration-300"
              >
                <MessageCircle className="w-5 h-5 text-teal-600" />
                WhatsApp Now
              </a>
              <a
                href={getTelUrl(settings.mobile)}
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl font-semibold text-white border-2 border-white/30 hover:bg-white/10 hover:border-white/50 transition-all duration-300"
              >
                <Phone className="w-5 h-5" />
                Call Us
              </a>
            </div>
          </motion.div>

          {/* Quick Info Grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {[
              {
                icon: Phone,
                label: 'Phone',
                value: (
                  <>
                    <a href={getTelUrl(settings.mobile)} className="block hover:text-accent-300">
                      {settings.mobile}
                    </a>
                    <a href="tel:+918780418018" className="block hover:text-accent-300">
                      +91 8780418018
                    </a>
                  </>
                ),
              },
              {
                icon: MessageCircle,
                label: 'WhatsApp',
                value: settings.whatsapp,
                href: getWhatsAppUrl(settings.whatsapp),
                external: true,
              },
              {
                icon: Mail,
                label: 'Email',
                value: settings.email,
                href: getMailtoUrl(settings.email),
                small: true,
              },
              {
                icon: Clock,
                label: 'Working Hours',
                value: settings.working_hours,
              },
              {
                icon: MapPin,
                label: 'Address',
                value: settings.address,
                href: getGoogleMapsUrl(settings.address),
                external: true,
                colSpan: true,
              },
            ].map((item) => (
              <div
                key={item.label}
                className={`bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl p-5 ${item.colSpan ? 'sm:col-span-2' : ''}`}
              >
                <item.icon className="w-6 h-6 text-accent-300 mb-2" />
                <p className="text-brand-300 text-xs mb-1">{item.label}</p>
                {item.href ? (
                  <a
                    href={item.href}
                    {...(item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className={`text-white font-medium hover:text-accent-300 transition-colors ${item.small ? 'text-sm break-all' : ''}`}
                  >
                    {item.value}
                  </a>
                ) : (
                  <div className="text-white font-medium">{item.value}</div>
                )}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
