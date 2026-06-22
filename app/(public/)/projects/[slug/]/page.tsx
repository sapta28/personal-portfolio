import Link from 'next/link'
import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabaseServer'
import { Project } from '@/components/ProjectCard'
import { ArrowLeft, ExternalLink, Calendar, Cpu } from 'lucide-react'

const GithubIcon = ({ size = 16 }: { size?: number }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
  </svg>
)

export const revalidate = 0

interface ProjectDetailPageProps {
  params: Promise<{ slug: string }>
}

const MOCK_PROJECTS: Project[] = [
  {
    id: 'mock-1',
    title: 'Sistem Presensi Biometrik Kiosk IoT',
    slug: 'kiosk-biometrik-iot',
    description: 'Sistem presensi terintegrasi menggunakan fingerprint scan dan kamera biometrik terhubung ke dashboard admin real-time melalui MQTT broker.',
    content: `### Studi Kasus: Sistem Presensi Biometrik Kiosk

Proyek ini dikembangkan untuk memecahkan masalah kecurangan presensi di lingkungan industri. Menggunakan mikrokontroler ESP32 dan modul sidik jari biometrik.

#### Arsitektur Teknis
- **Hardware:** ESP32, Sensor Sidik Jari AS608, OV2640 Cam untuk perekaman gambar wajah pegawai.
- **Protokol:** MQTT (Message Queuing Telemetry Transport) untuk transmisi data real-time yang hemat daya dan bandwidth.
- **Backend:** Laravel API yang dikombinasikan dengan basis data relasional.
- **Frontend:** Dashboard Next.js untuk tim HRD guna memonitor kehadiran secara langsung lengkap dengan notifikasi telegram.

#### Tantangan & Solusi
Salah satu tantangan utama adalah kestabilan koneksi Wi-Fi di area pabrik yang luas. Solusinya adalah mengimplementasikan logika penyimpanan offline lokal (Flash Memory ESP32) ketika koneksi internet terputus, dan secara otomatis melakukan sinkronisasi data kembali saat koneksi terhubung.`,
    tech_stack: ['Next.js', 'Supabase', 'ESP32', 'MQTT', 'Laravel'],
    thumbnail_url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=60',
    created_at: new Date().toISOString()
  },
  {
    id: 'mock-2',
    title: 'Sistem Otomasi Irigasi Cerdas PLTS',
    slug: 'otomasi-irigasi-plts',
    description: 'Pemisah pompa air otomatis berbasis Pembangkit Listrik Tenaga Surya (PLTS) dan PLN dengan kalkulator selisih konsumsi energi.',
    content: `### Studi Kasus: Irigasi Cerdas PLTS

Menyeimbangkan kebutuhan energi pertanian dengan memisahkan suplai daya dari panel surya dan listrik konvensional secara pintar.

#### Solusi & Cara Kerja
Sistem memprioritaskan penggunaan daya PLTS di siang hari dan beralih ke PLN secara dinamis saat baterai penyimpanan solar cell di bawah 20%.

- Menggunakan modul sensor kelembaban tanah untuk mengaktifkan pompa secara otomatis.
- Menyediakan grafik analisis penggunaan energi solar panel vs listrik PLN di dashboard.`,
    tech_stack: ['Next.js', 'Arduino', 'PLTS Control', 'Node-RED', 'PostgreSQL'],
    thumbnail_url: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&auto=format&fit=crop&q=60',
    created_at: new Date().toISOString()
  },
  {
    id: 'mock-3',
    title: 'Dashboard E-Commerce Premium dengan SSR',
    slug: 'dashboard-ecommerce-ssr',
    description: 'Dashboard retail analitik canggih dengan rendering sisi server (SSR) Next.js yang menampilkan analisis penjualan, stok produk, dan log transaksi.',
    content: `### Studi Kasus: Dashboard E-Commerce

Mengembangkan visualisasi data performa penjualan ritel berskala besar dengan loading instan.

#### Fitur Utama
- Server-side Rendering (SSR) untuk memproses ribuan data log secara real-time.
- Ekspor laporan penjualan terformat dalam Excel / PDF.
- Manajemen hak akses multi-role (Kasir, Supervisor, Owner).`,
    tech_stack: ['Next.js', 'Tailwind CSS', 'Supabase', 'Chart.js'],
    thumbnail_url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=60',
    created_at: new Date().toISOString()
  }
]

// Helper fungsi untuk me-render markdown dasar secara aman
function renderMarkdownToJSX(content: string) {
  const lines = content.split('\n')
  let inList = false
  const listItems: string[] = []
  const jsxElements: React.ReactNode[] = []

  const flushList = (key: number) => {
    if (listItems.length > 0) {
      jsxElements.push(
        <ul key={`list-${key}`} className="list-disc pl-6 my-4 space-y-2 text-slate-300 text-xs sm:text-sm">
          {listItems.map((item, idx) => (
            <li key={idx} dangerouslySetInnerHTML={{ __html: parseInlineStyles(item) }} />
          ))}
        </ul>
      )
      listItems.length = 0
    }
  }

  // Mengubah **bold** menjadi <strong>
  const parseInlineStyles = (text: string) => {
    return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
  }

  lines.forEach((line, index) => {
    const trimmedLine = line.trim()

    if (trimmedLine.startsWith('- ')) {
      inList = true
      listItems.push(trimmedLine.substring(2))
    } else {
      if (inList) {
        flushList(index)
        inList = false
      }

      if (trimmedLine.startsWith('### ')) {
        jsxElements.push(
          <h3 key={index} className="text-xl font-bold text-white mt-8 mb-4 border-b border-slate-900 pb-2">
            {trimmedLine.substring(4)}
          </h3>
        )
      } else if (trimmedLine.startsWith('#### ')) {
        jsxElements.push(
          <h4 key={index} className="text-base font-bold text-accent mt-6 mb-3">
            {trimmedLine.substring(5)}
          </h4>
        )
      } else if (trimmedLine === '') {
        // Abaikan baris kosong
      } else {
        jsxElements.push(
          <p
            key={index}
            className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-4"
            dangerouslySetInnerHTML={{ __html: parseInlineStyles(trimmedLine) }}
          />
        )
      }
    }
  })

  // Flush list yang tersisa di akhir
  if (inList) {
    flushList(lines.length)
  }

  return jsxElements
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { slug } = await params
  let project: Project | null = null

  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('slug', slug)
      .single()

    if (!error && data) {
      project = data as Project
    } else {
      // Cari di mock jika database error / tidak terhubung
      project = MOCK_PROJECTS.find((p) => p.slug === slug) || null
    }
  } catch (err) {
    console.error('Gagal memuat detail proyek:', err)
    project = MOCK_PROJECTS.find((p) => p.slug === slug) || null
  }

  if (!project) {
    notFound()
  }

  const formattedDate = new Date(project.created_at).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  return (
    <div className="max-w-4xl mx-auto px-6 space-y-8">
      {/* Tombol Kembali */}
      <Link
        href="/projects"
        className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-white transition-colors group mb-4"
      >
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
        <span>Kembali ke semua proyek</span>
      </Link>

      {/* Header Info */}
      <div className="space-y-4">
        {/* Tech Badges */}
        <div className="flex flex-wrap gap-1.5">
          {project.tech_stack.map((tech) => (
            <span
              key={tech}
              className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 bg-slate-900 border border-slate-800 text-accent rounded-quad"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white leading-tight">
          {project.title}
        </h1>

        {/* Meta info */}
        <div className="flex flex-wrap items-center gap-6 text-xs text-slate-400">
          <div className="flex items-center gap-1.5">
            <Calendar size={14} />
            <span>Selesai pada: {formattedDate}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Cpu size={14} className="text-accent" />
            <span>Kategori: Sistem IoT & Web</span>
          </div>
        </div>
      </div>

      {/* Banner / Gambar */}
      <div className="relative aspect-video w-full overflow-hidden rounded-quad border border-slate-800 bg-slate-950/40">
        <img
          src={project.thumbnail_url || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&auto=format&fit=crop&q=60'}
          alt={project.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Konten Utama & Sidebar Kanan */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pt-4">
        {/* Detail Studi Kasus */}
        <div className="md:col-span-2 space-y-6">
          {renderMarkdownToJSX(project.content)}
        </div>

        {/* Sidebar Info Ringkas */}
        <div className="space-y-6">
          <div className="glass p-6 rounded-quad space-y-6">
            <h3 className="font-bold text-white text-sm uppercase tracking-wider border-b border-slate-800 pb-2">
              Pranala Proyek
            </h3>
            
            <div className="flex flex-col gap-3">
              {project.github_url ? (
                <a
                  href={project.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between w-full px-4 py-3 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs text-slate-200 font-semibold rounded-quad transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <GithubIcon size={16} />
                    <span>Source Code (GitHub)</span>
                  </span>
                  <ExternalLink size={14} />
                </a>
              ) : (
                <span className="text-xs text-slate-500 italic block text-center py-2">
                  Repositori Kode bersifat privat
                </span>
              )}

              {project.live_url ? (
                <a
                  href={project.live_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between w-full px-4 py-3 bg-gradient-to-r from-primary to-accent hover:from-primary-hover hover:to-accent-hover text-xs text-white font-bold rounded-quad transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <ExternalLink size={16} />
                    <span>Demo Langsung</span>
                  </span>
                  <ExternalLink size={14} />
                </a>
              ) : (
                <span className="text-xs text-slate-500 italic block text-center py-2">
                  Demo langsung tidak tersedia
                </span>
              )}
            </div>
          </div>

          <div className="glass p-6 rounded-quad">
            <h3 className="font-bold text-white text-sm uppercase tracking-wider border-b border-slate-800 pb-2 mb-4">
              Informasi Teknis
            </h3>
            <div className="space-y-2 text-xs text-slate-400">
              <p><strong className="text-slate-300">Skalabilitas:</strong> Teruji di skala produksi lokal.</p>
              <p><strong className="text-slate-300">Integrasi:</strong> MQTT & REST API.</p>
              <p><strong className="text-slate-300">Database:</strong> PostgreSQL / Supabase.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
