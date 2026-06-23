'use client'

import { useState } from 'react'
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react'

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

export default function ContactPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !email || !message) {
      setErrorMessage('Semua kolom wajib diisi!')
      return
    }

    setIsSubmitting(true)
    setErrorMessage('')

    try {
      // Menstimulasi pengiriman pesan (bisa dihubungkan ke Supabase jika diinginkan)
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setSubmitSuccess(true)
      setName('')
      setEmail('')
      setMessage('')
    } catch (err) {
      setErrorMessage('Gagal mengirimkan pesan. Silakan coba lagi.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-5xl mx-auto px-6 space-y-16">
      {/* Page Header */}
      <div className="text-center">
        <h1 className="text-3xl md:text-5xl font-extrabold text-slate-800">Contact Me</h1>
        <div className="w-16 h-1 bg-primary mx-auto rounded-full mt-3 mb-4" />
        <p className="text-slate-600 text-sm md:text-base max-w-xl mx-auto">
          Punya proyek menarik atau ingin berkolaborasi? Hubungi saya kapan saja dan mari kita diskusikan!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Info Kontak - Column 1 to 5 */}
        <div className="lg:col-span-5 space-y-8">
          <div className="glass p-8 rounded-quad space-y-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-800">Detail Kontak</h2>
            <p className="text-slate-600 text-xs leading-relaxed">
              Anda juga bisa menghubungi saya melalui saluran langsung di bawah ini atau mengikuti aktivitas saya di media sosial.
            </p>

            <div className="space-y-4 pt-4 border-t border-slate-100">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-amber-500/10 text-primary rounded-quad">
                  <Mail size={18} />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Email</span>
                  <a href="mailto:saptaadzanipurnama@gmail.com" className="text-sm font-semibold text-slate-700 hover:text-primary transition-colors">
                    saptaadzanipurnama@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="p-3 bg-amber-500/10 text-primary rounded-quad">
                  <Phone size={18} />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Telepon</span>
                  <span className="text-sm font-semibold text-slate-700">
                    +62 821-4332-3186
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="p-3 bg-amber-500/10 text-primary rounded-quad">
                  <MapPin size={18} />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Lokasi</span>
                  <span className="text-sm font-semibold text-slate-700">
                    Lamongan, East Java, Indonesia
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Social Links Card */}
          <div className="glass p-8 rounded-quad space-y-4 shadow-sm flex items-center justify-between">
            <span className="text-sm font-bold text-slate-800">Ikuti Saya:</span>
            <div className="flex space-x-3">
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
            </div>
          </div>
        </div>

        {/* Formulir Kontak - Column 6 to 12 */}
        <div className="lg:col-span-7">
          <div className="glass p-8 md:p-10 rounded-quad shadow-sm">
            {submitSuccess ? (
              <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
                <div className="p-4 bg-emerald-500/10 text-emerald-500 rounded-full animate-bounce">
                  <CheckCircle2 size={40} />
                </div>
                <h3 className="text-xl font-bold text-slate-800">Pesan Terkirim!</h3>
                <p className="text-slate-600 text-sm max-w-sm">
                  Terima kasih sudah menghubungi saya. Saya akan merespon pesan Anda secepatnya.
                </p>
                <button
                  onClick={() => setSubmitSuccess(false)}
                  className="mt-4 px-6 py-2 border border-slate-200 text-slate-600 hover:text-primary hover:border-primary rounded-quad text-sm font-semibold transition-all"
                >
                  Kirim Pesan Lain
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h2 className="text-xl font-bold text-slate-800 mb-2">Kirim Pesan</h2>
                
                {errorMessage && (
                  <div className="p-4 bg-rose-50 text-rose-600 text-xs font-semibold rounded-quad border border-rose-200">
                    {errorMessage}
                  </div>
                )}

                <div className="space-y-2">
                  <label htmlFor="name" className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Masukkan nama lengkap Anda"
                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-quad text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                    Alamat Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="nama@email.com"
                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-quad text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                    Pesan Anda
                  </label>
                  <textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={5}
                    placeholder="Tulis pesan Anda di sini..."
                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-quad text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-primary hover:bg-primary-hover disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold rounded-quad shadow-md shadow-primary/20 hover:scale-102 active:scale-98 transition-all text-sm"
                >
                  {isSubmitting ? (
                    <span>Sedang mengirim...</span>
                  ) : (
                    <>
                      <span>Kirim Pesan</span>
                      <Send size={15} />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
