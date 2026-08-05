'use me'
'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Sparkles, History, ArrowRight, Code2, Calendar } from 'lucide-react'
import { GithubIcon } from '@/components/GithubIcon'
import { getUserAnalysesAction } from '@/app/actions/analysis'
import { AISummary } from '@/lib/services/nvidia'

interface HistoryItem {
  id: string
  githubUsername: string
  leetcodeUsername: string | null
  aiSummary: AISummary
  createdAt: string
}

export default function HistoryPage() {
  const [history, setHistory] = useState<HistoryItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadHistory() {
      setLoading(true)
      const data = await getUserAnalysesAction()
      setHistory(data as any[])
      setLoading(false)
    }
    loadHistory()
  }, [])

  return (
    <div className="flex-1 max-w-5xl w-full mx-auto px-4 py-8 md:py-12 space-y-8">
      <div className="flex items-center justify-between border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-purple-400 uppercase tracking-widest mb-1">
            <History className="w-4 h-4 text-pink-400" />
            Your Saved Analyses
          </div>
          <h1 className="text-3xl font-black text-white">Developer Aura Vault</h1>
        </div>

        <Link
          href="/"
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 transition-all shadow-md shadow-purple-600/20"
        >
          <Sparkles className="w-4 h-4 text-yellow-300" />
          <span>New Analysis</span>
        </Link>
      </div>

      {loading ? (
        <div className="py-20 text-center text-gray-400 font-mono text-sm">
          Loading your aura history...
        </div>
      ) : history.length === 0 ? (
        <div className="py-16 text-center border border-dashed border-white/10 rounded-2xl bg-white/[0.01] p-8 space-y-4">
          <Sparkles className="w-10 h-10 text-purple-400 mx-auto" />
          <h3 className="text-xl font-bold text-white">No Saved Auras Yet</h3>
          <p className="text-sm text-gray-400 max-w-sm mx-auto">
            Analyze your GitHub or LeetCode profile on the home page to save your developer aura cards.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-white bg-purple-600 hover:bg-purple-500 text-sm transition-all"
          >
            Create Your First Aura
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {history.map((item) => (
            <Link
              key={item.id}
              href={`/results/${item.id}`}
              className="p-5 rounded-2xl glass-panel-interactive border border-white/10 flex flex-col justify-between space-y-4 group"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-gray-400 font-mono mb-2">
                  <span className="flex items-center gap-1.5 text-purple-300">
                    <GithubIcon className="w-3.5 h-3.5" />
                    @{item.githubUsername}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {new Date(item.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <h3 className="text-lg font-extrabold text-white group-hover:text-purple-300 transition-colors">
                  "{item.aiSummary?.archetype || 'Developer Aura'}"
                </h3>

                <p className="text-xs text-gray-400 line-clamp-2 mt-1 italic">
                  "{item.aiSummary?.tagline}"
                </p>
              </div>

              <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs">
                <span className="font-semibold text-purple-400">
                  Aura Rating: {item.aiSummary?.auraScore || 80}/99
                </span>
                <span className="flex items-center gap-1 text-gray-300 group-hover:translate-x-1 transition-transform">
                  <span>View Card</span>
                  <ArrowRight className="w-3.5 h-3.5 text-pink-400" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
