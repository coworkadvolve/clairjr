/*
  # Create Franchise Submissions Table

  1. New Tables
    - `franchise_submissions`
      - `id` (uuid, primary key) - Unique identifier for each submission
      - `name` (text) - Full name of the franchise applicant
      - `email` (text) - Email address of the applicant
      - `phone` (text) - Contact phone number
      - `city` (text) - City/location where franchise is desired
      - `business_experience` (text, optional) - Years or description of business experience
      - `investment_capacity` (text, optional) - Investment capacity range
      - `message` (text) - Additional details or message from applicant
      - `status` (text) - Application status (default: 'pending')
      - `created_at` (timestamptz) - Timestamp when submission was created
      - `updated_at` (timestamptz) - Timestamp when submission was last updated

  2. Security
    - Enable RLS on `franchise_submissions` table
    - Add policy for public users to insert their own submissions
    - Add policy for authenticated users to read all submissions (admin access)

  3. Notes
    - Public users can submit franchise applications
    - Only authenticated users (admins) can view submissions
    - Status field helps track application progress
*/

CREATE TABLE IF NOT EXISTS franchise_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  city text NOT NULL,
  business_experience text,
  investment_capacity text,
  message text NOT NULL,
  status text DEFAULT 'pending' NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

ALTER TABLE franchise_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit franchise application"
  ON franchise_submissions
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view all franchise submissions"
  ON franchise_submissions
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can update franchise submissions"
  ON franchise_submissions
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);