import type { BinaryRelease, FeaturePillar, ComparisonItem, PricingPlan } from '../types'

export const APP_VERSION = 'v2.0.0'
export const RELEASE_DATE = 'October 2026'
export const WEB_APP_URL = 'https://zero-egress.vercel.app/'

export const BINARY_RELEASES: BinaryRelease[] = [
  {
    id: 'win-exe',
    platform: 'windows',
    platformName: 'Windows',
    arch: 'x86_64',
    fileName: 'ZeroEgress-v2.0.0-windows-x64-setup.exe',
    fileSize: '14.2 MB',
    format: '.exe (Installer)',
    sha256: '9f83a21b8c0e1457a4192d6e3f4a9b8c01d4e7f2a5b8c9d0e1f2a3b4c5d6e7f8',
    sigAvailable: true,
    downloadUrl: '#download-windows-exe',
    recommendedFor: 'Windows 10 / 11 64-bit'
  },
  {
    id: 'win-msi',
    platform: 'windows',
    platformName: 'Windows',
    arch: 'x86_64',
    fileName: 'ZeroEgress-v2.0.0-windows-x64.msi',
    fileSize: '14.8 MB',
    format: '.msi (Enterprise)',
    sha256: '3e4f7a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f',
    sigAvailable: true,
    downloadUrl: '#download-windows-msi',
    recommendedFor: 'Enterprise / Intune / GPO deploy'
  },
  {
    id: 'mac-arm64',
    platform: 'macos',
    platformName: 'macOS',
    arch: 'Apple Silicon (M1/M2/M3/M4)',
    fileName: 'ZeroEgress-v2.0.0-macos-arm64.dmg',
    fileSize: '13.6 MB',
    format: '.dmg (Apple Silicon)',
    sha256: 'a1b2c3d4e5f60718293a4b5c6d7e8f90123456789abcdef0123456789abcdef0',
    sigAvailable: true,
    downloadUrl: '#download-mac-arm64',
    recommendedFor: 'macOS 12.0+ (Apple Silicon)'
  },
  {
    id: 'mac-x64',
    platform: 'macos',
    platformName: 'macOS',
    arch: 'Intel x86_64',
    fileName: 'ZeroEgress-v2.0.0-macos-x64.dmg',
    fileSize: '15.1 MB',
    format: '.dmg (Intel)',
    sha256: 'f1e2d3c4b5a69780123456789abcdef0123456789abcdef0123456789abcdef0',
    sigAvailable: true,
    downloadUrl: '#download-mac-intel',
    recommendedFor: 'macOS 11.0+ (Intel 64-bit)'
  },
  {
    id: 'linux-appimage',
    platform: 'linux',
    platformName: 'Linux',
    arch: 'x86_64',
    fileName: 'ZeroEgress-v2.0.0-linux-x86_64.AppImage',
    fileSize: '16.4 MB',
    format: '.AppImage (Standalone)',
    sha256: '7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d',
    sigAvailable: true,
    downloadUrl: '#download-linux-appimage',
    recommendedFor: 'All Linux distros (GLIBC 2.31+)'
  },
  {
    id: 'linux-deb',
    platform: 'linux',
    platformName: 'Linux',
    arch: 'amd64',
    fileName: 'ZeroEgress-v2.0.0-linux-amd64.deb',
    fileSize: '12.9 MB',
    format: '.deb (Package)',
    sha256: '2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b',
    sigAvailable: true,
    downloadUrl: '#download-linux-deb',
    recommendedFor: 'Ubuntu / Debian / Mint'
  },
  {
    id: 'android-apk',
    platform: 'android',
    platformName: 'Android',
    arch: 'ARM64 / x86_64',
    fileName: 'ZeroEgress-v2.0.0-android-universal.apk',
    fileSize: '11.8 MB',
    format: '.apk (Direct install)',
    sha256: '5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e',
    sigAvailable: true,
    downloadUrl: '#download-android-apk',
    recommendedFor: 'Android 10.0+ Phones & Tablets'
  }
]

export const VALUE_PILLARS: FeaturePillar[] = [
  {
    id: 'zero-egress',
    badge: 'Verifiable Privacy',
    title: 'Zero-Byte Egress',
    tagline: 'No telemetry. No cloud logging. True air-gapped security.',
    description: 'ZeroEgress binds strictly to loopback or operates fully socketless. Run Wireshark or Little Snitch: not a single network packet ever leaves your machine while converting sensitive NDAs, medical records, or proprietary source datasets.',
    stats: [
      { label: 'Outbound Packets', value: '0 bytes' },
      { label: 'Cloud Servers Used', value: '0' },
      { label: 'Privacy Audit', value: 'Verified' }
    ],
    codeSnippet: '$ zeroegress doctor --network-audit\n[✓] Bound sockets: 0\n[✓] External DNS queries: 0\n[✓] Air-gap state: VERIFIED STRICT OFFLINE',
    icon: 'ShieldCheck'
  },
  {
    id: 'bypass-limits',
    badge: 'Scale Without Bounds',
    title: 'Bypass Browser Limits',
    tagline: 'Process multi-gigabyte 4K media and massive PDFs without crashes.',
    description: 'Web browsers suffer from strict 2GB WebAssembly heap limits and memory-hungry garbage collectors that crash tabs on big files. ZeroEgress native pipelines stream directly off NVMe storage in buffered chunks up to multi-terabyte files with flat 45MB RAM overhead.',
    stats: [
      { label: 'Max File Size', value: 'Unlimited' },
      { label: 'RAM Footprint', value: '< 65 MB' },
      { label: 'OOM Tab Crashes', value: '0%' }
    ],
    codeSnippet: '$ zeroegress convert raw_4k_footage.mkv --format prores\n[i] File size: 48.6 GB\n[i] Memory allocated: 42 MB (Buffered streaming)\n[✓] Completed in 2m 14s',
    icon: 'Cpu'
  },
  {
    id: 'shell-integration',
    badge: 'Native Workflow',
    title: 'OS Shell Integration',
    tagline: 'Right-click any file in Explorer or Finder to convert instantly.',
    description: 'No browser tabs to open, no dragging files into slow web upload zones. Deep operating system context menu hooks let you highlight 50 documents or videos, right-click, select "ZeroEgress > Convert to PDF / AVIF / ProRes", and watch them finish in seconds.',
    stats: [
      { label: 'Clicks to Convert', value: '1 Click' },
      { label: 'Windows Explorer', value: 'Native Win11' },
      { label: 'macOS Finder', value: 'Quick Action' }
    ],
    codeSnippet: 'Windows Explorer: Right Click -> "ZeroEgress Instant Convert"\nmacOS Finder: Services -> "ZeroEgress Air-Gapped Sanitize"\nLinux: Nautilus / Dolphin context scripts bundled',
    icon: 'Layers'
  },
  {
    id: 'hardware-acceleration',
    badge: 'Native Silicon Speed',
    title: 'Hardware Acceleration',
    tagline: 'Direct access to NVENC, Apple VideoToolbox, and SIMD threads.',
    description: 'Unlike sandboxed web workers that throttle on CPU software rasterizers, ZeroEgress taps directly into bare metal hardware: NVIDIA NVENC/NVDEC, Apple Silicon Media Engines, Intel QuickSync, and AVX-512 vector extensions for up to 18x faster throughput.',
    stats: [
      { label: 'Speed Multiplier', value: '18x faster' },
      { label: 'GPU Acceleration', value: 'Metal / CUDA / Vulkan' },
      { label: 'AVX-512 / NEON', value: 'Auto-detected' }
    ],
    codeSnippet: '[HW_ACCEL] Pro GPU detected: Apple M4 Pro Media Engine\n[HW_ACCEL] Hardware encoder: VideoToolbox ProRes HW\n[BENCHMARK] 10,000 files processed in 4.8 seconds',
    icon: 'Zap'
  }
]

export const COMPARISON_DATA: ComparisonItem[] = [
  {
    category: 'Privacy & Security',
    feature: '100% Offline / Air-Gapped Execution',
    webPwa: 'Requires initial web page load',
    nativePro: 'Standalone binary, zero network socket requirement',
    tooltip: 'Native runs even on computers with disconnected ethernet and disabled Wi-Fi.'
  },
  {
    category: 'Privacy & Security',
    feature: 'Zero Outbound Telemetry or Analytics',
    webPwa: 'Zero telemetry (verified client-side)',
    nativePro: 'Strict zero byte egress (auditable with Wireshark)',
  },
  {
    category: 'Performance & Scale',
    feature: 'Maximum Single File Size',
    webPwa: '~2 GB (Browser WebAssembly memory ceiling)',
    nativePro: 'Unlimited (Multi-terabyte NVMe streaming chunks)',
    tooltip: 'Web browsers enforce 2GB WebAssembly memory buffer limits.'
  },
  {
    category: 'Performance & Scale',
    feature: 'Hardware Video & Image Encoding',
    webPwa: 'Software WebAssembly codec',
    nativePro: 'NVENC, Apple VideoToolbox, Intel QSV, VA-API',
  },
  {
    category: 'Performance & Scale',
    feature: 'Multi-threaded SIMD Vector Parallelism',
    webPwa: 'Browser Web Workers (Throttled)',
    nativePro: 'All CPU Cores + AVX-512 / ARM NEON native instructions',
  },
  {
    category: 'OS Integration',
    feature: 'OS Context Menu (Right-Click Conversion)',
    webPwa: false,
    nativePro: 'Native Windows 11 Shell, macOS Finder, Linux Nautilus',
  },
  {
    category: 'OS Integration',
    feature: 'Autonomous Watch Folder Automation',
    webPwa: false,
    nativePro: 'Background daemon watches folders & auto-processes',
    tooltip: 'Drop files into a folder and they are automatically sanitized and converted.'
  },
  {
    category: 'OS Integration',
    feature: 'Headless CLI & Scripting API',
    webPwa: false,
    nativePro: 'Included zeroegress CLI for bash, zsh, and PowerShell scripts',
  },
  {
    category: 'Performance & Scale',
    feature: 'Air-Gapped Neural OCR & PDF Flattening',
    webPwa: 'Basic Tesseract.js (Slow)',
    nativePro: 'High-speed SIMD-accelerated neural OCR engine',
  },
  {
    category: 'Licensing & Updates',
    feature: 'Pricing Model',
    webPwa: '$0 Free',
    nativePro: '$29 One-Time Perpetual License (No Subscriptions)',
  }
]

export const PRICING_PLANS: PricingPlan[] = [
  {
    name: 'Community Tier',
    tagline: 'Essential air-gapped conversion for casual files and quick edits.',
    price: '$0',
    period: 'Free forever',
    description: 'Perfect for privacy-conscious developers and users who need fast, zero-upload file operations in browser or basic desktop.',
    features: [
      'Zero-egress client-side Web PWA',
      'Basic native desktop binary (unregistered)',
      'Images, Markdown, CSV, JSON format conversions',
      'Single file operations up to 2 GB',
      '100% telemetry-free client code',
      'Community GitHub discussions & issues'
    ],
    ctaText: 'Use Community Free',
    badge: 'Open Access'
  },
  {
    name: 'Pro Perpetual',
    tagline: 'Uncapped hardware power, automated workflows, and OS integration.',
    price: '$29',
    period: 'One-time payment, lifetime license',
    isPopular: true,
    description: 'For engineers, security researchers, media editors, and enterprises who demand multi-gigabyte batch scale and zero cloud risk.',
    features: [
      'Everything in Community Tier',
      'Unlimited file sizes (multi-GB 4K videos, massive PDFs)',
      'Hardware GPU acceleration (NVENC, Apple VideoToolbox, QSV)',
      'Native OS shell right-click integration (Explorer & Finder)',
      'Autonomous background Watch Folder automation',
      'High-speed air-gapped neural OCR & PDF flattening',
      'Headless CLI tool (`zeroegress` command-line utility)',
      'Multi-seat personal use (up to 3 personal machines)',
      'Lifetime updates for version 2.x'
    ],
    ctaText: 'Purchase Pro License',
    badge: 'Best Value'
  }
]
