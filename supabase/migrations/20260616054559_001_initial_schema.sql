-- Products table
CREATE TABLE products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  design_code VARCHAR(50) NOT NULL UNIQUE,
  size VARCHAR(100),
  material VARCHAR(100),
  description TEXT,
  image_url TEXT,
  price_label VARCHAR(50) DEFAULT 'Call for Price',
  category VARCHAR(100) DEFAULT 'Teak Wood Door',
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Gallery table
CREATE TABLE gallery (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255),
  image_url TEXT NOT NULL,
  category VARCHAR(100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Testimonials table
CREATE TABLE testimonials (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_name VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  rating INTEGER DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  is_approved BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Settings table
CREATE TABLE settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  setting_key VARCHAR(100) NOT NULL UNIQUE,
  setting_value TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Contact inquiries table
CREATE TABLE contact_inquiries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  phone VARCHAR(50),
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on all tables
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_inquiries ENABLE ROW LEVEL SECURITY;

-- RLS Policies for products (public read, admin write)
CREATE POLICY "products_select_public" ON products FOR SELECT
  TO public USING (true);

CREATE POLICY "products_insert_admin" ON products FOR INSERT
  TO authenticated WITH CHECK (true);

CREATE POLICY "products_update_admin" ON products FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "products_delete_admin" ON products FOR DELETE
  TO authenticated USING (true);

-- RLS Policies for gallery (public read, admin write)
CREATE POLICY "gallery_select_public" ON gallery FOR SELECT
  TO public USING (true);

CREATE POLICY "gallery_insert_admin" ON gallery FOR INSERT
  TO authenticated WITH CHECK (true);

CREATE POLICY "gallery_update_admin" ON gallery FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "gallery_delete_admin" ON gallery FOR DELETE
  TO authenticated USING (true);

-- RLS Policies for testimonials (public read approved, admin all)
CREATE POLICY "testimonials_select_public" ON testimonials FOR SELECT
  TO public USING (is_approved = true);

CREATE POLICY "testimonials_select_admin" ON testimonials FOR SELECT
  TO authenticated USING (true);

CREATE POLICY "testimonials_insert_admin" ON testimonials FOR INSERT
  TO authenticated WITH CHECK (true);

CREATE POLICY "testimonials_update_admin" ON testimonials FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "testimonials_delete_admin" ON testimonials FOR DELETE
  TO authenticated USING (true);

-- RLS Policies for settings (public read, admin write)
CREATE POLICY "settings_select_public" ON settings FOR SELECT
  TO public USING (true);

CREATE POLICY "settings_insert_admin" ON settings FOR INSERT
  TO authenticated WITH CHECK (true);

CREATE POLICY "settings_update_admin" ON settings FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

-- RLS Policies for contact_inquiries (admin only)
CREATE POLICY "contact_inquiries_select_admin" ON contact_inquiries FOR SELECT
  TO authenticated USING (true);

CREATE POLICY "contact_inquiries_insert_public" ON contact_inquiries FOR INSERT
  TO public WITH CHECK (true);

CREATE POLICY "contact_inquiries_update_admin" ON contact_inquiries FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

-- Insert default settings
INSERT INTO settings (setting_key, setting_value) VALUES
  ('company_name', 'Rama Door'),
  ('mobile', '+91 9925867432'),
  ('whatsapp', '+91 8780418018'),
  ('email', 'balajientergimb@gmail.com'),
  ('address', 'Meghpar (Borichi), Anjar, Kutch, Gujarat - 370110'),
  ('working_hours', '9:00 AM to 8:00 PM'),
  ('instagram', ''),
  ('about_content', 'Rama Door is a premier teak wood door manufacturing company based in Kutch, Gujarat. Founded by Pratik Keshrani and Kewal Keshrani, we have been crafting exquisite wooden doors that combine traditional craftsmanship with modern design aesthetics. Our commitment to quality and attention to detail has made us a trusted name in the industry.'),
  ('about_mission', 'To deliver premium quality teak wood doors that enhance the beauty and security of homes and businesses.'),
  ('about_vision', 'To become the leading manufacturer of handcrafted wooden doors in India.'),
  ('hero_title', 'Premium Teak Wood Doors'),
  ('hero_subtitle', 'Handcrafted Excellence for Your Home'),
  ('hero_cta_primary', 'View Designs'),
  ('hero_cta_secondary', 'WhatsApp Inquiry');

-- Insert sample testimonials
INSERT INTO testimonials (customer_name, message, rating) VALUES
  ('Rajesh Patel', 'Exceptional quality and craftsmanship. The teak wood door we purchased has transformed the entrance of our home. Highly recommended!', 5),
  ('Priya Sharma', 'Professional service and beautiful designs. Rama Door delivered exactly what we were looking for. The attention to detail is remarkable.', 5),
  ('Amit Mehta', 'We have been using Rama Door products for our commercial projects. The quality is consistent and the team is very responsive.', 5);

-- Insert sample products (RD 01 to RD 31)
INSERT INTO products (name, design_code, size, material, description, is_featured, image_url) VALUES
  ('Royal Heritage Door', 'RD 01', '3.5 x 7 ft', 'Premium Teak Wood', 'An exquisite door featuring intricate traditional carvings and a rich mahogany finish. Perfect for grand entrances.', true, 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800'),
  ('Modern Elegance Door', 'RD 02', '3 x 7 ft', 'Teak Wood', 'Clean lines and minimalist design with a natural wood finish. Ideal for contemporary homes.', true, 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=800'),
  ('Classic Panel Door', 'RD 03', '3 x 7 ft', 'Teak Wood', 'Classic six-panel design with subtle detailing. Timeless elegance for any home.', true, 'https://images.pexels.com/photos/2092946/pexels-photo-2092946.jpeg?auto=compress&cs=tinysrgb&w=800'),
  ('Royal Arch Door', 'RD 04', '4 x 8 ft', 'Premium Teak Wood', 'Majestic arched doorway with ornate carvings and decorative glass panels.', false, 'https://images.pexels.com/photos/function='),
  ('Victorian Style Door', 'RD 05', '3.5 x 7.5 ft', 'Teak Wood', 'Victorian-inspired design with detailed moldings and elegant handles.', false, 'https://images.pexels.com/photos/208736/pexels-photo-208736.jpeg?auto=compress&cs=tinysrgb&w=800'),
  ('Contemporary Pivot Door', 'RD 06', '4 x 8 ft', 'Premium Teak Wood', 'Modern pivot door with sleek hardware and hidden hinges.', false, 'https://images.pexels.com/photos/function='),
  ('Traditional Carved Door', 'RD 07', '3 x 7 ft', 'Teak Wood', 'Hand-carved traditional motifs with a warm walnut finish.', false, 'https://images.pexels.com/photos/function='),
  ('Minimalist Frame Door', 'RD 08', '3 x 7 ft', 'Teak Wood', 'Simple yet sophisticated frame design with clean aesthetics.', false, 'https://images.pexels.com/photos/function='),
  ('Grand Entrance Door', 'RD 09', '5 x 9 ft', 'Premium Teak Wood', 'Impressive double door with intricate carvings and brass accents.', false, 'https://images.pexels.com/photos/function='),
  ('Colonial Style Door', 'RD 10', '3.5 x 7 ft', 'Teak Wood', 'Colonial-inspired design with raised panels and period hardware.', false, 'https://images.pexels.com/photos/function='),
  ('Art Deco Door', 'RD 11', '3 x 7 ft', 'Teak Wood', 'Art deco geometric patterns with elegant wood inlays.', false, 'https://images.pexels.com/photos/function='),
  ('Rustic Farmhouse Door', 'RD 12', '4 x 7.5 ft', 'Premium Teak Wood', 'Rustic charm with sliding barn-style hardware.', false, 'https://images.pexels.com/photos/function='),
  ('French Country Door', 'RD 13', '3 x 7 ft', 'Teak Wood', 'French provincial design with decorative glass inserts.', false, 'https://images.pexels.com/photos/function='),
  ('Craftsman Style Door', 'RD 14', '3.5 x 7 ft', 'Teak Wood', 'Craftsman era design with signature shelf dentil shelf.', false, 'https://images.pexels.com/photos/function='),
  ('Mediterranean Door', 'RD 15', '4 x 8 ft', 'Premium Teak Wood', 'Spanish Mediterranean design with arched top and iron details.', false, 'https://images.pexels.com/photos/function='),
  ('Modern Glass Panel Door', 'RD 16', '3 x 7 ft', 'Teak Wood', 'Contemporary design with frosted glass panels.', false, 'https://images.pexels.com/photos/function='),
  ('Industrial Style Door', 'RD 17', '4 x 8 ft', 'Teak Wood', 'Industrial metal and wood combination with steel accents.', false, 'https://images.pexels.com/photos/function='),
  ('Zen Garden Door', 'RD 18', '3 x 7 ft', 'Teak Wood', 'Japanese-inspired minimal design with natural finish.', false, 'https://images.pexels.com/photos/function='),
  ('Geometric Pattern Door', 'RD 19', '3.5 x 7.5 ft', 'Premium Teak Wood', 'Modern geometric woodwork with precision cuts.', false, 'https://images.pexels.com/photos/function='),
  ('Heritage Double Door', 'RD 20', '6 x 8 ft', 'Teak Wood', 'Grand double doors with carved panels and decorative handles.', false, 'https://images.pexels.com/photos/function='),
  ('Studio Flush Door', 'RD 21', '3 x 7 ft', 'Teak Wood', 'Clean flush design for modern interiors.', false, 'https://images.pexels.com/photos/function='),
  ('Luxe Entrance Door', 'RD 22', '4 x 8 ft', 'Premium Teak Wood', 'Luxury entrance with custom hardware and finishes.', false, 'https://images.pexels.com/photos/function='),
  ('Nordic Style Door', 'RD 23', '3 x 7 ft', 'Teak Wood', 'Scandinavian minimal design with light wood tone.', false, 'https://images.pexels.com/photos/function='),
  ('Carved Masterpiece Door', 'RD 24', '5 x 9 ft', 'Premium Teak Wood', 'Masterfully carved with intricate storytelling panels.', false, 'https://images.pexels.com/photos/function='),
  ('Brass Inlay Door', 'RD 25', '3.5 x 7.5 ft', 'Teak Wood', 'Traditional design with decorative brass inlays.', false, 'https://images.pexels.com/photos/function='),
  ('Temple Style Door', 'RD 26', '4 x 8 ft', 'Premium Teak Wood', 'Sacred temple-inspired design with spiritual motifs.', false, 'https://images.pexels.com/photos/function='),
  ('Urban Loft Door', 'RD 27', '3 x 7 ft', 'Teak Wood', 'Contemporary urban design with mixed materials.', false, 'https://images.pexels.com/photos/function='),
  ('Regal Heritage Door', 'RD 28', '5 x 9 ft', 'Premium Teak Wood', 'Royal heritage design with ornate detailing.', false, 'https://images.pexels.com/photos/function='),
  ('Tropical Teak Door', 'RD 29', '3.5 x 7 ft', 'Natural Teak Wood', 'Natural finish teak door with tropical appeal.', false, 'https://images.pexels.com/photos/function='),
  ('Palace Entrance Door', 'RD 30', '6 x 10 ft', 'Premium Teak Wood', 'Grand palace-style entrance with elaborate carvings.', false, 'https://images.pexels.com/photos/function='),
  ('Signature Collection', 'RD 31', 'Custom', 'Premium Teak Wood', 'Bespoke designs crafted to your specifications.', false, 'https://images.pexels.com/photos/function=')
ON CONFLICT (design_code) DO NOTHING;
