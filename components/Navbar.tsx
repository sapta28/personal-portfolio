'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabaseClient'
import { User as SupabaseUser } from '@supabase/supabase-js'
import { Menu, X, LogOut, LayoutDashboard, User } from 'lucide-react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [user, setUser] = useState<SupabaseUser | null>(null)
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser()
      setUser(data.user)
    }
    getUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event: any, session: any) => {
      setUser(session?.user || null)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [supabase])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.refresh()
    router.push('/')
  }

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Projects', href: '/projects' },
    { name: 'Experience', href: '/experience' },
    { name: 'About', href: '/about' },
  ]

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/'
    }
    return pathname.startsWith(href)
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 py-4">
      <div className="max-w-7xl mx-auto glass rounded-2xl px-6 py-4 shadow-sm backdrop-blur-md">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center font-extrabold text-2xl group transition-transform hover:scale-105 duration-200">
            <span className="text-slate-800">S</span>
            <span className="text-primary">a</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-primary duration-200 ${
                  isActive(link.href)
                    ? 'text-primary border-b-2 border-primary pb-1'
                    : 'text-slate-600 hover:text-primary'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Desktop Right Side Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <Link
                  href="/dashboard"
                  className="flex items-center space-x-1 text-slate-600 hover:text-primary transition-colors"
                >
                  <LayoutDashboard size={18} />
                  <span className="text-sm font-medium">Dashboard</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 px-4 py-2 border border-rose-500/30 bg-rose-50/50 hover:bg-rose-100/55 text-rose-600 rounded-quad text-sm font-medium transition-all"
                >
                  <LogOut size={16} />
                  <span>Keluar</span>
                </button>
              </>
            ) : (
              <Link
                href="/contact"
                className="px-6 py-2.5 bg-primary hover:bg-primary-hover text-white rounded-quad text-xs font-bold shadow-md shadow-primary/10 hover:scale-105 active:scale-95 transition-all uppercase tracking-wider"
              >
                Contact Me
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-700 hover:text-primary focus:outline-none p-1"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden mt-2 mx-auto max-w-7xl glass rounded-2xl px-6 py-4 shadow-md flex flex-col space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={`text-base font-medium py-1 transition-colors ${
                isActive(link.href) ? 'text-primary font-semibold' : 'text-slate-700 hover:text-primary'
              }`}
            >
              {link.name}
            </Link>
          ))}
          {user && (
            <>
              <hr className="border-slate-200" />
              <div className="flex flex-col space-y-3">
                <Link
                  href="/dashboard"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center space-x-2 text-slate-700 hover:text-primary"
                >
                  <LayoutDashboard size={18} />
                  <span>Dashboard Admin</span>
                </Link>
                <button
                  onClick={() => {
                    setIsOpen(false)
                    handleLogout()
                  }}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-2 border border-rose-500/30 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-quad text-sm font-medium transition-all"
                >
                  <LogOut size={16} />
                  <span>Keluar</span>
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </nav>
  )
}
