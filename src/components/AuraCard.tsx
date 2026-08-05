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

// 100% Solid Vibrant Pop-Color Observations
const VIBRANT_OBS_CARDS = [
  'bg-rose-500 text-white',
  'bg-emerald-500 text-white',
  'bg-cyan-400 text-black font-semibold',
  'bg-amber-400 text-black font-semibold',
  'bg-fuchsia-500 text-white',
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
  let tierBadgeBg = 'bg-rose-500 text-white font-black'

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
      className="w-full max-w-3xl mx-auto rounded-3xl p-6 md:p-10 bg-black text-white space-y-8 font-sans"
    >
      {/* Profile Header Box - Solid Vibrant Navy */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-blue-600 text-white shadow-2xl">
        <div className="flex items-center gap-4 sm:gap-5">
          <div className="relative">
            <img
              src={github.avatarUrl}
              alt={github.username}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover bg-black border-2 border-white/20 shadow-md"
            />
            <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-400 border-2 border-blue-600" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                {github.name || github.username}
              </h2>
              <span className="text-xs font-black px-2.5 py-1 rounded-lg bg-black text-yellow-300">
                @{github.username}
              </span>
            </div>
            <div className="flex items-center gap-2 mt-2.5 flex-wrap">
              {/* Vibrant Solid Badges */}
              <span className="px-3 py-1 rounded-xl text-xs font-black bg-rose-500 text-white flex items-center gap-1">
                <Code2 className="w-3.5 h-3.5" />
                <span>{github.topLanguage}</span>
              </span>
              <span className="px-3 py-1 rounded-xl text-xs font-black bg-cyan-400 text-black flex items-center gap-1">
                <Zap className="w-3.5 h-3.5" />
                <span>{github.timeSlot}</span>
              </span>
              {leetcode && (
                <span className="px-3 py-1 rounded-xl text-xs font-black bg-amber-400 text-black flex items-center gap-1">
                  <Award className="w-3.5 h-3.5" />
                  <span>{leetcode.totalSolved} Solved</span>
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Aura Rating Badge */}
        <div className="flex items-center gap-4 bg-black px-6 py-4 rounded-2xl self-start sm:self-auto shadow-inner">
          <div className="flex flex-col items-end">
            <span className="text-[10px] text-gray-300 uppercase tracking-widest font-extrabold flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-yellow-300" />
              <span>Aura Score</span>
            </span>
            <span className={`text-[10px] px-2.5 py-0.5 rounded-md mt-1 ${tierBadgeBg}`}>
              {tierGrade}
            </span>
          </div>
          <span className="text-4xl font-black text-white">{ai.auraScore}</span>
        </div>
      </div>

      {/* Archetype & Tagline - Solid Vibrant Fuchsia Box */}
      <div className="p-6 sm:p-8 rounded-3xl bg-fuchsia-600 text-white space-y-2.5 shadow-lg">
        <div className="flex items-center justify-between text-[11px] font-black uppercase tracking-widest text-fuchsia-200">
          <span className="flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5" />
            <span>AI Archetype</span>
          </span>
          <span className="px-2.5 py-0.5 rounded-md bg-black text-white text-[10px]">VERIFIED</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight">
          "{ai.archetype}"
        </h3>
        <p className="text-sm text-fuchsia-100 font-medium italic pt-1">"{ai.tagline}"</p>
      </div>

      {/* DEDICATED VIBRANT SOLID ROAST & PRAISE BOXES */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
        {/* 🔥 THE ROAST - SOLID VIBRANT ROSE */}
        <div className="p-6 rounded-3xl bg-rose-600 text-white space-y-3 shadow-lg">
          <div className="flex items-center gap-2">
            <Flame className="w-4 h-4 text-rose-200" />
            <span className="text-[11px] text-rose-200 font-black uppercase tracking-widest">
              The Roast
            </span>
          </div>
          <p className="text-sm font-bold leading-relaxed italic text-white">
            "{roastText}"
          </p>
        </div>

        {/* 👑 THE PRAISE - SOLID VIBRANT EMERALD */}
        <div className="p-6 rounded-3xl bg-emerald-600 text-white space-y-3 shadow-lg">
          <div className="flex items-center gap-2">
            <Crown className="w-4 h-4 text-emerald-200" />
            <span className="text-[11px] text-emerald-200 font-black uppercase tracking-widest">
              The Praise
            </span>
          </div>
          <p className="text-sm font-bold leading-relaxed italic text-white">
            "{praiseText}"
          </p>
        </div>
      </div>

      {/* 5-Axis Skill Ratings - SOLID VIBRANT PURPLE CONTAINER */}
      <div className="p-6 sm:p-8 rounded-3xl bg-purple-600 text-white space-y-5 shadow-xl">
        <div className="flex items-center justify-between text-xs font-black uppercase tracking-widest text-purple-200">
          <span>Performance Ratings</span>
          <span className="px-3 py-1 rounded-xl bg-black text-yellow-300 font-black">
            Complexity: {github.codeComplexityScore}/100
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3.5">
          {/* Velocity */}
          <div className="p-4 rounded-2xl bg-fuchsia-500 text-white space-y-2">
            <div className="flex justify-between text-xs font-black">
              <span>Velocity</span>
              <span>{radar.velocity}%</span>
            </div>
            <div className="w-full h-2.5 bg-black/40 rounded-full overflow-hidden">
              <div className="h-full bg-white rounded-full transition-all" style={{ width: `${radar.velocity}%` }} />
            </div>
          </div>

          {/* Clarity */}
          <div className="p-4 rounded-2xl bg-emerald-500 text-white space-y-2">
            <div className="flex justify-between text-xs font-black">
              <span>Clarity</span>
              <span>{radar.clarity}%</span>
            </div>
            <div className="w-full h-2.5 bg-black/40 rounded-full overflow-hidden">
              <div className="h-full bg-white rounded-full transition-all" style={{ width: `${radar.clarity}%` }} />
            </div>
          </div>

          {/* Algorithms */}
          <div className="p-4 rounded-2xl bg-amber-400 text-black space-y-2 font-black">
            <div className="flex justify-between text-xs font-black">
              <span>Algo</span>
              <span>{radar.algorithms}%</span>
            </div>
            <div className="w-full h-2.5 bg-black/30 rounded-full overflow-hidden">
              <div className="h-full bg-black rounded-full transition-all" style={{ width: `${radar.algorithms}%` }} />
            </div>
          </div>

          {/* Stamina */}
          <div className="p-4 rounded-2xl bg-rose-500 text-white space-y-2">
            <div className="flex justify-between text-xs font-black">
              <span>Stamina</span>
              <span>{radar.stamina}%</span>
            </div>
            <div className="w-full h-2.5 bg-black/40 rounded-full overflow-hidden">
              <div className="h-full bg-white rounded-full transition-all" style={{ width: `${radar.stamina}%` }} />
            </div>
          </div>

          {/* Impact */}
          <div className="p-4 rounded-2xl bg-cyan-400 text-black space-y-2 font-black">
            <div className="flex justify-between text-xs font-black">
              <span>Impact</span>
              <span>{radar.impact}%</span>
            </div>
            <div className="w-full h-2.5 bg-black/30 rounded-full overflow-hidden">
              <div className="h-full bg-black rounded-full transition-all" style={{ width: `${radar.impact}%` }} />
            </div>
          </div>
        </div>
      </div>

      {/* GitHub & LeetCode Key Stats Grid - SOLID VIBRANT CONTAINERS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
        {/* GitHub Stats - SOLID BLUE */}
        <div className="p-6 rounded-3xl bg-blue-600 text-white space-y-4 shadow-lg">
          <div className="flex items-center justify-between text-xs font-black uppercase tracking-widest text-blue-200">
            <span>GitHub Metrics</span>
            <span className="px-2.5 py-0.5 rounded-md bg-black text-yellow-300 font-black">
              {github.originalityRatio}% Original
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2.5 text-center">
            <div className="p-3.5 rounded-2xl bg-amber-400 text-black font-black shadow">
              <div className="text-xl font-black">{github.totalStars}</div>
              <div className="text-[10px] uppercase font-black tracking-wider">Stars</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-cyan-400 text-black font-black shadow">
              <div className="text-xl font-black">{github.publicRepos}</div>
              <div className="text-[10px] uppercase font-black tracking-wider">Repos</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-rose-500 text-white font-black shadow">
              <div className="text-xl font-black">{github.followers}</div>
              <div className="text-[10px] uppercase font-black tracking-wider">Followers</div>
            </div>
          </div>

          <div className="flex justify-between text-xs font-bold pt-1 text-blue-100">
            <span>Primary Language</span>
            <span className="text-yellow-300 font-black">{github.topLanguage}</span>
          </div>
        </div>

        {/* LeetCode Stats - SOLID INDIGO */}
        <div className="p-6 rounded-3xl bg-indigo-600 text-white space-y-4 shadow-lg">
          <div className="flex items-center justify-between text-xs font-black uppercase tracking-widest text-indigo-200">
            <span>LeetCode Stats</span>
            {leetcode && (
              <span className="px-2.5 py-0.5 rounded-md bg-black text-yellow-300 font-black">
                {leetcode.acceptanceRate}% Accuracy
              </span>
            )}
          </div>

          {leetcode ? (
            <>
              <div className="grid grid-cols-3 gap-2.5 text-center">
                <div className="p-3.5 rounded-2xl bg-emerald-400 text-black font-black shadow">
                  <div className="text-xl font-black">{leetcode.easySolved}</div>
                  <div className="text-[10px] uppercase font-black tracking-wider">Easy</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-amber-400 text-black font-black shadow">
                  <div className="text-xl font-black">{leetcode.mediumSolved}</div>
                  <div className="text-[10px] uppercase font-black tracking-wider">Medium</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-rose-500 text-white font-black shadow">
                  <div className="text-xl font-black">{leetcode.hardSolved}</div>
                  <div className="text-[10px] uppercase font-black tracking-wider">Hard</div>
                </div>
              </div>
              <div className="flex justify-between text-xs font-bold pt-1 text-indigo-100">
                <span>Algo Rating</span>
                <span className="text-yellow-300 font-black">{leetcode.algoMasteryScore}/100</span>
              </div>
            </>
          ) : (
            <div className="py-6 text-center text-xs font-bold text-indigo-200">
              No LeetCode profile linked.
            </div>
          )}
        </div>
      </div>

      {/* Playful Vibrant Solid Cards: PR Nemesis & Stack */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
        <div className="p-6 rounded-3xl bg-rose-600 text-white space-y-1.5 shadow-lg">
          <span className="text-[10px] text-rose-200 uppercase font-black tracking-wider flex items-center gap-1">
            <ShieldAlert className="w-3.5 h-3.5 text-rose-200" />
            <span>PR Nemesis</span>
          </span>
          <p className="text-xs sm:text-sm font-bold leading-relaxed">{ai.devNemesis}</p>
        </div>

        <div className="p-6 rounded-3xl bg-cyan-500 text-black space-y-1.5 shadow-lg">
          <span className="text-[10px] text-black/70 uppercase font-black tracking-wider flex items-center gap-1">
            <Terminal className="w-3.5 h-3.5 text-black/70" />
            <span>Ideal Tech Stack</span>
          </span>
          <p className="text-xs sm:text-sm font-bold leading-relaxed">{ai.recommendedStack}</p>
        </div>
      </div>

      {/* Key Observation Cards - SOLID VIBRANT PURPLE CONTAINER */}
      <div className="p-6 sm:p-8 rounded-3xl bg-purple-600 text-white space-y-4 shadow-xl">
        <span className="text-[11px] text-purple-200 uppercase font-black tracking-widest block">
          Key Observations
        </span>
        <div className="space-y-3.5">
          {ai.observations.map((obs, idx) => (
            <div
              key={idx}
              className={`p-5 rounded-2xl text-xs sm:text-sm flex items-start gap-4 leading-relaxed shadow ${
                VIBRANT_OBS_CARDS[idx % VIBRANT_OBS_CARDS.length]
              }`}
            >
              <span className="w-7 h-7 rounded-xl bg-black text-white font-black flex items-center justify-center text-xs shrink-0">
                0{idx + 1}
              </span>
              <span className="pt-0.5 font-bold">{obs}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Clean Brand Watermark */}
      <div className="pt-4 flex items-center justify-between text-[11px] text-gray-500">
        <div className="flex items-center gap-2">
          <CodeAuraLogo className="w-4 h-4" />
          <span className="font-bold text-white">CodeAura</span>
        </div>
        <span>code-aura-app.vercel.app</span>
      </div>
    </div>
  )
}
