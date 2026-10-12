import React, { useState } from 'react'
import { 
  ShieldCheck, 
  Cpu, 
  Layers, 
  Zap, 
  Copy, 
  Check, 
  Terminal,
  ArrowUpRight
} from 'lucide-react'
import { VALUE_PILLARS } from '../data/releases'
import { useToast } from '../context/ToastContext'

export const ValuePillars: React.FC = () => {
  const { showToast } = useToast()
  const [copiedSnippetId, setCopiedSnippetId] = useState<string | null>(null)

  const handleCopySnippet = (id: string, snippet: string) => {
    navigator.clipboard.writeText(snippet)
    setCopiedSnippetId(id)
    showToast('Copied to clipboard', 'Terminal spec copied to clipboard', 'success')
    setTimeout(() => {
      setCopiedSnippetId(null)
    }, 2000)
  }

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5 text-emerald-400" />
      case 'Cpu':
        return <Cpu className="w-5 h-5 text-sky-400" />
      case 'Layers':
        return <Layers className="w-5 h-5 text-violet-400" />
      case 'Zap':
        return <Zap className="w-5 h-5 text-amber-400" />
      default:
        return <ShieldCheck className="w-5 h-5 text-emerald-400" />
    }
  }

  return (
    <section id="features" className="py-24 border-t border-zinc-800/80 bg-zinc-950/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono text-zinc-400 bg-zinc-900 border border-zinc-800">
            <span>Engineering Architecture</span>
            <span className="text-zinc-600">/</span>
            <span className="text-zinc-200">Why Native Matters</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
            Built for Local Hardware.{' '}
            <span className="text-zinc-400">Not the Cloud.</span>
          </h2>

          <p className="text-base sm:text-lg text-zinc-400 leading-relaxed">
            Web browsers are great for casual tasks, but fail on gigabyte workloads. 
            ZeroEgress leverages bare-metal CPU, GPU, and OS capabilities without leaking a single byte of telemetry.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {VALUE_PILLARS.map((pillar) => (
            <div
              key={pillar.id}
              className="group relative rounded-2xl bg-zinc-900/60 border border-zinc-800 hover:border-zinc-700/80 p-6 sm:p-8 transition-all duration-200 hover:shadow-2xl hover:shadow-black/60 flex flex-col justify-between"
            >
              {/* Header Info */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-zinc-800/80 border border-zinc-700/60 flex items-center justify-center shadow-inner">
                    {getIcon(pillar.icon)}
                  </div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 px-2.5 py-1 rounded-full bg-zinc-950 border border-zinc-800">
                    {pillar.badge}
                  </span>
                </div>

                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2 group-hover:text-emerald-300 transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="text-sm font-medium text-zinc-300 mt-1">
                    {pillar.tagline}
                  </p>
                </div>

                <p className="text-sm text-zinc-400 leading-relaxed">
                  {pillar.description}
                </p>

                {/* Technical Stats Strip */}
                <div className="grid grid-cols-3 gap-2 py-3 border-y border-zinc-800/80 my-4 bg-zinc-950/40 rounded-xl px-3">
                  {pillar.stats.map((stat, i) => (
                    <div key={i} className="text-left">
                      <div className="text-[10px] uppercase font-mono text-zinc-500 truncate">
                        {stat.label}
                      </div>
                      <div className="text-xs sm:text-sm font-bold font-mono text-zinc-200 mt-0.5">
                        {stat.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Code Snippet / Terminal Box */}
              {pillar.codeSnippet && (
                <div className="mt-4 pt-2">
                  <div className="relative rounded-xl bg-zinc-950 border border-zinc-800/90 p-3.5 font-mono text-xs text-zinc-300">
                    <div className="flex items-center justify-between pb-2 mb-2 border-b border-zinc-800/60 text-zinc-500 text-[11px]">
                      <span className="flex items-center gap-1.5">
                        <Terminal className="w-3.5 h-3.5 text-zinc-400" />
                        Verification Log
                      </span>
                      <button
                        onClick={() => handleCopySnippet(pillar.id, pillar.codeSnippet!)}
                        className="p-1 hover:text-white rounded hover:bg-zinc-800/80 transition-colors cursor-pointer flex items-center gap-1"
                        title="Copy snippet"
                      >
                        {copiedSnippetId === pillar.id ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-400" />
                            <span className="text-[10px] text-emerald-400">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span className="text-[10px]">Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                    <pre className="overflow-x-auto whitespace-pre leading-relaxed text-zinc-300 font-mono text-[11px] scrollbar-thin">
                      {pillar.codeSnippet}
                    </pre>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Wireshark & Audit Guarantee Banner */}
        <div className="mt-12 p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800/90 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0 mt-0.5">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h4 className="text-base font-semibold text-white">
                Don't Trust Us. Inspect the Sockets Yourself.
              </h4>
              <p className="text-sm text-zinc-400 mt-0.5">
                ZeroEgress binaries contain zero analytical SDKs or telemetry pings. 
                Monitor the PID with <code className="text-zinc-200 bg-zinc-800 px-1.5 py-0.5 rounded text-xs font-mono">netstat</code>, <code className="text-zinc-200 bg-zinc-800 px-1.5 py-0.5 rounded text-xs font-mono">lsof</code>, or Wireshark to confirm zero egress.
              </p>
            </div>
          </div>
          <a
            href="#cli"
            className="shrink-0 px-4 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 hover:text-white text-xs font-mono font-medium transition-colors flex items-center gap-1.5"
          >
            <span>Run Network Audit Guide</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400" />
          </a>
        </div>

      </div>
    </section>
  )
}
