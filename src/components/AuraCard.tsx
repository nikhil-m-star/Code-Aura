'use client'

import React from 'react'
import { Flame, Crown, Code2, Terminal, ShieldAlert, Sparkles, TrendingUp, GitBranch } from 'lucide-react'
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
  let scoreBg = 'bg-cyan-500'

  if (ai.auraScore >= 92) {
    tierGrade = 'S-TIER'
    scoreBg = 'bg-yellow-400'
  } else if (ai.auraScore >= 84) {
    tierGrade = 'S-TIER'
    scoreBg = 'bg-rose-500'
  } else if (ai.auraScore >= 75) {
    tierGrade = 'A-TIER'
    scoreBg = 'bg-cyan-500'
  } else {
    tierGrade = 'B-TIER'
    scoreBg = 'bg-emerald-500'
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
      className="w-full max-w-3xl mx-auto rounded-3xl p-6 md:p-10 bg-[#0a0a0a] text-white space-y-5 font-sans"
    >
      {/* ─── Profile Header ─── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
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
              <span className="text-[10px] px-2.5 py-1 rounded-lg bg-rose-500 text-white font-black">
                {github.topLanguage}
              </span>
              <span className="text-[10px] px-2.5 py-1 rounded-lg bg-[#222] text-gray-200 font-semibold">
                {github.timeSlot}
              </span>
            </div>
          </div>
        </div>

        {/* Aura Score — solid colored badge */}
        <div className={`flex items-center gap-3 self-start sm:self-auto px-5 py-3 rounded-2xl ${scoreBg}`}>
          <div className="text-right">
            <span className="text-[10px] uppercase tracking-widest font-bold block opacity-70">Aura</span>
            <span className="text-[10px] font-black opacity-80">{tierGrade}</span>
          </div>
          <span className="text-4xl font-black">{ai.auraScore}</span>
        </div>
      </div>

      {/* ─── Archetype — solid fuchsia ─── */}
      <div className="p-5 rounded-2xl bg-fuchsia-600 space-y-1">
        <div className="flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-fuchsia-200" />
          <span className="text-[10px] text-fuchsia-200 uppercase tracking-widest font-bold">Archetype</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
          {ai.archetype}
        </h3>
        <p className="text-sm text-fuchsia-100 italic">{ai.tagline}</p>
      </div>

      {/* ─── Roast & Praise ─── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-5 rounded-2xl bg-rose-600 space-y-2">
          <div className="flex items-center gap-1.5">
            <Flame className="w-3.5 h-3.5 text-rose-200" />
            <span className="text-[10px] text-rose-200 font-bold uppercase tracking-widest">The Roast</span>
          </div>
          <p className="text-sm text-white leading-relaxed italic">
            &ldquo;{roastText}&rdquo;
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-emerald-600 space-y-2">
          <div className="flex items-center gap-1.5">
            <Crown className="w-3.5 h-3.5 text-emerald-200" />
            <span className="text-[10px] text-emerald-200 font-bold uppercase tracking-widest">The Praise</span>
          </div>
          <p className="text-sm text-white leading-relaxed italic">
            &ldquo;{praiseText}&rdquo;
          </p>
        </div>
      </div>

      {/* ─── Performance Ratings ─── */}
      <div className="p-5 rounded-2xl bg-[#111] space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <TrendingUp className="w-3.5 h-3.5 text-purple-400" />
            <span className="text-[10px] text-purple-400 uppercase tracking-widest font-bold">Performance</span>
          </div>
          <span className="text-[10px] px-2.5 py-1 rounded-lg bg-[#222] text-gray-300 font-semibold">
            Complexity: {github.codeComplexityScore}/100
          </span>
        </div>
        <div className="space-y-3">
          {ratingBars.map((bar) => (
            <div key={bar.label} className="flex items-center gap-4">
              <span className="text-xs text-gray-300 font-bold w-20 shrink-0">{bar.label}</span>
              <div className="flex-1 h-3 bg-[#1a1a1a] rounded-full overflow-hidden">
                <div
                  className={`h-full ${bar.color} rounded-full`}
                  style={{ width: `${bar.value}%` }}
                />
              </div>
              <span className="text-xs text-white font-black w-9 text-right">{bar.value}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* ─── Stats Grid — colored tiles ─── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
        {[
          { label: 'Stars', value: github.totalStars, bg: 'bg-amber-500', text: 'text-black' },
          { label: 'Repos', value: github.publicRepos, bg: 'bg-cyan-500', text: 'text-black' },
          { label: 'Followers', value: github.followers, bg: 'bg-rose-500', text: 'text-white' },
          ...(leetcode
            ? [
                { label: 'Easy', value: leetcode.easySolved, bg: 'bg-emerald-500', text: 'text-black' },
                { label: 'Medium', value: leetcode.mediumSolved, bg: 'bg-amber-500', text: 'text-black' },
                { label: 'Hard', value: leetcode.hardSolved, bg: 'bg-rose-500', text: 'text-white' },
              ]
            : [
                { label: 'Original', value: `${github.originalityRatio}%`, bg: 'bg-emerald-500', text: 'text-black' },
                { label: 'Commits', value: github.recentCommitCount, bg: 'bg-fuchsia-500', text: 'text-white' },
                { label: 'PRs', value: github.pullRequestCount, bg: 'bg-cyan-500', text: 'text-black' },
              ]),
        ].map((stat) => (
          <div key={stat.label} className={`p-3.5 rounded-2xl ${stat.bg} text-center`}>
            <div className={`text-lg font-black ${stat.text}`}>{stat.value}</div>
            <div className={`text-[10px] uppercase font-bold tracking-wider mt-0.5 ${stat.text} opacity-70`}>{stat.label}</div>
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
        <div className="flex items-center gap-1.5">
          <GitBranch className="w-3.5 h-3.5 text-purple-400" />
          <span className="text-[10px] text-purple-400 uppercase font-bold tracking-widest">Key Observations</span>
        </div>
        <div className="space-y-2">
          {ai.observations.map((obs, idx) => {
            const badges = ['bg-rose-500', 'bg-emerald-500', 'bg-cyan-500', 'bg-amber-500', 'bg-fuchsia-500']
            return (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-[#111] text-sm text-gray-200 flex items-start gap-3 leading-relaxed"
              >
                <span className={`w-6 h-6 rounded-lg ${badges[idx % badges.length]} text-white font-black flex items-center justify-center text-[10px] shrink-0`}>
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
