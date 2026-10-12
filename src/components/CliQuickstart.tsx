import React, { useState } from 'react'
import { 
  Terminal, 
  Copy, 
  Check, 
  ShieldCheck, 
  Workflow, 
  HardDrive 
} from 'lucide-react'
import { useToast } from '../context/ToastContext'

export const CliQuickstart: React.FC = () => {
  const { showToast } = useToast()
  const [activeTab, setActiveTab] = useState<'convert' | 'watch' | 'audit'>('convert')
  const [copied, setCopied] = useState(false)

  const snippets = {
    convert: `# Transcode a massive 4K raw video locally without browser limits
zeroegress convert input_footage.mov \\
  --format prores-422-hq \\
  --accel nvenc \\
  --threads 16 \\
  --egress-check strict`,
    watch: `# Run autonomous background daemon for drop-folder processing
zeroegress watch ~/Downloads/Incoming \\
  --destination ~/Sanitized_Output \\
  --pipeline "pdf-flatten,exif-strip,neural-ocr" \\
  --daemon`,
    audit: `# Verify zero open sockets or external queries while processing
zeroegress doctor --network-audit --inspect-pid $(pgrep zeroegress)

# Output:
# [PASS] Sockets Bound: 0
# [PASS] Telemetry Pingers: 0
# [PASS] Air-gap Status: STRICT ISOLATION VERIFIED`
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(snippets[activeTab])
    setCopied(true)
    showToast('Copied CLI Command', 'Ready to paste in your terminal', 'success')
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section className="py-20 border-t border-zinc-800/80 bg-zinc-950/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono text-zinc-400 bg-zinc-900 border border-zinc-800">
            <Terminal className="w-3.5 h-3.5 text-zinc-400" />
            <span>Developer-First CLI</span>
            <span className="text-zinc-600">/</span>
            <span className="text-emerald-400">Headless Automation</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Script It in Bash, Zsh, or PowerShell
          </h2>

          <p className="text-base text-zinc-400 leading-relaxed">
            Prefer terminal workflows? The standalone <code className="text-zinc-200 bg-zinc-800 px-1.5 py-0.5 rounded text-xs font-mono">zeroegress</code> binary works headlessly in build scripts, CI pipelines, and local batch cron jobs.
          </p>
        </div>

        <div className="max-w-4xl mx-auto rounded-2xl bg-zinc-900/60 border border-zinc-800 shadow-2xl overflow-hidden">
          {/* Header Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 bg-zinc-950 border-b border-zinc-800">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 mr-2">
                <span className="w-2.5 h-2.5 rounded-full bg-zinc-700"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-zinc-700"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-zinc-700"></span>
              </div>
              
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setActiveTab('convert')}
                  className={`px-3 py-1 rounded-md text-xs font-mono transition-colors cursor-pointer ${
                    activeTab === 'convert'
                      ? 'bg-zinc-800 text-white font-medium'
                      : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  zeroegress convert
                </button>
                <button
                  onClick={() => setActiveTab('watch')}
                  className={`px-3 py-1 rounded-md text-xs font-mono transition-colors cursor-pointer ${
                    activeTab === 'watch'
                      ? 'bg-zinc-800 text-white font-medium'
                      : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  zeroegress watch
                </button>
                <button
                  onClick={() => setActiveTab('audit')}
                  className={`px-3 py-1 rounded-md text-xs font-mono transition-colors cursor-pointer ${
                    activeTab === 'audit'
                      ? 'bg-zinc-800 text-white font-medium'
                      : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  zeroegress doctor
                </button>
              </div>
            </div>

            <button
              onClick={handleCopy}
              className="px-2.5 py-1 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white text-xs font-mono transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-zinc-400" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>

          {/* Terminal Code Body */}
          <div className="p-6 bg-zinc-950/70 font-mono text-xs sm:text-sm text-zinc-200 overflow-x-auto">
            <pre className="leading-relaxed whitespace-pre font-mono text-zinc-300">
              {snippets[activeTab]}
            </pre>
          </div>

          {/* Bottom Features Strip */}
          <div className="px-6 py-3 bg-zinc-950/90 border-t border-zinc-800 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-zinc-500">
            <span className="flex items-center gap-1.5 text-zinc-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              Air-Gapped Flag Enabled by Default
            </span>
            <span className="flex items-center gap-1.5 text-zinc-400">
              <Workflow className="w-3.5 h-3.5 text-sky-400" />
              Exit code 0 on verified zero egress
            </span>
            <span className="flex items-center gap-1.5 text-zinc-400">
              <HardDrive className="w-3.5 h-3.5 text-amber-400" />
              Zero temporary files left behind
            </span>
          </div>
        </div>

      </div>
    </section>
  )
}
