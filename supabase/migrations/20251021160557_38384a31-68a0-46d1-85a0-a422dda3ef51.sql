-- Create contact_messages table
CREATE TABLE contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  message text NOT NULL,
  created_at timestamptz DEFAULT now(),
  read boolean DEFAULT false
);

-- Add index for better query performance
CREATE INDEX idx_contact_messages_created_at ON contact_messages(created_at DESC);
CREATE INDEX idx_contact_messages_read ON contact_messages(read);

-- Enable Row Level Security
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Policy: Allow anyone to insert (public form submissions)
CREATE POLICY "Allow public insert" ON contact_messages
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Policy: Only authenticated users can read (for admin access later)
CREATE POLICY "Allow authenticated read" ON contact_messages
  FOR SELECT
  TO authenticated
  USING (true);

-- Add helpful comment
COMMENT ON TABLE contact_messages IS 'Stores contact form submissions from the website';