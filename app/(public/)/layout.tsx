import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="relative min-h-screen flex flex-col bg-[#090d16] text-slate-100 selection:bg-primary/30 selection:text-accent">
      {/* Background radial glows */}
      <div className="bg-gradient-glow top-12 left-[-100px]" />
      <div className="bg-gradient-glow bottom-40 right-[-100px]" />
      
      <Navbar />
      
      <main className="flex-grow pt-32 pb-16">
        {children}
      </main>
      
      <Footer />
    </div>
  )
}
