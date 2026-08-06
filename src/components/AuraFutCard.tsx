'use client'

import React, { useState, useRef } from 'react'
import { GitHubUserStats } from '@/lib/services/github'
import { LeetCodeUserStats } from '@/lib/services/leetcode'
import { AISummary } from '@/lib/services/nvidia'
import { CodeAuraLogo } from '@/components/CodeAuraLogo'

interface AuraFutCardProps {
  github: GitHubUserStats
  leetcode: LeetCodeUserStats | null
  ai: AISummary
  cardRef?: React.RefObject<HTMLDivElement | null>
}

function formatCompactNumber(num: number | string): string {
  if (typeof num === 'string') return num
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
  if (num >= 10000) return `${(num / 1000).toFixed(1)}k`
  if (num >= 1000) return num.toLocaleString()
  return num.toString()
}

export const AuraFutCard: React.FC<AuraFutCardProps> = ({ github, leetcode, ai, cardRef }) => {
  const [transform, setTransform] = useState('')
  const [glossPos, setGlossPos] = useState({ x: 50, y: 50, opacity: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

  const score = ai.auraScore || 85
  const isGold = score >= 85 || github.totalStars >= 1000
  const isSilver = score >= 70 && !isGold

  // Handle 3D Tilt on Mouse Move
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rotateX = ((y - centerY) / centerY) * -12 // tilt up/down
    const rotateY = ((x - centerX) / centerX) * 12 // tilt left/right

    const glossX = (x / rect.width) * 100
    const glossY = (y / rect.height) * 100

    setTransform(`perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.03, 1.03, 1.03)`)
    setGlossPos({ x: glossX, y: glossY, opacity: 0.3 })
  }

  const handleMouseLeave = () => {
    setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)')
    setGlossPos({ x: 50, y: 50, opacity: 0 })
  }

  // Tier Theme Config
  const theme = isGold
    ? {
        stroke: '#fce085',
        fill: 'url(#grad-gold)',
        text: 'text-[#fce085]',
        label: 'text-[#d4af37]',
        subtext: 'text-[#fef3c7]',
        tierLabel: 'GOLD TIER',
      }
    : isSilver
    ? {
        stroke: '#e2e8f0',
        fill: 'url(#grad-silver)',
        text: 'text-[#f1f5f9]',
        label: 'text-[#94a3b8]',
        subtext: 'text-[#f8fafc]',
        tierLabel: 'SILVER TIER',
      }
    : {
        stroke: '#f59e0b',
        fill: 'url(#grad-bronze)',
        text: 'text-[#fef3c7]',
        label: 'text-[#d97706]',
        subtext: 'text-[#fffbeb]',
        tierLabel: 'BRONZE TIER',
      }

  // Real Developer Stats with compact formatting
  const realStats = [
    { label: 'STARS', val: formatCompactNumber(github.totalStars) },
    { label: 'REPOS', val: formatCompactNumber(github.publicRepos) },
    { label: 'SOLVED', val: formatCompactNumber(leetcode ? leetcode.totalSolved : 'N/A') },
    { label: 'COMMITS', val: formatCompactNumber(github.recentCommitCount) },
    { label: 'COMPLEXITY', val: `${github.codeComplexityScore}/100` },
    { label: 'MAIN LANG', val: github.topLanguage },
  ]

  const displayName = (github.name || github.username).toUpperCase().slice(0, 14)

  return (
    <div
      ref={cardRef}
      className="relative w-[310px] sm:w-[340px] mx-auto select-none transition-transform duration-200 ease-out py-2"
    >
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ transform, transition: transform ? 'transform 0.1s ease-out' : 'transform 0.5s ease' }}
        className="relative w-full h-[490px] cursor-pointer"
      >
        {/* SVG Shield Background Shape & Trims */}
        <svg
          className="absolute inset-0 w-full h-full drop-shadow-[0_20px_35px_rgba(0,0,0,0.85)]"
          viewBox="0 0 248 372"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="grad-gold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#47370d" />
              <stop offset="35%" stopColor="#2e2308" />
              <stop offset="70%" stopColor="#1a1304" />
              <stop offset="100%" stopColor="#0d0a02" />
            </linearGradient>

            <linearGradient id="grad-silver" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2c3340" />
              <stop offset="35%" stopColor="#1b2028" />
              <stop offset="70%" stopColor="#111419" />
              <stop offset="100%" stopColor="#080a0d" />
            </linearGradient>

            <linearGradient id="grad-bronze" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3d2215" />
              <stop offset="35%" stopColor="#26150d" />
              <stop offset="70%" stopColor="#170c07" />
              <stop offset="100%" stopColor="#0a0503" />
            </linearGradient>
          </defs>

          {/* Outer Shield Frame Path */}
          <path
            d="M124 21C150 15 178 11 202 12C218 13 230 20 235 36C238 46 239 54 239 64C239 130 239 200 234 254C231 294 218 322 188 347C170 361 146 369 124 370C102 369 78 361 60 347C30 322 17 294 14 254C9 200 9 130 9 64C9 54 10 46 13 36C18 20 30 13 46 12C70 11 98 15 124 21Z"
            fill={theme.fill}
            stroke={theme.stroke}
            strokeWidth="2.5"
          />

          {/* Inner Accent Line Trim */}
          <path
            d="M124 21C150 15 178 11 202 12C218 13 230 20 235 36C238 46 239 54 239 64C239 130 239 200 234 254C231 294 218 322 188 347C170 361 146 369 124 370C102 369 78 361 60 347C30 322 17 294 14 254C9 200 9 130 9 64C9 54 10 46 13 36C18 20 30 13 46 12C70 11 98 15 124 21Z"
            transform="translate(124 186) scale(.94) translate(-124 -186)"
            stroke={theme.stroke}
            strokeWidth="1"
            strokeOpacity="0.4"
            fill="none"
          />
        </svg>

        {/* Dynamic Interactive Light Sheen/Gloss Effect */}
        <div
          className="absolute inset-0 pointer-events-none rounded-[36px] transition-opacity duration-300 z-30"
          style={{
            background: `radial-gradient(circle at ${glossPos.x}% ${glossPos.y}%, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0) 65%)`,
            opacity: glossPos.opacity,
          }}
        />

        {/* Card Content Overlay */}
        <div className="absolute inset-0 p-7 flex flex-col justify-between z-20 text-white">
          {/* ── Top Section: Score + Logo ── */}
          <div className="flex justify-between items-start pt-2">
            <div className="flex flex-col items-center">
              <span className={`text-4xl font-mono font-black ${theme.text} leading-none tracking-tighter`}>
                {score}
              </span>
              <span className={`text-[10px] font-mono font-black tracking-widest ${theme.label} mt-1 uppercase`}>
                AURA
              </span>
            </div>

            <div className="flex flex-col items-end">
              <div className="flex items-center gap-1.5">
                <CodeAuraLogo className="w-5 h-5" />
                <span className={`text-xs font-black tracking-wider ${theme.text}`}>CodeAura</span>
              </div>
              <span className={`text-[9px] font-mono font-bold tracking-widest ${theme.label} mt-0.5`}>
                {theme.tierLabel}
              </span>
            </div>
          </div>

          {/* ── Center Developer Avatar ── */}
          <div className="flex flex-col items-center my-1">
            <div className="relative">
              <img
                src={github.avatarUrl}
                alt={github.username}
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover shadow-xl bg-black/60"
              />
              <span className="absolute bottom-0 right-1 w-3.5 h-3.5 rounded-full bg-emerald-400" />
            </div>

            {/* Developer Handle */}
            <h3 className={`text-lg sm:text-xl font-mono font-black ${theme.text} tracking-wider mt-3 uppercase truncate max-w-[200px] text-center`}>
              {displayName}
            </h3>

            {/* Horizontal Line Divider */}
            <div className="w-4/5 h-[1px] bg-white/15 my-2" />
          </div>

          {/* ── Bottom Section: Real Developer Metrics ── */}
          <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 px-2 font-mono text-xs sm:text-sm overflow-hidden">
            {realStats.map((s) => (
              <div key={s.label} className="flex items-center justify-between min-w-0">
                <span className={`text-[10px] font-bold ${theme.label} shrink-0 mr-1`}>{s.label}</span>
                <span className={`font-black ${theme.subtext} truncate text-right`}>{s.val}</span>
              </div>
            ))}
          </div>

          {/* Archetype Footer */}
          <div className="pb-2 text-center overflow-hidden">
            <span className={`text-[10px] font-mono font-extrabold ${theme.label} tracking-widest uppercase block truncate px-2`}>
              {ai.archetype}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
