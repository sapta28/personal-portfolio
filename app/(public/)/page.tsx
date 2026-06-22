import Link from 'next/link'
import { createClient } from '@/lib/supabaseServer'
import ProjectCard, { Project } from '@/components/ProjectCard'
import { ArrowRight, Code, Cpu, Globe, Rocket, ArrowUpRight } from 'lucide-react'

// Menghindari caching agresif agar data baru dari dashboard langsung muncul
export const revalidate = 0

// Mock projects jika database belum siap / kosong
const MOCK_PROJECTS: Project[] = [
  {
    id: 'mock-1',
    title: 'Sistem Presensi Biometrik Kiosk IoT',
    slug: 'kiosk-biometrik-iot',
    description: 'Sistem presensi terintegrasi menggunakan fingerprint scan dan kamera biometrik terhubung ke dashboard admin real-time melalui MQTT broker.',
    content: '### Studi Kasus: Sistem Presensi Biometrik Kiosk\n\nProyek ini dikembangkan untuk memecahkan masalah kecurangan presensi di lingkungan industri. Menggunakan mikrokontroler ESP32 dan modul sidik jari biometrik.\n\n#### Arsitektur Teknis\n- **Hardware:** ESP32, Sensor Sidik Jari AS608, OV2640 Cam\n- **Protokol:** MQTT (Message Queuing Telemetry Transport) untuk efisiensi transfer data\n- **Backend:** Laravel API & Supabase Real-time database\n- **Frontend:** Next.js Dashboard untuk monitoring kehadiran pegawai secara live.',
    tech_stack: ['Next.js', 'Supabase', 'ESP32', 'MQTT', 'Laravel'],
    thumbnail_url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=60',
    created_at: new Date().toISOString()
  },
  {
    id: 'mock-2',
    title: 'Sistem Otomasi Irigasi Cerdas PLTS',
    slug: 'otomasi-irigasi-plts',
    description: 'Pemisah pompa air otomatis berbasis Pembangkit Listrik Tenaga Surya (PLTS) dan PLN dengan kalkulator selisih konsumsi energi.',
    content: '### Studi Kasus: Irigasi Cerdas PLTS\n\nMenyeimbangkan kebutuhan energi pertanian dengan memisahkan suplai daya dari panel surya dan listrik konvensional secara pintar.\n\n#### Solusi\nSistem memprioritaskan penggunaan daya PLTS di siang hari dan beralih ke PLN saat baterai di bawah 20%.',
    tech_stack: ['Next.js', 'Arduino', 'PLTS Control', 'Node-RED', 'PostgreSQL'],
    thumbnail_url: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&auto=format&fit=crop&q=60',
    created_at: new Date().toISOString()
  },
  {
    id: 'mock-3',
    title: 'Dashboard E-Commerce Premium dengan SSR',
    slug: 'dashboard-ecommerce-ssr',
    description: 'Dashboard retail analitik canggih dengan rendering sisi server (SSR) Next.js yang menampilkan analisis penjualan, stok produk, dan log transaksi.',
    content: '### Studi Kasus: Dashboard E-Commerce\n\nMengembangkan visualisasi data performa penjualan ritel berskala besar dengan loading instan.',
    tech_stack: ['Next.js', 'Tailwind CSS', 'Supabase', 'Chart.js'],
    thumbnail_url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=60',
    created_at: new Date().toISOString()
  }
]

export default async function HomePage() {
  let featuredProjects: Project[] = []
  
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(3)
      
    if (!error && data && data.length > 0) {
      featuredProjects = data as Project[]
    } else {
      featuredProjects = MOCK_PROJECTS
    }
  } catch (err) {
    console.error('Gagal mengambil data dari Supabase:', err)
    featuredProjects = MOCK_PROJECTS
  }

  return (
    <div className="space-y-24 md:space-y-32">
      {/* 1. Hero Section */}
      <section className="max-w-7xl mx-auto px-6 relative flex flex-col items-center justify-center text-center pt-8 md:pt-16 pb-12">
        <div className="absolute top-0 opacity-40 select-none pointer-events-none">
          <div className="w-[300px] h-[300px] bg-primary/20 blur-[100px] rounded-full animate-pulse-slow" />
        </div>
        
        {/* Badge Status */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 glass rounded-full text-xs font-semibold text-accent mb-8 animate-bounce">
          <span className="w-2.5 h-2.5 bg-success rounded-full animate-ping" />
          <span>Tersedia untuk Proyek & Kolaborasi</span>
        </div>

        {/* Main Title */}
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight text-white max-w-4xl leading-[1.1] mb-8">
          Membangun Integrasi{' '}
          <span className="bg-gradient-to-r from-primary via-purple-400 to-accent bg-clip-text text-transparent">
            Sistem IoT
          </span>{' '}
          & Aplikasi Web Modern
        </h1>

        {/* Subtitle */}
        <p className="text-slate-400 text-sm sm:text-base md:text-lg max-w-2xl leading-relaxed mb-10">
          Saya adalah Fullstack IoT Developer & Web Architect. Berfokus pada penyelesaian tantangan teknis kompleks,
          mulai dari mikrokontroler hingga antarmuka berbasis web berkecepatan tinggi yang ramah SEO.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md">
          <Link
            href="/projects"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-accent hover:from-primary-hover hover:to-accent-hover text-white font-bold rounded-quad shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all text-sm"
          >
            <span>Jelajahi Proyek</span>
            <ArrowRight size={16} />
          </Link>
          <Link
            href="/about"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 glass hover:bg-slate-900/60 text-slate-300 hover:text-white font-bold rounded-quad hover:scale-105 active:scale-95 transition-all text-sm"
          >
            <span>Tentang Saya</span>
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </section>

      {/* 2. Keahlian Utama (Expertise) */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-4xl font-extrabold text-white mb-4">
            Spesialisasi & Fokus Teknis
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm max-w-xl mx-auto">
            Kombinasi keahlian di dunia perangkat keras dan komputasi awan modern.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="glass p-8 rounded-quad hover:border-primary/40 transition-all duration-300">
            <div className="p-3 bg-primary/10 text-primary w-fit rounded-quad mb-6">
              <Cpu size={24} />
            </div>
            <h3 className="text-lg font-bold text-white mb-3">IoT & Otomasi Hardware</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              Pengembangan firmware mikro (ESP32/Arduino), protokol komunikasi IoT (MQTT, HTTP API), sensor biometrik, 
              dan integrasi kelistrikan (sistem hibrida PLN/PLTS).
            </p>
          </div>

          {/* Card 2 */}
          <div className="glass p-8 rounded-quad hover:border-accent/40 transition-all duration-300">
            <div className="p-3 bg-accent/10 text-accent w-fit rounded-quad mb-6">
              <Globe size={24} />
            </div>
            <h3 className="text-lg font-bold text-white mb-3">Modern Web Architecture</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              Pembuatan aplikasi web performa tinggi menggunakan Next.js App Router, optimasi rendering (SSR/ISR), 
              dan manajemen basis data modern berskala besar.
            </p>
          </div>

          {/* Card 3 */}
          <div className="glass p-8 rounded-quad hover:border-purple-400/40 transition-all duration-300">
            <div className="p-3 bg-purple-500/10 text-purple-400 w-fit rounded-quad mb-6">
              <Code size={24} />
            </div>
            <h3 className="text-lg font-bold text-white mb-3">Fullstack Database & API</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              Manajemen state, otentikasi aman, pemetaan relasi data, Row Level Security (RLS) di Supabase, 
              serta integrasi backend serverless.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Proyek Pilihan (Featured Projects) */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 text-accent font-bold text-xs uppercase tracking-wider mb-2">
              <Rocket size={14} />
              <span>Showcase</span>
            </div>
            <h2 className="text-2xl md:text-4xl font-extrabold text-white">
              Sorotan Proyek Terbaru
            </h2>
          </div>
          <Link
            href="/projects"
            className="flex items-center gap-1.5 text-xs font-bold text-slate-300 hover:text-accent transition-colors group"
          >
            <span>Lihat semua proyek</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>
    </div>
  )
}
