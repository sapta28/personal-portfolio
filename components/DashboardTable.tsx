'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabaseClient'
import { Project } from '@/components/ProjectCard'
import { Edit, Trash2, ExternalLink, Plus, Search, Loader2 } from 'lucide-react'

interface DashboardTableProps {
  initialProjects: Project[]
}

export default function DashboardTable({ initialProjects }: DashboardTableProps) {
  const [projects, setProjects] = useState<Project[]>(initialProjects)
  const [searchQuery, setSearchQuery] = useState('')
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClient()

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Apakah Anda yakin ingin menghapus proyek "${title}"?`)) {
      return
    }

    setDeletingId(id)
    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id)

      if (error) {
        alert(`Gagal menghapus proyek: ${error.message}`)
      } else {
        setProjects(projects.filter((p) => p.id !== id))
        router.refresh()
      }
    } catch (err) {
      const error = err as Error
      alert(`Terjadi kesalahan: ${error.message}`)
    } finally {
      setDeletingId(null)
    }
  }

  const filteredProjects = projects.filter((p) =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.tech_stack.some((tech) => tech.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        {/* Search Bar */}
        <div className="relative w-full sm:max-w-xs">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Cari judul atau teknologi..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-900/60 border border-slate-800 focus:border-primary text-xs text-white rounded-quad outline-none transition-colors"
          />
        </div>

        {/* Add Project Button */}
        <Link
          href="/dashboard/create"
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 bg-gradient-to-r from-primary to-accent hover:from-primary-hover hover:to-accent-hover text-white font-bold rounded-quad text-xs tracking-wider transition-all cursor-pointer shadow-lg shadow-primary/20 hover:scale-105 active:scale-95"
        >
          <Plus size={16} />
          <span>Tambah Proyek Baru</span>
        </Link>
      </div>

      {/* Projects Table */}
      <div className="glass rounded-quad overflow-hidden border border-slate-850">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-850 bg-slate-900/40 text-[10px] uppercase font-bold tracking-wider text-slate-400">
                <th className="py-4 px-6">Judul Proyek</th>
                <th className="py-4 px-6 hidden md:table-cell">Slug</th>
                <th className="py-4 px-6 hidden sm:table-cell">Teknologi</th>
                <th className="py-4 px-6 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-850/40 text-xs text-slate-300">
              {filteredProjects.length > 0 ? (
                filteredProjects.map((project) => (
                  <tr key={project.id} className="hover:bg-slate-900/20 transition-colors">
                    {/* Title */}
                    <td className="py-4 px-6 font-semibold text-white">
                      <div className="flex items-center gap-2">
                        <span>{project.title}</span>
                        <Link
                          href={`/projects/${project.slug}`}
                          target="_blank"
                          className="text-slate-500 hover:text-accent transition-colors"
                        >
                          <ExternalLink size={14} />
                        </Link>
                      </div>
                    </td>
                    {/* Slug */}
                    <td className="py-4 px-6 hidden md:table-cell text-slate-400 font-mono">
                      {project.slug}
                    </td>
                    {/* Tech Stack */}
                    <td className="py-4 px-6 hidden sm:table-cell">
                      <div className="flex flex-wrap gap-1">
                        {project.tech_stack.slice(0, 3).map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-0.5 bg-slate-900 border border-slate-800 text-[10px] text-accent font-semibold rounded"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.tech_stack.length > 3 && (
                          <span className="text-[10px] text-slate-500 font-semibold px-1">
                            +{project.tech_stack.length - 3}
                          </span>
                        )}
                      </div>
                    </td>
                    {/* Actions */}
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/dashboard/edit/${project.id}`}
                          className="p-2 bg-slate-900 border border-slate-800 text-slate-400 hover:text-white rounded-quad hover:border-slate-700 transition-all"
                          title="Edit Proyek"
                        >
                          <Edit size={14} />
                        </Link>
                        <button
                          disabled={deletingId === project.id}
                          onClick={() => handleDelete(project.id, project.title)}
                          className="p-2 bg-slate-900 border border-rose-950/40 text-rose-400 hover:text-rose-300 hover:bg-rose-950/20 hover:border-rose-900 rounded-quad transition-all disabled:opacity-50 cursor-pointer"
                          title="Hapus Proyek"
                        >
                          {deletingId === project.id ? (
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
                    Tidak ada proyek ditemukan.
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
