import React from 'react'

interface BrandLogoProps {
  className?: string
  size?: number
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ className = 'w-6 h-6', size = 24 }) => {
  return (
    <img
      src="/favicon.svg"
      alt="ZeroEgress"
      width={size}
      height={size}
      className={`inline-block shrink-0 object-contain select-none ${className}`}
      loading="eager"
    />
  )
}
