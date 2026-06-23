import Link from 'next/link'
import { createClient } from '@/lib/supabaseServer'
import DashboardTable from '@/components/DashboardTable'
import { Project } from '@/components/ProjectCard'
import { LayoutDashboard, ArrowLeft, Database, Code, Globe, User } from 'lucide-react'

export const revalidate = 0

export default async function DashboardPage() {
  let projects: Project[] = []
  let userEmail: string | null = null

  try {
    const supabase = await createClient()
    
    // Ambil data user
    const { data: { user } } = await supabase.auth.getUser()
    userEmail = user?.email || 'Admin'

    // Ambil data proyek
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false })

    if (!error && data) {
      projects = data as Project[]
    }
  } catch (err) {
    console.error('Gagal mengambil data untuk dashboard:', err)
  }

  // Statistik Ringkas
  const totalProjects = projects.length
  const uniqueTechs = Array.from(new Set(projects.flatMap((p) => p.tech_stack))).length

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 py-12 px-6">
      {/* Background Glow */}
      <div className="bg-gradient-glow top-0 left-0" />
      <div className="bg-gradient-glow bottom-0 right-0" />

      <div className="max-w-7xl mx-auto space-y-8 relative z-10">
        {/* Navigation / Header */}
        <div className="flex flex-col sm:flex-row gap-4 sm:items-center justify-between border-b border-slate-900 pb-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-primary/20 text-accent rounded-quad">
              <LayoutDashboard size={22} />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-extrabold text-white">Dashboard Admin</h1>
              <p className="text-slate-400 text-xs flex items-center gap-1.5 mt-0.5">
                <User size={12} className="text-accent" />
                <span>Masuk sebagai: {userEmail}</span>
              </p>
            </div>
          </div>
          
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2 border border-slate-800 hover:border-slate-700 bg-slate-900/60 hover:bg-slate-900 text-xs text-slate-300 hover:text-white rounded-quad transition-all w-fit"
          >
            <ArrowLeft size={14} />
            <span>Lihat Website Publik</span>
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {/* Stat 1 */}
          <div className="glass p-6 rounded-quad flex items-center gap-4">
            <div className="p-3 bg-primary/10 text-primary rounded-quad">
              <Database size={20} />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Total Proyek</p>
              <h3 className="text-2xl font-black text-white mt-1">{totalProjects}</h3>
            </div>
          </div>

          {/* Stat 2 */}
          <div className="glass p-6 rounded-quad flex items-center gap-4">
            <div className="p-3 bg-accent/10 text-accent rounded-quad">
              <Code size={20} />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Teknologi Digunakan</p>
              <h3 className="text-2xl font-black text-white mt-1">{uniqueTechs}</h3>
            </div>
          </div>

          {/* Stat 3 */}
          <div className="glass p-6 rounded-quad flex items-center gap-4">
            <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-quad">
              <Globe size={20} />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Status Serverless</p>
              <h3 className="text-sm font-bold text-emerald-400 mt-1.5 flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse" />
                <span>Supabase Online</span>
              </h3>
            </div>
          </div>
        </div>

        {/* Table list */}
        <DashboardTable initialProjects={projects} />
      </div>
    </div>
  )
}
