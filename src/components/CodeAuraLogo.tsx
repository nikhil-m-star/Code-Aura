import React from 'react'

export function CodeAuraLogo({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 512 512"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="512" height="512" rx="120" fill="#000000" />
      {/* Outer Precision Circle */}
      <circle cx="256" cy="256" r="175" stroke="#FFFFFF" strokeWidth="22" fill="none" />
      {/* Minimalist Bold CA Monogram */}
      <text
        x="256"
        y="300"
        fill="#FFFFFF"
        fontSize="185"
        fontWeight="900"
        fontFamily="Plus Jakarta Sans, system-ui, -apple-system, sans-serif"
        letterSpacing="-6"
        textAnchor="middle"
      >
        CA
      </text>
    </svg>
  )
}
