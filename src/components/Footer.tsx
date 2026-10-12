import React from 'react'
import { 
  ShieldCheck, 
  ExternalLink 
} from 'lucide-react'
import { APP_VERSION, WEB_APP_URL } from '../data/releases'

interface FooterProps {
  onOpenDocs: () => void
  onOpenLicenseModal: () => void
}

const CURRENT_YEAR = 2026

const GitHubIcon = () => (
  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
  </svg>
)

export const Footer: React.FC<FooterProps> = ({ onOpenDocs, onOpenLicenseModal }) => {
  return (
    <footer className="border-t border-zinc-800 bg-[#09090b] text-zinc-400 py-16 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 pb-12 border-b border-zinc-800/80">
          
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-700/80 flex items-center justify-center text-emerald-400">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <span className="text-base font-bold text-white tracking-tight">ZeroEgress</span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-zinc-800 text-zinc-300 border border-zinc-700">
                {APP_VERSION}
              </span>
            </div>

            <p className="text-xs text-zinc-400 max-w-sm leading-relaxed">
              Utilitarian, air-gapped file utilities designed for engineering teams, security professionals, and creators. Convert, merge, and sanitize multi-gigabyte media without remote cloud dependency.
            </p>

            {/* Live Air-Gap Status Indicator */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-300">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>Air-Gapped Core Active</span>
              <span className="text-zinc-600">|</span>
              <span className="text-emerald-400">Egress: 0 B/s</span>
            </div>
          </div>

          {/* Product Links */}
          <div className="space-y-3">
            <div className="text-xs font-mono font-semibold text-zinc-200 uppercase tracking-wider">
              Product
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#features" className="hover:text-white transition-colors">Native Architecture</a>
              </li>
              <li>
                <a href="#compare" className="hover:text-white transition-colors">Web vs. Desktop Matrix</a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-white transition-colors">Pricing & Perpetual License</a>
              </li>
              <li>
                <a href="#downloads" className="hover:text-white transition-colors">Release Binaries</a>
              </li>
              <li>
                <a href={WEB_APP_URL} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors inline-flex items-center gap-1">
                  <span>Open Web App</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Downloads Links */}
          <div className="space-y-3">
            <div className="text-xs font-mono font-semibold text-zinc-200 uppercase tracking-wider">
              Platforms
            </div>
            <ul className="space-y-2 text-xs font-mono text-zinc-400">
              <li>
                <a href="#downloads" className="hover:text-white transition-colors">Windows (.exe / .msi)</a>
              </li>
              <li>
                <a href="#downloads" className="hover:text-white transition-colors">macOS (Apple Silicon .dmg)</a>
              </li>
              <li>
                <a href="#downloads" className="hover:text-white transition-colors">macOS (Intel .dmg)</a>
              </li>
              <li>
                <a href="#downloads" className="hover:text-white transition-colors">Linux (.AppImage / .deb)</a>
              </li>
              <li>
                <a href="#downloads" className="hover:text-white transition-colors">Android (.apk)</a>
              </li>
            </ul>
          </div>

          {/* Resources & Security */}
          <div className="space-y-3">
            <div className="text-xs font-mono font-semibold text-zinc-200 uppercase tracking-wider">
              Security & Docs
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={onOpenDocs} className="hover:text-white transition-colors text-left cursor-pointer">
                  Architecture Documentation
                </button>
              </li>
              <li>
                <button onClick={onOpenDocs} className="hover:text-white transition-colors text-left cursor-pointer">
                  Air-Gap Verification Guide
                </button>
              </li>
              <li>
                <button onClick={onOpenLicenseModal} className="hover:text-white transition-colors text-left cursor-pointer">
                  License Key Activation
                </button>
              </li>
              <li>
                <a 
                  href="https://github.com/Arka-124/ZeroEgress-Portal" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors inline-flex items-center gap-1.5"
                >
                  <GitHubIcon />
                  <span>GitHub Repository</span>
                </a>
              </li>
              <li>
                <a href="#checksums" className="hover:text-white transition-colors">
                  PGP Release Signatures
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500 font-mono">
          <div className="flex items-center gap-2">
            <span>© {CURRENT_YEAR} ZeroEgress Systems.</span>
            <span>All rights reserved.</span>
          </div>

          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-zinc-300 transition-colors">Privacy Policy</a>
            <span>•</span>
            <a href="#" className="hover:text-zinc-300 transition-colors">Terms of License (Apache 2.0 / Commercial)</a>
            <span>•</span>
            <a href="https://github.com/Arka-124/ZeroEgress-Portal" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-300 transition-colors flex items-center gap-1">
              <GitHubIcon />
              <span>GitHub</span>
            </a>
          </div>
        </div>

      </div>
    </footer>
  )
}
