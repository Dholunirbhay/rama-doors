import type { AppSettings } from '../types';

// ─── Keys ────────────────────────────────────────────────────────────────────
const KEYS = {
  settings: 'rd_settings',
  adminAuth: 'rd_admin_auth',
};


const DEFAULT_SETTINGS: AppSettings = {
  company_name: 'Rama Door',
  mobile: '+91 9925867432',
  whatsapp: '+91 8780418018',
  email: 'balajientergimb@gmail.com',
  address: 'Meghpar (Borichi), Anjar, Kutch, Gujarat - 370110',
  working_hours: '9:00 AM to 8:00 PM',
  instagram: '',
  gst_number: '',
  pan_number: '',
  google_map_url: 'https://maps.google.com/maps?q=Meghpar%20Borichi%20Anjar%20Kutch&t=&z=13&ie=UTF8&iwloc=&output=embed',
  logo_url: '/ramadoorslogo.png',
  about_content: 'Rama Door is a premier teak wood door manufacturing company based in Kutch, Gujarat. Founded by Pratik Keshrani and Kewal Keshrani, we combine traditional craftsmanship with modern design aesthetics to create doors that are both beautiful and built to last.',
  about_mission: 'To deliver premium quality teak wood doors that enhance the beauty and security of homes and businesses across India.',
  about_vision: 'To become the most trusted manufacturer of handcrafted luxury wooden doors in India.',
  hero_title: 'Premium Teak Wood Doors',
  hero_subtitle: 'Handcrafted Luxury for Your Home',
};

// ─── Generic read/write helpers ───────────────────────────────────────────────
function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write<T>(key: string, value: T): void {
  localStorage.setItem(key, JSON.stringify(value));
}

// ─── Init (seed if first run) ─────────────────────────────────────────────────
export function initLocalStore() {
  if (!localStorage.getItem(KEYS.settings)) {
    write(KEYS.settings, DEFAULT_SETTINGS);
  }
}




// ─── Settings ─────────────────────────────────────────────────────────────────
export const settingsStore = {
  get(): AppSettings {
    return read<AppSettings>(KEYS.settings, DEFAULT_SETTINGS);
  },
  save(settings: AppSettings): void {
    write(KEYS.settings, settings);
  },
};



// ─── Admin Auth ───────────────────────────────────────────────────────────────
const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL || 'admin@ramadoor.com';
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || '';

export const adminAuth = {
  login(email: string, password: string): boolean {
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      write(KEYS.adminAuth, { loggedIn: true, email, ts: Date.now() });
      return true;
    }
    return false;
  },
  logout(): void {
    localStorage.removeItem(KEYS.adminAuth);
  },
  isLoggedIn(): boolean {
    const auth = read<{ loggedIn?: boolean; ts?: number } | null>(KEYS.adminAuth, null);
    if (!auth?.loggedIn) return false;
    // Session expires after 24h
    const age = Date.now() - (auth.ts ?? 0);
    if (age > 86_400_000) {
      this.logout();
      return false;
    }
    return true;
  },
};
