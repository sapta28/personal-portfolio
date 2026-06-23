import { Briefcase, Calendar, MapPin, Cpu, Globe, GraduationCap } from 'lucide-react'

export const metadata = {
  title: 'Experience | Sapta Portfolio',
  description: 'Riwayat pengalaman profesional dan latar belakang edukasi Sapta.',
}

interface TimelineItemProps {
  role: string
  company: string
  period: string
  location: string
  description: string[]
  icon: React.ReactNode
  skills: string[]
}

function TimelineItem({ role, company, period, location, description, icon, skills }: TimelineItemProps) {
  return (
    <div className="relative pl-8 md:pl-10 pb-12 last:pb-0 group">
      {/* Circle & Line */}
      <div className="absolute left-0 top-0 h-full w-[2px] bg-slate-200 group-last:h-fit" />
      <div className="absolute left-[-15px] top-0 p-2 bg-white border-2 border-primary text-primary rounded-quad shadow-sm group-hover:scale-110 transition-all duration-300 z-10">
        {icon}
      </div>

      <div className="glass p-6 md:p-8 rounded-quad hover:border-primary/30 transition-all duration-300 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
          <div>
            <h3 className="text-xl font-bold text-slate-800">{role}</h3>
            <p className="text-sm font-semibold text-primary">{company}</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 sm:items-center text-xs text-slate-500">
            <span className="flex items-center gap-1">
              <Calendar size={13} />
              <span>{period}</span>
            </span>
            <span className="hidden sm:inline">•</span>
            <span className="flex items-center gap-1">
              <MapPin size={13} />
              <span>{location}</span>
            </span>
          </div>
        </div>

        <ul className="list-disc list-inside space-y-2 text-slate-600 text-sm leading-relaxed pl-1">
          {description.map((item, idx) => (
            <li key={idx} className="marker:text-primary/70">{item}</li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-2 pt-2">
          {skills.map((skill) => (
            <span
              key={skill}
              className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 bg-amber-50 border border-amber-200/50 text-amber-800 rounded-quad"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function ExperiencePage() {
  const experiences = [
    {
      role: 'Lead Fullstack IoT Developer',
      company: 'TechOtomasi Solusindo',
      period: '2024 - Sekarang',
      location: 'Lamongan, East Java, Indonesia',
      icon: <Cpu size={16} />,
      description: [
        'Merancang dan mengembangkan firmware IoT berbasis ESP32 untuk sistem kiosk presensi biometrik real-time.',
        'Mengintegrasikan protokol MQTT dengan broker terdistribusi untuk efisiensi komunikasi data sensor dan kamera.',
        'Membangun dashboard monitoring web Next.js berkinerja tinggi yang terhubung langsung ke Supabase Realtime Database.',
        'Memimpin tim kecil beranggotakan 4 developer untuk menyelesaikan integrasi software-hardware.'
      ],
      skills: ['ESP32', 'Next.js', 'MQTT', 'Supabase Client', 'TypeScript']
    },
    {
      role: 'IoT System Engineer & PLTS Specialist',
      company: 'SolarSmart Agriculture',
      period: '2022 - 2024',
      location: 'Bandung, Indonesia',
      icon: <Globe size={16} />,
      description: [
        'Mengimplementasikan sistem irigasi cerdas bertenaga hibrida PLN/PLTS dengan prioritas suplai daya otomatis.',
        'Membuat algoritma kalkulator efisiensi energi yang menghitung selisih konsumsi listrik harian.',
        'Mengonfigurasi visualisasi data sensor kelembaban tanah dan cuaca menggunakan Node-RED dan PostgreSQL.',
        'Menguji ketahanan perangkat keras di lingkungan outdoor untuk meminimalisir kegagalan pembacaan sensor.'
      ],
      skills: ['Arduino', 'PLTS Control', 'Node-RED', 'PostgreSQL', 'Hardware QA']
    },
    {
      role: 'Frontend Developer',
      company: 'WebCraft Studio',
      period: '2020 - 2022',
      location: 'Yogyakarta, Indonesia',
      icon: <Briefcase size={16} />,
      description: [
        'Mengembangkan antarmuka aplikasi web dinamis dengan React, Next.js, dan Tailwind CSS.',
        'Mengoptimalkan Search Engine Optimization (SEO) dan performa Core Web Vitals hingga mencapai skor rata-rata >90%.',
        'Melakukan integrasi API RESTful serverless untuk mendukung otentikasi pengguna dan pembaruan data real-time.'
      ],
      skills: ['Next.js', 'React', 'Tailwind CSS', 'REST API', 'Core Web Vitals']
    }
  ]

  const educations = [
    {
      role: 'Sarjana Teknik Komputer (S.T.)',
      company: 'Universitas Indonesia',
      period: '2016 - 2020',
      location: 'Depok, Indonesia',
      icon: <GraduationCap size={16} />,
      description: [
        'Fokus pada Sistem Tertanam (Embedded Systems) dan Jaringan Komputer.',
        'Tugas Akhir: Rancang Bangun Sistem Grid Pemantauan Kualitas Udara Perkotaan Berbasis Sensor Bergerak dan LoRaWAN.'
      ],
      skills: ['Embedded C', 'LoRaWAN', 'Computer Networks', 'Sistem Tertanam']
    }
  ]

  return (
    <div className="max-w-4xl mx-auto px-6 space-y-16">
      {/* Page Header */}
      <div className="text-center">
        <h1 className="text-3xl md:text-5xl font-extrabold text-slate-800">My Journey</h1>
        <div className="w-16 h-1 bg-primary mx-auto rounded-full mt-3 mb-4" />
        <p className="text-slate-600 text-sm md:text-base max-w-xl mx-auto">
          Perjalanan profesional saya dalam mengembangkan perangkat IoT dan merancang aplikasi web modern.
        </p>
      </div>

      {/* Timeline Section - Pengalaman */}
      <div className="space-y-8">
        <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
          <Briefcase size={22} className="text-primary" />
          <span>Pengalaman Profesional</span>
        </h2>
        <div className="relative">
          {experiences.map((exp, index) => (
            <TimelineItem key={index} {...exp} />
          ))}
        </div>
      </div>

      {/* Timeline Section - Pendidikan */}
      <div className="space-y-8">
        <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
          <GraduationCap size={22} className="text-primary" />
          <span>Pendidikan</span>
        </h2>
        <div className="relative">
          {educations.map((edu, index) => (
            <TimelineItem key={index} {...edu} />
          ))}
        </div>
      </div>
    </div>
  )
}
