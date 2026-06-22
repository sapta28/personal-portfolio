import { Compass, Mountain, Heart, Shield, BookOpen } from 'lucide-react'

export const metadata = {
  title: 'Tentang Saya - DevPortfol.io',
  description: 'Kenali lebih dekat pengembang di balik sistem IoT dan web portofolio ini, hobi naik gunung, dan filosofi kerja.',
}

export default function AboutPage() {
  const skills = [
    { category: 'Frontend', items: ['Next.js', 'React', 'Tailwind CSS', 'TypeScript'] },
    { category: 'Backend & DB', items: ['Node.js', 'Laravel', 'Supabase', 'PostgreSQL', 'RESTful API'] },
    { category: 'IoT & Embedded', items: ['ESP32', 'Arduino (C++)', 'MQTT', 'Modbus', 'Kelistrikan / PLTS'] },
  ]

  return (
    <div className="max-w-4xl mx-auto px-6 space-y-20">
      {/* 1. Profile Section */}
      <section className="space-y-6">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12">
          {/* Avatar Placeholder / Image */}
          <div className="relative w-36 h-36 flex-shrink-0">
            <div className="w-full h-full bg-gradient-to-tr from-primary to-accent rounded-quad p-[3px] shadow-lg shadow-primary/20">
              <div className="w-full h-full bg-slate-950 rounded-quad overflow-hidden flex items-center justify-center">
                {/* Visual placeholder representation */}
                <Mountain size={60} className="text-accent/60" />
              </div>
            </div>
          </div>
          
          <div className="text-center md:text-left space-y-4">
            <h1 className="text-3xl md:text-5xl font-extrabold text-white">
              Saya <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">F.</span>
            </h1>
            <h2 className="text-sm font-bold text-accent uppercase tracking-wider">
              IoT Engineer & Web Developer
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed max-w-2xl">
              Halo! Saya adalah seorang pengembang yang bersemangat menyatukan perangkat keras (hardware) dan perangkat lunak (software). 
              Ketertarikan saya dimulai dari memprogram mikrokontroler kecil, yang akhirnya membawa saya ke arsitektur web modern berkinerja tinggi. 
              Bagi saya, membuat kode adalah tentang menyederhanakan masalah rumit dan merancang sistem terukur yang mempermudah kehidupan sehari-hari.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Skills Grid */}
      <section className="space-y-8">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <span className="w-1.5 h-6 bg-primary rounded-full" />
          Keahlian Teknis
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {skills.map((skill) => (
            <div key={skill.category} className="glass p-6 rounded-quad">
              <h3 className="font-bold text-white text-sm uppercase tracking-wider mb-4 text-accent">
                {skill.category}
              </h3>
              <ul className="space-y-2">
                {skill.items.map((item) => (
                  <li key={item} className="text-slate-300 text-xs flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Outdoor & Mountain Section */}
      <section className="glass rounded-quad p-8 md:p-10 relative overflow-hidden">
        <div className="absolute right-0 bottom-0 opacity-10 select-none pointer-events-none translate-x-10 translate-y-10">
          <Mountain size={280} className="text-white" />
        </div>
        
        <div className="relative space-y-6 max-w-2xl">
          <div className="flex items-center gap-2 text-accent">
            <Compass size={24} />
            <span className="font-bold text-sm uppercase tracking-wider">Di Luar Dunia Coding</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white">
            Petualangan Outdoor & Mendaki Gunung
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
            Ketika tidak sedang berada di depan layar komputer, Anda kemungkinan besar akan menemukan saya sedang menjelajahi alam terbuka atau mendaki puncak gunung. 
            Mendaki gunung mengajarkan saya tentang kesabaran, persiapan matang, daya tahan, dan bagaimana menghadapi kondisi yang tidak terduga—nilai-nilai yang secara mengejutkan juga sangat berguna dalam dunia rekayasa perangkat lunak.
          </p>
          <blockquote className="border-l-2 border-accent pl-4 italic text-slate-300 text-xs sm:text-sm">
            &ldquo;Persiapan matang sebelum mendaki gunung sama pentingnya dengan merencanakan arsitektur database sebelum menulis baris kode pertama.&rdquo;
          </blockquote>
        </div>
      </section>

      {/* 4. Nilai & Filosofi Kerja */}
      <section className="space-y-8">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <span className="w-1.5 h-6 bg-primary rounded-full" />
          Filosofi & Nilai Kerja
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex gap-4">
            <div className="flex-shrink-0 p-2.5 bg-slate-900 border border-slate-800 text-accent rounded-quad h-fit">
              <Shield size={18} />
            </div>
            <div>
              <h3 className="font-bold text-white text-sm mb-1">Keandalan Utama</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Menjamin sistem berjalan stabil, baik pada tingkat firmware mikrokontroler maupun performa database Next.js.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0 p-2.5 bg-slate-900 border border-slate-800 text-primary rounded-quad h-fit">
              <BookOpen size={18} />
            </div>
            <div>
              <h3 className="font-bold text-white text-sm mb-1">Selalu Belajar</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Teknologi terus berkembang pesat. Saya selalu antusias mempelajari framework dan inovasi hardware terbaru.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0 p-2.5 bg-slate-900 border border-slate-800 text-purple-400 rounded-quad h-fit">
              <Heart size={18} />
            </div>
            <div>
              <h3 className="font-bold text-white text-sm mb-1">Kolaborasi Terbuka</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Komunikasi yang jelas dan transparan adalah kunci kesuksesan setiap implementasi proyek tim.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
