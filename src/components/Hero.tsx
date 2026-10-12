import React, { useState, useEffect, useRef } from 'react'
import { 
  Download, 
  ChevronDown, 
  ExternalLink, 
  ShieldCheck, 
  HardDrive, 
  Cpu, 
  Network, 
  Check, 
  Sparkles, 
  ArrowRight, 
  Terminal, 
  Activity 
} from 'lucide-react'
import { detectUserOS } from '../utils/osDetection'
import type { DetectedOS } from '../utils/osDetection'
import { BINARY_RELEASES, APP_VERSION, WEB_APP_URL } from '../data/releases'
import type { BinaryRelease } from '../types'
import { useToast } from '../context/ToastContext'

interface HeroProps {
  onSelectRelease: (release: BinaryRelease) => void
}

export const Hero: React.FC<HeroProps> = ({ onSelectRelease }) => {
  const { showToast } = useToast()
  const [detectedOS] = useState<DetectedOS>(() => detectUserOS())
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Interactive local pipeline simulator state
  const [selectedPreset, setSelectedPreset] = useState<'video' | 'pdf' | 'archive'>('video')
  const [isSimulating, setIsSimulating] = useState(false)
  const [simProgress, setSimProgress] = useState(100)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Find the primary release matching the detected OS
  const primaryRelease = BINARY_RELEASES.find(
    (r) => r.fileName === detectedOS.defaultFileName
  ) || BINARY_RELEASES.find((r) => r.platform === detectedOS.platform) || BINARY_RELEASES[0]

  const handleDownload = (release: BinaryRelease) => {
    onSelectRelease(release)
    showToast(
      `Starting download for ${release.platformName}`,
      `${release.fileName} (${release.fileSize})`,
      'info'
    )
  }

  const triggerSimulation = () => {
    if (isSimulating) return
    setIsSimulating(true)
    setSimProgress(0)
    let p = 0
    const interval = setInterval(() => {
      p += 15
      if (p >= 100) {
        setSimProgress(100)
        setIsSimulating(false)
        clearInterval(interval)
      } else {
        setSimProgress(p)
      }
    }, 120)
  }

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
      {/* Background radial gradients for subtle high-contrast glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-emerald-500/5 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute top-1/3 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-sky-500/5 blur-[120px] pointer-events-none rounded-full" />
      
      {/* Subtle developer grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)`,
          backgroundSize: '32px 32px',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-7">
          
          {/* Top Pill / Status Tag */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs text-zinc-300 font-mono shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span className="text-zinc-400">ZeroEgress Engine</span>
            <span className="text-zinc-600">/</span>
            <span className="text-emerald-400 font-medium">100% Air-Gapped Local Architecture</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.08]">
            Air-Gapped File Utilities.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-100 via-zinc-300 to-zinc-500">
              Running Locally on Your Machine.
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-lg sm:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Convert, merge, sanitize, and process gigabyte files with{' '}
            <span className="text-zinc-200 font-medium">zero server uploads</span> and{' '}
            <span className="text-zinc-200 font-medium">zero subscriptions</span>.
          </p>

          {/* Primary CTA & Dynamic OS Download Button */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3.5 max-w-lg mx-auto">
            {/* Split Download Button with OS Auto-Detection & Dropdown */}
            <div className="relative w-full sm:w-auto" ref={dropdownRef}>
              <div className="inline-flex w-full sm:w-auto rounded-xl shadow-xl shadow-emerald-950/20 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-medium transition-all group">
                <button
                  type="button"
                  onClick={() => handleDownload(primaryRelease)}
                  className="flex-1 sm:flex-none px-5 py-3.5 flex items-center justify-center gap-2.5 text-sm sm:text-base font-semibold cursor-pointer text-zinc-950"
                >
                  <Download className="w-5 h-5 text-zinc-950 transition-transform group-hover:-translate-y-0.5" />
                  <span>Download for {detectedOS.label}</span>
                  <span className="text-xs px-2 py-0.5 rounded bg-zinc-950/15 font-mono text-zinc-900 font-medium hidden xs:inline">
                    {primaryRelease.format.split(' ')[0]}
                  </span>
                </button>

                {/* Dropdown Toggle */}
                <button
                  type="button"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="px-3 border-l border-emerald-600/30 hover:bg-emerald-600/20 transition-colors flex items-center justify-center cursor-pointer rounded-r-xl"
                  title="Choose other platforms"
                  aria-label="Other platforms"
                >
                  <ChevronDown className={`w-4 h-4 text-zinc-950 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
              </div>

              {/* Other Platforms Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute left-0 sm:right-0 sm:left-auto top-full mt-2 w-72 sm:w-80 rounded-xl bg-zinc-900/95 border border-zinc-700/80 shadow-2xl shadow-black/80 backdrop-blur-xl p-2 z-50 animate-in fade-in slide-in-from-top-2 text-left">
                  <div className="px-3 py-2 text-[11px] font-mono uppercase tracking-wider text-zinc-500 border-b border-zinc-800">
                    All Native Releases ({APP_VERSION})
                  </div>
                  <div className="py-1 max-h-72 overflow-y-auto space-y-1">
                    {BINARY_RELEASES.map((rel) => {
                      const isCurrent = rel.id === primaryRelease.id
                      return (
                        <button
                          key={rel.id}
                          onClick={() => {
                            handleDownload(rel)
                            setIsDropdownOpen(false)
                          }}
                          className={`w-full flex items-center justify-between px-3 py-2 text-xs rounded-lg transition-colors cursor-pointer text-left ${
                            isCurrent
                              ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/30'
                              : 'text-zinc-300 hover:text-white hover:bg-zinc-800/70'
                          }`}
                        >
                          <div className="min-w-0 pr-2">
                            <div className="font-semibold flex items-center gap-1.5 truncate">
                              <span>{rel.platformName}</span>
                              <span className="text-[11px] text-zinc-400 font-mono font-normal">({rel.arch})</span>
                            </div>
                            <div className="text-[10px] text-zinc-500 truncate font-mono">
                              {rel.format}
                            </div>
                          </div>
                          <div className="text-right shrink-0">
                            <span className="font-mono text-[11px] text-zinc-400">{rel.fileSize}</span>
                            {isCurrent && (
                              <div className="flex items-center gap-1 text-[10px] text-emerald-400 font-mono">
                                <Check className="w-3 h-3" /> Detected
                              </div>
                            )}
                          </div>
                        </button>
                      )
                    })}
                  </div>
                  <div className="pt-2 px-2 border-t border-zinc-800 text-[11px] text-zinc-500 flex justify-between items-center">
                    <a href="#checksums" onClick={() => setIsDropdownOpen(false)} className="hover:text-zinc-300 underline underline-offset-2">
                      View SHA-256 Checksums
                    </a>
                    <span>Offline PGP Signed</span>
                  </div>
                </div>
              )}
            </div>

            {/* Secondary CTA: Use Web App */}
            <a
              href={WEB_APP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-5 py-3.5 rounded-xl border border-zinc-800 hover:border-zinc-700 bg-zinc-900/60 hover:bg-zinc-800/80 text-zinc-200 hover:text-white text-sm sm:text-base font-medium transition-all flex items-center justify-center gap-2 group cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-zinc-400 group-hover:text-amber-400 transition-colors" />
              <span>Use Web App Online</span>
              <ExternalLink className="w-3.5 h-3.5 text-zinc-500 group-hover:text-zinc-300 transition-colors" />
            </a>
          </div>

          {/* Quick Meta Subtext */}
          <div className="text-xs text-zinc-500 font-mono flex items-center justify-center gap-4 pt-1">
            <span className="flex items-center gap-1">
              <Check className="w-3.5 h-3.5 text-emerald-400" /> Standalone ~14 MB
            </span>
            <span className="text-zinc-700">•</span>
            <span className="flex items-center gap-1">
              <Check className="w-3.5 h-3.5 text-emerald-400" /> Windows, Mac, Linux, Android
            </span>
            <span className="text-zinc-700">•</span>
            <span className="flex items-center gap-1">
              <Check className="w-3.5 h-3.5 text-emerald-400" /> Zero Sockets Opened
            </span>
          </div>

        </div>

        {/* Verifiable Local Pipeline Card (Interactive Developer Showcase) */}
        <div className="mt-14 max-w-4xl mx-auto">
          <div className="relative rounded-2xl bg-zinc-900/80 border border-zinc-800 p-1 shadow-2xl shadow-black/80">
            {/* Header bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 border-b border-zinc-800/80 bg-zinc-950/60 rounded-t-xl text-xs font-mono">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-zinc-700"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-zinc-700"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-zinc-700"></span>
                </div>
                <span className="text-zinc-400 ml-2 font-medium">zeroegress-runtime-v2.0.0</span>
                <span className="px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400 text-[10px]">LOCAL ONLY</span>
              </div>

              {/* Air-gap verification metric */}
              <div className="flex items-center gap-3">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px]">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Outbound Traffic: 0 B/s (Air-Gapped)</span>
                </div>
                <button
                  onClick={triggerSimulation}
                  disabled={isSimulating}
                  className="px-2.5 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors cursor-pointer flex items-center gap-1"
                >
                  <Activity className={`w-3 h-3 ${isSimulating ? 'animate-spin text-emerald-400' : 'text-zinc-400'}`} />
                  <span>{isSimulating ? 'Processing...' : 'Run Pipeline'}</span>
                </button>
              </div>
            </div>

            {/* Interactive Test Configuration Tabs */}
            <div className="p-4 sm:p-6 bg-zinc-950/40">
              <div className="flex items-center gap-2 mb-4 overflow-x-auto pb-1 text-xs font-mono">
                <span className="text-zinc-500 mr-1">Workload Preset:</span>
                <button
                  onClick={() => setSelectedPreset('video')}
                  className={`px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
                    selectedPreset === 'video'
                      ? 'bg-zinc-800 text-white border-zinc-600 font-medium'
                      : 'bg-zinc-900/50 text-zinc-400 border-zinc-800 hover:text-zinc-200'
                  }`}
                >
                  4K ProRes Transcode (4.2 GB)
                </button>
                <button
                  onClick={() => setSelectedPreset('pdf')}
                  className={`px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
                    selectedPreset === 'pdf'
                      ? 'bg-zinc-800 text-white border-zinc-600 font-medium'
                      : 'bg-zinc-900/50 text-zinc-400 border-zinc-800 hover:text-zinc-200'
                  }`}
                >
                  Neural OCR & Sanitize (850 MB)
                </button>
                <button
                  onClick={() => setSelectedPreset('archive')}
                  className={`px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
                    selectedPreset === 'archive'
                      ? 'bg-zinc-800 text-white border-zinc-600 font-medium'
                      : 'bg-zinc-900/50 text-zinc-400 border-zinc-800 hover:text-zinc-200'
                  }`}
                >
                  Batch Zstd Compress (12.4 GB)
                </button>
              </div>

              {/* Pipeline Step Grid */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-left">
                {/* Step 1: Input */}
                <div className="p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800/80 space-y-1.5">
                  <div className="flex items-center justify-between text-zinc-500 text-xs font-mono">
                    <span className="flex items-center gap-1.5">
                      <HardDrive className="w-3.5 h-3.5 text-zinc-400" /> Source File
                    </span>
                    <span className="text-zinc-400">Step 1</span>
                  </div>
                  <div className="font-mono text-sm text-zinc-200 truncate font-semibold">
                    {selectedPreset === 'video' && 'raw_4k_cinematic.mov'}
                    {selectedPreset === 'pdf' && 'merger_nda_scanned.pdf'}
                    {selectedPreset === 'archive' && 'database_dump_2026.sql'}
                  </div>
                  <div className="text-xs text-zinc-500 font-mono">
                    {selectedPreset === 'video' && 'Size: 4.21 GB • NVMe Direct'}
                    {selectedPreset === 'pdf' && 'Size: 849.2 MB • Scanned 300DPI'}
                    {selectedPreset === 'archive' && 'Size: 12.40 GB • Raw SQL Dump'}
                  </div>
                </div>

                {/* Step 2: Local Hardware Engine */}
                <div className="p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800/80 space-y-1.5">
                  <div className="flex items-center justify-between text-zinc-500 text-xs font-mono">
                    <span className="flex items-center gap-1.5">
                      <Cpu className="w-3.5 h-3.5 text-sky-400" /> Acceleration
                    </span>
                    <span className="text-sky-400">Step 2</span>
                  </div>
                  <div className="font-mono text-sm text-zinc-200 truncate font-semibold">
                    {selectedPreset === 'video' && 'NVENC / VideoToolbox'}
                    {selectedPreset === 'pdf' && 'SIMD Neural OCR Vector'}
                    {selectedPreset === 'archive' && 'Multi-threaded Zstd 16c'}
                  </div>
                  <div className="text-xs text-zinc-500 font-mono">
                    RAM Pinned: 48.2 MB
                  </div>
                </div>

                {/* Step 3: Air-Gap Verification */}
                <div className="p-3.5 rounded-xl bg-zinc-900/60 border border-emerald-900/40 space-y-1.5">
                  <div className="flex items-center justify-between text-zinc-500 text-xs font-mono">
                    <span className="flex items-center gap-1.5">
                      <Network className="w-3.5 h-3.5 text-emerald-400" /> Telemetry Egress
                    </span>
                    <span className="text-emerald-400">Step 3</span>
                  </div>
                  <div className="font-mono text-sm text-emerald-400 truncate font-semibold flex items-center gap-1">
                    <Check className="w-4 h-4" /> 0.00 Bytes Egress
                  </div>
                  <div className="text-xs text-zinc-500 font-mono">
                    Socket state: CLOSED
                  </div>
                </div>

                {/* Step 4: Output Destination */}
                <div className="p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800/80 space-y-1.5">
                  <div className="flex items-center justify-between text-zinc-500 text-xs font-mono">
                    <span className="flex items-center gap-1.5">
                      <HardDrive className="w-3.5 h-3.5 text-amber-400" /> Output Target
                    </span>
                    <span className="text-zinc-400">Step 4</span>
                  </div>
                  <div className="font-mono text-sm text-zinc-200 truncate font-semibold">
                    {selectedPreset === 'video' && 'cinematic_prores.mov'}
                    {selectedPreset === 'pdf' && 'merger_nda_sanitized.pdf'}
                    {selectedPreset === 'archive' && 'database_2026.zst'}
                  </div>
                  <div className="text-xs text-emerald-400 font-mono flex items-center gap-1">
                    {simProgress === 100 ? 'Status: Ready on Disk' : `Processing: ${simProgress}%`}
                  </div>
                </div>
              </div>

              {/* Progress bar */}
              <div className="mt-4 pt-3 border-t border-zinc-800/60 flex items-center justify-between gap-4 text-xs font-mono">
                <div className="flex-1 bg-zinc-800/80 h-1.5 rounded-full overflow-hidden">
                  <div 
                    className="bg-emerald-400 h-full transition-all duration-200 rounded-full"
                    style={{ width: `${simProgress}%` }}
                  />
                </div>
                <span className="text-zinc-400 shrink-0">
                  {simProgress === 100 ? 'Air-gapped process verified' : `Streaming ${simProgress}%`}
                </span>
              </div>
            </div>

            {/* CLI Snippet Footer */}
            <div className="px-4 py-2.5 bg-zinc-950/90 rounded-b-xl border-t border-zinc-800/80 flex items-center justify-between text-xs font-mono text-zinc-500">
              <div className="flex items-center gap-2 text-zinc-400 truncate">
                <Terminal className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                <span className="text-zinc-500">$</span>
                <span className="truncate">zeroegress convert source.mov --profile prores-hq --air-gap strict</span>
              </div>
              <a 
                href="#cli" 
                className="hover:text-zinc-300 shrink-0 ml-4 flex items-center gap-1 text-[11px] text-zinc-400"
              >
                <span>CLI Spec</span>
                <ArrowRight className="w-3 h-3" />
              </a>
            </div>

          </div>
        </div>

      </div>
    </section>
  )
}
