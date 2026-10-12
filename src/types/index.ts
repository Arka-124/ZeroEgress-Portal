export type PlatformKey = 'windows' | 'macos' | 'linux' | 'android'

export interface PlatformInfo {
  name: string
  label: string
  subtext: string
  primaryExt: string
  icon: 'windows' | 'apple' | 'linux' | 'smartphone'
}

export interface BinaryRelease {
  id: string
  platform: PlatformKey
  platformName: string
  arch: string
  fileName: string
  fileSize: string
  format: string
  sha256: string
  sigAvailable: boolean
  downloadUrl: string
  recommendedFor?: string
}

export interface FeaturePillar {
  id: string
  badge: string
  title: string
  tagline: string
  description: string
  stats: { label: string; value: string }[]
  codeSnippet?: string
  icon: string
}

export interface ComparisonItem {
  feature: string
  category: 'Privacy & Security' | 'Performance & Scale' | 'OS Integration' | 'Licensing & Updates'
  webPwa: string | boolean
  nativePro: string | boolean
  tooltip?: string
}

export interface PricingPlan {
  name: string
  tagline: string
  price: string
  period?: string
  isPopular?: boolean
  description: string
  features: string[]
  ctaText: string
  badge?: string
}
