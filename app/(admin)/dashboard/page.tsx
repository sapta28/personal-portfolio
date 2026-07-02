import Link from 'next/link'
import { createClient } from '@/lib/supabaseServer'
import DashboardView from '@/components/DashboardView'
import { Project } from '@/components/ProjectCard'
import { Service } from '@/components/DashboardServicesTable'
import { LayoutDashboard, ArrowLeft, User } from 'lucide-react'

export const revalidate = 0

export default async function DashboardPage() {
  let projects: Project[] = []
  let services: Service[] = []
  let userEmail: string | null = null

  try {
    const supabase = await createClient()
    
    // Ambil data user
    const { data: { user } } = await supabase.auth.getUser()
    userEmail = user?.email || 'Admin'

    // Ambil data proyek
    const { data: projectsData, error: projectsError } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false })

    if (!projectsError && projectsData) {
      projects = projectsData as Project[]
    }

    // Ambil data keahlian
    const { data: servicesData, error: servicesError } = await supabase
      .from('services')
      .select('*')
      .order('order_index', { ascending: true })

    if (!servicesError && servicesData) {
      services = servicesData as Service[]
    }
  } catch (err) {
    console.error('Gagal mengambil data untuk dashboard:', err)
  }

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

        {/* Unified Dashboard Tabbed View */}
        <DashboardView projects={projects} services={services} />
      </div>
    </div>
  )
}
