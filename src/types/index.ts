export interface Product {
  id: string;
  name: string;
  design_code: string;
  size: string;
  material?: string;
  description?: string;
  image_url?: string;
  price_label: string;
  category: string;
  is_featured: boolean;
  created_at: string;
}

export interface GalleryImage {
  id: string;
  title?: string;
  image_url: string;
  category?: string;
  created_at: string;
}

export interface Testimonial {
  id: string;
  customer_name: string;
  message: string;
  rating: number;
  is_approved: boolean;
  created_at: string;
}

export interface ContactInquiry {
  id: string;
  name: string;
  email?: string;
  mobile?: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

export interface AppSettings {
  company_name: string;
  mobile: string;
  whatsapp: string;
  email: string;
  address: string;
  working_hours: string;
  instagram?: string;
  gst_number?: string;
  pan_number?: string;
  google_map_url?: string;
  logo_url?: string;
  facebook?: string;
  linkedin?: string;
  about_content?: string;
  about_mission?: string;
  about_vision?: string;
  hero_title?: string;
  hero_subtitle?: string;
  hero_cta_primary?: string;
  hero_cta_secondary?: string;
}

export type Theme = 'light' | 'dark';
