import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, Instagram, Facebook, Linkedin } from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';
import { getWhatsAppUrl, getTelUrl, getMailtoUrl, getGoogleMapsUrl } from '../../lib/utils';

const footerNav = [
  {
    title: 'Company',
    links: [
      { name: 'About Us', path: '/about' },
      { name: 'Products', path: '/products' },
      { name: 'Gallery', path: '/gallery' },
      { name: 'Our Process', path: '/process' },
      { name: 'Contact', path: '/contact' },
    ],
  },
  {
    title: 'Products',
    links: [
      { name: 'Teak Wood Doors', path: '/products' },
      { name: 'Premium Collection', path: '/products' },
      { name: 'Heritage Designs', path: '/products' },
      { name: 'Custom Doors', path: '/products' },
      { name: 'Get Quote', path: '/contact' },
    ],
  },
];

export default function Footer() {
  const { settings } = useSettings();
  const year = new Date().getFullYear();

  const WhatsAppIcon = () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.004c6.554 0 11.89-5.335 11.892-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );

  return (
    <footer className="bg-brand-900 dark:bg-brand-950 text-brand-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mb-12">

          {/* Brand Column */}
          <div className="lg:col-span-1 space-y-6">
            <Link to="/">
              <img
                src="/ramadoorslogo.png"
                alt="Rama Door"
                className="h-12 w-auto brightness-0 invert opacity-90"
              />
            </Link>
            <p className="text-brand-400 text-sm leading-relaxed">
              Premium teak wood doors handcrafted with excellence in Kutch, Gujarat.
              Bringing elegance to every entrance since establishment.
            </p>
            <div className="flex items-center gap-3">
              <a
                href={getWhatsAppUrl(settings.whatsapp, 'Hello! I am interested in your teak wood doors.')}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-brand-800 hover:bg-teal-700 text-brand-300 hover:text-white transition-all"
                aria-label="WhatsApp"
              >
                <WhatsAppIcon />
              </a>
              {settings.instagram && (
                <a
                  href={settings.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-brand-800 hover:bg-pink-700 text-brand-300 hover:text-white transition-all"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
              )}
              {settings.facebook && (
                <a
                  href={settings.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-brand-800 hover:bg-blue-700 text-brand-300 hover:text-white transition-all"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </a>
              )}
              {settings.linkedin && (
                <a
                  href={settings.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-brand-800 hover:bg-blue-600 text-brand-300 hover:text-white transition-all"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>

          {/* Nav Columns */}
          {footerNav.map((section) => (
            <div key={section.title}>
              <h3 className="text-white font-display font-semibold text-lg mb-5">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-brand-400 hover:text-accent-300 transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact Column */}
          <div>
            <h3 className="text-white font-display font-semibold text-lg mb-5">
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li>
                <a
                  href={getTelUrl(settings.mobile)}
                  className="flex items-center gap-3 text-brand-400 hover:text-accent-300 transition-colors text-sm"
                >
                  <Phone className="w-4 h-4 flex-shrink-0 text-accent-400" />
                  <span>{settings.mobile}</span>
                </a>
              </li>
              <li>
                <a
                  href={getWhatsAppUrl(settings.whatsapp)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-brand-400 hover:text-accent-300 transition-colors text-sm"
                >
                  <WhatsAppIcon />
                  <span>{settings.whatsapp}</span>
                </a>
              </li>
              <li>
                <a
                  href={getMailtoUrl(settings.email)}
                  className="flex items-center gap-3 text-brand-400 hover:text-accent-300 transition-colors text-sm break-all"
                >
                  <Mail className="w-4 h-4 flex-shrink-0 text-accent-400" />
                  <span>{settings.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={getGoogleMapsUrl(settings.address)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 text-brand-400 hover:text-accent-300 transition-colors text-sm"
                >
                  <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5 text-accent-400" />
                  <span>{settings.address}</span>
                </a>
              </li>
              <li className="flex items-center gap-3 text-brand-400 text-sm">
                <Clock className="w-4 h-4 flex-shrink-0 text-accent-400" />
                <span>{settings.working_hours}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-brand-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-brand-500">
            <p>&copy; {year} {settings.company_name}. All rights reserved.</p>
            <p>Crafted by Pratik Keshrani &amp; Kewal Keshrani</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
