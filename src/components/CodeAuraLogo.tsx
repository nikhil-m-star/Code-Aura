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
      {/* Outer Precision Aura Circle */}
      <circle cx="256" cy="256" r="175" stroke="#FFFFFF" strokeWidth="22" fill="none" />
      {/* Sleek Minimalist 'A' Emblem */}
      <path
        d="M 256 142 L 160 358 H 204 L 256 242 L 308 358 H 352 Z"
        fill="#FFFFFF"
      />
      {/* Precision Crossbar Cutout */}
      <path
        d="M 256 268 L 224 334 H 288 Z"
        fill="#000000"
      />
    </svg>
  )
}
