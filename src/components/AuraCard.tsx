'use client'

import React from 'react'
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

  return (
    <div
      ref={cardRef}
      className="w-full max-w-3xl mx-auto rounded-3xl p-6 md:p-10 bg-[#0c0c0c] text-white space-y-8"
    >
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6">
        <div className="flex items-center gap-4">
          <img
            src={github.avatarUrl}
            alt={github.username}
            className="w-16 h-16 rounded-2xl object-cover bg-[#161616]"
          />
          <div>
            <h2 className="text-2xl font-extrabold text-white tracking-tight">
              {github.name || github.username}
            </h2>
            <p className="text-sm font-mono text-gray-400">@{github.username}</p>
          </div>
        </div>

        {/* Aura Rating */}
        <div className="flex items-center gap-3 bg-[#161616] px-4 py-2.5 rounded-2xl self-start sm:self-auto">
          <span className="text-xs text-gray-400 font-medium">Aura Rating</span>
          <span className="text-2xl font-black text-white font-mono">{ai.auraScore}</span>
        </div>
      </div>

      {/* Archetype & Tagline */}
      <div className="p-6 rounded-2xl bg-[#141414] space-y-2">
        <span className="text-[11px] font-mono text-gray-400 uppercase tracking-widest block">
          Developer Archetype
        </span>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
          "{ai.archetype}"
        </h3>
        <p className="text-sm text-gray-300 italic pt-1">"{ai.tagline}"</p>
      </div>

      {/* 5-Axis Skill Metrics */}
      <div className="p-6 rounded-2xl bg-[#141414] space-y-3">
        <span className="text-[11px] font-mono text-gray-400 uppercase tracking-widest block">
          Performance Breakdown
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-1">
          <div>
            <div className="flex justify-between text-xs text-gray-400 mb-1">
              <span>Velocity</span>
              <span className="font-mono text-white">{radar.velocity}%</span>
            </div>
            <div className="w-full h-1.5 bg-[#222222] rounded-full overflow-hidden">
              <div className="h-full bg-white rounded-full" style={{ width: `${radar.velocity}%` }} />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs text-gray-400 mb-1">
              <span>Clarity</span>
              <span className="font-mono text-white">{radar.clarity}%</span>
            </div>
            <div className="w-full h-1.5 bg-[#222222] rounded-full overflow-hidden">
              <div className="h-full bg-white rounded-full" style={{ width: `${radar.clarity}%` }} />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs text-gray-400 mb-1">
              <span>Algo</span>
              <span className="font-mono text-white">{radar.algorithms}%</span>
            </div>
            <div className="w-full h-1.5 bg-[#222222] rounded-full overflow-hidden">
              <div className="h-full bg-white rounded-full" style={{ width: `${radar.algorithms}%` }} />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs text-gray-400 mb-1">
              <span>Stamina</span>
              <span className="font-mono text-white">{radar.stamina}%</span>
            </div>
            <div className="w-full h-1.5 bg-[#222222] rounded-full overflow-hidden">
              <div className="h-full bg-white rounded-full" style={{ width: `${radar.stamina}%` }} />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs text-gray-400 mb-1">
              <span>Impact</span>
              <span className="font-mono text-white">{radar.impact}%</span>
            </div>
            <div className="w-full h-1.5 bg-[#222222] rounded-full overflow-hidden">
              <div className="h-full bg-white rounded-full" style={{ width: `${radar.impact}%` }} />
            </div>
          </div>
        </div>
      </div>

      {/* GitHub & LeetCode Key Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* GitHub Stats */}
        <div className="p-5 rounded-2xl bg-[#141414] space-y-3">
          <span className="text-[11px] font-mono text-gray-400 uppercase tracking-widest block">
            GitHub Stats
          </span>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="p-2 rounded-xl bg-[#1c1c1c]">
              <div className="text-base font-bold text-white">{github.totalStars}</div>
              <div className="text-[10px] text-gray-400">Stars</div>
            </div>
            <div className="p-2 rounded-xl bg-[#1c1c1c]">
              <div className="text-base font-bold text-white">{github.publicRepos}</div>
              <div className="text-[10px] text-gray-400">Repos</div>
            </div>
            <div className="p-2 rounded-xl bg-[#1c1c1c]">
              <div className="text-base font-bold text-white">{github.followers}</div>
              <div className="text-[10px] text-gray-400">Followers</div>
            </div>
          </div>
          <div className="flex justify-between text-xs font-mono text-gray-400 pt-1">
            <span>Primary Language</span>
            <span className="text-white font-semibold">{github.topLanguage}</span>
          </div>
        </div>

        {/* LeetCode Stats */}
        <div className="p-5 rounded-2xl bg-[#141414] space-y-3">
          <span className="text-[11px] font-mono text-gray-400 uppercase tracking-widest block">
            LeetCode Stats
          </span>
          {leetcode ? (
            <>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="p-2 rounded-xl bg-[#1c1c1c]">
                  <div className="text-base font-bold text-emerald-400">{leetcode.easySolved}</div>
                  <div className="text-[10px] text-gray-400">Easy</div>
                </div>
                <div className="p-2 rounded-xl bg-[#1c1c1c]">
                  <div className="text-base font-bold text-amber-400">{leetcode.mediumSolved}</div>
                  <div className="text-[10px] text-gray-400">Medium</div>
                </div>
                <div className="p-2 rounded-xl bg-[#1c1c1c]">
                  <div className="text-base font-bold text-rose-400">{leetcode.hardSolved}</div>
                  <div className="text-[10px] text-gray-400">Hard</div>
                </div>
              </div>
              <div className="flex justify-between text-xs font-mono text-gray-400 pt-1">
                <span>Acceptance Rate</span>
                <span className="text-white font-semibold">{leetcode.acceptanceRate}%</span>
              </div>
            </>
          ) : (
            <p className="text-xs text-gray-500 font-mono py-4 text-center">
              No LeetCode profile linked.
            </p>
          )}
        </div>
      </div>

      {/* AI Key Observations */}
      <div className="space-y-3">
        <span className="text-[11px] font-mono text-gray-400 uppercase tracking-widest block">
          Key Observations
        </span>
        <div className="space-y-2">
          {ai.observations.map((obs, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl bg-[#141414] text-xs sm:text-sm text-gray-300 flex items-start gap-3"
            >
              <span className="text-xs font-mono text-gray-500 font-bold shrink-0 mt-0.5">
                0{idx + 1}
              </span>
              <span>{obs}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Roast & Praise Box */}
      <div className="p-5 rounded-2xl bg-[#141414] space-y-1">
        <span className="text-[11px] font-mono text-gray-400 uppercase tracking-widest block">
          Roast & Praise
        </span>
        <p className="text-sm text-gray-200 font-medium italic">
          "{ai.roastOrPraise}"
        </p>
      </div>

      {/* Footer Branding */}
      <div className="pt-4 flex items-center justify-between text-[11px] font-mono text-gray-600">
        <span>CodeAura</span>
        <span>code-aura-app.vercel.app</span>
      </div>
    </div>
  )
}
