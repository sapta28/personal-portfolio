import { createClient } from '@/lib/supabaseServer'
import ProjectsGallery from '@/components/ProjectsGallery'
import { Project } from '@/components/ProjectCard'
import { Box } from 'lucide-react'

export const revalidate = 0

export const metadata = {
  title: 'Projects | Sapta Portfolio',
  description: 'Jelajahi seluruh koleksi proyek teknis, mulai dari IoT sistem kelistrikan hingga aplikasi web modern berkinerja tinggi.',
}

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

export default async function ProjectsPage() {
  let projects: Project[] = []

  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false })

    if (!error && data && data.length > 0) {
      projects = data as Project[]
    } else {
      projects = MOCK_PROJECTS
    }
  } catch (err) {
    console.error('Gagal memuat data proyek:', err)
    projects = MOCK_PROJECTS
  }

  return (
    <div className="max-w-7xl mx-auto px-6 space-y-12">
      {/* Header */}
      <div className="space-y-4 max-w-2xl">
        <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-wider">
          <Box size={14} />
          <span>Portofolio</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold text-slate-800">
          Seluruh Karya Proyek
        </h1>
        <div className="w-12 h-1 bg-primary rounded-full" />
        <p className="text-slate-600 text-sm leading-relaxed">
          Kumpulan studi kasus lengkap, rekayasa perangkat keras IoT, integrasi kelistrikan PLTS, dan platform web modern yang pernah saya rancang dan bangun.
        </p>
      </div>

      {/* Gallery Component */}
      <ProjectsGallery initialProjects={projects} />
    </div>
  )
}
