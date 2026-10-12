import React, { useState } from 'react'
import { 
  X, 
  ShieldCheck 
} from 'lucide-react'
import { BrandLogo } from './BrandLogo'

interface DocumentationModalProps {
  isOpen: boolean
  onClose: () => void
}

export const DocumentationModal: React.FC<DocumentationModalProps> = ({
  isOpen,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState<'architecture' | 'formats' | 'security' | 'cli'>('architecture')

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-3xl rounded-2xl bg-zinc-900 border border-zinc-700/80 shadow-2xl shadow-black p-6 sm:p-8 text-zinc-100 max-h-[90vh] flex flex-col">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-2.5 pb-4 border-b border-zinc-800">
          <div className="w-8 h-8 rounded-xl bg-zinc-900 border border-zinc-700/80 flex items-center justify-center p-1">
            <BrandLogo size={20} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">ZeroEgress Documentation</h3>
            <p className="text-xs text-zinc-400 font-mono">Architecture, Formats & Security Spec</p>
          </div>
        </div>

        {/* Subtabs */}
        <div className="flex items-center gap-1.5 py-3 border-b border-zinc-800/80 overflow-x-auto text-xs font-mono">
          <button
            onClick={() => setActiveTab('architecture')}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              activeTab === 'architecture' ? 'bg-zinc-800 text-white font-medium' : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Air-Gap Architecture
          </button>
          <button
            onClick={() => setActiveTab('formats')}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              activeTab === 'formats' ? 'bg-zinc-800 text-white font-medium' : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Supported Codecs & Formats
          </button>
          <button
            onClick={() => setActiveTab('security')}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              activeTab === 'security' ? 'bg-zinc-800 text-white font-medium' : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Security & Compliance
          </button>
          <button
            onClick={() => setActiveTab('cli')}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              activeTab === 'cli' ? 'bg-zinc-800 text-white font-medium' : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            CLI Reference
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="overflow-y-auto py-5 space-y-6 text-sm text-zinc-300 pr-2 leading-relaxed scrollbar-thin">
          
          {activeTab === 'architecture' && (
            <div className="space-y-4">
              <h4 className="text-base font-semibold text-white">How ZeroEgress Eliminates Egress</h4>
              <p>
                ZeroEgress is engineered around a simple thesis: <strong className="text-zinc-100">sensitive data should never touch a network interface</strong>. Traditional web-based converters upload your files to remote cloud buckets (AWS S3, GCP Cloud Storage) where your data is vulnerable to misconfigurations, retention policies, and unauthorized inspection.
              </p>
              
              <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2 text-xs font-mono">
                <div className="text-emerald-400 font-semibold">// The ZeroEgress Execution Chain:</div>
                <div>1. File opened via OS direct file descriptor (POSIX read / Win32 CreateFileW)</div>
                <div>2. Streamed through local ring buffer (chunked 64MB streaming pipeline)</div>
                <div>3. Processed by local native SIMD / GPU hardware kernels (NVENC, VideoToolbox, AVX-512)</div>
                <div>4. Written directly to target disk path without intermediate cloud staging</div>
                <div>5. Memory pages wiped and unmapped upon job completion</div>
              </div>

              <p>
                In the Web PWA version, execution runs inside browser sandboxed WebAssembly threads using the HTML5 File System Access API. In the Native version, binaries bind zero network sockets, eliminating attack surfaces entirely.
              </p>
            </div>
          )}

          {activeTab === 'formats' && (
            <div className="space-y-4">
              <h4 className="text-base font-semibold text-white">Supported Formats & Hardware Engines</h4>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800 space-y-1">
                  <div className="font-semibold text-zinc-100">Video & Cinema Formats</div>
                  <div className="text-zinc-400 font-mono">ProRes 422/4444, MP4 (H.264/H.265/AV1), MKV, MOV, WebM (VP9/AV1)</div>
                  <div className="text-[11px] text-emerald-400 font-mono">Hardware: NVENC, VideoToolbox, QSV, VA-API</div>
                </div>

                <div className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800 space-y-1">
                  <div className="font-semibold text-zinc-100">Documents & PDFs</div>
                  <div className="text-zinc-400 font-mono">PDF (Flatten, Sanitize, Strip Metadata), DOCX, XLSX, EPUB, TXT</div>
                  <div className="text-[11px] text-emerald-400 font-mono">Engine: Local Poppler & Neural OCR</div>
                </div>

                <div className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800 space-y-1">
                  <div className="font-semibold text-zinc-100">High-Resolution Images</div>
                  <div className="text-zinc-400 font-mono">AVIF, WebP, PNG, JPEG, SVG, TIFF, HEIC, RAW (CR3, ARW, NEF)</div>
                  <div className="text-[11px] text-emerald-400 font-mono">Engine: libvips SIMD vectorizer</div>
                </div>

                <div className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800 space-y-1">
                  <div className="font-semibold text-zinc-100">Data & Datasets</div>
                  <div className="text-zinc-400 font-mono">JSON, CSV, TSV, Parquet, SQLite, Zstandard (.zst), Gzip (.gz)</div>
                  <div className="text-[11px] text-emerald-400 font-mono">Engine: Multi-threaded Rust stream engine</div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-4">
              <h4 className="text-base font-semibold text-white">Security Model & Compliance Audit</h4>
              <p>
                ZeroEgress is designed to meet strict regulatory isolation criteria including <strong className="text-zinc-100">HIPAA, GDPR, SOC 2 Type II, and ITAR air-gapped computing rules</strong>.
              </p>

              <div className="space-y-2 text-xs">
                <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 flex items-start gap-3">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-zinc-200">Zero Analytics or Crashlytics:</strong> No bugsnag, no sentry, no google analytics, no segment pings. When an unexpected error occurs, a local crash dump is written to disk only.
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 flex items-start gap-3">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-zinc-200">Ed25519 Cryptographic Licensing:</strong> Pro licenses are signed offline with public-key cryptography. Activation does not make HTTP requests to a license server.
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 flex items-start gap-3">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-zinc-200">Reproducible Builds:</strong> Binaries are compiled in deterministic CI containers. Checksums match Git commit tags byte-for-byte.
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'cli' && (
            <div className="space-y-4">
              <h4 className="text-base font-semibold text-white">CLI Command Reference</h4>
              
              <div className="space-y-3 font-mono text-xs">
                <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800">
                  <div className="text-emerald-400 font-bold mb-1">$ zeroegress convert [INPUT] --format [FORMAT]</div>
                  <div className="text-zinc-400">Options: --accel [nvenc|videotoolbox|cpu] --threads [N] --egress-check strict</div>
                </div>

                <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800">
                  <div className="text-emerald-400 font-bold mb-1">$ zeroegress watch [INPUT_DIR] --destination [OUT_DIR]</div>
                  <div className="text-zinc-400">Options: --pipeline "exif-strip,pdf-flatten" --daemon</div>
                </div>

                <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800">
                  <div className="text-emerald-400 font-bold mb-1">$ zeroegress activate --key [LICENSE_KEY]</div>
                  <div className="text-zinc-400">Validates key offline against embedded Ed25519 public certificate.</div>
                </div>

                <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800">
                  <div className="text-emerald-400 font-bold mb-1">$ zeroegress doctor --network-audit</div>
                  <div className="text-zinc-400">Inspects all PID socket bindings and confirms complete isolation.</div>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="pt-4 border-t border-zinc-800 flex items-center justify-between text-xs font-mono text-zinc-500">
          <span>ZeroEgress Engine Manual v2.0.0</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 hover:text-white transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  )
}
