import React, { useState } from 'react'
import { 
  Download, 
  Copy, 
  Check, 
  Search, 
  FileCheck 
} from 'lucide-react'
import { BINARY_RELEASES } from '../data/releases'
import type { BinaryRelease, PlatformKey } from '../types'
import { useToast } from '../context/ToastContext'
import { useAppVersion } from '../hooks/useAppVersion'

interface ChecksumsMatrixProps {
  onDownload: (release: BinaryRelease) => void
}

export const ChecksumsMatrix: React.FC<ChecksumsMatrixProps> = ({ onDownload }) => {
  const { showToast } = useToast()
  const { version } = useAppVersion('2.0.0')
  const [selectedPlatform, setSelectedPlatform] = useState<PlatformKey | 'all'>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [copiedHashId, setCopiedHashId] = useState<string | null>(null)
  const [activeVerifyTab, setActiveVerifyTab] = useState<'windows' | 'unix' | 'gpg'>('windows')

  const handleCopyHash = (id: string, hash: string) => {
    navigator.clipboard.writeText(hash)
    setCopiedHashId(id)
    showToast('SHA-256 Hash Copied', hash, 'success')
    setTimeout(() => {
      setCopiedHashId(null)
    }, 2500)
  }

  const filteredReleases = BINARY_RELEASES.filter((r) => {
    const matchesPlatform = selectedPlatform === 'all' || r.platform === selectedPlatform
    const matchesSearch = 
      r.fileName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.platformName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.arch.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.format.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesPlatform && matchesSearch
  })

  return (
    <section id="downloads" className="py-24 border-t border-zinc-800/80 bg-zinc-950/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono text-zinc-400 bg-zinc-900 border border-zinc-800">
            <span>Cryptographic Integrity</span>
            <span className="text-zinc-600">/</span>
            <span className="text-emerald-400">Official Binaries</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
            Release & Checksums Matrix
          </h2>

          <p className="text-base sm:text-lg text-zinc-400 leading-relaxed">
            All production builds of ZeroEgress <span className="font-mono text-zinc-200">{version}</span> are deterministically compiled and signed. 
            Verify the SHA-256 hash before running on air-gapped workstations.
          </p>
        </div>

        {/* Filter Tabs & Search Bar */}
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-6">
          {/* Platform Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-mono">
            <button
              onClick={() => setSelectedPlatform('all')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                selectedPlatform === 'all'
                  ? 'bg-zinc-800 text-white font-medium shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              All Binaries ({BINARY_RELEASES.length})
            </button>
            <button
              onClick={() => setSelectedPlatform('windows')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                selectedPlatform === 'windows'
                  ? 'bg-zinc-800 text-white font-medium shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Windows
            </button>
            <button
              onClick={() => setSelectedPlatform('macos')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                selectedPlatform === 'macos'
                  ? 'bg-zinc-800 text-white font-medium shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              macOS
            </button>
            <button
              onClick={() => setSelectedPlatform('linux')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                selectedPlatform === 'linux'
                  ? 'bg-zinc-800 text-white font-medium shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Linux
            </button>
            <button
              onClick={() => setSelectedPlatform('android')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                selectedPlatform === 'android'
                  ? 'bg-zinc-800 text-white font-medium shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Android
            </button>
          </div>

          {/* Search Filter */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search package or arch..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs font-mono rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-zinc-600 transition-colors"
            />
          </div>
        </div>

        {/* Releases Table Container */}
        <div className="max-w-5xl mx-auto rounded-2xl border border-zinc-800 bg-zinc-900/50 shadow-2xl shadow-black/80 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-zinc-800 bg-zinc-950/80 text-xs font-mono uppercase tracking-wider text-zinc-400">
                  <th className="py-3.5 px-6 font-semibold">Platform & Architecture</th>
                  <th className="py-3.5 px-6 font-semibold">File Name</th>
                  <th className="py-3.5 px-6 font-semibold">Size</th>
                  <th className="py-3.5 px-6 font-semibold">SHA-256 Checksum</th>
                  <th className="py-3.5 px-6 font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60 text-xs font-mono">
                {filteredReleases.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-zinc-500">
                      No matching binaries found for "{searchQuery}".
                    </td>
                  </tr>
                ) : (
                  filteredReleases.map((rel) => {
                    const isCopied = copiedHashId === rel.id
                    return (
                      <tr key={rel.id} className="hover:bg-zinc-800/40 transition-colors">
                        
                        {/* Platform & Arch */}
                        <td className="py-4 px-6">
                          <div className="font-semibold text-zinc-200 text-sm font-sans flex items-center gap-2">
                            <span>{rel.platformName}</span>
                            <span className="text-[11px] font-mono text-zinc-400 px-1.5 py-0.5 rounded bg-zinc-800 border border-zinc-700/60">
                              {rel.arch}
                            </span>
                          </div>
                          <div className="text-[11px] text-zinc-500 font-mono mt-0.5">
                            {rel.recommendedFor}
                          </div>
                        </td>

                        {/* File Name */}
                        <td className="py-4 px-6">
                          <div className="text-zinc-300 font-semibold truncate max-w-xs" title={rel.fileName}>
                            {rel.fileName}
                          </div>
                          <div className="text-[11px] text-zinc-500">
                            {rel.format}
                          </div>
                        </td>

                        {/* File Size */}
                        <td className="py-4 px-6 text-zinc-300 font-medium">
                          {rel.fileSize}
                        </td>

                        {/* SHA-256 Hash snippet with copy */}
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-2">
                            <span 
                              className="font-mono text-zinc-400 bg-zinc-950 px-2 py-1 rounded border border-zinc-800/80 text-[11px] max-w-[140px] sm:max-w-[170px] truncate"
                              title={rel.sha256}
                            >
                              {rel.sha256.substring(0, 10)}...{rel.sha256.substring(rel.sha256.length - 8)}
                            </span>
                            <button
                              onClick={() => handleCopyHash(rel.id, rel.sha256)}
                              className="p-1 rounded bg-zinc-800/80 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                              title="Copy full SHA-256 hash"
                              aria-label="Copy hash"
                            >
                              {isCopied ? (
                                <Check className="w-3.5 h-3.5 text-emerald-400" />
                              ) : (
                                <Copy className="w-3.5 h-3.5" />
                              )}
                            </button>
                          </div>
                        </td>

                        {/* Direct Download Link */}
                        <td className="py-4 px-6 text-right">
                          <button
                            onClick={() => onDownload(rel)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-100 hover:bg-white text-zinc-950 text-xs font-semibold font-sans transition-all shadow-sm hover:shadow-zinc-200/20 cursor-pointer"
                          >
                            <Download className="w-3.5 h-3.5" />
                            <span>Download</span>
                          </button>
                        </td>

                      </tr>
                    )
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Verification Terminal Drawer */}
        <div id="cli" className="max-w-5xl mx-auto mt-8 p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-2">
              <FileCheck className="w-4 h-4 text-emerald-400" />
              <h4 className="text-sm font-semibold text-white">How to Verify Signatures & Checksums</h4>
            </div>

            {/* Platform tabs for verification commands */}
            <div className="flex items-center gap-1 bg-zinc-950 p-1 rounded-lg border border-zinc-800 text-xs font-mono">
              <button
                onClick={() => setActiveVerifyTab('windows')}
                className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                  activeVerifyTab === 'windows' ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                PowerShell
              </button>
              <button
                onClick={() => setActiveVerifyTab('unix')}
                className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                  activeVerifyTab === 'unix' ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                macOS / Linux
              </button>
              <button
                onClick={() => setActiveVerifyTab('gpg')}
                className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                  activeVerifyTab === 'gpg' ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                GPG Signature
              </button>
            </div>
          </div>

          <div className="rounded-xl bg-zinc-950 border border-zinc-800/80 p-4 font-mono text-xs text-zinc-300 overflow-x-auto">
            {activeVerifyTab === 'windows' && (
              <pre className="text-zinc-300">
                <span className="text-zinc-500"># Verify SHA-256 hash in Windows PowerShell:</span>{'\n'}
                <span className="text-emerald-400">Get-FileHash</span> .\ZeroEgress-v2.0.0-windows-x64-setup.exe -Algorithm SHA256{'\n\n'}
                <span className="text-zinc-500"># Expected output algorithm: SHA256</span>{'\n'}
                <span className="text-zinc-400">9F83A21B8C0E1457A4192D6E3F4A9B8C01D4E7F2A5B8C9D0E1F2A3B4C5D6E7F8</span>
              </pre>
            )}

            {activeVerifyTab === 'unix' && (
              <pre className="text-zinc-300">
                <span className="text-zinc-500"># macOS / Linux terminal verification:</span>{'\n'}
                <span className="text-emerald-400">shasum</span> -a 256 ZeroEgress-v2.0.0-macos-arm64.dmg{'\n'}
                <span className="text-zinc-500"># or on Linux:</span>{'\n'}
                <span className="text-emerald-400">sha256sum</span> ZeroEgress-v2.0.0-linux-x86_64.AppImage
              </pre>
            )}

            {activeVerifyTab === 'gpg' && (
              <pre className="text-zinc-300">
                <span className="text-zinc-500"># Verify offline release PGP signature:</span>{'\n'}
                <span className="text-emerald-400">gpg</span> --keyserver keys.openpgp.org --recv-keys 4A8B9C0D1E2F3A4B{'\n'}
                <span className="text-emerald-400">gpg</span> --verify ZeroEgress-v2.0.0-*.sig ZeroEgress-v2.0.0-*
              </pre>
            )}
          </div>
        </div>

      </div>
    </section>
  )
}
