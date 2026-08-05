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
      {/* Outer Minimalist Aura Circle */}
      <circle cx="256" cy="256" r="165" stroke="#FFFFFF" strokeWidth="26" fill="none" />
      {/* Left Code Bracket */}
      <path
        d="M 210 180 L 145 256 L 210 332"
        stroke="#FFFFFF"
        strokeWidth="26"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Right Code Bracket */}
      <path
        d="M 302 180 L 367 256 L 302 332"
        stroke="#FFFFFF"
        strokeWidth="26"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Center Aura Core Dot */}
      <circle cx="256" cy="256" r="18" fill="#FFFFFF" />
    </svg>
  )
}
