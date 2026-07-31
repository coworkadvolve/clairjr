/*
  # Clair Lighting Solutions - Initial Database Schema

  ## Overview
  This migration creates the complete database schema for the Clair Lighting Solutions website,
  including product catalog, categories, testimonials, and contact management.

  ## New Tables

  ### 1. `categories`
  Product categorization table for organizing lighting solutions.
  - `id` (uuid, primary key) - Unique category identifier
  - `name` (text) - Category name (e.g., "Commercial Light", "Industrial Light")
  - `slug` (text, unique) - URL-friendly identifier
  - `description` (text) - Category description
  - `image_url` (text, nullable) - Category banner image
  - `display_order` (integer) - Sort order for display
  - `created_at` (timestamptz) - Record creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### 2. `products`
  Comprehensive product catalog with specifications and media.
  - `id` (uuid, primary key) - Unique product identifier
  - `category_id` (uuid, foreign key) - Reference to categories table
  - `name` (text) - Product name
  - `slug` (text, unique) - URL-friendly identifier
  - `description` (text) - Product description
  - `short_description` (text, nullable) - Brief summary for cards
  - `specifications` (jsonb) - Technical specifications as JSON
  - `features` (text array) - Key features list
  - `applications` (text array) - Suitable applications
  - `image_url` (text) - Primary product image
  - `gallery_images` (text array, nullable) - Additional product images
  - `datasheet_url` (text, nullable) - Link to downloadable datasheet
  - `is_featured` (boolean) - Featured product flag
  - `display_order` (integer) - Sort order within category
  - `created_at` (timestamptz) - Record creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### 3. `testimonials`
  Client testimonials and reviews.
  - `id` (uuid, primary key) - Unique testimonial identifier
  - `client_name` (text) - Client or company name
  - `client_title` (text, nullable) - Client job title
  - `client_company` (text, nullable) - Company name
  - `content` (text) - Testimonial content
  - `rating` (integer, nullable) - Rating out of 5
  - `logo_url` (text, nullable) - Client company logo
  - `is_featured` (boolean) - Display on homepage
  - `display_order` (integer) - Sort order for display
  - `created_at` (timestamptz) - Record creation timestamp

  ### 4. `contact_submissions`
  Contact form submissions and inquiries.
  - `id` (uuid, primary key) - Unique submission identifier
  - `name` (text) - Contact name
  - `email` (text) - Contact email
  - `phone` (text, nullable) - Contact phone number
  - `company` (text, nullable) - Company name
  - `inquiry_type` (text) - Type of inquiry (General, Product, Quote, Support)
  - `message` (text) - Inquiry message
  - `product_id` (uuid, nullable, foreign key) - Related product if applicable
  - `status` (text) - Processing status (New, In Progress, Resolved)
  - `created_at` (timestamptz) - Submission timestamp

  ## Security
  - Enable RLS on all tables
  - Public read access for categories, products, and testimonials
  - No public write access to any tables (admin-only through service role)
  - Contact submissions are write-only for anonymous users

  ## Notes
  - All tables use UUID primary keys for security and scalability
  - Timestamps track record lifecycle
  - JSONB used for flexible specifications storage
  - Arrays used for multi-value fields (features, applications, images)
  - Proper indexes will be added for frequently queried fields
*/

-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text NOT NULL DEFAULT '',
  image_url text,
  display_order integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id uuid REFERENCES categories(id) ON DELETE SET NULL,
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text NOT NULL DEFAULT '',
  short_description text,
  specifications jsonb DEFAULT '{}'::jsonb,
  features text[] DEFAULT ARRAY[]::text[],
  applications text[] DEFAULT ARRAY[]::text[],
  image_url text NOT NULL,
  gallery_images text[] DEFAULT ARRAY[]::text[],
  datasheet_url text,
  is_featured boolean DEFAULT false,
  display_order integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_name text NOT NULL,
  client_title text,
  client_company text,
  content text NOT NULL,
  rating integer CHECK (rating >= 1 AND rating <= 5),
  logo_url text,
  is_featured boolean DEFAULT false,
  display_order integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create contact_submissions table
CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  company text,
  inquiry_type text NOT NULL DEFAULT 'General',
  message text NOT NULL,
  product_id uuid REFERENCES products(id) ON DELETE SET NULL,
  status text NOT NULL DEFAULT 'New',
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for categories (public read)
CREATE POLICY "Anyone can view categories"
  ON categories FOR SELECT
  TO anon, authenticated
  USING (true);

-- RLS Policies for products (public read)
CREATE POLICY "Anyone can view products"
  ON products FOR SELECT
  TO anon, authenticated
  USING (true);

-- RLS Policies for testimonials (public read, only featured)
CREATE POLICY "Anyone can view featured testimonials"
  ON testimonials FOR SELECT
  TO anon, authenticated
  USING (is_featured = true);

-- RLS Policies for contact_submissions (insert only for public)
CREATE POLICY "Anyone can submit contact forms"
  ON contact_submissions FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_products_category_id ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_featured ON products(is_featured) WHERE is_featured = true;
CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);
CREATE INDEX IF NOT EXISTS idx_categories_slug ON categories(slug);
CREATE INDEX IF NOT EXISTS idx_testimonials_featured ON testimonials(is_featured) WHERE is_featured = true;
CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at ON contact_submissions(created_at DESC);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Add triggers for updated_at columns
DROP TRIGGER IF EXISTS update_categories_updated_at ON categories;
CREATE TRIGGER update_categories_updated_at
  BEFORE UPDATE ON categories
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_products_updated_at ON products;
CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();