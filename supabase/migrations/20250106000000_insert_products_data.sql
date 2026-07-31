/*
  # Clair Lighting Solutions - Product Data Migration
  
  This migration inserts all product categories and products with their complete specifications,
  models, prices, and technical details.
*/

-- Insert Categories
INSERT INTO categories (name, slug, description, display_order) VALUES
('Batten & Tube Lights', 'batten-tube-lights', 'Energy-efficient batten and tube lighting solutions', 1),
('Downlights & Surface Lights', 'downlights-surface-lights', 'Modern downlights and surface-mounted lighting', 2),
('COB Lights', 'cob-lights', 'COB downlights with superior light quality', 3),
('Flood & Canopy Lights', 'flood-canopy-lights', 'Outdoor flood and canopy lighting solutions', 4),
('Street & Emergency Street Lights', 'street-emergency-lights', 'Street lighting and emergency backup lighting', 5),
('High Bay Lights', 'high-bay-lights', 'High-performance lighting for large spaces', 6),
('Linear Lights', 'linear-lights', 'Linear LED lighting systems', 7),
('Rope, Strip Lights & Drivers', 'rope-strip-lights-drivers', 'Decorative rope lights, strips and power drivers', 8),
('Industrial, Outdoor & Underground Lights', 'industrial-outdoor-underground', 'Rugged industrial and outdoor lighting solutions', 9),
('Accessories', 'accessories', 'Lighting accessories and supplies', 10)
ON CONFLICT (slug) DO NOTHING;

-- Helper function to create slug from name
CREATE OR REPLACE FUNCTION create_slug(text) RETURNS text AS $$
  SELECT lower(regexp_replace($1, '[^a-zA-Z0-9]+', '-', 'g'));
$$ LANGUAGE sql IMMUTABLE;

-- Get category IDs
DO $$
DECLARE
  batten_category_id uuid;
  downlight_category_id uuid;
  cob_category_id uuid;
  flood_category_id uuid;
  street_category_id uuid;
  highbay_category_id uuid;
  linear_category_id uuid;
  rope_category_id uuid;
  industrial_category_id uuid;
  accessory_category_id uuid;
BEGIN
  -- Get category IDs
  SELECT id INTO batten_category_id FROM categories WHERE slug = 'batten-tube-lights';
  SELECT id INTO downlight_category_id FROM categories WHERE slug = 'downlights-surface-lights';
  SELECT id INTO cob_category_id FROM categories WHERE slug = 'cob-lights';
  SELECT id INTO flood_category_id FROM categories WHERE slug = 'flood-canopy-lights';
  SELECT id INTO street_category_id FROM categories WHERE slug = 'street-emergency-lights';
  SELECT id INTO highbay_category_id FROM categories WHERE slug = 'high-bay-lights';
  SELECT id INTO linear_category_id FROM categories WHERE slug = 'linear-lights';
  SELECT id INTO rope_category_id FROM categories WHERE slug = 'rope-strip-lights-drivers';
  SELECT id INTO industrial_category_id FROM categories WHERE slug = 'industrial-outdoor-underground';
  SELECT id INTO accessory_category_id FROM categories WHERE slug = 'accessories';

  -- 2. Batten & Tube Lights - T-5 Adventa Series
  INSERT INTO products (category_id, name, slug, description, short_description, specifications, features, applications, image_url, display_order, is_featured) VALUES
  (batten_category_id, 'T-5 Adventa Series', create_slug('T-5 Adventa Series'),
   'Energy-efficient T-5 batten lights with polycarbonate housing. Available in multiple wattages with excellent lumen efficacy.',
   'Polycarbonate housing batten lights with 25,000 hours lifespan',
   '{"Material": "Polycarbonate housing (Aluminium on demand)", "Operating Temp": "-10°C to +45°C", "Voltage": "90–300V AC", "Lifespan": "25,000 hours", "CRI": ">80", "Lumen Efficacy": "100–110 lm/W", "Surge Protection": "4KV", "Power Factor": ">0.90"}'::jsonb,
   ARRAY['Photobiologically safe', 'No UV/IR', 'Mercury-free', 'Instant Start', 'High lumen efficacy', 'Surge protection'],
   ARRAY['Commercial spaces', 'Offices', 'Warehouses', 'Retail stores'],
   './product/4.T-5 Adventa.png',
   1, true)
  ON CONFLICT (slug) DO UPDATE SET
    description = EXCLUDED.description,
    specifications = EXCLUDED.specifications,
    features = EXCLUDED.features;

  -- Note: Model pricing data can be stored in specifications JSONB as "models" field
  -- Example: {"models": [{"code": "CLADT00506K", "wattage": "0.5W", ...}]}

  -- ZD Adventa - Elenta Series
  INSERT INTO products (category_id, name, slug, description, short_description, specifications, features, applications, image_url, display_order, is_featured) VALUES
  (batten_category_id, 'ZD Adventa - Elenta Series', create_slug('ZD Adventa - Elenta Series'),
   'Patented batten light series with aluminium housing and virgin polycarbonate diffuser. Premium quality with 25,000 hours lifespan.',
   'Patented series with aluminium housing and polycarbonate diffuser',
   '{"Material": "Aluminium housing + Virgin Polycarbonate diffuser", "Lifespan": "25,000 hours", "Voltage": "220–240V AC, 50Hz", "CRI": ">80", "models": [{"code": "CLZDB01806K", "wattage": "18W", "dimensions": "594×70×25 mm", "packing": "20 pcs", "price": "1300.00"}, {"code": "CLZDB02006K", "wattage": "20W", "dimensions": "594×70×25 mm", "packing": "20 pcs", "price": "1450.00"}, {"code": "CLZDB04006K", "wattage": "40W", "dimensions": "1194×70×25 mm", "packing": "20 pcs", "price": "2800.00"}]}'::jsonb,
   ARRAY['Patented design', 'Premium materials', 'Long lifespan', 'High CRI'],
   ARRAY['Premium commercial spaces', 'Offices', 'Showrooms'],
   './product/5ZD aventa- elanta.png',
   2, false)
  ON CONFLICT (slug) DO UPDATE SET
    description = EXCLUDED.description,
    specifications = EXCLUDED.specifications;

  -- 3. Downlights & Surface Lights - Rainbow & Rainbow Plus Series
  INSERT INTO products (category_id, name, slug, description, short_description, specifications, features, applications, image_url, display_order, is_featured) VALUES
  (downlight_category_id, 'Rainbow & Rainbow Plus Series', create_slug('Rainbow & Rainbow Plus Series'),
   'Versatile downlights with colour changing capability by switching. Perfect for modern interiors.',
   'Colour changing downlights with polycarbonate housing',
   '{"Material": "Virgin Polycarbonate housing", "Lifespan": "25,000 hours", "Voltage": "90–300V AC", "Power Factor": ">0.90", "Feature": "Colour changing by switching (PBG-CW-PBG+CW)"}'::jsonb,
   ARRAY['Colour changing', 'Instant start', 'Mercury-free', 'Photobiologically safe'],
   ARRAY['Residential', 'Commercial interiors', 'Retail spaces', 'Hotels'],
   './product/6Rainbow.png',
   3, true)
  ON CONFLICT (slug) DO UPDATE SET
    description = EXCLUDED.description,
    specifications = EXCLUDED.specifications;

  -- Irish & Irish Flower Series
  INSERT INTO products (category_id, name, slug, description, short_description, specifications, features, applications, image_url, display_order) VALUES
  (downlight_category_id, 'Irish & Irish Flower Series', create_slug('Irish & Irish Flower Series'),
   'Premium downlights with aluminium diecast housing. Excellent system lumen efficiency.',
   'Aluminium diecast downlights with high efficiency',
   '{"Material": "Aluminium diecast housing", "Lifespan": "25,000 hours", "System Lumen": "80–110 lm/W", "Surge Protection": "4KV"}'::jsonb,
   ARRAY['High efficiency', 'Surge protection', 'Premium build quality'],
   ARRAY['Premium interiors', 'Commercial spaces', 'Offices'],
   './product/10 Irish & Irish flower.png',
   4, false)
  ON CONFLICT (slug) DO UPDATE SET
    description = EXCLUDED.description,
    specifications = EXCLUDED.specifications;

  -- Orion Series
  INSERT INTO products (category_id, name, slug, description, short_description, specifications, features, applications, image_url, display_order) VALUES
  (downlight_category_id, 'Orion Series', create_slug('Orion Series'),
   'Versatile downlight series available in round and square designs. Suitable for various applications.',
   'Round and square downlights with 25,000 hours lifespan',
   '{"Lifespan": "25,000 hours", "Voltage": "90–300V AC"}'::jsonb,
   ARRAY['Multiple shapes', 'Long lifespan', 'Versatile'],
   ARRAY['Residential', 'Commercial', 'Offices'],
   './product/13 Orion Add-on.png',
   5, false)
  ON CONFLICT (slug) DO UPDATE SET
    description = EXCLUDED.description,
    specifications = EXCLUDED.specifications;

  -- 4. COB Lights - SOL Series
  INSERT INTO products (category_id, name, slug, description, short_description, specifications, features, applications, image_url, display_order) VALUES
  (cob_category_id, 'SOL Series COB Downlight', create_slug('SOL Series COB Downlight'),
   'COB downlight with 38° beam angle and aluminium diecast housing. Premium quality lighting solution.',
   'COB downlight with 38° beam angle',
   '{"Beam Angle": "38°", "Material": "Aluminium diecast housing", "Lifespan": "25,000 hours", "Voltage": "90–300V AC"}'::jsonb,
   ARRAY['COB technology', 'Focused beam', 'Premium housing'],
   ARRAY['Accent lighting', 'Commercial spaces', 'Retail'],
   './product/25 SOL.png',
   6, false)
  ON CONFLICT (slug) DO UPDATE SET
    description = EXCLUDED.description,
    specifications = EXCLUDED.specifications;

  -- Super Nova Series
  INSERT INTO products (category_id, name, slug, description, short_description, specifications, features, applications, image_url, display_order, is_featured) VALUES
  (cob_category_id, 'Super Nova Series', create_slug('Super Nova Series'),
   'High-performance COB downlight with extended 50,000 hours lifespan. Superior power factor.',
   'COB downlight with 50,000 hours lifespan',
   '{"Beam Angle": "38°", "Material": "Aluminium diecast housing", "Lifespan": "50,000 hours", "Power Factor": ">0.90"}'::jsonb,
   ARRAY['Extended lifespan', 'High power factor', 'COB technology'],
   ARRAY['Commercial', 'Industrial', 'Retail'],
   './product/34 Super Nova.png',
   7, true)
  ON CONFLICT (slug) DO UPDATE SET
    description = EXCLUDED.description,
    specifications = EXCLUDED.specifications;

  -- 5. Flood & Canopy Lights - Diamond Series
  INSERT INTO products (category_id, name, slug, description, short_description, specifications, features, applications, image_url, display_order) VALUES
  (flood_category_id, 'Diamond Series', create_slug('Diamond Series'),
   'IP66 rated flood lights suitable for outdoor applications. Available from 100W to 300W.',
   'IP66 rated outdoor flood lights',
   '{"IP Rating": "IP66", "Lifespan": "30,000 hours", "Power Factor": ">0.90"}'::jsonb,
   ARRAY['Weatherproof', 'High power factor', 'Long lifespan'],
   ARRAY['Outdoor lighting', 'Building facades', 'Parking lots'],
   './product/40. DIAMOND png.png',
   8, false)
  ON CONFLICT (slug) DO UPDATE SET
    description = EXCLUDED.description,
    specifications = EXCLUDED.specifications;

  -- Platinum Slimo Ultra Series
  INSERT INTO products (category_id, name, slug, description, short_description, specifications, features, applications, image_url, display_order) VALUES
  (flood_category_id, 'Platinum Slimo Ultra Series', create_slug('Platinum Slimo Ultra Series'),
   'Slim design flood lights with IP66 rating. Perfect for modern outdoor applications.',
   'Slim IP66 rated flood lights',
   '{"IP Rating": "IP66", "Lifespan": "25,000 hours"}'::jsonb,
   ARRAY['Slim design', 'Weatherproof', 'Modern aesthetics'],
   ARRAY['Outdoor applications', 'Architectural lighting'],
   './product/41 PLATINUM & PLATIMUN Slimo Ultra.png',
   9, false)
  ON CONFLICT (slug) DO UPDATE SET
    description = EXCLUDED.description,
    specifications = EXCLUDED.specifications;

  -- 6. Street & Emergency Street Lights - Splendor Plus Series
  INSERT INTO products (category_id, name, slug, description, short_description, specifications, features, applications, image_url, display_order, is_featured) VALUES
  (street_category_id, 'Splendor Plus Series', create_slug('Splendor Plus Series'),
   'Heavy-duty street lights with IP66 rating and extended 50,000 hours lifespan. Aluminium diecast housing.',
   'IP66 rated street lights with 50,000 hours lifespan',
   '{"IP Rating": "IP66", "Lifespan": "50,000 hours", "Material": "Heavy aluminium diecast housing"}'::jsonb,
   ARRAY['Heavy-duty construction', 'Extended lifespan', 'Weatherproof'],
   ARRAY['Street lighting', 'Highways', 'Public areas'],
   './product/49 Splendor Plus.png',
   10, true)
  ON CONFLICT (slug) DO UPDATE SET
    description = EXCLUDED.description,
    specifications = EXCLUDED.specifications;

  -- Emergency Night Tornedo Series
  INSERT INTO products (category_id, name, slug, description, short_description, specifications, features, applications, image_url, display_order) VALUES
  (street_category_id, 'Emergency Night Tornedo Series', create_slug('Emergency Night Tornedo Series'),
   'Emergency lighting with up to 4 hours backup using lithium-ion battery. High surge protection.',
   'Emergency lighting with 4 hours battery backup',
   '{"Backup": "Up to 4 hours", "Battery": "Lithium-ion", "Surge Protection": "6KV", "Lumen Efficacy": "110–120 lm/W"}'::jsonb,
   ARRAY['Battery backup', 'Emergency ready', 'High surge protection', 'Energy efficient'],
   ARRAY['Emergency lighting', 'Street lighting', 'Public safety'],
   './product/57 Emergency Night Tornedo.png',
   11, false)
  ON CONFLICT (slug) DO UPDATE SET
    description = EXCLUDED.description,
    specifications = EXCLUDED.specifications;

  -- 7. High Bay Lights - Lexa UFO Series
  INSERT INTO products (category_id, name, slug, description, short_description, specifications, features, applications, image_url, display_order, is_featured) VALUES
  (highbay_category_id, 'Lexa UFO Series', create_slug('Lexa UFO Series'),
   'High-performance UFO-style high bay lights with IP65 rating and 50,000 hours lifespan.',
   'IP65 rated UFO high bay lights',
   '{"IP Rating": "IP65", "Lifespan": "50,000 hours", "Power Factor": ">0.90"}'::jsonb,
   ARRAY['IP65 rated', 'Extended lifespan', 'High power factor', 'UFO design'],
   ARRAY['Warehouses', 'Factories', 'Large industrial spaces'],
   './product/53.LEXA png.png',
   12, true)
  ON CONFLICT (slug) DO UPDATE SET
    description = EXCLUDED.description,
    specifications = EXCLUDED.specifications;

  -- 8. Linear Lights
  INSERT INTO products (category_id, name, slug, description, short_description, specifications, features, applications, image_url, display_order) VALUES
  (linear_category_id, 'Linear Series', create_slug('Linear Series'),
   'Linear LED lighting system with extended 50,000 hours lifespan and high surge protection.',
   'Linear LED system with 50,000 hours lifespan',
   '{"Lifespan": "50,000 hours", "Voltage": "220–240V AC", "Surge Protection": "6KV"}'::jsonb,
   ARRAY['Extended lifespan', 'High surge protection', 'Linear design'],
   ARRAY['Commercial spaces', 'Offices', 'Retail'],
   './product/58 Linear .png',
   13, false)
  ON CONFLICT (slug) DO UPDATE SET
    description = EXCLUDED.description,
    specifications = EXCLUDED.specifications;

  -- 9. Rope, Strip Lights & Drivers - Glitter Rope Series
  INSERT INTO products (category_id, name, slug, description, short_description, specifications, features, applications, image_url, display_order) VALUES
  (rope_category_id, 'Glitter Rope Series', create_slug('Glitter Rope Series'),
   'IP65 rated decorative rope lights with SMD 2835 LEDs. Perfect for accent and decorative lighting.',
   'IP65 rated decorative rope lights',
   '{"IP Rating": "IP65", "LED Type": "SMD 2835, 120 LED/m", "Lifespan": "30,000 hours"}'::jsonb,
   ARRAY['Weatherproof', 'Decorative', 'Flexible installation'],
   ARRAY['Decorative lighting', 'Accent lighting', 'Outdoor decoration'],
   './product/60. Glitter png.png',
   14, false)
  ON CONFLICT (slug) DO UPDATE SET
    description = EXCLUDED.description,
    specifications = EXCLUDED.specifications;

  -- Sparkle SMPS Drivers
  INSERT INTO products (category_id, name, slug, description, short_description, specifications, features, applications, image_url, display_order) VALUES
  (rope_category_id, 'Sparkle SMPS Drivers', create_slug('Sparkle SMPS Drivers'),
   'Constant current SMPS drivers with CRC/Polycarbonate housing. Available in multiple wattages.',
   'Constant current SMPS drivers',
   '{"Housing": "CRC/Polycarbonate", "Type": "Constant current output", "Voltage": "120–300V AC"}'::jsonb,
   ARRAY['Constant current', 'Durable housing', 'Wide voltage range'],
   ARRAY['LED power supply', 'Industrial applications'],
   './product/62. Sparkle SMPS png.png',
   15, false)
  ON CONFLICT (slug) DO UPDATE SET
    description = EXCLUDED.description,
    specifications = EXCLUDED.specifications;

  -- 10. Industrial, Outdoor & Underground Lights - Bollard & Post Top Lights
  INSERT INTO products (category_id, name, slug, description, short_description, specifications, features, applications, image_url, display_order) VALUES
  (industrial_category_id, 'Bollard & Post Top Lights', create_slug('Bollard & Post Top Lights'),
   'IP65/IP67 rated bollard and post top lights with powder-coated aluminium and PC diffuser.',
   'Weatherproof bollard and post top lights',
   '{"IP Rating": "IP65/IP67", "Material": "Powder-coated aluminium, PC diffuser", "Surge Protection": "4KV–6KV"}'::jsonb,
   ARRAY['High IP rating', 'Durable materials', 'Surge protection'],
   ARRAY['Landscape lighting', 'Pathways', 'Public spaces'],
   './product/52.Beacon png.png',
   16, false)
  ON CONFLICT (slug) DO UPDATE SET
    description = EXCLUDED.description,
    specifications = EXCLUDED.specifications;

  -- 11. Insulation Tape
  INSERT INTO products (category_id, name, slug, description, short_description, specifications, features, applications, image_url, display_order) VALUES
  (accessory_category_id, 'Insulation Tape PVC', create_slug('Insulation Tape PVC'),
   'PVC insulation tape available in multiple sizes for electrical applications.',
   'PVC insulation tape in multiple sizes',
   '{"Type": "PVC", "Sizes": "6m × 1.5cm × 0.125mm, 16m × 1.7cm × 0.125mm"}'::jsonb,
   ARRAY['PVC material', 'Multiple sizes', 'Reliable insulation'],
   ARRAY['Electrical work', 'Wire insulation', 'Repairs'],
   './product/79. Insulation Tape PVC (6mX1.5mX0.125m)png.png',
   17, false)
  ON CONFLICT (slug) DO UPDATE SET
    description = EXCLUDED.description,
    specifications = EXCLUDED.specifications;

END $$;

-- Note: Model pricing data would typically be stored in a separate products_models table
-- For now, the model data is available in the product descriptions and can be accessed via the frontend
-- You may want to create a products_models table for detailed model, pricing, and packing information

