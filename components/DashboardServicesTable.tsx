'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabaseClient'
import { Edit, Trash2, Plus, Search, Loader2, Smartphone, Monitor, Target, Link as LinkIcon, Cpu, Network } from 'lucide-react'

export interface Service {
  id: string
  title: string
  subtitle: string
  description: string
  icon_name: string
  order_index: number
  created_at?: string
}

interface DashboardServicesTableProps {
  initialServices: Service[]
}

const IconRenderer = ({ name, size = 16, className }: { name: string; size?: number; className?: string }) => {
  switch (name.toLowerCase()) {
    case 'smartphone':
    case 'phone':
    case 'mobile':
      return <Smartphone size={size} className={className} />
    case 'monitor':
    case 'web':
    case 'website':
    case 'computer':
      return <Monitor size={size} className={className} />
    case 'target':
    case 'logika':
    case 'precision':
      return <Target size={size} className={className} />
    case 'link':
    case 'integrasi':
      return <LinkIcon size={size} className={className} />
    case 'cpu':
    case 'iot':
    case 'hardware':
      return <Cpu size={size} className={className} />
    case 'network':
    case 'jaringan':
    case 'server':
      return <Network size={size} className={className} />
    default:
      return <Cpu size={size} className={className} />
  }
}

export default function DashboardServicesTable({ initialServices }: DashboardServicesTableProps) {
  const [services, setServices] = useState<Service[]>(initialServices)
  const [searchQuery, setSearchQuery] = useState('')
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClient()

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Apakah Anda yakin ingin menghapus keahlian "${title}"?`)) {
      return
    }

    setDeletingId(id)
    try {
      const { error } = await supabase
        .from('services')
        .delete()
        .eq('id', id)

      if (error) {
        alert(`Gagal menghapus keahlian: ${error.message}`)
      } else {
        setServices(services.filter((s) => s.id !== id))
        router.refresh()
      }
    } catch (err) {
      const error = err as Error
      alert(`Terjadi kesalahan: ${error.message}`)
    } finally {
      setDeletingId(null)
    }
  }

  // Filter keahlian
  const filteredServices = services
    .filter((s) =>
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.subtitle.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => a.order_index - b.order_index)

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        {/* Search Bar */}
        <div className="relative w-full sm:max-w-xs">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Cari keahlian..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-900/60 border border-slate-800 focus:border-primary text-xs text-white rounded-quad outline-none transition-colors"
          />
        </div>

        {/* Add Service Button */}
        <Link
          href="/dashboard/services/create"
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 bg-gradient-to-r from-primary to-accent hover:from-primary-hover hover:to-accent-hover text-white font-bold rounded-quad text-xs tracking-wider transition-all cursor-pointer shadow-lg shadow-primary/20 hover:scale-105 active:scale-95"
        >
          <Plus size={16} />
          <span>Tambah Keahlian Baru</span>
        </Link>
      </div>

      {/* Services Table */}
      <div className="glass rounded-quad overflow-hidden border border-slate-850">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-850 bg-slate-900/40 text-[10px] uppercase font-bold tracking-wider text-slate-400">
                <th className="py-4 px-6 w-12 text-center">Urutan</th>
                <th className="py-4 px-6">Keahlian & Spesialisasi</th>
                <th className="py-4 px-6 hidden md:table-cell">Ikon</th>
                <th className="py-4 px-6 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-850/40 text-xs text-slate-300">
              {filteredServices.length > 0 ? (
                filteredServices.map((service) => (
                  <tr key={service.id} className="hover:bg-slate-900/20 transition-colors">
                    {/* Order Index */}
                    <td className="py-4 px-6 text-center font-bold text-accent">
                      {service.order_index}
                    </td>
                    {/* Title & Subtitle */}
                    <td className="py-4 px-6 font-semibold text-white">
                      <div>
                        <div className="font-bold text-white">{service.title}</div>
                        <div className="text-slate-400 text-[11px] font-normal mt-0.5">{service.subtitle}</div>
                      </div>
                    </td>
                    {/* Icon */}
                    <td className="py-4 px-6 hidden md:table-cell">
                      <div className="flex items-center gap-1.5 text-slate-400">
                        <IconRenderer name={service.icon_name} size={16} className="text-primary" />
                        <span className="font-mono text-[10px]">{service.icon_name}</span>
                      </div>
                    </td>
                    {/* Actions */}
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/dashboard/services/edit/${service.id}`}
                          className="p-2 bg-slate-900 border border-slate-800 text-slate-400 hover:text-white rounded-quad hover:border-slate-700 transition-all"
                          title="Edit Keahlian"
                        >
                          <Edit size={14} />
                        </Link>
                        <button
                          disabled={deletingId === service.id}
                          onClick={() => handleDelete(service.id, service.title)}
                          className="p-2 bg-slate-900 border border-rose-950/40 text-rose-400 hover:text-rose-300 hover:bg-rose-950/20 hover:border-rose-900 rounded-quad transition-all disabled:opacity-50 cursor-pointer"
                          title="Hapus Keahlian"
                        >
                          {deletingId === service.id ? (
                            <Loader2 size={14} className="animate-spin" />
                          ) : (
                            <Trash2 size={14} />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="py-12 text-center text-slate-500 text-xs">
                    Tidak ada data keahlian ditemukan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
