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
      {/* Sleek Laptop Screen */}
      <rect
        x="136"
        y="140"
        width="240"
        height="160"
        rx="18"
        stroke="#FFFFFF"
        strokeWidth="24"
        fill="none"
      />
      {/* Glowing Inner Aura Core */}
      <circle cx="256" cy="220" r="32" fill="#FFFFFF" />
      {/* Sleek Laptop Base Plate */}
      <path
        d="M 100 330 H 412 C 400 364 380 364 380 364 H 132 C 132 364 112 364 100 330 Z"
        fill="#FFFFFF"
      />
    </svg>
  )
}
