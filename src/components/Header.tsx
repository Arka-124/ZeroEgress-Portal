import React, { useState, useEffect } from 'react'
import { 
  ExternalLink, 
  Menu, 
  X, 
  Download, 
  Sparkles,
  BookOpen,
  KeyRound
} from 'lucide-react'
import { BrandLogo } from './BrandLogo'
import { useAppVersion } from '../hooks/useAppVersion'
import { WEB_APP_URL } from '../data/releases'

interface HeaderProps {
  onOpenDocs: () => void
  onOpenLicenseModal: () => void
}

export const Header: React.FC<HeaderProps> = ({ onOpenDocs, onOpenLicenseModal }) => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { version } = useAppVersion('2.0.0')

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Features', href: '#features' },
    { name: 'Compare', href: '#compare' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Downloads', href: '#downloads' },
  ]

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-200 ${
        isScrolled 
          ? 'bg-[#09090b]/85 backdrop-blur-md border-b border-zinc-800/80 shadow-lg shadow-black/40 py-3.5' 
          : 'bg-transparent py-5 border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo & Version Pill */}
          <div className="flex items-center gap-3">
            <a href="#" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-zinc-900 border border-zinc-700/80 flex items-center justify-center p-1.5 group-hover:border-zinc-500 transition-colors shadow-inner">
                <BrandLogo size={22} className="group-hover:scale-105 transition-transform duration-200" />
              </div>
              <div className="flex flex-col">
                <span className="text-base font-semibold tracking-tight text-white flex items-center gap-1.5">
                  ZeroEgress
                </span>
                <span className="text-[10px] tracking-wider uppercase text-zinc-400 -mt-1 font-mono font-medium">
                  Air-Gapped Core
                </span>
              </div>
            </a>

            {/* Live Synchronized Version Pill */}
            <a 
              href="#downloads"
              className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono font-medium bg-zinc-900/90 text-zinc-300 border border-zinc-800 hover:border-zinc-700 hover:text-white transition-all"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>{version} Live</span>
            </a>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 text-sm font-medium text-zinc-400">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-3.5 py-1.5 rounded-md hover:text-white hover:bg-zinc-800/50 transition-colors"
              >
                {link.name}
              </a>
            ))}
            <button
              onClick={onOpenDocs}
              className="px-3.5 py-1.5 rounded-md hover:text-white hover:bg-zinc-800/50 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5 text-zinc-400" />
              Documentation
            </button>
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href="#downloads"
              className="px-3.5 py-1.5 text-xs font-medium rounded-lg text-zinc-300 hover:text-white border border-zinc-800 hover:border-zinc-700 bg-zinc-900/60 hover:bg-zinc-800/80 transition-all flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5 text-zinc-400" />
              Get Native
            </a>

            <a
              href={WEB_APP_URL} 
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-1.5 text-xs font-medium rounded-lg text-white bg-zinc-100 hover:bg-white text-zinc-950 font-semibold shadow-sm hover:shadow-zinc-200/20 transition-all flex items-center gap-1.5 group"
            >
              <Sparkles className="w-3.5 h-3.5 text-zinc-800 group-hover:rotate-12 transition-transform" />
              <span>Open Web App</span>
              <ExternalLink className="w-3 h-3 text-zinc-500 group-hover:text-zinc-900 transition-colors" />
            </a>
          </div>

          {/* Mobile Menu Hamburger */}
          <div className="flex md:hidden items-center gap-2">
            <a
              href={WEB_APP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-2.5 py-1 text-xs font-medium rounded-md text-zinc-900 bg-zinc-100 font-semibold flex items-center gap-1"
            >
              <span>Web App</span>
              <ExternalLink className="w-3 h-3" />
            </a>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800/60 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-zinc-800 bg-[#09090b]/95 backdrop-blur-xl px-4 pt-3 pb-5 space-y-2 animate-in slide-in-from-top-2">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-zinc-800/60">
            <span className="text-xs font-mono text-zinc-400 flex items-center gap-1.5">
              <BrandLogo size={16} />
              ZeroEgress {version}
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              Air-Gapped Core Active
            </span>
          </div>

          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-medium text-zinc-300 hover:text-white hover:bg-zinc-800/60 transition-colors"
            >
              {link.name}
            </a>
          ))}

          <button
            onClick={() => {
              setMobileMenuOpen(false)
              onOpenDocs()
            }}
            className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-zinc-300 hover:text-white hover:bg-zinc-800/60 transition-colors flex items-center gap-2 cursor-pointer"
          >
            <BookOpen className="w-4 h-4 text-zinc-400" />
            Documentation & CLI
          </button>

          <button
            onClick={() => {
              setMobileMenuOpen(false)
              onOpenLicenseModal()
            }}
            className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-zinc-300 hover:text-white hover:bg-zinc-800/60 transition-colors flex items-center gap-2 cursor-pointer"
          >
            <KeyRound className="w-4 h-4 text-zinc-400" />
            Activate Desktop License (₹99)
          </button>

          <div className="pt-2 flex flex-col gap-2">
            <a
              href="#downloads"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 px-4 rounded-lg text-center text-sm font-medium bg-zinc-800 text-white hover:bg-zinc-700 transition-colors flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              Download Native Binaries
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
