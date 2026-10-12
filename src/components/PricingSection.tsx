import React from 'react'
import { 
  Check, 
  Sparkles, 
  KeyRound, 
  ArrowRight, 
  Zap, 
  CreditCard, 
  Lock,
  ExternalLink
} from 'lucide-react'
import { PRICING_PLANS, WEB_APP_URL } from '../data/releases'

interface PricingSectionProps {
  onOpenCheckout: () => void
  onOpenActivationGuide: () => void
}

export const PricingSection: React.FC<PricingSectionProps> = ({
  onOpenCheckout,
  onOpenActivationGuide
}) => {
  return (
    <section id="pricing" className="py-24 border-t border-zinc-800/80 bg-zinc-950/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono text-zinc-400 bg-zinc-900 border border-zinc-800">
            <span>Transparent Licensing</span>
            <span className="text-zinc-600">/</span>
            <span className="text-emerald-400">No Subscriptions. Pay Once, Use Offline Forever.</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
            100% Free Web App.{' '}
            <span className="text-emerald-400">₹99 Native License.</span>
          </h2>

          <p className="text-base sm:text-lg text-zinc-400 leading-relaxed">
            The browser web app is completely free with zero paywalls or accounts. 
            The ₹99 one-time license unlocks standalone desktop binaries, OS right-click integration, and unlimited file batching.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          
          {/* Card 1: Free Web App */}
          <div className="rounded-2xl bg-zinc-900/40 border border-zinc-800 p-8 flex flex-col justify-between hover:border-zinc-700/80 transition-all">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-white tracking-tight">
                    {PRICING_PLANS[0].name}
                  </h3>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    {PRICING_PLANS[0].tagline}
                  </p>
                </div>
                <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">
                  {PRICING_PLANS[0].badge}
                </span>
              </div>

              {/* Price display */}
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-extrabold text-white tracking-tight">
                  {PRICING_PLANS[0].price}
                </span>
                <span className="text-xs font-mono text-zinc-500">
                  {PRICING_PLANS[0].period}
                </span>
              </div>

              <p className="text-sm text-zinc-400 leading-relaxed">
                {PRICING_PLANS[0].description}
              </p>

              {/* Features list */}
              <div className="space-y-3 pt-4 border-t border-zinc-800/80">
                <div className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
                  Web Entitlements (Zero Restrictions):
                </div>
                {PRICING_PLANS[0].features.map((feat, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-sm text-zinc-300">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-8">
              <a
                href={WEB_APP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl text-center text-sm font-semibold bg-zinc-800 hover:bg-zinc-700 text-white transition-colors flex items-center justify-center gap-2 cursor-pointer group"
              >
                <span>{PRICING_PLANS[0].ctaText}</span>
                <ExternalLink className="w-4 h-4 text-zinc-400 group-hover:text-white transition-colors" />
              </a>
            </div>
          </div>

          {/* Card 2: Pro Perpetual License */}
          <div className="relative rounded-2xl bg-zinc-900/90 border-2 border-emerald-500/60 p-8 flex flex-col justify-between shadow-2xl shadow-emerald-950/20">
            {/* Top Recommended Pill */}
            <div className="absolute -top-3.5 right-6 px-3 py-0.5 rounded-full bg-emerald-500 text-zinc-950 text-xs font-bold uppercase tracking-wider shadow-md flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{PRICING_PLANS[1].badge}</span>
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                    <span>{PRICING_PLANS[1].name}</span>
                    <span className="text-emerald-400 text-xs font-mono font-normal">v2.x Lifetime</span>
                  </h3>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    {PRICING_PLANS[1].tagline}
                  </p>
                </div>
              </div>

              {/* Price display */}
              <div className="flex items-baseline gap-2">
                <span className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
                  {PRICING_PLANS[1].price}
                </span>
                <span className="text-xs font-mono text-emerald-400 font-medium">
                  {PRICING_PLANS[1].period}
                </span>
              </div>

              <p className="text-sm text-zinc-300 leading-relaxed">
                {PRICING_PLANS[1].description}
              </p>

              {/* Features list */}
              <div className="space-y-3 pt-4 border-t border-zinc-800">
                <div className="text-xs font-mono text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5" />
                  <span>Native Desktop Entitlements:</span>
                </div>
                {PRICING_PLANS[1].features.map((feat, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-sm text-zinc-200">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span className={i < 4 ? 'font-medium text-white' : ''}>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-8 space-y-3">
              <button
                type="button"
                onClick={onOpenCheckout}
                className="w-full py-3.5 px-4 rounded-xl text-center text-sm font-bold bg-emerald-400 hover:bg-emerald-300 text-zinc-950 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-emerald-500/20 group"
              >
                <CreditCard className="w-4 h-4 text-zinc-950" />
                <span>{PRICING_PLANS[1].ctaText}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={onOpenActivationGuide}
                  className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-zinc-200 underline underline-offset-4 font-mono transition-colors cursor-pointer"
                >
                  <KeyRound className="w-3.5 h-3.5 text-zinc-500" />
                  <span>Already have a license key? Activation guide</span>
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Air-Gapped License Guarantee Note */}
        <div className="mt-12 max-w-2xl mx-auto text-center space-y-2">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 bg-zinc-900/60 border border-zinc-800/80 px-4 py-2 rounded-xl">
            <Lock className="w-3.5 h-3.5 text-emerald-400" />
            <span>Air-Gapped Offline Validation: Pro keys use Ed25519 asymmetric cryptography. Validated without internet access.</span>
          </div>
          <p className="text-xs text-zinc-500">
            Secure checkout with instant digital license key generation.
          </p>
        </div>

      </div>
    </section>
  )
}
