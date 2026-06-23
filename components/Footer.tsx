import Link from 'next/link'
import { Mail, Heart } from 'lucide-react'

const GithubIcon = ({ size = 18 }: { size?: number }) => (
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

const LinkedinIcon = ({ size = 18 }: { size?: number }) => (
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
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
)

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="mt-auto border-t border-slate-200 bg-white/70 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
        <div className="flex flex-col md:flex-row gap-8 items-center justify-between">
          {/* Logo & Description */}
          <div className="flex flex-col space-y-3 items-center md:items-start text-center md:text-left">
            <span className="font-bold text-lg tracking-wider bg-gradient-to-r from-slate-900 to-primary bg-clip-text text-transparent">
              SaptaPortfol.io
            </span>
            <p className="text-slate-600 text-xs max-w-xs">
              Membangun solusi perangkat lunak yang andal dengan keahlian fullstack IoT dan aplikasi web modern.
            </p>
          </div>

          {/* Social Media & Kontak */}
          <div className="flex flex-col space-y-4 items-center md:items-end">
            <div className="flex space-x-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 bg-slate-50 border border-slate-200 hover:border-primary hover:text-primary rounded-quad text-slate-600 transition-all"
              >
                <GithubIcon size={18} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 bg-slate-50 border border-slate-200 hover:border-primary hover:text-primary rounded-quad text-slate-600 transition-all"
              >
                <LinkedinIcon size={18} />
              </a>
              <a
                href="mailto:saptaadzanipurnama@gmail.com"
                className="p-2.5 bg-slate-50 border border-slate-200 hover:border-primary hover:text-primary rounded-quad text-slate-600 transition-all"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>
        </div>

        <hr className="border-slate-200 my-8" />

        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {currentYear} SaptaPortfol.io. Hak cipta dilindungi.</p>
          <p className="flex items-center gap-1.5">
            Dibuat dengan <Heart size={12} className="text-rose-500 fill-rose-500 animate-pulse" /> menggunakan Next.js & Supabase
          </p>
        </div>
      </div>
    </footer>
  )
}
