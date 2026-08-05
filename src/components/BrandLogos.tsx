import React from 'react'

export function LeetCodeLogo({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M16.102 17.93l-2.697 2.607c-.766.741-1.993.741-2.759 0l-6.837-6.608c-.766-.741-.766-1.925 0-2.666l6.837-6.608c.766-.741 1.993-.741 2.759 0l2.697 2.607c.383.37.996.37 1.379 0 .383-.37.383-.963 0-1.333l-2.697-2.607c-1.532-1.482-3.987-1.482-5.519 0l-6.837 6.608c-1.532 1.482-1.532 3.849 0 5.331l6.837 6.608c1.532 1.482 3.987 1.482 5.519 0l2.697-2.607c.383-.37.383-.963 0-1.333-.383-.37-.996-.37-1.379 0z"
        fill="#FFA116"
      />
      <path
        d="M20.25 12h-9.5c-.552 0-1-.448-1-1s.448-1 1-1h9.5c.552 0 1 .448 1 1s-.448 1-1 1z"
        fill="#FFFFFF"
      />
    </svg>
  )
}

export function ReactLogo({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg viewBox="-11.5 -10.23174 23 20.46348" className={className}>
      <circle cx="0" cy="0" r="2.05" fill="#61DAFB" />
      <g stroke="#61DAFB" strokeWidth="1" fill="none">
        <ellipse rx="11" ry="4.2" />
        <ellipse rx="11" ry="4.2" transform="rotate(60)" />
        <ellipse rx="11" ry="4.2" transform="rotate(120)" />
      </g>
    </svg>
  )
}

export function TypeScriptLogo({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 128 128" className={className}>
      <rect width="128" height="128" rx="16" fill="#3178c6" />
      <path
        d="M71.026 62.484v8.52h14.288v41.674h10.984V71.004h14.288v-8.52H71.026zM46.73 113.882c16.32 0 25.132-7.502 25.132-20.91 0-21.732-28.51-14.79-28.51-24.888 0-3.672 3.672-6.12 10.198-6.12 5.508 0 11.832 1.632 17.544 4.896V54.9c-5.712-2.448-12.444-3.672-18.768-3.672-15.504 0-24.684 8.16-24.684 20.196 0 21.318 28.51 14.586 28.51 25.296 0 4.284-4.488 6.528-11.424 6.528-7.344 0-14.892-2.244-20.808-6.12v12.24c5.712 2.856 14.28 4.536 22.81 4.536z"
        fill="#ffffff"
      />
    </svg>
  )
}

export function PythonLogo({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 110 110" className={className}>
      <path
        d="M54.26 1.45c-26.68 0-25.04 11.57-25.04 11.57l.03 12.01h25.43v3.62H19.24S1.45 26.68 1.45 53.77s15.54 26.17 15.54 26.17h9.28v-13.1s-.51-15.54 15.28-15.54h26.17s14.26.26 14.26-13.75V15.54S84.58 1.45 54.26 1.45zM38.83 9.4c2.61 0 4.73 2.12 4.73 4.73s-2.12 4.73-4.73 4.73-4.73-2.12-4.73-4.73 2.12-4.73 4.73-4.73z"
        fill="#366A96"
      />
      <path
        d="M55.74 108.55c26.68 0 25.04-11.57 25.04-11.57l-.03-12.01H55.32v-3.62h35.45s17.79 1.97 17.79-25.12-15.54-26.17-15.54-26.17h-9.28v13.1s.51 15.54-15.28 15.54H62.29s-14.26-.26-14.26 13.75v22.78s-2.6 14.09 27.71 14.09zm15.43-7.95c-2.61 0-4.73-2.12-4.73-4.73s2.12-4.73 4.73-4.73 4.73 2.12 4.73 4.73-2.12 4.73-4.73 4.73z"
        fill="#FFC836"
      />
    </svg>
  )
}

export function PostgreSQLLogo({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 128 128" className={className}>
      <path
        d="M64.6 2C30.4 2 2.7 29.7 2.7 63.9c0 34.2 27.7 61.9 61.9 61.9 34.2 0 61.9-27.7 61.9-61.9C126.5 29.7 98.8 2 64.6 2z"
        fill="#336791"
      />
      <path
        d="M87.2 46.5c-3.1-4.8-8.8-8-15.3-8-9.9 0-17.9 7.9-17.9 17.7 0 9.8 8 17.7 17.9 17.7 6.4 0 12.1-3.2 15.2-8M54 56.2H36.3v15.5H54"
        stroke="#FFFFFF"
        strokeWidth="6"
        fill="none"
      />
    </svg>
  )
}

export function TailwindLogo({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className}>
      <path
        d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C7.666 17.818 9.027 19.2 12.001 19.2c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z"
        fill="#38BDF8"
      />
    </svg>
  )
}

export function NextjsLogo({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 180 180" className={className}>
      <mask id="mask" maskUnits="userSpaceOnUse" x="0" y="0" width="180" height="180">
        <rect width="180" height="180" fill="#fff" />
      </mask>
      <g mask="url(#mask)">
        <circle cx="90" cy="90" r="90" fill="#000" />
        <path d="M149.508 157.52L69.141 54H54v72h14.4V73.837l69.875 90.718a89.658 89.658 0 0011.233-7.035z" fill="#fff" />
        <path d="M115.2 54v72h14.4V54h-14.4z" fill="#fff" />
      </g>
    </svg>
  )
}

export function PrismaLogo({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none">
      <path
        d="M20.25 18.23L12.75 3.32a.96.96 0 00-1.7 0L3.55 18.23a.96.96 0 00.77 1.4h15.16a.96.96 0 00.77-1.4zM12 6.64l5.3 10.49H6.7L12 6.64z"
        fill="#5A67D8"
      />
    </svg>
  )
}
