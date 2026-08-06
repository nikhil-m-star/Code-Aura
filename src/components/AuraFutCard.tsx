'use client'

import React from 'react'
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

export const AuraFutCard: React.FC<AuraFutCardProps> = ({ github, leetcode, ai, cardRef }) => {
  const radar = ai.radarStats || {
    velocity: 80,
    clarity: 85,
    algorithms: leetcode ? 75 : 55,
    stamina: 88,
    impact: 70,
  }

  const score = ai.auraScore || 85
  const isGold = score >= 90
  const isSilver = score >= 80 && score < 90

  // Tier Theme Styling
  const theme = isGold
    ? {
        cardBg: 'from-[#2a220b] via-[#1a1507] to-[#0d0a03]',
        borderGradient: 'from-[#fce085] via-[#d4af37] to-[#8a6d1c]',
        textColor: 'text-[#fce085]',
        accentColor: 'text-[#ffd700]',
        badgeBg: 'bg-[#d4af37]/20 text-[#fce085] border-[#d4af37]/40',
        statColor: 'text-[#fff4cb]',
        labelColor: 'text-[#c2a149]',
        divider: 'border-[#d4af37]/30',
        tierName: 'GOLD SQUAD',
      }
    : isSilver
    ? {
        cardBg: 'from-[#1e232a] via-[#12151a] to-[#090b0e]',
        borderGradient: 'from-[#e2e8f0] via-[#94a3b8] to-[#475569]',
        textColor: 'text-[#f1f5f9]',
        accentColor: 'text-[#e2e8f0]',
        badgeBg: 'bg-[#94a3b8]/20 text-[#f1f5f9] border-[#94a3b8]/40',
        statColor: 'text-[#ffffff]',
        labelColor: 'text-[#94a3b8]',
        divider: 'border-[#94a3b8]/30',
        tierName: 'SILVER SQUAD',
      }
    : {
        cardBg: 'from-[#251710] via-[#170e0a] to-[#0a0604]',
        borderGradient: 'from-[#f59e0b] via-[#b45309] to-[#78350f]',
        textColor: 'text-[#fef3c7]',
        accentColor: 'text-[#fbbf24]',
        badgeBg: 'bg-[#b45309]/20 text-[#fef3c7] border-[#b45309]/40',
        statColor: 'text-[#fef3c7]',
        labelColor: 'text-[#d97706]',
        divider: 'border-[#b45309]/30',
        tierName: 'BRONZE SQUAD',
      }

  // Short position title
  let posTag = 'DEV'
  if (score >= 92) posTag = 'GOD'
  else if (score >= 84) posTag = 'PRO'
  else if (score >= 75) posTag = 'ART'

  // Stats Breakdown for FUT Card
  const stats = [
    { label: 'VEL', val: radar.velocity },
    { label: 'CLA', val: radar.clarity },
    { label: 'ALG', val: radar.algorithms },
    { label: 'STM', val: radar.stamina },
    { label: 'IMP', val: radar.impact },
    { label: 'CMP', val: github.codeComplexityScore },
  ]

  const displayName = (github.name || github.username).toUpperCase().slice(0, 14)

  return (
    <div
      ref={cardRef}
      className="relative w-[320px] sm:w-[350px] mx-auto select-none p-1 rounded-[36px] bg-gradient-to-b shadow-2xl transition-transform hover:scale-[1.01]"
      style={{
        backgroundImage: `linear-gradient(135deg, ${isGold ? '#fce085, #8a6d1c' : isSilver ? '#e2e8f0, #475569' : '#f59e0b, #78350f'})`,
      }}
    >
      {/* Inner Card Container */}
      <div className={`w-full h-full rounded-[34px] bg-gradient-to-b ${theme.cardBg} p-6 flex flex-col items-center relative overflow-hidden`}>
        {/* Subtle Background Geometric Glow */}
        <div className="absolute -top-24 -left-24 w-48 h-48 rounded-full bg-white/5 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-48 h-48 rounded-full bg-white/5 blur-3xl pointer-events-none" />

        {/* ── Top Rail: Rating + Position + Lang Badge ── */}
        <div className="w-full flex items-start justify-between relative z-10">
          <div className="flex flex-col items-center">
            <span className={`text-4xl font-mono font-black ${theme.textColor} leading-none tracking-tighter`}>
              {score}
            </span>
            <span className={`text-xs font-mono font-black tracking-widest ${theme.labelColor} mt-0.5`}>
              {posTag}
            </span>
            <div className={`mt-2 px-2 py-0.5 rounded border text-[10px] font-mono font-extrabold ${theme.badgeBg}`}>
              {github.topLanguage}
            </div>
          </div>

          {/* CodeAura Brand Crest */}
          <div className="flex flex-col items-end">
            <div className="flex items-center gap-1.5 opacity-80">
              <CodeAuraLogo className="w-5 h-5" />
              <span className={`text-[11px] font-black uppercase tracking-widest ${theme.textColor}`}>
                Aura 26
              </span>
            </div>
            <span className={`text-[9px] font-mono font-bold tracking-widest ${theme.labelColor} mt-1 uppercase`}>
              {theme.tierName}
            </span>
          </div>
        </div>

        {/* ── Avatar Frame ── */}
        <div className="relative my-4 group">
          <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-full overflow-hidden border-4 border-white/10 shadow-2xl bg-black/60 relative">
            <img
              src={github.avatarUrl}
              alt={github.username}
              className="w-full h-full object-cover"
            />
          </div>
          {/* Active Player Status Badge */}
          <span className="absolute bottom-1 right-2 w-4 h-4 rounded-full bg-emerald-400 border-2 border-black" />
        </div>

        {/* ── Player Name Banner ── */}
        <div className="w-full text-center relative z-10">
          <h2 className={`text-xl sm:text-2xl font-black ${theme.textColor} tracking-wider font-mono truncate px-2`}>
            {displayName}
          </h2>
          <div className={`w-3/4 mx-auto my-2 border-b ${theme.divider}`} />
        </div>

        {/* ── Bottom FUT Stats Grid (2 Columns of 3) ── */}
        <div className="w-full grid grid-cols-2 gap-x-6 gap-y-1.5 px-4 font-mono z-10 my-1">
          {stats.map((s) => (
            <div key={s.label} className="flex items-center justify-between text-xs sm:text-sm">
              <span className={`font-bold ${theme.labelColor}`}>{s.label}</span>
              <span className={`font-black ${theme.statColor}`}>{s.val}</span>
            </div>
          ))}
        </div>

        {/* ── Archetype Title Footer ── */}
        <div className="w-full pt-3 mt-2 border-t border-white/10 text-center relative z-10">
          <span className={`text-[10px] font-extrabold uppercase tracking-widest ${theme.textColor} block truncate px-2`}>
            &ldquo;{ai.archetype}&rdquo;
          </span>
        </div>
      </div>
    </div>
  )
}
