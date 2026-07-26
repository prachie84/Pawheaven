-- ============================================================
-- Pawheaven: Favorites Table Migration
-- ============================================================

-- 1. Create favorites table
CREATE TABLE IF NOT EXISTS public.pet_favorites (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    pet_id TEXT NOT NULL,
    pet_name TEXT NOT NULL,
    pet_breed TEXT NOT NULL DEFAULT '',
    pet_image TEXT NOT NULL DEFAULT '',
    pet_type TEXT NOT NULL DEFAULT '',
    pet_location TEXT NOT NULL DEFAULT '',
    pet_fee INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 2. Unique constraint: one favorite per user per pet
CREATE UNIQUE INDEX IF NOT EXISTS idx_pet_favorites_user_pet ON public.pet_favorites(user_id, pet_id);

-- 3. Indexes
CREATE INDEX IF NOT EXISTS idx_pet_favorites_user_id ON public.pet_favorites(user_id);
CREATE INDEX IF NOT EXISTS idx_pet_favorites_pet_id ON public.pet_favorites(pet_id);

-- 4. Enable RLS
ALTER TABLE public.pet_favorites ENABLE ROW LEVEL SECURITY;

-- 5. RLS Policies — users can only access their own favorites
DROP POLICY IF EXISTS "users_manage_own_pet_favorites" ON public.pet_favorites;
CREATE POLICY "users_manage_own_pet_favorites"
ON public.pet_favorites
FOR ALL
TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());
