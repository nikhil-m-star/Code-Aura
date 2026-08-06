'use client'

import React from 'react'
import { Flame, Crown, Code2, Terminal, ShieldAlert, Sparkles, TrendingUp, GitBranch, Cpu, Activity } from 'lucide-react'
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
  let tierTagBg = 'bg-cyan-500/20 text-cyan-300'
  let scoreColor = 'text-cyan-400'

  if (ai.auraScore >= 92) {
    tierGrade = 'S-TIER GOD'
    tierTagBg = 'bg-amber-400/20 text-amber-300'
    scoreColor = 'text-amber-400'
  } else if (ai.auraScore >= 84) {
    tierGrade = 'S-TIER DEV'
    tierTagBg = 'bg-rose-500/20 text-rose-300'
    scoreColor = 'text-rose-400'
  } else if (ai.auraScore >= 75) {
    tierGrade = 'A-TIER PRO'
    tierTagBg = 'bg-cyan-500/20 text-cyan-300'
    scoreColor = 'text-cyan-400'
  } else {
    tierGrade = 'B-TIER CRAFTSMAN'
    tierTagBg = 'bg-emerald-500/20 text-emerald-300'
    scoreColor = 'text-emerald-400'
  }

  const roastText = ai.roast || ai.roastOrPraise || 'Consistently pushing code at ungodly hours.'
  const praiseText = ai.praise || 'Maintains incredible build momentum across open source projects.'

  const ratingBars = [
    { label: 'Velocity', value: radar.velocity, color: 'bg-rose-500' },
    { label: 'Clarity', value: radar.clarity, color: 'bg-emerald-400' },
    { label: 'Algorithms', value: radar.algorithms, color: 'bg-amber-400' },
    { label: 'Stamina', value: radar.stamina, color: 'bg-fuchsia-500' },
    { label: 'Impact', value: radar.impact, color: 'bg-cyan-400' },
  ]

  return (
    <div
      ref={cardRef}
      className="w-full max-w-3xl mx-auto rounded-3xl p-6 md:p-10 bg-[#09090b] text-white space-y-6 font-sans shadow-2xl"
    >
      {/* ─── Profile Header ─── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 p-6 rounded-2xl bg-[#121215]">
        <div className="flex items-center gap-4">
          <div className="relative">
            <img
              src={github.avatarUrl}
              alt={github.username}
              className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl object-cover bg-[#09090b] ring-2 ring-white/10"
            />
            <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-400 ring-4 ring-[#121215]" />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {github.name || github.username}
            </h2>
            <div className="flex items-center gap-2 mt-2 flex-wrap">
              <span className="text-xs font-mono font-medium text-gray-400">@{github.username}</span>
              <span className="text-[11px] px-2.5 py-0.5 rounded-lg bg-rose-500/20 text-rose-300 font-semibold font-mono">
                {github.topLanguage}
              </span>
              <span className="text-[11px] px-2.5 py-0.5 rounded-lg bg-cyan-500/20 text-cyan-300 font-semibold font-mono">
                {github.timeSlot}
              </span>
            </div>
          </div>
        </div>

        {/* Aura Score Box */}
        <div className="flex items-center gap-4 px-5 py-3.5 rounded-2xl bg-[#18181c] self-start sm:self-auto">
          <div className="flex flex-col items-end">
            <span className="text-[10px] text-gray-400 uppercase tracking-widest font-black flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-300" />
              <span>Aura Score</span>
            </span>
            <span className={`text-[10px] px-2 py-0.5 rounded-md mt-1 font-mono font-black ${tierTagBg}`}>
              {tierGrade}
            </span>
          </div>
          <span className={`text-4xl font-black font-mono ${scoreColor}`}>{ai.auraScore}</span>
        </div>
      </div>

      {/* ─── Archetype Card ─── */}
      <div className="p-6 rounded-2xl bg-[#121215] space-y-2 border-l-4 border-fuchsia-500">
        <div className="flex items-center justify-between text-[11px] font-black uppercase tracking-widest text-fuchsia-400">
          <span className="flex items-center gap-1.5">
            <Cpu className="w-4 h-4" />
            <span>AI Archetype</span>
          </span>
          <span className="px-2 py-0.5 rounded bg-fuchsia-500/20 text-fuchsia-300 text-[10px] font-mono">VERIFIED</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight">
          &ldquo;{ai.archetype}&rdquo;
        </h3>
        <p className="text-sm text-gray-300 italic font-medium pt-1">&ldquo;{ai.tagline}&rdquo;</p>
      </div>

      {/* ─── Roast & Praise Dual Cards ─── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Roast */}
        <div className="p-6 rounded-2xl bg-[#151214] space-y-3 border-l-4 border-rose-500">
          <div className="flex items-center gap-2">
            <Flame className="w-4 h-4 text-rose-400" />
            <span className="text-[11px] text-rose-400 font-black uppercase tracking-widest">
              The Roast
            </span>
          </div>
          <p className="text-sm text-gray-200 font-medium leading-relaxed italic">
            &ldquo;{roastText}&rdquo;
          </p>
        </div>

        {/* Praise */}
        <div className="p-6 rounded-2xl bg-[#121513] space-y-3 border-l-4 border-emerald-400">
          <div className="flex items-center gap-2">
            <Crown className="w-4 h-4 text-emerald-400" />
            <span className="text-[11px] text-emerald-400 font-black uppercase tracking-widest">
              The Praise
            </span>
          </div>
          <p className="text-sm text-gray-200 font-medium leading-relaxed italic">
            &ldquo;{praiseText}&rdquo;
          </p>
        </div>
      </div>

      {/* ─── Performance Ratings ─── */}
      <div className="p-6 rounded-2xl bg-[#121215] space-y-5">
        <div className="flex items-center justify-between text-xs font-black uppercase tracking-widest text-purple-400">
          <span className="flex items-center gap-1.5">
            <Activity className="w-4 h-4" />
            <span>Performance Telemetry</span>
          </span>
          <span className="px-2.5 py-1 rounded-lg bg-[#1a1a1f] text-gray-300 font-mono text-[11px]">
            Complexity: {github.codeComplexityScore}/100
          </span>
        </div>

        <div className="space-y-3.5">
          {ratingBars.map((bar) => (
            <div key={bar.label} className="flex items-center gap-4">
              <span className="text-xs text-gray-300 font-semibold w-24 shrink-0">{bar.label}</span>
              <div className="flex-1 h-2.5 bg-[#1a1a1f] rounded-full overflow-hidden">
                <div
                  className={`h-full ${bar.color} rounded-full transition-all duration-500`}
                  style={{ width: `${bar.value}%` }}
                />
              </div>
              <span className="text-xs font-mono font-bold text-white w-10 text-right">{bar.value}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* ─── Metrics Grid ─── */}
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
          <div key={stat.label} className="p-4 rounded-2xl bg-[#121215] text-center space-y-1">
            <div className={`text-xl font-mono font-black ${stat.color}`}>{stat.value}</div>
            <div className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* ─── Nemesis & Stack ─── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-5 rounded-2xl bg-[#121215] space-y-2 border-l-4 border-rose-500">
          <div className="flex items-center gap-1.5">
            <ShieldAlert className="w-4 h-4 text-rose-400" />
            <span className="text-[11px] text-rose-400 uppercase font-black tracking-widest">PR Nemesis</span>
          </div>
          <p className="text-xs sm:text-sm text-gray-200 font-medium leading-relaxed">{ai.devNemesis}</p>
        </div>

        <div className="p-5 rounded-2xl bg-[#121215] space-y-2 border-l-4 border-cyan-400">
          <div className="flex items-center gap-1.5">
            <Terminal className="w-4 h-4 text-cyan-400" />
            <span className="text-[11px] text-cyan-400 uppercase font-black tracking-widest">Ideal Stack</span>
          </div>
          <p className="text-xs sm:text-sm text-gray-200 font-medium leading-relaxed">{ai.recommendedStack}</p>
        </div>
      </div>

      {/* ─── Key Observations ─── */}
      <div className="p-6 rounded-2xl bg-[#121215] space-y-4">
        <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-purple-400">
          <GitBranch className="w-4 h-4" />
          <span>Key Observations</span>
        </div>
        <div className="space-y-3">
          {ai.observations.map((obs, idx) => {
            const numColors = [
              'bg-rose-500 text-white',
              'bg-emerald-500 text-black font-black',
              'bg-cyan-400 text-black font-black',
              'bg-amber-400 text-black font-black',
              'bg-fuchsia-500 text-white',
            ]
            return (
              <div
                key={idx}
                className="p-4 rounded-xl bg-[#18181c] text-sm text-gray-200 flex items-start gap-3.5 leading-relaxed font-medium"
              >
                <span className={`w-6 h-6 rounded-lg ${numColors[idx % numColors.length]} font-mono flex items-center justify-center text-[11px] shrink-0 font-bold`}>
                  0{idx + 1}
                </span>
                <span className="pt-0.5">{obs}</span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
