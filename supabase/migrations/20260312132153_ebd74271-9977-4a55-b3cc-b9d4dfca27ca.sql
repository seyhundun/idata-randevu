ALTER TABLE public.vfs_accounts 
ADD COLUMN IF NOT EXISTS imap_host text DEFAULT 'imap.gmail.com',
ADD COLUMN IF NOT EXISTS imap_password text DEFAULT NULL;