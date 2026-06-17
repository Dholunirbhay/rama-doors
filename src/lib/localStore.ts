import type { Product, GalleryImage, ContactInquiry, AppSettings } from '../types';

// ─── Keys ────────────────────────────────────────────────────────────────────
const KEYS = {
  products: 'rd_products',
  gallery: 'rd_gallery',
  settings: 'rd_settings',
  inquiries: 'rd_inquiries',
  adminAuth: 'rd_admin_auth',
};

// ─── Pexels door / wood images (verified to load) ────────────────────────────
const DOOR_IMAGES = [
  'https://images.pexels.com/photos/2635038/pexels-photo-2635038.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/1454804/pexels-photo-1454804.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/276528/pexels-photo-276528.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/534172/pexels-photo-534172.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/1267357/pexels-photo-1267357.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/2724748/pexels-photo-2724748.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/4846097/pexels-photo-4846097.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/5178069/pexels-photo-5178069.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/2079246/pexels-photo-2079246.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/1438834/pexels-photo-1438834.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/2104882/pexels-photo-2104882.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/1005058/pexels-photo-1005058.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/259950/pexels-photo-259950.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/1707820/pexels-photo-1707820.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/2883049/pexels-photo-2883049.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/3288103/pexels-photo-3288103.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/2635038/pexels-photo-2635038.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/1454804/pexels-photo-1454804.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/276528/pexels-photo-276528.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/534172/pexels-photo-534172.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/1267357/pexels-photo-1267357.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/2724748/pexels-photo-2724748.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/4846097/pexels-photo-4846097.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/5178069/pexels-photo-5178069.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/2079246/pexels-photo-2079246.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/1438834/pexels-photo-1438834.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/2104882/pexels-photo-2104882.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/1005058/pexels-photo-1005058.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/259950/pexels-photo-259950.jpeg?auto=compress&cs=tinysrgb&w=800',
];

// ─── Seed Products ────────────────────────────────────────────────────────────
const SEED_PRODUCTS: Product[] = [
  { id: 'rd01', name: 'Royal Heritage Door', design_code: 'RD 01', size: '3.5 × 7 ft', material: 'Premium Teak Wood', description: 'Exquisite door featuring intricate traditional carvings and a rich finish. Perfect for grand entrances.', image_url: DOOR_IMAGES[0], price_label: 'Call for Price', category: 'Teak Wood Door', is_featured: true, created_at: new Date().toISOString() },
  { id: 'rd02', name: 'Modern Elegance Door', design_code: 'RD 02', size: '3 × 7 ft', material: 'Teak Wood', description: 'Clean lines and minimalist design with a natural wood finish. Ideal for contemporary homes.', image_url: DOOR_IMAGES[1], price_label: 'Call for Price', category: 'Teak Wood Door', is_featured: true, created_at: new Date().toISOString() },
  { id: 'rd03', name: 'Classic Panel Door', design_code: 'RD 03', size: '3 × 7 ft', material: 'Teak Wood', description: 'Classic six-panel design with subtle detailing. Timeless elegance for any home.', image_url: DOOR_IMAGES[2], price_label: 'Call for Price', category: 'Teak Wood Door', is_featured: true, created_at: new Date().toISOString() },
  { id: 'rd04', name: 'Royal Arch Door', design_code: 'RD 04', size: '4 × 8 ft', material: 'Premium Teak Wood', description: 'Majestic arched doorway with ornate carvings and decorative glass panels.', image_url: DOOR_IMAGES[3], price_label: 'Call for Price', category: 'Premium Teak Wood Door', is_featured: false, created_at: new Date().toISOString() },
  { id: 'rd05', name: 'Victorian Style Door', design_code: 'RD 05', size: '3.5 × 7.5 ft', material: 'Teak Wood', description: 'Victorian-inspired design with detailed moldings and elegant handles.', image_url: DOOR_IMAGES[4], price_label: 'Call for Price', category: 'Teak Wood Door', is_featured: false, created_at: new Date().toISOString() },
  { id: 'rd06', name: 'Contemporary Pivot Door', design_code: 'RD 06', size: '4 × 8 ft', material: 'Premium Teak Wood', description: 'Modern pivot door with sleek hardware and concealed hinges for a seamless look.', image_url: DOOR_IMAGES[5], price_label: 'Call for Price', category: 'Premium Teak Wood Door', is_featured: false, created_at: new Date().toISOString() },
  { id: 'rd07', name: 'Traditional Carved Door', design_code: 'RD 07', size: '3 × 7 ft', material: 'Teak Wood', description: 'Hand-carved traditional motifs with a warm walnut finish. A masterpiece of artisanal craft.', image_url: DOOR_IMAGES[6], price_label: 'Call for Price', category: 'Teak Wood Door', is_featured: false, created_at: new Date().toISOString() },
  { id: 'rd08', name: 'Minimalist Frame Door', design_code: 'RD 08', size: '3 × 7 ft', material: 'Teak Wood', description: 'Simple yet sophisticated frame design with clean aesthetics for modern interiors.', image_url: DOOR_IMAGES[7], price_label: 'Call for Price', category: 'Teak Wood Door', is_featured: false, created_at: new Date().toISOString() },
  { id: 'rd09', name: 'Grand Entrance Door', design_code: 'RD 09', size: '5 × 9 ft', material: 'Premium Teak Wood', description: 'Impressive double door with intricate carvings and premium brass accents.', image_url: DOOR_IMAGES[8], price_label: 'Call for Price', category: 'Premium Teak Wood Door', is_featured: false, created_at: new Date().toISOString() },
  { id: 'rd10', name: 'Colonial Style Door', design_code: 'RD 10', size: '3.5 × 7 ft', material: 'Teak Wood', description: 'Colonial-inspired design with raised panels and period-authentic hardware.', image_url: DOOR_IMAGES[9], price_label: 'Call for Price', category: 'Teak Wood Door', is_featured: false, created_at: new Date().toISOString() },
  { id: 'rd11', name: 'Art Deco Door', design_code: 'RD 11', size: '3 × 7 ft', material: 'Teak Wood', description: 'Art deco geometric patterns with elegant wood inlays and chrome accents.', image_url: DOOR_IMAGES[10], price_label: 'Call for Price', category: 'Teak Wood Door', is_featured: false, created_at: new Date().toISOString() },
  { id: 'rd12', name: 'Rustic Farmhouse Door', design_code: 'RD 12', size: '4 × 7.5 ft', material: 'Premium Teak Wood', description: 'Rustic charm with cross-panel design and wrought iron hardware.', image_url: DOOR_IMAGES[11], price_label: 'Call for Price', category: 'Teak Wood Door', is_featured: false, created_at: new Date().toISOString() },
  { id: 'rd13', name: 'French Country Door', design_code: 'RD 13', size: '3 × 7 ft', material: 'Teak Wood', description: 'French provincial design with decorative glass inserts and arched top.', image_url: DOOR_IMAGES[12], price_label: 'Call for Price', category: 'Teak Wood Door', is_featured: false, created_at: new Date().toISOString() },
  { id: 'rd14', name: 'Craftsman Style Door', design_code: 'RD 14', size: '3.5 × 7 ft', material: 'Teak Wood', description: 'Craftsman era design with signature shelf detail and quality hardware.', image_url: DOOR_IMAGES[13], price_label: 'Call for Price', category: 'Teak Wood Door', is_featured: false, created_at: new Date().toISOString() },
  { id: 'rd15', name: 'Mediterranean Door', design_code: 'RD 15', size: '4 × 8 ft', material: 'Premium Teak Wood', description: 'Spanish Mediterranean design with arched top and decorative iron details.', image_url: DOOR_IMAGES[14], price_label: 'Call for Price', category: 'Premium Teak Wood Door', is_featured: false, created_at: new Date().toISOString() },
  { id: 'rd16', name: 'Modern Glass Panel Door', design_code: 'RD 16', size: '3 × 7 ft', material: 'Teak Wood', description: 'Contemporary design with frosted glass panels that allow natural light.', image_url: DOOR_IMAGES[15], price_label: 'Call for Price', category: 'Teak Wood Door', is_featured: false, created_at: new Date().toISOString() },
  { id: 'rd17', name: 'Industrial Style Door', design_code: 'RD 17', size: '4 × 8 ft', material: 'Teak Wood', description: 'Industrial wood and steel combination with exposed metal accents.', image_url: DOOR_IMAGES[16], price_label: 'Call for Price', category: 'Teak Wood Door', is_featured: false, created_at: new Date().toISOString() },
  { id: 'rd18', name: 'Zen Garden Door', design_code: 'RD 18', size: '3 × 7 ft', material: 'Teak Wood', description: 'Japanese-inspired minimal design with natural grain finish and clean proportions.', image_url: DOOR_IMAGES[17], price_label: 'Call for Price', category: 'Teak Wood Door', is_featured: false, created_at: new Date().toISOString() },
  { id: 'rd19', name: 'Geometric Pattern Door', design_code: 'RD 19', size: '3.5 × 7.5 ft', material: 'Premium Teak Wood', description: 'Modern geometric woodwork with precision CNC-cut patterns.', image_url: DOOR_IMAGES[18], price_label: 'Call for Price', category: 'Premium Teak Wood Door', is_featured: false, created_at: new Date().toISOString() },
  { id: 'rd20', name: 'Heritage Double Door', design_code: 'RD 20', size: '6 × 8 ft', material: 'Teak Wood', description: 'Grand double doors with carved panels and premium decorative handles.', image_url: DOOR_IMAGES[19], price_label: 'Call for Price', category: 'Premium Teak Wood Door', is_featured: false, created_at: new Date().toISOString() },
  { id: 'rd21', name: 'Studio Flush Door', design_code: 'RD 21', size: '3 × 7 ft', material: 'Teak Wood', description: 'Clean flush design with concealed hinges for ultra-modern interiors.', image_url: DOOR_IMAGES[20], price_label: 'Call for Price', category: 'Teak Wood Door', is_featured: false, created_at: new Date().toISOString() },
  { id: 'rd22', name: 'Luxe Entrance Door', design_code: 'RD 22', size: '4 × 8 ft', material: 'Premium Teak Wood', description: 'Ultimate luxury entrance with custom hardware and exclusive finishes.', image_url: DOOR_IMAGES[21], price_label: 'Call for Price', category: 'Premium Teak Wood Door', is_featured: false, created_at: new Date().toISOString() },
  { id: 'rd23', name: 'Nordic Style Door', design_code: 'RD 23', size: '3 × 7 ft', material: 'Teak Wood', description: 'Scandinavian minimal design with light wood tone and simple geometry.', image_url: DOOR_IMAGES[22], price_label: 'Call for Price', category: 'Teak Wood Door', is_featured: false, created_at: new Date().toISOString() },
  { id: 'rd24', name: 'Carved Masterpiece Door', design_code: 'RD 24', size: '5 × 9 ft', material: 'Premium Teak Wood', description: 'Masterfully hand-carved with intricate storytelling panels. A true art piece.', image_url: DOOR_IMAGES[23], price_label: 'Call for Price', category: 'Premium Teak Wood Door', is_featured: false, created_at: new Date().toISOString() },
  { id: 'rd25', name: 'Brass Inlay Door', design_code: 'RD 25', size: '3.5 × 7.5 ft', material: 'Teak Wood', description: 'Traditional design with decorative brass inlays and motifs.', image_url: DOOR_IMAGES[24], price_label: 'Call for Price', category: 'Teak Wood Door', is_featured: false, created_at: new Date().toISOString() },
  { id: 'rd26', name: 'Temple Style Door', design_code: 'RD 26', size: '4 × 8 ft', material: 'Premium Teak Wood', description: 'Sacred temple-inspired design with spiritual motifs and ornate carving.', image_url: DOOR_IMAGES[25], price_label: 'Call for Price', category: 'Premium Teak Wood Door', is_featured: false, created_at: new Date().toISOString() },
  { id: 'rd27', name: 'Urban Loft Door', design_code: 'RD 27', size: '3 × 7 ft', material: 'Teak Wood', description: 'Contemporary urban design with mixed wood textures and modern proportions.', image_url: DOOR_IMAGES[26], price_label: 'Call for Price', category: 'Teak Wood Door', is_featured: false, created_at: new Date().toISOString() },
  { id: 'rd28', name: 'Regal Heritage Door', design_code: 'RD 28', size: '5 × 9 ft', material: 'Premium Teak Wood', description: 'Royal heritage design with ornate detailing and gold-toned accents.', image_url: DOOR_IMAGES[27], price_label: 'Call for Price', category: 'Premium Teak Wood Door', is_featured: false, created_at: new Date().toISOString() },
  { id: 'rd29', name: 'Tropical Teak Door', design_code: 'RD 29', size: '3.5 × 7 ft', material: 'Natural Teak Wood', description: 'Natural finish teak door celebrating the beautiful grain of solid wood.', image_url: DOOR_IMAGES[28], price_label: 'Call for Price', category: 'Teak Wood Door', is_featured: false, created_at: new Date().toISOString() },
  { id: 'rd30', name: 'Palace Entrance Door', design_code: 'RD 30', size: '6 × 10 ft', material: 'Premium Teak Wood', description: 'Grand palace-style entrance with elaborate carvings. The ultimate statement.', image_url: DOOR_IMAGES[29], price_label: 'Call for Price', category: 'Premium Teak Wood Door', is_featured: false, created_at: new Date().toISOString() },
  { id: 'rd31', name: 'Signature Bespoke Door', design_code: 'RD 31', size: 'Custom', material: 'Premium Teak Wood', description: 'Completely bespoke design crafted to your exact specifications and vision.', image_url: DOOR_IMAGES[30], price_label: 'Call for Price', category: 'Custom Door', is_featured: false, created_at: new Date().toISOString() },
];

const SEED_GALLERY: GalleryImage[] = [
  { id: 'g1', image_url: 'https://images.pexels.com/photos/2635038/pexels-photo-2635038.jpeg?auto=compress&cs=tinysrgb&w=800', title: 'Premium Teak Entrance', category: 'Entrance Doors', created_at: new Date().toISOString() },
  { id: 'g2', image_url: 'https://images.pexels.com/photos/1454804/pexels-photo-1454804.jpeg?auto=compress&cs=tinysrgb&w=800', title: 'Grand Heritage Door', category: 'Heritage Collection', created_at: new Date().toISOString() },
  { id: 'g3', image_url: 'https://images.pexels.com/photos/276528/pexels-photo-276528.jpeg?auto=compress&cs=tinysrgb&w=800', title: 'Classic Panel Design', category: 'Classic Collection', created_at: new Date().toISOString() },
  { id: 'g4', image_url: 'https://images.pexels.com/photos/534172/pexels-photo-534172.jpeg?auto=compress&cs=tinysrgb&w=800', title: 'Arch Teak Door', category: 'Arch Collection', created_at: new Date().toISOString() },
  { id: 'g5', image_url: 'https://images.pexels.com/photos/1267357/pexels-photo-1267357.jpeg?auto=compress&cs=tinysrgb&w=800', title: 'Victorian Elegance', category: 'Victorian Collection', created_at: new Date().toISOString() },
  { id: 'g6', image_url: 'https://images.pexels.com/photos/2724748/pexels-photo-2724748.jpeg?auto=compress&cs=tinysrgb&w=800', title: 'Modern Pivot Door', category: 'Modern Collection', created_at: new Date().toISOString() },
  { id: 'g7', image_url: 'https://images.pexels.com/photos/4846097/pexels-photo-4846097.jpeg?auto=compress&cs=tinysrgb&w=800', title: 'Hand Carved Detail', category: 'Artisan Work', created_at: new Date().toISOString() },
  { id: 'g8', image_url: 'https://images.pexels.com/photos/5178069/pexels-photo-5178069.jpeg?auto=compress&cs=tinysrgb&w=800', title: 'Double Door Entry', category: 'Premium Collection', created_at: new Date().toISOString() },
  { id: 'g9', image_url: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=800', title: 'Workshop Craftsmanship', category: 'Behind the Scenes', created_at: new Date().toISOString() },
  { id: 'g10', image_url: 'https://images.pexels.com/photos/2079246/pexels-photo-2079246.jpeg?auto=compress&cs=tinysrgb&w=800', title: 'Wood Grain Detail', category: 'Materials', created_at: new Date().toISOString() },
  { id: 'g11', image_url: 'https://images.pexels.com/photos/1438834/pexels-photo-1438834.jpeg?auto=compress&cs=tinysrgb&w=800', title: 'Finished Installation', category: 'Installations', created_at: new Date().toISOString() },
  { id: 'g12', image_url: 'https://images.pexels.com/photos/2104882/pexels-photo-2104882.jpeg?auto=compress&cs=tinysrgb&w=800', title: 'Luxury Home Entry', category: 'Installations', created_at: new Date().toISOString() },
];

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
  if (!localStorage.getItem(KEYS.products)) {
    write(KEYS.products, SEED_PRODUCTS);
  }
  if (!localStorage.getItem(KEYS.gallery)) {
    write(KEYS.gallery, SEED_GALLERY);
  }
  if (!localStorage.getItem(KEYS.settings)) {
    write(KEYS.settings, DEFAULT_SETTINGS);
  }
  if (!localStorage.getItem(KEYS.inquiries)) {
    write(KEYS.inquiries, [] as ContactInquiry[]);
  }
}

// ─── Products ─────────────────────────────────────────────────────────────────
export const productsStore = {
  getAll(): Product[] {
    return read<Product[]>(KEYS.products, SEED_PRODUCTS);
  },
  getFeatured(): Product[] {
    return this.getAll().filter(p => p.is_featured);
  },
  getByCode(code: string): Product | undefined {
    return this.getAll().find(
      p => p.design_code.toLowerCase().replace(' ', '-') === code.toLowerCase()
    );
  },
  getById(id: string): Product | undefined {
    return this.getAll().find(p => p.id === id);
  },
  add(product: Omit<Product, 'id' | 'created_at'>): Product {
    const list = this.getAll();
    const newProduct: Product = {
      ...product,
      id: `rd_${Date.now()}`,
      created_at: new Date().toISOString(),
    };
    write(KEYS.products, [...list, newProduct]);
    return newProduct;
  },
  update(id: string, data: Partial<Product>): boolean {
    const list = this.getAll();
    const idx = list.findIndex(p => p.id === id);
    if (idx === -1) return false;
    list[idx] = { ...list[idx], ...data };
    write(KEYS.products, list);
    return true;
  },
  delete(id: string): boolean {
    const list = this.getAll();
    const filtered = list.filter(p => p.id !== id);
    if (filtered.length === list.length) return false;
    write(KEYS.products, filtered);
    return true;
  },
};

// ─── Gallery ──────────────────────────────────────────────────────────────────
export const galleryStore = {
  getAll(): GalleryImage[] {
    return read<GalleryImage[]>(KEYS.gallery, SEED_GALLERY);
  },
  add(image: Omit<GalleryImage, 'id' | 'created_at'>): GalleryImage {
    const list = this.getAll();
    const newImage: GalleryImage = {
      ...image,
      id: `g_${Date.now()}`,
      created_at: new Date().toISOString(),
    };
    write(KEYS.gallery, [newImage, ...list]);
    return newImage;
  },
  delete(id: string): boolean {
    const list = this.getAll();
    const filtered = list.filter(i => i.id !== id);
    write(KEYS.gallery, filtered);
    return filtered.length < list.length;
  },
};

// ─── Settings ─────────────────────────────────────────────────────────────────
export const settingsStore = {
  get(): AppSettings {
    return read<AppSettings>(KEYS.settings, DEFAULT_SETTINGS);
  },
  save(settings: AppSettings): void {
    write(KEYS.settings, settings);
  },
};

// ─── Inquiries ────────────────────────────────────────────────────────────────
export const inquiriesStore = {
  getAll(): ContactInquiry[] {
    return read<ContactInquiry[]>(KEYS.inquiries, []);
  },
  add(inquiry: Omit<ContactInquiry, 'id' | 'created_at' | 'is_read'>): ContactInquiry {
    const list = this.getAll();
    const newInquiry: ContactInquiry = {
      ...inquiry,
      id: `inq_${Date.now()}`,
      is_read: false,
      created_at: new Date().toISOString(),
    };
    write(KEYS.inquiries, [newInquiry, ...list]);
    return newInquiry;
  },
  markRead(id: string): void {
    const list = this.getAll();
    const idx = list.findIndex(i => i.id === id);
    if (idx !== -1) {
      list[idx].is_read = true;
      write(KEYS.inquiries, list);
    }
  },
  delete(id: string): void {
    write(KEYS.inquiries, this.getAll().filter(i => i.id !== id));
  },
};

// ─── Admin Auth ───────────────────────────────────────────────────────────────
const ADMIN_EMAIL = 'admin@ramadoor.com';
const ADMIN_PASSWORD = 'Rama@2026#Admin';

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
