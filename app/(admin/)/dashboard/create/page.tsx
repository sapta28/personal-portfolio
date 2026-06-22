'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabaseClient'
import { ArrowLeft, Loader2, Save, Upload, Link2 } from 'lucide-react'

export default function CreateProjectPage() {
  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [description, setDescription] = useState('')
  const [content, setContent] = useState('')
  const [techStackInput, setTechStackInput] = useState('')
  const [githubUrl, setGithubUrl] = useState('')
  const [liveUrl, setLiveUrl] = useState('')
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null)
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClient()

  // Generate slug otomatis dari judul
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    setTitle(val)
    // Convert ke slug: lowercase, replace non-alphanumeric dengan dash, hapus multiple dash
    const generatedSlug = val
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '')
    setSlug(generatedSlug)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setThumbnailFile(e.target.files[0])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrorMessage(null)

    try {
      if (!thumbnailFile) {
        throw new Error('Gambar thumbnail proyek wajib diunggah.')
      }

      // 1. Upload Thumbnail ke Supabase Storage
      const fileExt = thumbnailFile.name.split('.').pop()
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 7)}.${fileExt}`
      const filePath = `thumbnails/${fileName}`

      const { error: uploadError } = await supabase.storage
        .from('project-thumbnails')
        .upload(filePath, thumbnailFile, {
          cacheControl: '3600',
          upsert: false
        })

      if (uploadError) {
        throw new Error(`Gagal mengunggah thumbnail: ${uploadError.message}`)
      }

      // Dapatkan Public URL gambar
      const { data: { publicUrl } } = supabase.storage
        .from('project-thumbnails')
        .getPublicUrl(filePath)

      // 2. Format tech_stack
      const techStackArray = techStackInput
        .split(',')
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0)

      // 3. Simpan data proyek ke database
      const { error: insertError } = await supabase.from('projects').insert({
        title,
        slug,
        description,
        content,
        tech_stack: techStackArray,
        thumbnail_url: publicUrl,
        github_url: githubUrl || null,
        live_url: liveUrl || null
      })

      if (insertError) {
        throw insertError
      }

      router.refresh()
      router.push('/dashboard')
    } catch (err) {
      const error = err as Error
      setErrorMessage(error.message || 'Gagal menyimpan proyek. Hubungkan Supabase dengan benar.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 py-12 px-6">
      <div className="max-w-3xl mx-auto space-y-8 relative z-10">
        
        {/* Navigation / Header */}
        <div className="flex items-center justify-between border-b border-slate-900 pb-6">
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              className="p-2 border border-slate-800 hover:border-slate-700 bg-slate-900/60 hover:bg-slate-900 text-slate-400 hover:text-white rounded-quad transition-all"
            >
              <ArrowLeft size={16} />
            </Link>
            <div>
              <h1 className="text-xl md:text-2xl font-extrabold text-white">Tambah Proyek Baru</h1>
              <p className="text-slate-400 text-xs mt-0.5">Lengkapi form untuk merilis studi kasus ke publik.</p>
            </div>
          </div>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="p-4 bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs rounded-quad text-center">
            {errorMessage}
          </div>
        )}

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="glass p-8 rounded-quad space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Title */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 block">Judul Proyek</label>
              <input
                type="text"
                required
                value={title}
                onChange={handleTitleChange}
                placeholder="cth: Sistem Monitoring Energi PLTS"
                className="w-full px-4 py-3 bg-slate-900/60 border border-slate-800 focus:border-primary text-xs text-white rounded-quad outline-none transition-colors"
              />
            </div>

            {/* Slug */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 block">Slug URL (Auto-Generated)</label>
              <input
                type="text"
                required
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="sistem-monitoring-energi-plts"
                className="w-full px-4 py-3 bg-slate-900/60 border border-slate-800 focus:border-primary text-xs text-slate-400 font-mono rounded-quad outline-none transition-colors"
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 block">Deskripsi Singkat (Ringkasan)</label>
            <textarea
              required
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Deskripsi singkat yang akan tampil di halaman daftar proyek..."
              className="w-full px-4 py-3 bg-slate-900/60 border border-slate-800 focus:border-primary text-xs text-white rounded-quad outline-none transition-colors resize-none"
            />
          </div>

          {/* Markdown Content */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 block">Materi Studi Kasus (Markdown)</label>
            <span className="text-[10px] text-slate-500 block">Format didukung: ### Judul, - List Item, **Teks Tebal**</span>
            <textarea
              required
              rows={8}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="### Studi Kasus: Judul Proyek&#10;&#10;Tulislah analisis teknis lengkap di sini..."
              className="w-full px-4 py-3 bg-slate-900/60 border border-slate-800 focus:border-primary text-xs text-white rounded-quad outline-none transition-colors font-mono"
            />
          </div>

          {/* Tech Stack */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 block">Teknologi / Tag (Pisahkan dengan koma)</label>
            <input
              type="text"
              required
              value={techStackInput}
              onChange={(e) => setTechStackInput(e.target.value)}
              placeholder="cth: Next.js, Supabase, ESP32, MQTT"
              className="w-full px-4 py-3 bg-slate-900/60 border border-slate-800 focus:border-primary text-xs text-white rounded-quad outline-none transition-colors"
            />
          </div>

          {/* Thumbnail Image Upload */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 block">Gambar Thumbnail Proyek</label>
            <div className="border border-dashed border-slate-800 hover:border-primary rounded-quad p-6 flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors relative bg-slate-900/20">
              <input
                type="file"
                accept="image/*"
                required
                onChange={handleFileChange}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
              <Upload size={24} className="text-slate-500" />
              <span className="text-xs text-slate-400">
                {thumbnailFile ? thumbnailFile.name : 'Klik untuk memilih atau seret gambar ke sini'}
              </span>
              <span className="text-[10px] text-slate-500">Maksimal resolusi: 1920x1080 (PNG, JPG, WebP)</span>
            </div>
          </div>

          {/* URL Links */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Github URL */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 block">Tautan GitHub (Opsional)</label>
              <div className="relative">
                <Link2 size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="url"
                  value={githubUrl}
                  onChange={(e) => setGithubUrl(e.target.value)}
                  placeholder="https://github.com/akun/repo"
                  className="w-full pl-9 pr-4 py-3 bg-slate-900/60 border border-slate-800 focus:border-primary text-xs text-white rounded-quad outline-none transition-colors"
                />
              </div>
            </div>

            {/* Live URL */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 block">Tautan Demo / Live (Opsional)</label>
              <div className="relative">
                <Link2 size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="url"
                  value={liveUrl}
                  onChange={(e) => setLiveUrl(e.target.value)}
                  placeholder="https://demo.domain.com"
                  className="w-full pl-9 pr-4 py-3 bg-slate-900/60 border border-slate-800 focus:border-primary text-xs text-white rounded-quad outline-none transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Buttons Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t border-slate-900/60">
            <Link
              href="/dashboard"
              className="px-6 py-3 bg-slate-900 border border-slate-800 hover:border-slate-700 text-xs text-slate-300 hover:text-white rounded-quad font-bold transition-all text-center"
            >
              Batal
            </Link>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center justify-center gap-2 px-8 py-3 bg-gradient-to-r from-primary to-accent hover:from-primary-hover hover:to-accent-hover text-white font-bold rounded-quad text-xs tracking-wider transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-primary/20 cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={14} className="animate-spin" />
                  <span>Menyimpan...</span>
                </>
              ) : (
                <>
                  <Save size={14} />
                  <span>Simpan Proyek</span>
                </>
              )}
            </button>
          </div>

        </form>
      </div>
    </div>
  )
}
