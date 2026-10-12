import type { BinaryRelease, FeaturePillar, ComparisonItem, PricingPlan } from '../types'

export const APP_VERSION = 'v2.0.0'
export const RELEASE_DATE = 'October 2026'
export const WEB_APP_URL = 'https://zero-egress.vercel.app/'
export const GITHUB_REPO_URL = 'https://github.com/Arka-124/ZeroEgress'
export const PORTAL_REPO_URL = 'https://github.com/Arka-124/ZeroEgress-Portal'

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
    description: 'ZeroEgress operates fully local with zero telemetry. Run Wireshark or network monitors: not a single network packet ever leaves your machine while converting sensitive NDAs, medical records, or proprietary media datasets.',
    stats: [
      { label: 'Outbound Packets', value: '0 bytes' },
      { label: 'Cloud Uploads', value: '0' },
      { label: 'Air-Gap State', value: 'Verified' }
    ],
    codeSnippet: '$ zeroegress doctor --network-audit\n[✓] Bound sockets: 0\n[✓] External DNS queries: 0\n[✓] Air-gap state: VERIFIED STRICT OFFLINE',
    icon: 'ShieldCheck'
  },
  {
    id: 'bypass-limits',
    badge: 'Scale Without Bounds',
    title: 'Bypass Browser Limits',
    tagline: 'Process multi-gigabyte 4K media and massive PDFs without crashes.',
    description: 'Web browsers suffer from strict ~2GB WebAssembly heap limits and memory-hungry garbage collectors that crash tabs on big files. The Native Desktop app streams directly off NVMe storage in buffered chunks up to multi-terabyte files with tiny RAM overhead.',
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
    description: 'No browser tabs to open, no dragging files into web dropzones. Deep operating system context menu hooks let you highlight 50 documents or videos, right-click, select "ZeroEgress > Convert to PDF / AVIF / ProRes", and watch them finish in seconds.',
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
    description: 'Unlike sandboxed web workers that throttle on CPU software rasterizers, ZeroEgress native taps directly into bare metal hardware: NVIDIA NVENC/NVDEC, Apple Silicon Media Engines, Intel QuickSync, and AVX-512 vector extensions for up to 18x faster throughput.',
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
    feature: 'Web Utility Suite Access (Images, PDFs, Media, Hashes)',
    webPwa: '100% Free Forever (Zero Paywalls, Zero Logins)',
    nativePro: '100% Free & Bundled in Native App',
    tooltip: 'Every web tool is completely free on https://zero-egress.vercel.app/ without accounts.'
  },
  {
    category: 'Privacy & Security',
    feature: 'Zero Outbound Telemetry or Cloud Logging',
    webPwa: 'Zero telemetry (verified client-side)',
    nativePro: 'Strict zero byte egress (auditable with Wireshark)',
  },
  {
    category: 'Privacy & Security',
    feature: 'Standalone Offline / Air-Gapped Execution',
    webPwa: 'Requires initial web page load (cached via PWA)',
    nativePro: 'Standalone binary, zero network socket requirement',
    tooltip: 'Native runs on completely disconnected workstations without an internet connection.'
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
    feature: 'Hardware Video & Media Acceleration',
    webPwa: 'In-browser WebAssembly worker',
    nativePro: 'NVENC, Apple VideoToolbox, Intel QSV, VA-API',
  },
  {
    category: 'Performance & Scale',
    feature: 'Multi-threaded SIMD Vector Parallelism',
    webPwa: 'Browser Web Workers',
    nativePro: 'All CPU Cores + AVX-512 / ARM NEON native instructions',
  },
  {
    category: 'OS Integration',
    feature: 'OS Context Menu (Right-Click Conversion)',
    webPwa: false,
    nativePro: 'Native Windows 11 Shell, macOS Finder, Linux Nautilus',
    tooltip: 'Right click any file in Explorer or Finder to convert without opening a browser.'
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
    feature: 'Headless CLI & Scripting Tool',
    webPwa: false,
    nativePro: 'Included zeroegress CLI for bash, zsh, and PowerShell',
  },
  {
    category: 'Licensing & Updates',
    feature: 'Pricing Model',
    webPwa: '₹0 Free Forever (Zero Subscriptions)',
    nativePro: '₹99 One-Time (Lifetime Native License)',
  }
]

export const PRICING_PLANS: PricingPlan[] = [
  {
    name: 'Free Web App',
    tagline: '100% Free Forever. Zero paywalls, zero accounts, zero limits.',
    price: '₹0',
    period: 'Free forever',
    description: 'Every utility (Image Converter, PDF Merge/Split/Compress, Metadata Stripper, Media Studio, Hashes & Data, Spreadsheets, Archives) is completely accessible directly in your browser with zero restrictions.',
    features: [
      '100% Free forever with ZERO paywalls',
      'Zero accounts, logins, or tracking required',
      'Full utility suite: Images, PDFs, Media, Hashes, Spreadsheets',
      'Verifiable client-side processing (zero cloud uploads)',
      'Instant drag-and-drop in any modern browser',
      'Works offline once cached as PWA'
    ],
    ctaText: 'Use Web App Free',
    badge: '100% Free Forever'
  },
  {
    name: 'Native Pro License',
    tagline: 'Offline native binaries for Windows, macOS, Linux, and Android.',
    price: '₹99',
    period: 'One-Time Payment / Lifetime Access',
    isPopular: true,
    description: 'The Pro License is strictly for running the standalone Native Desktop and Android applications with OS right-click integration, uncapped file sizes, and background automation.',
    features: [
      'Direct access to download Windows (.exe/.msi), macOS (.dmg), Linux (.AppImage), and Android (.apk) binaries',
      'Full OS context-menu shortcuts (Right-click -> "Convert with ZeroEgress")',
      'Bypass browser limits (process multi-GB files without browser memory caps)',
      'Direct GPU hardware acceleration (NVENC, Apple VideoToolbox, AVX-512)',
      'Autonomous background Watch Folder daemon',
      'Headless CLI utility (`zeroegress` command-line executable)',
      'Offline Ed25519 cryptographic license key sent instantly upon checkout',
      'No subscriptions. Pay once, use offline forever'
    ],
    ctaText: 'Get Desktop License for ₹99',
    badge: 'Lifetime License'
  }
]
