'use client'

import React from 'react'
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

// 100% Solid Color Number Badges
const SOLID_OBS_BADGES = [
  'bg-rose-500 text-white font-black',
  'bg-emerald-500 text-white font-black',
  'bg-cyan-500 text-white font-black',
  'bg-amber-500 text-white font-black',
  'bg-fuchsia-500 text-white font-black',
]

export const AuraCard: React.FC<AuraCardProps> = ({ github, leetcode, ai, cardRef }) => {
  const radar = ai.radarStats || {
    velocity: 80,
    clarity: 85,
    algorithms: leetcode ? 75 : 55,
    stamina: 88,
    impact: 70,
  }

  // Playful Tier Grade based on Aura Score
  let tierGrade = 'A-TIER'
  let tierBadgeBg = 'bg-rose-500 text-white'

  if (ai.auraScore >= 92) {
    tierGrade = 'S-TIER GOD'
    tierBadgeBg = 'bg-yellow-400 text-black font-black'
  } else if (ai.auraScore >= 84) {
    tierGrade = 'S-TIER DEV'
    tierBadgeBg = 'bg-rose-500 text-white font-black'
  } else if (ai.auraScore >= 75) {
    tierGrade = 'A-TIER PRO'
    tierBadgeBg = 'bg-cyan-400 text-black font-black'
  } else {
    tierGrade = 'B-TIER CRAFTSMAN'
    tierBadgeBg = 'bg-emerald-400 text-black font-black'
  }

  const roastText = ai.roast || ai.roastOrPraise || 'Consistently pushing code at ungodly hours.'
  const praiseText = ai.praise || 'Maintains incredible build momentum across open source projects.'

  return (
    <div
      ref={cardRef}
      className="w-full max-w-3xl mx-auto rounded-3xl p-6 md:p-10 bg-[#070707] text-white space-y-8 font-sans"
    >
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#181818]">
        <div className="flex items-center gap-4">
          <img
            src={github.avatarUrl}
            alt={github.username}
            className="w-16 h-16 rounded-2xl object-cover bg-[#161616]"
          />
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-2xl font-black text-white tracking-tight">
                {github.name || github.username}
              </h2>
              <span className="text-xs font-bold text-rose-400">@{github.username}</span>
            </div>
            <div className="flex items-center gap-2 mt-2 flex-wrap">
              {/* Solid Badges */}
              <span className="px-3 py-1 rounded-xl text-xs font-black bg-[#2d121c] text-rose-300">
                {github.topLanguage}
              </span>
              <span className="px-3 py-1 rounded-xl text-xs font-black bg-[#0d2736] text-cyan-300">
                {github.timeSlot}
              </span>
              {leetcode && (
                <span className="px-3 py-1 rounded-xl text-xs font-black bg-[#33220e] text-amber-300">
                  {leetcode.totalSolved} Solved
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Playful Rating Badge */}
        <div className="flex items-center gap-3.5 bg-[#141414] px-5 py-3.5 rounded-2xl self-start sm:self-auto">
          <div className="flex flex-col items-end">
            <span className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">
              Aura Score
            </span>
            <span className={`text-[10px] px-2.5 py-0.5 rounded-md mt-0.5 ${tierBadgeBg}`}>
              {tierGrade}
            </span>
          </div>
          <span className="text-3xl font-black text-white">{ai.auraScore}</span>
        </div>
      </div>

      {/* Archetype & Tagline - Solid Dark Crimson Box */}
      <div className="p-6 rounded-2xl bg-[#181116] space-y-2">
        <span className="text-[11px] text-rose-400 uppercase tracking-widest font-bold block">
          AI Archetype
        </span>
        <h3 className="text-2xl sm:text-3xl font-black text-white">
          "{ai.archetype}"
        </h3>
        <p className="text-sm text-gray-300 italic pt-1">"{ai.tagline}"</p>
      </div>

      {/* DEDICATED SOLID ROAST & PRAISE BOXES */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* 🔥 THE ROAST - SOLID DARK CRIMSON */}
        <div className="p-6 rounded-2xl bg-[#2a111a] space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-base">🔥</span>
            <span className="text-[11px] text-rose-400 font-bold uppercase tracking-widest">
              The Roast
            </span>
          </div>
          <p className="text-sm text-rose-100 font-medium leading-relaxed italic">
            "{roastText}"
          </p>
        </div>

        {/* 👑 THE PRAISE - SOLID DARK EMERALD */}
        <div className="p-6 rounded-2xl bg-[#0e271f] space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-base">👑</span>
            <span className="text-[11px] text-emerald-400 font-bold uppercase tracking-widest">
              The Praise
            </span>
          </div>
          <p className="text-sm text-emerald-100 font-medium leading-relaxed italic">
            "{praiseText}"
          </p>
        </div>
      </div>

      {/* Artistic 5-Axis Colorful Skill Ratings - SOLID CARDS */}
      <div className="p-6 rounded-2xl bg-[#121212] space-y-4">
        <div className="flex items-center justify-between text-xs font-bold uppercase tracking-widest text-gray-400">
          <span>Performance Ratings</span>
          <span className="text-rose-400 font-bold">Complexity: {github.codeComplexityScore}/100</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
          {/* Velocity */}
          <div className="p-3.5 rounded-2xl bg-[#2b121f] space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-rose-300 font-bold">Velocity</span>
              <span className="text-white font-bold">{radar.velocity}%</span>
            </div>
            <div className="w-full h-2 bg-[#421b30] rounded-full overflow-hidden">
              <div className="h-full bg-rose-500 rounded-full" style={{ width: `${radar.velocity}%` }} />
            </div>
          </div>

          {/* Clarity */}
          <div className="p-3.5 rounded-2xl bg-[#0f291f] space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-emerald-300 font-bold">Clarity</span>
              <span className="text-white font-bold">{radar.clarity}%</span>
            </div>
            <div className="w-full h-2 bg-[#1b4233] rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${radar.clarity}%` }} />
            </div>
          </div>

          {/* Algorithms */}
          <div className="p-3.5 rounded-2xl bg-[#2b1e0f] space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-amber-300 font-bold">Algo</span>
              <span className="text-white font-bold">{radar.algorithms}%</span>
            </div>
            <div className="w-full h-2 bg-[#453018] rounded-full overflow-hidden">
              <div className="h-full bg-amber-500 rounded-full" style={{ width: `${radar.algorithms}%` }} />
            </div>
          </div>

          {/* Stamina */}
          <div className="p-3.5 rounded-2xl bg-[#2d121c] space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-pink-300 font-bold">Stamina</span>
              <span className="text-white font-bold">{radar.stamina}%</span>
            </div>
            <div className="w-full h-2 bg-[#471b2d] rounded-full overflow-hidden">
              <div className="h-full bg-pink-500 rounded-full" style={{ width: `${radar.stamina}%` }} />
            </div>
          </div>

          {/* Impact */}
          <div className="p-3.5 rounded-2xl bg-[#0e2736] space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-cyan-300 font-bold">Impact</span>
              <span className="text-white font-bold">{radar.impact}%</span>
            </div>
            <div className="w-full h-2 bg-[#1b3e54] rounded-full overflow-hidden">
              <div className="h-full bg-cyan-500 rounded-full" style={{ width: `${radar.impact}%` }} />
            </div>
          </div>
        </div>
      </div>

      {/* GitHub & LeetCode Key Stats Grid - SOLID TILES */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* GitHub Stats */}
        <div className="p-5 rounded-2xl bg-[#121212] space-y-3">
          <div className="flex items-center justify-between text-xs font-bold text-gray-400 uppercase tracking-widest">
            <span>GitHub Metrics</span>
            <span className="text-emerald-400 font-bold">{github.originalityRatio}% Original</span>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="p-3 rounded-xl bg-[#2e1d0c]">
              <div className="text-lg font-black text-amber-400">{github.totalStars}</div>
              <div className="text-[10px] text-amber-200 font-semibold">Stars</div>
            </div>
            <div className="p-3 rounded-xl bg-[#0d2736]">
              <div className="text-lg font-black text-cyan-400">{github.publicRepos}</div>
              <div className="text-[10px] text-cyan-200 font-semibold">Repos</div>
            </div>
            <div className="p-3 rounded-xl bg-[#2d121c]">
              <div className="text-lg font-black text-pink-400">{github.followers}</div>
              <div className="text-[10px] text-pink-200 font-semibold">Followers</div>
            </div>
          </div>

          <div className="flex justify-between text-xs text-gray-400 pt-1">
            <span>Primary Language</span>
            <span className="text-rose-300 font-bold">{github.topLanguage}</span>
          </div>
        </div>

        {/* LeetCode Stats */}
        <div className="p-5 rounded-2xl bg-[#121212] space-y-3">
          <div className="flex items-center justify-between text-xs font-bold text-gray-400 uppercase tracking-widest">
            <span>LeetCode Stats</span>
            {leetcode && <span className="text-amber-400 font-bold">{leetcode.acceptanceRate}% Accuracy</span>}
          </div>

          {leetcode ? (
            <>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="p-3 rounded-xl bg-[#0f291f]">
                  <div className="text-lg font-black text-emerald-400">{leetcode.easySolved}</div>
                  <div className="text-[10px] text-emerald-200 font-semibold">Easy</div>
                </div>
                <div className="p-3 rounded-xl bg-[#2b1e0f]">
                  <div className="text-lg font-black text-amber-400">{leetcode.mediumSolved}</div>
                  <div className="text-[10px] text-amber-200 font-semibold">Medium</div>
                </div>
                <div className="p-3 rounded-xl bg-[#2d121c]">
                  <div className="text-lg font-black text-rose-400">{leetcode.hardSolved}</div>
                  <div className="text-[10px] text-rose-200 font-semibold">Hard</div>
                </div>
              </div>
              <div className="flex justify-between text-xs text-gray-400 pt-1">
                <span>Algo Rating</span>
                <span className="text-amber-300 font-bold">{leetcode.algoMasteryScore}/100</span>
              </div>
            </>
          ) : (
            <div className="py-6 text-center text-xs text-gray-500">
              No LeetCode profile linked.
            </div>
          )}
        </div>
      </div>

      {/* Playful Solid Cards: PR Nemesis & Stack */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-5 rounded-2xl bg-[#2b121a] space-y-1">
          <span className="text-[10px] text-rose-400 uppercase font-bold tracking-wider">
            PR Nemesis
          </span>
          <p className="text-xs sm:text-sm font-bold text-rose-100">{ai.devNemesis}</p>
        </div>

        <div className="p-5 rounded-2xl bg-[#0d2736] space-y-1">
          <span className="text-[10px] text-cyan-400 uppercase font-bold tracking-wider">
            Ideal Tech Stack
          </span>
          <p className="text-xs sm:text-sm font-bold text-cyan-100">{ai.recommendedStack}</p>
        </div>
      </div>

      {/* Observation List with SOLID Badges */}
      <div className="space-y-3">
        <span className="text-[11px] text-gray-400 uppercase font-bold tracking-widest block">
          Key Observations
        </span>
        <div className="space-y-2.5">
          {ai.observations.map((obs, idx) => (
            <div
              key={idx}
              className="p-4.5 rounded-2xl bg-[#141414] text-xs sm:text-sm text-gray-100 flex items-start gap-3.5 leading-relaxed"
            >
              <span
                className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs shrink-0 ${
                  SOLID_OBS_BADGES[idx % SOLID_OBS_BADGES.length]
                }`}
              >
                0{idx + 1}
              </span>
              <span>{obs}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Clean Brand Watermark */}
      <div className="pt-4 flex items-center justify-between text-[11px] text-gray-600">
        <div className="flex items-center gap-2">
          <CodeAuraLogo className="w-4 h-4" />
          <span className="font-bold text-white">CodeAura</span>
        </div>
        <span>code-aura-app.vercel.app</span>
      </div>
    </div>
  )
}
