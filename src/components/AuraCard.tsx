'use client'

import React from 'react'
import {
  Sparkles,
  Code2,
  Star,
  GitFork,
  Users,
  Moon,
  Trophy,
  CheckCircle2,
  AlertTriangle,
  Flame,
  Award,
  BookOpen,
  Zap,
  ShieldAlert,
  Layers,
  Activity,
  Gauge,
} from 'lucide-react'
import { GithubIcon } from '@/components/GithubIcon'
import { GitHubUserStats } from '@/lib/services/github'
import { LeetCodeUserStats } from '@/lib/services/leetcode'
import { AISummary } from '@/lib/services/nvidia'

interface AuraCardProps {
  github: GitHubUserStats
  leetcode: LeetCodeUserStats | null
  ai: AISummary
  cardRef?: React.RefObject<HTMLDivElement | null>
}

const THEME_STYLES: Record<
  AISummary['auraColor'],
  {
    border: string
    badgeBg: string
    badgeText: string
    gradient: string
    glow: string
    accentHex: string
  }
> = {
  cyberpunk: {
    border: 'border-pink-500/40',
    badgeBg: 'bg-pink-500/10 border-pink-500/30',
    badgeText: 'text-pink-300',
    gradient: 'from-pink-500 via-purple-600 to-cyan-400',
    glow: 'shadow-pink-500/20',
    accentHex: '#ec4899',
  },
  'solar-flare': {
    border: 'border-amber-500/40',
    badgeBg: 'bg-amber-500/10 border-amber-500/30',
    badgeText: 'text-amber-300',
    gradient: 'from-amber-400 via-orange-500 to-rose-500',
    glow: 'shadow-amber-500/20',
    accentHex: '#f59e0b',
  },
  'emerald-matrix': {
    border: 'border-emerald-500/40',
    badgeBg: 'bg-emerald-500/10 border-emerald-500/30',
    badgeText: 'text-emerald-300',
    gradient: 'from-emerald-400 via-teal-500 to-cyan-500',
    glow: 'shadow-emerald-500/20',
    accentHex: '#10b981',
  },
  'deep-space': {
    border: 'border-indigo-500/40',
    badgeBg: 'bg-indigo-500/10 border-indigo-500/30',
    badgeText: 'text-indigo-300',
    gradient: 'from-indigo-400 via-purple-500 to-pink-500',
    glow: 'shadow-indigo-500/20',
    accentHex: '#6366f1',
  },
  'laser-violet': {
    border: 'border-purple-500/40',
    badgeBg: 'bg-purple-500/10 border-purple-500/30',
    badgeText: 'text-purple-300',
    gradient: 'from-purple-400 via-fuchsia-500 to-pink-500',
    glow: 'shadow-purple-500/20',
    accentHex: '#a855f7',
  },
}

export const AuraCard: React.FC<AuraCardProps> = ({ github, leetcode, ai, cardRef }) => {
  const theme = THEME_STYLES[ai.auraColor] || THEME_STYLES.cyberpunk
  const radar = ai.radarStats || {
    velocity: 80,
    clarity: 85,
    algorithms: leetcode ? 75 : 55,
    stamina: 88,
    impact: 70,
  }

  return (
    <div
      ref={cardRef}
      className={`w-full max-w-4xl mx-auto rounded-3xl p-6 md:p-8 backdrop-blur-2xl bg-[#0d1322]/90 border ${theme.border} shadow-2xl ${theme.glow} transition-all duration-300 relative overflow-hidden`}
    >
      {/* Decorative Aura Accent Gradients */}
      <div
        className={`absolute -top-32 -right-32 w-80 h-80 rounded-full blur-3xl opacity-30 bg-gradient-to-br ${theme.gradient} pointer-events-none`}
      />
      <div
        className={`absolute -bottom-32 -left-32 w-80 h-80 rounded-full blur-3xl opacity-25 bg-gradient-to-tr ${theme.gradient} pointer-events-none`}
      />

      {/* Top Header Row */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-white/10 relative z-10">
        <div className="flex items-center gap-4">
          <img
            src={github.avatarUrl}
            alt={github.username}
            className="w-16 h-16 md:w-20 md:h-20 rounded-2xl border-2 border-white/20 shadow-lg object-cover"
          />
          <div>
            <div className="flex items-center gap-2.5 flex-wrap">
              <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                {github.name || github.username}
              </h2>
              <span className="text-sm font-mono text-purple-400">@{github.username}</span>
            </div>
            <div className="flex items-center gap-2 mt-1.5 flex-wrap">
              <span
                className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold border ${theme.badgeBg} ${theme.badgeText}`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                {ai.keyVibe}
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-300 border border-blue-500/20">
                <Activity className="w-3.5 h-3.5" />
                {github.timeSlot}
              </span>
              {leetcode && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  <Code2 className="w-3.5 h-3.5" />
                  LeetCode Solved: {leetcode.totalSolved}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Aura Score Circle Badge */}
        <div className="flex items-center gap-4 self-start md:self-auto bg-white/5 border border-white/10 rounded-2xl p-3.5 px-5 backdrop-blur-md">
          <div className="flex flex-col items-end">
            <span className="text-[11px] font-mono tracking-wider text-gray-400 uppercase">
              Developer Aura
            </span>
            <span className="text-xs text-purple-300 font-medium">Power Rating</span>
          </div>
          <div
            className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${theme.gradient} p-0.5 flex items-center justify-center shadow-lg`}
          >
            <div className="w-full h-full bg-[#0d1322] rounded-[14px] flex flex-col items-center justify-center">
              <span className="text-xl font-black text-white leading-none">{ai.auraScore}</span>
              <span className="text-[9px] text-gray-400 font-mono">/99</span>
            </div>
          </div>
        </div>
      </div>

      {/* Developer Archetype Banner */}
      <div className="my-6 p-5 rounded-2xl bg-gradient-to-r from-purple-950/40 via-indigo-950/40 to-slate-900/60 border border-purple-500/20 relative z-10">
        <div className="flex items-center gap-2 text-xs font-mono text-purple-400 uppercase tracking-widest mb-1">
          <Award className="w-4 h-4 text-pink-400" />
          AI Archetype Classification
        </div>
        <h3
          className={`text-2xl md:text-3xl font-black tracking-tight bg-gradient-to-r ${theme.gradient} bg-clip-text text-transparent`}
        >
          "{ai.archetype}"
        </h3>
        <p className="text-sm md:text-base text-gray-300 mt-1 font-medium leading-relaxed italic">
          "{ai.tagline}"
        </p>
      </div>

      {/* 5-Axis Developer Power Radar / Skill Metrics Grid */}
      <div className="my-6 p-5 rounded-2xl bg-white/[0.02] border border-white/10 relative z-10 space-y-3">
        <div className="flex items-center justify-between text-xs font-mono uppercase tracking-widest text-purple-400">
          <span className="flex items-center gap-2">
            <Gauge className="w-4 h-4 text-cyan-400" />
            Developer Power Radar (5-Axis)
          </span>
          <span>Complexity Score: {github.codeComplexityScore}/99</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 pt-2">
          {/* Velocity */}
          <div className="p-3 rounded-xl bg-white/5 border border-white/5 space-y-1.5">
            <div className="flex justify-between items-center text-xs">
              <span className="text-purple-300 font-semibold">Velocity</span>
              <span className="text-white font-mono text-xs">{radar.velocity}%</span>
            </div>
            <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-purple-400 rounded-full" style={{ width: `${radar.velocity}%` }} />
            </div>
          </div>

          {/* Clarity */}
          <div className="p-3 rounded-xl bg-white/5 border border-white/5 space-y-1.5">
            <div className="flex justify-between items-center text-xs">
              <span className="text-cyan-300 font-semibold">Clarity</span>
              <span className="text-white font-mono text-xs">{radar.clarity}%</span>
            </div>
            <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-cyan-400 rounded-full" style={{ width: `${radar.clarity}%` }} />
            </div>
          </div>

          {/* Algorithms */}
          <div className="p-3 rounded-xl bg-white/5 border border-white/5 space-y-1.5">
            <div className="flex justify-between items-center text-xs">
              <span className="text-amber-300 font-semibold">Algorithms</span>
              <span className="text-white font-mono text-xs">{radar.algorithms}%</span>
            </div>
            <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-amber-400 rounded-full" style={{ width: `${radar.algorithms}%` }} />
            </div>
          </div>

          {/* Stamina */}
          <div className="p-3 rounded-xl bg-white/5 border border-white/5 space-y-1.5">
            <div className="flex justify-between items-center text-xs">
              <span className="text-pink-300 font-semibold">Stamina</span>
              <span className="text-white font-mono text-xs">{radar.stamina}%</span>
            </div>
            <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-pink-400 rounded-full" style={{ width: `${radar.stamina}%` }} />
            </div>
          </div>

          {/* Impact */}
          <div className="p-3 rounded-xl bg-white/5 border border-white/5 space-y-1.5">
            <div className="flex justify-between items-center text-xs">
              <span className="text-emerald-300 font-semibold">Impact</span>
              <span className="text-white font-mono text-xs">{radar.impact}%</span>
            </div>
            <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-400 rounded-full" style={{ width: `${radar.impact}%` }} />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 relative z-10">
        {/* GitHub Stats Card */}
        <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <GithubIcon className="w-5 h-5 text-purple-400" />
                <span className="font-bold text-gray-200">GitHub Intelligence</span>
              </div>
              <span className="text-xs font-mono text-gray-400">
                Top: <strong className="text-purple-300">{github.topLanguage}</strong>
              </span>
            </div>

            <div className="grid grid-cols-3 gap-3 text-center mb-4">
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
                <Star className="w-4 h-4 text-amber-400 mx-auto mb-1" />
                <div className="text-lg font-bold text-white">{github.totalStars}</div>
                <div className="text-[10px] text-gray-400">Total Stars</div>
              </div>
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
                <BookOpen className="w-4 h-4 text-cyan-400 mx-auto mb-1" />
                <div className="text-lg font-bold text-white">{github.publicRepos}</div>
                <div className="text-[10px] text-gray-400">Public Repos</div>
              </div>
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
                <Users className="w-4 h-4 text-pink-400 mx-auto mb-1" />
                <div className="text-lg font-bold text-white">{github.followers}</div>
                <div className="text-[10px] text-gray-400">Followers</div>
              </div>
            </div>

            {/* Language Breakdown Bars */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-gray-400 font-mono">
                <span>Language Breakdown</span>
                <span>{github.languages[0]?.name || 'Code'}</span>
              </div>
              <div className="h-2.5 w-full bg-white/10 rounded-full overflow-hidden flex">
                {github.languages.map((lang, idx) => (
                  <div
                    key={idx}
                    style={{ width: `${lang.percentage}%`, backgroundColor: lang.color }}
                    title={`${lang.name}: ${lang.percentage}%`}
                    className="h-full first:rounded-l-full last:rounded-r-full"
                  />
                ))}
              </div>
              <div className="flex flex-wrap gap-x-3 gap-y-1 mt-2">
                {github.languages.slice(0, 4).map((lang, idx) => (
                  <div key={idx} className="flex items-center gap-1.5 text-[11px] text-gray-300">
                    <span
                      className="w-2 h-2 rounded-full inline-block"
                      style={{ backgroundColor: lang.color }}
                    />
                    <span>{lang.name}</span>
                    <span className="text-gray-500 font-mono">{lang.percentage}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs text-gray-400 font-mono">
            <span>Original Codebase Ratio</span>
            <span className="text-emerald-400 font-bold">{github.originalityRatio}% Original</span>
          </div>
        </div>

        {/* LeetCode Stats Card */}
        <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <Code2 className="w-5 h-5 text-amber-400" />
                <span className="font-bold text-gray-200">LeetCode Progress</span>
              </div>
              {leetcode ? (
                <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Linked
                </span>
              ) : (
                <span className="text-xs font-mono text-gray-500 flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-500" /> Not Provided
                </span>
              )}
            </div>

            {leetcode ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between bg-amber-500/10 border border-amber-500/20 rounded-xl p-3">
                  <div>
                    <span className="text-[11px] text-amber-300 font-mono uppercase tracking-wider block">
                      Total Solved
                    </span>
                    <span className="text-2xl font-black text-amber-400">{leetcode.totalSolved}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[11px] text-gray-400 font-mono block">Acceptance</span>
                    <span className="text-lg font-bold text-emerald-400">
                      {leetcode.acceptanceRate}%
                    </span>
                  </div>
                </div>

                {/* Easy, Medium, Hard breakdown */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-emerald-400 font-semibold">Easy</span>
                    <span className="text-gray-300 font-mono">{leetcode.easySolved}</span>
                  </div>
                  <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-400 rounded-full"
                      style={{ width: `${Math.min(100, (leetcode.easySolved / 300) * 100)}%` }}
                    />
                  </div>

                  <div className="flex justify-between items-center text-xs pt-1">
                    <span className="text-amber-400 font-semibold">Medium</span>
                    <span className="text-gray-300 font-mono">{leetcode.mediumSolved}</span>
                  </div>
                  <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-amber-400 rounded-full"
                      style={{ width: `${Math.min(100, (leetcode.mediumSolved / 300) * 100)}%` }}
                    />
                  </div>

                  <div className="flex justify-between items-center text-xs pt-1">
                    <span className="text-rose-400 font-semibold">Hard</span>
                    <span className="text-gray-300 font-mono">{leetcode.hardSolved}</span>
                  </div>
                  <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-rose-400 rounded-full"
                      style={{ width: `${Math.min(100, (leetcode.hardSolved / 100) * 100)}%` }}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-44 flex flex-col items-center justify-center text-center p-4 border border-dashed border-white/10 rounded-xl bg-white/[0.01]">
                <Flame className="w-8 h-8 text-gray-600 mb-2" />
                <p className="text-xs text-gray-400 font-mono">
                  No LeetCode profile linked during analysis.
                </p>
                <p className="text-[11px] text-gray-500 mt-1">
                  Add your LeetCode handle to include algorithm battle stats!
                </p>
              </div>
            )}
          </div>

          <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs text-gray-400 font-mono">
            <span>Algorithmic Mastery Rating</span>
            <span className="text-amber-300 font-bold">
              {leetcode ? `${leetcode.algoMasteryScore}/99` : 'N/A'}
            </span>
          </div>
        </div>
      </div>

      {/* Dev Nemesis & Recommended Stack Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6 relative z-10">
        {/* Dev Nemesis */}
        <div className="p-4 rounded-2xl bg-rose-950/20 border border-rose-500/30 flex items-start gap-3">
          <div className="p-2.5 rounded-xl bg-rose-500/10 text-rose-400 shrink-0 mt-0.5">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-mono text-rose-400 uppercase tracking-widest block">
              PR Review Nemesis
            </span>
            <h4 className="font-bold text-white text-sm mt-0.5">{ai.devNemesis}</h4>
          </div>
        </div>

        {/* Recommended Stack */}
        <div className="p-4 rounded-2xl bg-cyan-950/20 border border-cyan-500/30 flex items-start gap-3">
          <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 shrink-0 mt-0.5">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest block">
              Tailored Ideal Stack
            </span>
            <h4 className="font-bold text-white text-sm mt-0.5">{ai.recommendedStack}</h4>
          </div>
        </div>
      </div>

      {/* AI Observations & Roast Section */}
      <div className="space-y-4 my-6 relative z-10">
        <h4 className="text-sm font-mono uppercase tracking-widest text-purple-400 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-pink-400" />
          Deep AI Key Observations
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {ai.observations.map((obs, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs md:text-sm text-gray-200 flex items-start gap-2.5 leading-relaxed"
            >
              <span className="w-5 h-5 rounded-full bg-purple-500/20 text-purple-300 flex items-center justify-center text-[11px] font-bold shrink-0 mt-0.5">
                {idx + 1}
              </span>
              <span>{obs}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Lighthearted Roast/Praise Box */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-pink-950/30 to-purple-950/30 border border-pink-500/30 relative z-10">
        <div className="flex items-center gap-2 text-xs font-mono text-pink-400 uppercase tracking-widest mb-1.5">
          <Trophy className="w-4 h-4 text-amber-400" />
          The Roast & Praise
        </div>
        <p className="text-sm md:text-base text-pink-200 font-medium leading-relaxed italic">
          "{ai.roastOrPraise}"
        </p>
      </div>

      {/* Footer Watermark */}
      <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-gray-500 relative z-10">
        <span className="flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-purple-400" />
          Analyzed by <strong>CodeAura</strong>
        </span>
        <span>code-aura-app.vercel.app</span>
      </div>
    </div>
  )
}
