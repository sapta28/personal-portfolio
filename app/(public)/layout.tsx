import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="relative min-h-screen flex flex-col bg-background text-foreground selection:bg-primary/20 selection:text-primary-hover">
      {/* Background radial glows */}
      <div className="bg-gradient-glow top-12 left-[-100px] opacity-70" />
      <div className="bg-gradient-glow bottom-40 right-[-100px] opacity-70" />
      
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        {children}
      </main>
      
      <Footer />
    </div>
  )
}
