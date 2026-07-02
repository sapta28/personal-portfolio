'use client'

import React, { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabaseClient'
import { ArrowLeft, Loader2, Save, AlertTriangle } from 'lucide-react'

export default function EditServicePage() {
  const params = useParams()
  const id = params?.id as string
  const router = useRouter()
  const supabase = createClient()

  // Form states
  const [title, setTitle] = useState('')
  const [subtitle, setSubtitle] = useState('')
  const [description, setDescription] = useState('')
  const [iconName, setIconName] = useState('smartphone')
  const [orderIndex, setOrderIndex] = useState(1)

  // App states
  const [isFetching, setIsFetching] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  // Fetch service details
  useEffect(() => {
    const fetchService = async () => {
      if (!id) return
      try {
        const { data, error } = await supabase
          .from('services')
          .select('*')
          .eq('id', id)
          .single()

        if (error) throw error

        if (data) {
          setTitle(data.title)
          setSubtitle(data.subtitle)
          setDescription(data.description)
          setIconName(data.icon_name)
          setOrderIndex(data.order_index)
        }
      } catch (err) {
        const error = err as Error
        setErrorMessage(error.message || 'Gagal mengambil data keahlian.')
      } finally {
        setIsFetching(false)
      }
    }

    fetchService()
  }, [id, supabase])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrorMessage(null)

    try {
      const { error } = await supabase
        .from('services')
        .update({
          title,
          subtitle,
          description,
          icon_name: iconName,
          order_index: Number(orderIndex)
        })
        .eq('id', id)

      if (error) {
        throw error
      }

      router.refresh()
      router.push('/dashboard')
    } catch (err) {
      const error = err as Error
      setErrorMessage(error.message || 'Gagal memperbarui keahlian.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isFetching) {
    return (
      <div className="min-h-screen bg-[#090d16] text-slate-100 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 size={32} className="text-accent animate-spin" />
          <p className="text-slate-400 text-xs">Memuat detail keahlian...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 py-12 px-6">
      <div className="max-w-2xl mx-auto space-y-8 relative z-10">
        
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
              <h1 className="text-xl md:text-2xl font-extrabold text-white">Edit Keahlian</h1>
              <p className="text-slate-400 text-xs mt-0.5">Perbarui informasi keahlian/spesialisasi.</p>
            </div>
          </div>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="p-4 bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs rounded-quad text-center flex items-center justify-center gap-2">
            <AlertTriangle size={16} />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="glass p-8 rounded-quad space-y-6">
          
          {/* Title */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 block">Nama Keahlian / Spesialisasi</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="cth: Pengembangan Aplikasi Mobile"
              className="w-full px-4 py-3 bg-slate-900/60 border border-slate-800 focus:border-primary text-xs text-white rounded-quad outline-none transition-colors"
            />
          </div>

          {/* Subtitle */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 block">Sub-judul / Tagline Singkat</label>
            <input
              type="text"
              required
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              placeholder="cth: Merancang pengalaman pengguna yang nyaman di dalam genggaman."
              className="w-full px-4 py-3 bg-slate-900/60 border border-slate-800 focus:border-primary text-xs text-white rounded-quad outline-none transition-colors"
            />
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 block">Deskripsi Detail</label>
            <textarea
              required
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Tulis penjelasan mengenai apa yang Anda lakukan pada spesialisasi ini secara detail..."
              className="w-full px-4 py-3 bg-slate-900/60 border border-slate-800 focus:border-primary text-xs text-white rounded-quad outline-none transition-colors resize-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Icon Picker (Dropdown) */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 block">Pilihan Ikon Visual</label>
              <select
                value={iconName}
                onChange={(e) => setIconName(e.target.value)}
                className="w-full px-4 py-3 bg-slate-900/60 border border-slate-800 focus:border-primary text-xs text-white rounded-quad outline-none transition-colors"
              >
                <option value="smartphone">📱 Smartphone / Mobile</option>
                <option value="monitor">💻 Monitor / Web</option>
                <option value="target">🎯 Target / Sistem & Logika</option>
                <option value="link">🔗 Link / Integrasi Ekosistem</option>
                <option value="cpu">⚙️ CPU / Hardware & IoT</option>
                <option value="network">🌐 Network / Jaringan & Server</option>
              </select>
            </div>

            {/* Order Index */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 block">Nomor Urut (Urutan Tampil)</label>
              <input
                type="number"
                required
                min={1}
                value={orderIndex}
                onChange={(e) => setOrderIndex(Number(e.target.value))}
                placeholder="1"
                className="w-full px-4 py-3 bg-slate-900/60 border border-slate-800 focus:border-primary text-xs text-white rounded-quad outline-none transition-colors"
              />
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
                  <span>Simpan Perubahan</span>
                </>
              )}
            </button>
          </div>

        </form>
      </div>
    </div>
  )
}
