'use client'

import React from 'react'
import { Flame, Crown, Zap, Code2, Award, Terminal, ShieldAlert, Sparkles, TrendingUp, GitBranch } from 'lucide-react'
import { GitHubUserStats } from '@/lib/services/github'
import { LeetCodeUserStats } from '@/lib/services/leetcode'
import { AISummary } from '@/lib/services/nvidia'

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
  let tierColor = 'text-cyan-400'
  let tierBorder = 'border-cyan-500/30'

  if (ai.auraScore >= 92) {
    tierGrade = 'S-TIER'
    tierColor = 'text-yellow-400'
    tierBorder = 'border-yellow-500/30'
  } else if (ai.auraScore >= 84) {
    tierGrade = 'S-TIER'
    tierColor = 'text-rose-400'
    tierBorder = 'border-rose-500/30'
  } else if (ai.auraScore >= 75) {
    tierGrade = 'A-TIER'
    tierColor = 'text-cyan-400'
    tierBorder = 'border-cyan-500/30'
  } else {
    tierGrade = 'B-TIER'
    tierColor = 'text-emerald-400'
    tierBorder = 'border-emerald-500/30'
  }

  const roastText = ai.roast || ai.roastOrPraise || 'Consistently pushing code at ungodly hours.'
  const praiseText = ai.praise || 'Maintains incredible build momentum across open source projects.'

  const ratingBars = [
    { label: 'Velocity', value: radar.velocity, color: 'bg-rose-500', track: 'bg-rose-500/10' },
    { label: 'Clarity', value: radar.clarity, color: 'bg-emerald-500', track: 'bg-emerald-500/10' },
    { label: 'Algorithms', value: radar.algorithms, color: 'bg-amber-400', track: 'bg-amber-400/10' },
    { label: 'Stamina', value: radar.stamina, color: 'bg-fuchsia-500', track: 'bg-fuchsia-500/10' },
    { label: 'Impact', value: radar.impact, color: 'bg-cyan-400', track: 'bg-cyan-400/10' },
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
            className="w-16 h-16 rounded-2xl object-cover bg-[#111] ring-2 ring-rose-500/20"
          />
          <div>
            <h2 className="text-2xl font-black text-white tracking-tight">
              {github.name || github.username}
            </h2>
            <div className="flex items-center gap-2 mt-1.5 flex-wrap">
              <span className="text-xs font-semibold text-gray-400">@{github.username}</span>
              <span className="text-[10px] px-2 py-0.5 rounded-md bg-rose-500/15 text-rose-400 font-bold border border-rose-500/20">
                {github.topLanguage}
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-md bg-cyan-500/15 text-cyan-300 font-semibold border border-cyan-500/20">
                {github.timeSlot}
              </span>
            </div>
          </div>
        </div>

        <div className={`flex items-center gap-3 self-start sm:self-auto px-5 py-3 rounded-2xl bg-[#0a0a0a] border ${tierBorder}`}>
          <div className="text-right">
            <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold block">Aura</span>
            <span className={`text-[10px] ${tierColor} font-black`}>{tierGrade}</span>
          </div>
          <span className={`text-4xl font-black ${tierColor}`}>{ai.auraScore}</span>
        </div>
      </div>

      {/* ─── Archetype ─── */}
      <div className="p-5 rounded-2xl bg-[#0d0d0d] border border-fuchsia-500/15 space-y-1">
        <div className="flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-fuchsia-400" />
          <span className="text-[10px] text-fuchsia-400 uppercase tracking-widest font-bold">Archetype</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
          {ai.archetype}
        </h3>
        <p className="text-sm text-gray-400 italic">{ai.tagline}</p>
      </div>

      {/* ─── Roast & Praise ─── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-5 rounded-2xl bg-[#0d0d0d] border border-rose-500/15 space-y-2">
          <div className="flex items-center gap-1.5">
            <Flame className="w-3.5 h-3.5 text-rose-500" />
            <span className="text-[10px] text-rose-500 font-bold uppercase tracking-widest">The Roast</span>
          </div>
          <p className="text-sm text-gray-200 leading-relaxed italic">
            &ldquo;{roastText}&rdquo;
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-[#0d0d0d] border border-emerald-500/15 space-y-2">
          <div className="flex items-center gap-1.5">
            <Crown className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest">The Praise</span>
          </div>
          <p className="text-sm text-gray-200 leading-relaxed italic">
            &ldquo;{praiseText}&rdquo;
          </p>
        </div>
      </div>

      {/* ─── Performance Ratings ─── */}
      <div className="p-5 rounded-2xl bg-[#0d0d0d] border border-purple-500/15 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <TrendingUp className="w-3.5 h-3.5 text-purple-400" />
            <span className="text-[10px] text-purple-400 uppercase tracking-widest font-bold">Performance</span>
          </div>
          <span className="text-[10px] text-gray-500 font-semibold">
            Complexity: {github.codeComplexityScore}/100
          </span>
        </div>
        <div className="space-y-3">
          {ratingBars.map((bar) => (
            <div key={bar.label} className="flex items-center gap-4">
              <span className="text-xs text-gray-400 font-semibold w-20 shrink-0">{bar.label}</span>
              <div className={`flex-1 h-2 ${bar.track} rounded-full overflow-hidden`}>
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
          { label: 'Stars', value: github.totalStars, color: 'text-amber-400', border: 'border-amber-500/20' },
          { label: 'Repos', value: github.publicRepos, color: 'text-cyan-400', border: 'border-cyan-500/20' },
          { label: 'Followers', value: github.followers, color: 'text-rose-400', border: 'border-rose-500/20' },
          ...(leetcode
            ? [
                { label: 'Easy', value: leetcode.easySolved, color: 'text-emerald-400', border: 'border-emerald-500/20' },
                { label: 'Medium', value: leetcode.mediumSolved, color: 'text-amber-400', border: 'border-amber-500/20' },
                { label: 'Hard', value: leetcode.hardSolved, color: 'text-rose-400', border: 'border-rose-500/20' },
              ]
            : [
                { label: 'Original', value: `${github.originalityRatio}%`, color: 'text-emerald-400', border: 'border-emerald-500/20' },
                { label: 'Commits', value: github.recentCommitCount, color: 'text-fuchsia-400', border: 'border-fuchsia-500/20' },
                { label: 'PRs', value: github.pullRequestCount, color: 'text-cyan-400', border: 'border-cyan-500/20' },
              ]),
        ].map((stat) => (
          <div key={stat.label} className={`p-3.5 rounded-2xl bg-[#0d0d0d] border ${stat.border} text-center`}>
            <div className={`text-lg font-black ${stat.color}`}>{stat.value}</div>
            <div className="text-[10px] text-gray-500 uppercase font-bold tracking-wider mt-0.5">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* ─── Nemesis & Stack ─── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-5 rounded-2xl bg-[#0d0d0d] border border-rose-500/15 space-y-1.5">
          <div className="flex items-center gap-1.5">
            <ShieldAlert className="w-3.5 h-3.5 text-rose-500" />
            <span className="text-[10px] text-rose-500 uppercase font-bold tracking-widest">PR Nemesis</span>
          </div>
          <p className="text-xs sm:text-sm text-gray-200 font-medium leading-relaxed">{ai.devNemesis}</p>
        </div>

        <div className="p-5 rounded-2xl bg-[#0d0d0d] border border-cyan-500/15 space-y-1.5">
          <div className="flex items-center gap-1.5">
            <Code2 className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-[10px] text-cyan-400 uppercase font-bold tracking-widest">Ideal Stack</span>
          </div>
          <p className="text-xs sm:text-sm text-gray-200 font-medium leading-relaxed">{ai.recommendedStack}</p>
        </div>
      </div>

      {/* ─── Key Observations ─── */}
      <div className="space-y-3">
        <div className="flex items-center gap-1.5">
          <GitBranch className="w-3.5 h-3.5 text-purple-400" />
          <span className="text-[10px] text-purple-400 uppercase font-bold tracking-widest">Key Observations</span>
        </div>
        <div className="space-y-2">
          {ai.observations.map((obs, idx) => {
            const colors = [
              'border-rose-500/15 text-rose-400',
              'border-emerald-500/15 text-emerald-400',
              'border-cyan-500/15 text-cyan-400',
              'border-amber-500/15 text-amber-400',
              'border-fuchsia-500/15 text-fuchsia-400',
            ]
            const c = colors[idx % colors.length]
            const borderClass = c.split(' ')[0]
            const numColor = c.split(' ')[1]
            return (
              <div
                key={idx}
                className={`p-4 rounded-2xl bg-[#0d0d0d] border ${borderClass} text-sm text-gray-200 flex items-start gap-3 leading-relaxed`}
              >
                <span className={`w-6 h-6 rounded-lg bg-[#111] ${numColor} font-bold flex items-center justify-center text-[10px] shrink-0 border ${borderClass}`}>
                  {idx + 1}
                </span>
                <span>{obs}</span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
