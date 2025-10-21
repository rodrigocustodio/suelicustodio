-- Drop the insecure authenticated read policy
DROP POLICY IF EXISTS "Allow authenticated read" ON contact_messages;

-- Comment explaining the security model
COMMENT ON TABLE contact_messages IS 'Contact form submissions. Public can insert. Only accessible via service role (Backend UI).';