'use client'

import React, { useState, useRef } from 'react'
import { Sparkles, Star, FolderGit2, Cpu, Flame, Activity, Clock } from 'lucide-react'
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
  const isSilver = score >= 72 && !isGold

  // 3D Tilt on Mouse Movement
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rotateX = ((y - centerY) / centerY) * -10
    const rotateY = ((x - centerX) / centerX) * 10

    const glossX = (x / rect.width) * 100
    const glossY = (y / rect.height) * 100

    setTransform(`perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`)
    setGlossPos({ x: glossX, y: glossY, opacity: 0.3 })
  }

  const handleMouseLeave = () => {
    setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)')
    setGlossPos({ x: 50, y: 50, opacity: 0 })
  }

  // Tier Theme Config
  const theme = isGold
    ? {
        borderGradient: 'from-[#fce085] via-[#d4af37] to-[#8a6d1c]',
        scoreText: 'text-[#fce085]',
        tierBg: 'bg-[#d4af37]/20 text-[#fce085]',
        tierName: 'GOLD TIER',
        glowColor: 'rgba(212, 175, 55, 0.25)',
        badgeBg: 'bg-[#d4af37]',
        badgeText: 'text-black',
        ringColor: 'ring-[#d4af37]',
      }
    : isSilver
    ? {
        borderGradient: 'from-[#ffffff] via-[#94a3b8] to-[#475569]',
        scoreText: 'text-[#f1f5f9]',
        tierBg: 'bg-[#94a3b8]/20 text-[#f1f5f9]',
        tierName: 'SILVER TIER',
        glowColor: 'rgba(148, 163, 184, 0.25)',
        badgeBg: 'bg-[#94a3b8]',
        badgeText: 'text-black',
        ringColor: 'ring-[#94a3b8]',
      }
    : {
        borderGradient: 'from-[#f59e0b] via-[#b45309] to-[#78350f]',
        scoreText: 'text-[#fef3c7]',
        tierBg: 'bg-[#b45309]/20 text-[#fef3c7]',
        tierName: 'BRONZE TIER',
        glowColor: 'rgba(180, 83, 9, 0.25)',
        badgeBg: 'bg-[#b45309]',
        badgeText: 'text-white',
        ringColor: 'ring-[#b45309]',
      }

  const realStats = [
    { label: 'STARS', val: formatCompactNumber(github.totalStars), icon: Star, color: 'text-amber-400' },
    { label: 'REPOS', val: formatCompactNumber(github.publicRepos), icon: FolderGit2, color: 'text-cyan-400' },
    { label: 'SOLVED', val: formatCompactNumber(leetcode ? leetcode.totalSolved : 'N/A'), icon: Cpu, color: 'text-emerald-400' },
    { label: 'COMMITS', val: formatCompactNumber(github.recentCommitCount), icon: Flame, color: 'text-rose-400' },
    { label: 'COMPLEXITY', val: `${github.codeComplexityScore}/100`, icon: Activity, color: 'text-purple-400' },
    { label: 'WORK SHIFT', val: github.timeSlot.split(' ')[0], icon: Clock, color: 'text-fuchsia-400' },
  ]

  const displayName = github.name || github.username

  return (
    <div
      ref={cardRef}
      className="relative w-[320px] sm:w-[340px] mx-auto select-none transition-transform duration-200 ease-out py-2 font-sans"
    >
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform,
          transition: transform ? 'transform 0.1s ease-out' : 'transform 0.5s ease',
          boxShadow: `0 20px 40px -15px ${theme.glowColor}`,
        }}
        className={`relative w-full rounded-[30px] p-[2px] bg-gradient-to-b ${theme.borderGradient} cursor-pointer overflow-hidden`}
      >
        {/* Main Card Body */}
        <div className="w-full h-full rounded-[28px] bg-[#0c0c0e] p-6 flex flex-col justify-between relative overflow-hidden text-white">
          {/* Subtle Ambient Radial Glow */}
          <div
            className="absolute -top-20 -right-20 w-44 h-44 rounded-full blur-3xl pointer-events-none"
            style={{ backgroundColor: theme.glowColor }}
          />

          {/* Interactive Dynamic Sheen */}
          <div
            className="absolute inset-0 pointer-events-none rounded-[28px] transition-opacity duration-300 z-30"
            style={{
              background: `radial-gradient(circle at ${glossPos.x}% ${glossPos.y}%, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 60%)`,
              opacity: glossPos.opacity,
            }}
          />

          {/* ── Top Bar: Score + Brand Crest ── */}
          <div className="flex justify-between items-start relative z-10">
            <div className="flex items-center gap-3">
              <span className={`text-4xl sm:text-5xl font-black ${theme.scoreText} leading-none tracking-tight`}>
                {score}
              </span>
              <div className="flex flex-col items-start">
                <span className="text-[9px] font-black uppercase tracking-widest text-gray-400">Aura</span>
                <span className={`text-[10px] font-black px-2 py-0.5 rounded-md ${theme.tierBg} mt-0.5`}>
                  {theme.tierName}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1.5 opacity-90">
              <CodeAuraLogo className="w-5 h-5" />
              <span className="text-xs font-black tracking-wider text-white">CodeAura</span>
            </div>
          </div>

          {/* ── Hero Profile Section ── */}
          <div className="flex flex-col items-center text-center my-4 relative z-10">
            <div className="relative">
              <img
                src={github.avatarUrl}
                alt={github.username}
                className={`w-20 h-20 sm:w-22 sm:h-22 rounded-2xl object-cover bg-black ring-2 ${theme.ringColor} shadow-xl`}
              />
              <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-400 ring-4 ring-[#0c0c0e]" />
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight mt-3 truncate max-w-[240px]">
              {displayName}
            </h3>

            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs font-bold text-gray-400">@{github.username}</span>
              <span className={`text-[10px] font-black px-2 py-0.5 rounded-md ${theme.badgeBg} ${theme.badgeText}`}>
                {github.topLanguage}
              </span>
            </div>
          </div>

          {/* ── AI Archetype Banner ── */}
          <div className="p-3.5 rounded-2xl bg-[#141418] text-center space-y-0.5 relative z-10 border-l-2 border-white/20">
            <div className="flex items-center justify-center gap-1 text-[10px] font-black uppercase tracking-widest text-gray-400">
              <Sparkles className="w-3 h-3 text-amber-300" />
              <span>AI Archetype</span>
            </div>
            <p className="text-sm font-black text-white truncate px-1">&ldquo;{ai.archetype}&rdquo;</p>
          </div>

          {/* ── Bottom Grid: 6 Telemetry Stats (2x3) ── */}
          <div className="grid grid-cols-2 gap-2 mt-4 relative z-10">
            {realStats.map((s) => {
              const IconComp = s.icon
              return (
                <div
                  key={s.label}
                  className="p-2.5 rounded-xl bg-[#141418] flex items-center justify-between min-w-0"
                >
                  <div className="flex items-center gap-1.5 min-w-0">
                    <IconComp className={`w-3.5 h-3.5 ${s.color} shrink-0`} />
                    <span className="text-[10px] font-extrabold text-gray-400 tracking-wider truncate">
                      {s.label}
                    </span>
                  </div>
                  <span className="text-xs font-black text-white truncate text-right shrink-0 ml-1">
                    {s.val}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
