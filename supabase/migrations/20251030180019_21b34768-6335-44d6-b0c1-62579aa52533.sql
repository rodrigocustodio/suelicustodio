-- Add new columns to contact_messages table for autoestima landing page
ALTER TABLE contact_messages
ADD COLUMN IF NOT EXISTS whatsapp TEXT,
ADD COLUMN IF NOT EXISTS consent_contact BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS consent_privacy BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS source_page TEXT;

-- Add comment explaining the new fields
COMMENT ON COLUMN contact_messages.whatsapp IS 'Contact WhatsApp number in Brazilian format';
COMMENT ON COLUMN contact_messages.consent_contact IS 'User consent to receive contact via WhatsApp and email';
COMMENT ON COLUMN contact_messages.consent_privacy IS 'User acceptance of privacy policy';
COMMENT ON COLUMN contact_messages.source_page IS 'Landing page source: autoestima or portfolio';