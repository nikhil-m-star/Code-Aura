import React from 'react'

export function CodeAuraLogo({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg
      viewBox="80 120 352 264"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
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
      {/* Sleek Laptop Base Plate */}
      <path
        d="M 100 330 H 412 C 400 364 380 364 380 364 H 132 C 132 364 112 364 100 330 Z"
        fill="#FFFFFF"
      />
    </svg>
  )
}
