import { useState } from 'react'
import { ToastProvider } from './components/Toast'
import { useToast } from './context/ToastContext'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { ValuePillars } from './components/ValuePillars'
import { ComparisonMatrix } from './components/ComparisonMatrix'
import { PricingSection } from './components/PricingSection'
import { ChecksumsMatrix } from './components/ChecksumsMatrix'
import { CliQuickstart } from './components/CliQuickstart'
import { Footer } from './components/Footer'
import { LicenseModal } from './components/LicenseModal'
import { DocumentationModal } from './components/DocumentationModal'
import { WEB_APP_URL } from './data/releases'
import type { BinaryRelease } from './types'

function PortalContent() {
  const { showToast } = useToast()
  const [isLicenseModalOpen, setIsLicenseModalOpen] = useState(false)
  const [licenseModalMode, setLicenseModalMode] = useState<'checkout' | 'activation'>('checkout')
  const [isDocsModalOpen, setIsDocsModalOpen] = useState(false)

  const handleDownloadRelease = (release: BinaryRelease) => {
    showToast(
      `Downloading ${release.fileName}`,
      `Size: ${release.fileSize} • Deterministic build verified`,
      'info'
    )

    try {
      const blob = new Blob([
        `ZeroEgress Local Binary Archive\nRelease: v2.0.0\nPlatform: ${release.platformName} (${release.arch})\nSHA256: ${release.sha256}\n\nThis is the standalone distribution binary placeholder for ZeroEgress.\nVisit ${WEB_APP_URL} to launch the Web PWA immediately.`
      ], { type: 'text/plain' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = release.fileName
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } catch {
      // In case environment restricts blob download
    }
  }

  const handleOpenCheckout = () => {
    setLicenseModalMode('checkout')
    setIsLicenseModalOpen(true)
  }

  const handleOpenActivationGuide = () => {
    setLicenseModalMode('activation')
    setIsLicenseModalOpen(true)
  }

  const handleOpenDocs = () => {
    setIsDocsModalOpen(true)
  }

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 selection:bg-emerald-500/30 selection:text-emerald-200">
      {/* Top Fixed Header */}
      <Header
        onOpenDocs={handleOpenDocs}
        onOpenLicenseModal={handleOpenActivationGuide}
      />

      {/* Main Content Sections */}
      <main>
        {/* 1. Hero Section with dynamic OS detection & interactive pipeline */}
        <Hero onSelectRelease={handleDownloadRelease} />

        {/* 2. Core Value Pillars (Why Native?) */}
        <ValuePillars />

        {/* 3. Comparison Matrix (Web vs Native Pro) */}
        <ComparisonMatrix />

        {/* 4. Transparent Pricing & Perpetual License */}
        <PricingSection
          onOpenCheckout={handleOpenCheckout}
          onOpenActivationGuide={handleOpenActivationGuide}
        />

        {/* 5. Release & Checksums Matrix */}
        <ChecksumsMatrix onDownload={handleDownloadRelease} />

        {/* 6. CLI Quickstart & Air-gap Verification */}
        <CliQuickstart />
      </main>

      {/* Footer */}
      <Footer
        onOpenDocs={handleOpenDocs}
        onOpenLicenseModal={handleOpenActivationGuide}
      />

      {/* Modals */}
      <LicenseModal
        key={`${licenseModalMode}-${isLicenseModalOpen ? 'open' : 'closed'}`}
        isOpen={isLicenseModalOpen}
        initialMode={licenseModalMode}
        onClose={() => setIsLicenseModalOpen(false)}
      />

      <DocumentationModal
        isOpen={isDocsModalOpen}
        onClose={() => setIsDocsModalOpen(false)}
      />
    </div>
  )
}

export function App() {
  return (
    <ToastProvider>
      <PortalContent />
    </ToastProvider>
  )
}

export default App
