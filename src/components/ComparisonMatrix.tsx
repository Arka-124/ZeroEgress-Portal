import React, { useState } from 'react'
import { 
  Check, 
  X, 
  HelpCircle, 
  Globe, 
  Monitor, 
  Download
} from 'lucide-react'
import { COMPARISON_DATA, WEB_APP_URL } from '../data/releases'

export const ComparisonMatrix: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All')

  const categories = ['All', 'Privacy & Security', 'Performance & Scale', 'OS Integration', 'Licensing & Updates']

  const filteredData = activeCategory === 'All' 
    ? COMPARISON_DATA 
    : COMPARISON_DATA.filter((item) => item.category === activeCategory)

  const renderValue = (value: string | boolean, isPro: boolean) => {
    if (value === true) {
      return (
        <div className="flex items-center gap-1.5 text-emerald-400 font-medium">
          <div className="w-5 h-5 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
            <Check className="w-3.5 h-3.5" />
          </div>
          <span className="text-xs">Supported</span>
        </div>
      )
    }

    if (value === false) {
      return (
        <div className="flex items-center gap-1.5 text-zinc-500 font-medium">
          <div className="w-5 h-5 rounded-full bg-zinc-800/80 border border-zinc-700/50 flex items-center justify-center">
            <X className="w-3.5 h-3.5" />
          </div>
          <span className="text-xs">Unavailable</span>
        </div>
      )
    }

    return (
      <span className={`text-xs sm:text-sm font-mono leading-relaxed ${
        isPro ? 'text-zinc-200 font-medium' : 'text-zinc-400'
      }`}>
        {value}
      </span>
    )
  }

  return (
    <section id="compare" className="py-24 border-t border-zinc-800/80 bg-zinc-950/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono text-zinc-400 bg-zinc-900 border border-zinc-800">
            <span>Capability Breakdown</span>
            <span className="text-zinc-600">/</span>
            <span className="text-zinc-200">Side-by-Side</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
            Free Web PWA vs. Native Desktop
          </h2>

          <p className="text-base sm:text-lg text-zinc-400 leading-relaxed">
            Both options are strictly client-side with zero telemetry. 
            Native unlocks unlimited file sizes, bare-metal hardware acceleration, and OS workflow hooks.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-zinc-800 text-white border border-zinc-600 shadow-sm'
                    : 'bg-zinc-900/60 text-zinc-400 border border-zinc-800 hover:text-zinc-200 hover:border-zinc-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Comparison Table Container */}
        <div className="max-w-5xl mx-auto overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/40 shadow-2xl shadow-black/80">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-zinc-800 bg-zinc-950/80 text-xs font-mono uppercase tracking-wider text-zinc-400">
                  <th className="py-4 px-6 w-5/12 font-semibold">Capability / Spec</th>
                  <th className="py-4 px-6 w-3/12 font-semibold text-zinc-300">
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4 text-sky-400" />
                      <span>Free Web App (PWA)</span>
                    </div>
                  </th>
                  <th className="py-4 px-6 w-4/12 font-semibold text-white bg-zinc-900/80 border-l border-zinc-800/80">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-emerald-300">
                        <Monitor className="w-4 h-4 text-emerald-400" />
                        <span>Native Desktop / Pro</span>
                      </div>
                      <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        Recommended
                      </span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60 text-sm">
                {filteredData.map((item, idx) => (
                  <tr 
                    key={idx}
                    className="hover:bg-zinc-800/40 transition-colors"
                  >
                    {/* Capability Name */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-zinc-200">
                          {item.feature}
                        </span>
                        {item.tooltip && (
                          <span 
                            title={item.tooltip}
                            className="text-zinc-500 hover:text-zinc-300 cursor-help"
                          >
                            <HelpCircle className="w-3.5 h-3.5" />
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] font-mono text-zinc-500 block mt-0.5">
                        {item.category}
                      </span>
                    </td>

                    {/* Web PWA Value */}
                    <td className="py-4 px-6 align-middle">
                      {renderValue(item.webPwa, false)}
                    </td>

                    {/* Native Pro Value */}
                    <td className="py-4 px-6 align-middle bg-zinc-900/40 border-l border-zinc-800/80">
                      {renderValue(item.nativePro, true)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Table Footer Summary CTA */}
          <div className="p-6 bg-zinc-950/80 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-zinc-400 font-mono text-center sm:text-left">
              <span className="text-emerald-400 font-semibold">Audited Principle:</span> In both environments, your private files never touch a remote server.
            </div>
            <div className="flex items-center gap-3">
              <a
                href={WEB_APP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-lg text-xs font-mono font-medium text-zinc-300 hover:text-white border border-zinc-700 bg-zinc-900 hover:bg-zinc-800 transition-colors"
              >
                Launch Web PWA
              </a>
              <a
                href="#downloads"
                className="px-4 py-2 rounded-lg text-xs font-mono font-medium text-zinc-950 bg-emerald-400 hover:bg-emerald-300 transition-colors flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Native</span>
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
