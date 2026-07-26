-- Contact Submissions Table
CREATE TABLE IF NOT EXISTS public.contact_submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT DEFAULT '',
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_contact_submissions_email ON public.contact_submissions(email);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at ON public.contact_submissions(created_at);

ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- Allow anyone (including guests) to submit contact forms
DROP POLICY IF EXISTS "anyone_can_insert_contact_submissions" ON public.contact_submissions;
CREATE POLICY "anyone_can_insert_contact_submissions"
ON public.contact_submissions
FOR INSERT
TO public
WITH CHECK (true);

-- Only authenticated users can view submissions
DROP POLICY IF EXISTS "authenticated_can_view_contact_submissions" ON public.contact_submissions;
CREATE POLICY "authenticated_can_view_contact_submissions"
ON public.contact_submissions
FOR SELECT
TO authenticated
USING (true);
