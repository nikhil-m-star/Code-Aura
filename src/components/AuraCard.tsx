'use client'

import React from 'react'
import { Flame, Crown, Zap, Code2, Award, Terminal, ShieldAlert, Sparkles } from 'lucide-react'
import { GitHubUserStats } from '@/lib/services/github'
import { LeetCodeUserStats } from '@/lib/services/leetcode'
import { AISummary } from '@/lib/services/nvidia'
import { CodeAuraLogo } from '@/components/CodeAuraLogo'

interface AuraCardProps {
  github: GitHubUserStats
  leetcode: LeetCodeUserStats | null
  ai: AISummary
  cardRef?: React.RefObject<HTMLDivElement | null>
}

export const AuraCard: React.FC<AuraCardProps> = ({ github, leetcode, ai, cardRef }) => {
  const radar = ai.radarStats || {
    velocity: 80,
    clarity: 85,
    algorithms: leetcode ? 75 : 55,
    stamina: 88,
    impact: 70,
  }

  let tierGrade = 'A-TIER'
  let tierColor = 'text-rose-400'

  if (ai.auraScore >= 92) {
    tierGrade = 'S-TIER'
    tierColor = 'text-yellow-400'
  } else if (ai.auraScore >= 84) {
    tierGrade = 'S-TIER'
    tierColor = 'text-rose-400'
  } else if (ai.auraScore >= 75) {
    tierGrade = 'A-TIER'
    tierColor = 'text-cyan-400'
  } else {
    tierGrade = 'B-TIER'
    tierColor = 'text-emerald-400'
  }

  const roastText = ai.roast || ai.roastOrPraise || 'Consistently pushing code at ungodly hours.'
  const praiseText = ai.praise || 'Maintains incredible build momentum across open source projects.'

  const ratingBars = [
    { label: 'Velocity', value: radar.velocity, color: 'bg-rose-500' },
    { label: 'Clarity', value: radar.clarity, color: 'bg-emerald-500' },
    { label: 'Algorithms', value: radar.algorithms, color: 'bg-amber-400' },
    { label: 'Stamina', value: radar.stamina, color: 'bg-fuchsia-500' },
    { label: 'Impact', value: radar.impact, color: 'bg-cyan-400' },
  ]

  return (
    <div
      ref={cardRef}
      className="w-full max-w-3xl mx-auto rounded-3xl p-6 md:p-10 bg-black text-white space-y-6 font-sans"
    >
      {/* ─── Profile Header ─── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 pb-6 border-b border-[#1a1a1a]">
        <div className="flex items-center gap-4">
          <img
            src={github.avatarUrl}
            alt={github.username}
            className="w-16 h-16 rounded-2xl object-cover bg-[#111]"
          />
          <div>
            <h2 className="text-2xl font-black text-white tracking-tight">
              {github.name || github.username}
            </h2>
            <div className="flex items-center gap-2 mt-1.5 flex-wrap">
              <span className="text-xs font-semibold text-gray-400">@{github.username}</span>
              <span className="text-[10px] px-2 py-0.5 rounded-md bg-[#1a1a1a] text-rose-400 font-bold">
                {github.topLanguage}
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-md bg-[#1a1a1a] text-gray-300 font-semibold">
                {github.timeSlot}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 self-start sm:self-auto">
          <div className="text-right">
            <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold block">Aura</span>
            <span className={`text-[10px] ${tierColor} font-black`}>{tierGrade}</span>
          </div>
          <span className="text-4xl font-black text-white">{ai.auraScore}</span>
        </div>
      </div>

      {/* ─── Archetype ─── */}
      <div className="space-y-1">
        <div className="flex items-center gap-1.5">
          <Terminal className="w-3.5 h-3.5 text-gray-500" />
          <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Archetype</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
          {ai.archetype}
        </h3>
        <p className="text-sm text-gray-400 italic">{ai.tagline}</p>
      </div>

      {/* ─── Roast & Praise ─── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-5 rounded-2xl bg-[#111] space-y-2">
          <div className="flex items-center gap-1.5">
            <Flame className="w-3.5 h-3.5 text-rose-500" />
            <span className="text-[10px] text-rose-500 font-bold uppercase tracking-widest">The Roast</span>
          </div>
          <p className="text-sm text-gray-200 leading-relaxed italic">
            "{roastText}"
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-[#111] space-y-2">
          <div className="flex items-center gap-1.5">
            <Crown className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest">The Praise</span>
          </div>
          <p className="text-sm text-gray-200 leading-relaxed italic">
            "{praiseText}"
          </p>
        </div>
      </div>

      {/* ─── Performance Ratings ─── */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Performance</span>
          <span className="text-[10px] text-gray-500 font-semibold">
            Complexity: {github.codeComplexityScore}/100
          </span>
        </div>
        <div className="space-y-3">
          {ratingBars.map((bar) => (
            <div key={bar.label} className="flex items-center gap-4">
              <span className="text-xs text-gray-400 font-semibold w-20 shrink-0">{bar.label}</span>
              <div className="flex-1 h-2 bg-[#1a1a1a] rounded-full overflow-hidden">
                <div
                  className={`h-full ${bar.color} rounded-full`}
                  style={{ width: `${bar.value}%` }}
                />
              </div>
              <span className="text-xs text-white font-bold w-9 text-right">{bar.value}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* ─── Stats Grid ─── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
        {[
          { label: 'Stars', value: github.totalStars, color: 'text-amber-400' },
          { label: 'Repos', value: github.publicRepos, color: 'text-cyan-400' },
          { label: 'Followers', value: github.followers, color: 'text-rose-400' },
          ...(leetcode
            ? [
                { label: 'Easy', value: leetcode.easySolved, color: 'text-emerald-400' },
                { label: 'Medium', value: leetcode.mediumSolved, color: 'text-amber-400' },
                { label: 'Hard', value: leetcode.hardSolved, color: 'text-rose-400' },
              ]
            : [
                { label: 'Original', value: `${github.originalityRatio}%`, color: 'text-emerald-400' },
                { label: 'Commits', value: github.recentCommitCount, color: 'text-fuchsia-400' },
                { label: 'PRs', value: github.pullRequestCount, color: 'text-cyan-400' },
              ]),
        ].map((stat) => (
          <div key={stat.label} className="p-3.5 rounded-2xl bg-[#111] text-center">
            <div className={`text-lg font-black ${stat.color}`}>{stat.value}</div>
            <div className="text-[10px] text-gray-500 uppercase font-bold tracking-wider mt-0.5">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* ─── Nemesis & Stack ─── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-5 rounded-2xl bg-[#111] space-y-1.5">
          <div className="flex items-center gap-1.5">
            <ShieldAlert className="w-3.5 h-3.5 text-rose-500" />
            <span className="text-[10px] text-rose-500 uppercase font-bold tracking-widest">PR Nemesis</span>
          </div>
          <p className="text-xs sm:text-sm text-gray-200 font-medium leading-relaxed">{ai.devNemesis}</p>
        </div>

        <div className="p-5 rounded-2xl bg-[#111] space-y-1.5">
          <div className="flex items-center gap-1.5">
            <Code2 className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-[10px] text-cyan-400 uppercase font-bold tracking-widest">Ideal Stack</span>
          </div>
          <p className="text-xs sm:text-sm text-gray-200 font-medium leading-relaxed">{ai.recommendedStack}</p>
        </div>
      </div>

      {/* ─── Key Observations ─── */}
      <div className="space-y-3">
        <span className="text-[10px] text-gray-500 uppercase font-bold tracking-widest block">
          Key Observations
        </span>
        <div className="space-y-2">
          {ai.observations.map((obs, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-[#111] text-sm text-gray-200 flex items-start gap-3 leading-relaxed"
            >
              <span className="w-6 h-6 rounded-lg bg-[#222] text-white font-bold flex items-center justify-center text-[10px] shrink-0">
                {idx + 1}
              </span>
              <span>{obs}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ─── Watermark ─── */}
      <div className="pt-4 flex items-center justify-between text-[11px] text-gray-600 border-t border-[#1a1a1a]">
        <div className="flex items-center gap-2">
          <CodeAuraLogo className="w-4 h-4" />
          <span className="font-bold text-gray-400">CodeAura</span>
        </div>
        <span>code-aura-app.vercel.app</span>
      </div>
    </div>
  )
}
