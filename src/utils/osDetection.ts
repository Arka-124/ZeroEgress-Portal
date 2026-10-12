import type { PlatformKey } from '../types'

export interface DetectedOS {
  platform: PlatformKey
  label: string
  sublabel: string
  defaultFileName: string
  arch: string
}

export function detectUserOS(): DetectedOS {
  if (typeof window === 'undefined') {
    return {
      platform: 'windows',
      label: 'Windows',
      sublabel: 'Windows 10 / 11 (x64)',
      defaultFileName: 'ZeroEgress-v2.0.0-windows-x64-setup.exe',
      arch: 'x64',
    }
  }

  const ua = window.navigator.userAgent.toLowerCase()
  const platform = (window.navigator as unknown as { userAgentData?: { platform?: string } }).userAgentData?.platform?.toLowerCase() ||
                   window.navigator.platform?.toLowerCase() || ''

  // Android detection
  if (ua.includes('android')) {
    return {
      platform: 'android',
      label: 'Android',
      sublabel: 'Android 10+ (Universal ARM64 / x86_64)',
      defaultFileName: 'ZeroEgress-v2.0.0-android-universal.apk',
      arch: 'ARM64/x86',
    }
  }

  // macOS detection
  if (ua.includes('mac') || platform.includes('mac')) {
    const isAppleSilicon = ua.includes('macintosh') && (
      window.navigator.maxTouchPoints > 0 ||
      ua.includes('arm64') ||
      (window.screen.colorDepth === 24 || window.screen.colorDepth === 30)
    )

    return {
      platform: 'macos',
      label: 'macOS',
      sublabel: isAppleSilicon ? 'Apple Silicon (M1/M2/M3/M4)' : 'Apple Silicon & Intel',
      defaultFileName: 'ZeroEgress-v2.0.0-macos-arm64.dmg',
      arch: isAppleSilicon ? 'arm64' : 'universal',
    }
  }

  // Linux detection
  if (ua.includes('linux') || platform.includes('linux') || platform.includes('x11')) {
    return {
      platform: 'linux',
      label: 'Linux',
      sublabel: 'x86_64 (AppImage & Deb)',
      defaultFileName: 'ZeroEgress-v2.0.0-linux-x86_64.AppImage',
      arch: 'x86_64',
    }
  }

  // Windows detection (default)
  return {
    platform: 'windows',
    label: 'Windows',
    sublabel: 'Windows 10 / 11 (64-bit)',
    defaultFileName: 'ZeroEgress-v2.0.0-windows-x64-setup.exe',
    arch: 'x64',
  }
}
