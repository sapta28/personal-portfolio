-- ==========================================
-- 1. Tabel Projects
-- ==========================================

CREATE TABLE IF NOT EXISTS public.projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL,
  content TEXT NOT NULL,
  tech_stack TEXT[] NOT NULL DEFAULT '{}',
  thumbnail_url TEXT NOT NULL,
  github_url TEXT,
  live_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Mengaktifkan Row Level Security (RLS) pada tabel projects
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- Menghapus policy lama jika ada untuk mencegah konflik
DROP POLICY IF EXISTS "Allow public read access" ON public.projects;
DROP POLICY IF EXISTS "Allow admin write access" ON public.projects;

-- Policy agar semua orang (public) bisa membaca data
CREATE POLICY "Allow public read access" ON public.projects
  FOR SELECT USING (true);

-- Policy agar hanya user authenticated (admin) yang bisa melakukan modifikasi (CRUD)
CREATE POLICY "Allow admin write access" ON public.projects
  FOR ALL USING (auth.role() = 'authenticated');

-- ==========================================
-- 2. Supabase Storage Bucket & Policies
-- ==========================================

-- Pastikan bucket project-thumbnails dibuat
INSERT INTO storage.buckets (id, name, public)
VALUES ('project-thumbnails', 'project-thumbnails', true)
ON CONFLICT (id) DO NOTHING;

-- Kebijakan akses storage.objects
DROP POLICY IF EXISTS "Allow public thumbnail read" ON storage.objects;
DROP POLICY IF EXISTS "Allow admin thumbnail manage" ON storage.objects;

-- Policy agar semua orang (public) bisa mendownload/membaca gambar
CREATE POLICY "Allow public thumbnail read" ON storage.objects
  FOR SELECT USING (bucket_id = 'project-thumbnails');

-- Policy agar admin yang login bisa mengelola file di bucket (upload, update, delete)
CREATE POLICY "Allow admin thumbnail manage" ON storage.objects
  FOR ALL USING (
    bucket_id = 'project-thumbnails'
    AND auth.role() = 'authenticated'
  );
