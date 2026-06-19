import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { settingsStore, initLocalStore } from '../lib/localStore';
import type { AppSettings } from '../types';

interface SettingsContextType {
  settings: AppSettings;
  loading: boolean;
  refreshSettings: () => void;
}

const defaultSettings: AppSettings = {
  company_name: 'Rama Door',
  mobile: '+91 9925867432',
  whatsapp: '+91 8780418018',
  email: 'balajientergimb@gmail.com',
  address: 'Meghpar (Borichi), Anjar, Kutch, Gujarat - 370110',
  working_hours: '9:00 AM to 8:00 PM',
  instagram: '',
  facebook: '',
  linkedin: '',
  about_content: 'Rama Door is a premier teak wood door manufacturing company based in Kutch, Gujarat.',
  about_mission: 'To deliver premium quality teak wood doors that enhance the beauty and security of homes and businesses.',
  about_vision: 'To become the most trusted manufacturer of handcrafted luxury wooden doors in India.',
  hero_title: 'Premium Teak Wood Doors',
  hero_subtitle: 'Handcrafted Luxury for Your Home',
};

export const SettingsContext = createContext<SettingsContextType>({
  settings: defaultSettings,
  loading: true,
  refreshSettings: () => {},
});

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<AppSettings>(defaultSettings);
  const [loading, setLoading] = useState(true);

  const refreshSettings = useCallback(() => {
    try {
      const s = settingsStore.get();
      setSettings(s);
    } catch {
      setSettings(defaultSettings);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    initLocalStore();
    refreshSettings();
  }, [refreshSettings]);

  return (
    <SettingsContext.Provider value={{ settings, loading, refreshSettings }}>
      {children}
    </SettingsContext.Provider>
  );
}
