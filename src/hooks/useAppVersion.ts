import { useState, useEffect } from 'react'

const CACHE_KEY = 'zeroegress_app_version_cache'
const CACHE_EXPIRY_MS = 10 * 60 * 1000 // 10 minutes
const RAW_PACKAGE_JSON_URL = 'https://raw.githubusercontent.com/Arka-124/ZeroEgress/main/package.json'

interface CachedVersionData {
  version: string
  timestamp: number
}

export function formatVersionString(ver: string): string {
  const clean = ver.trim().replace(/^v/i, '')
  return clean ? `v${clean}` : 'v2.0.0'
}

function getInitialCachedVersion(fallback: string): { version: string; isLive: boolean } {
  try {
    const cached = sessionStorage.getItem(CACHE_KEY)
    if (cached) {
      const parsed: CachedVersionData = JSON.parse(cached)
      if (Date.now() - parsed.timestamp < CACHE_EXPIRY_MS && parsed.version) {
        return {
          version: formatVersionString(parsed.version),
          isLive: true
        }
      }
    }
  } catch {
    // Ignore sessionStorage read errors
  }
  return {
    version: formatVersionString(fallback),
    isLive: false
  }
}

export function useAppVersion(fallbackVersion = '2.0.0'): {
  version: string
  rawVersion: string
  isLive: boolean
  isLoading: boolean
} {
  const initial = getInitialCachedVersion(fallbackVersion)

  const [version, setVersion] = useState<string>(initial.version)
  const [isLive, setIsLive] = useState<boolean>(initial.isLive)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    let isMounted = true

    // If already live from cache, do not re-fetch
    try {
      const cached = sessionStorage.getItem(CACHE_KEY)
      if (cached) {
        const parsed: CachedVersionData = JSON.parse(cached)
        if (Date.now() - parsed.timestamp < CACHE_EXPIRY_MS && parsed.version) {
          return
        }
      }
    } catch {
      // Continue to fetch
    }

    const fetchLiveVersion = async () => {
      setIsLoading(true)
      try {
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 4000)

        const response = await fetch(RAW_PACKAGE_JSON_URL, {
          signal: controller.signal,
          headers: {
            Accept: 'application/json'
          }
        })
        clearTimeout(timeoutId)

        if (!response.ok) {
          throw new Error(`Failed to fetch package.json: ${response.status}`)
        }

        const data = await response.json()
        if (data && typeof data.version === 'string' && data.version.trim()) {
          const raw = data.version.trim()
          const formatted = formatVersionString(raw)

          if (isMounted) {
            setVersion(formatted)
            setIsLive(true)
          }

          try {
            const cacheData: CachedVersionData = {
              version: raw,
              timestamp: Date.now()
            }
            sessionStorage.setItem(CACHE_KEY, JSON.stringify(cacheData))
          } catch {
            // sessionStorage write failure
          }
        }
      } catch {
        // Fallback gracefully on error
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    fetchLiveVersion()

    return () => {
      isMounted = false
    }
  }, [fallbackVersion])

  return {
    version,
    rawVersion: version.replace(/^v/, ''),
    isLive,
    isLoading
  }
}
