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
      {/* Precision Outer Aura Circle */}
      <circle cx="256" cy="256" r="170" stroke="#FFFFFF" strokeWidth="32" fill="none" />
      {/* 45-Degree Diagonal Aura Beam */}
      <path d="M 170 342 L 342 170" stroke="#FFFFFF" strokeWidth="32" strokeLinecap="round" />
      {/* Solid Aura Core Dot */}
      <circle cx="256" cy="256" r="32" fill="#FFFFFF" />
    </svg>
  )
}
