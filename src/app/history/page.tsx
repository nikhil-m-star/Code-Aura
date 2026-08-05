'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
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
    <div className="flex-1 max-w-4xl w-full mx-auto px-4 py-10 space-y-8 bg-black">
      <div className="flex items-center justify-between pb-4">
        <div>
          <span className="text-xs font-mono text-gray-500 uppercase tracking-widest block mb-1">
            Vault
          </span>
          <h1 className="text-3xl font-extrabold text-white">Your Saved Auras</h1>
        </div>

        <Link
          href="/"
          className="px-4 py-2 rounded-xl text-xs font-semibold text-black bg-white hover:bg-gray-200 transition-all"
        >
          New Analysis
        </Link>
      </div>

      {loading ? (
        <div className="py-16 text-center text-gray-500 font-mono text-sm">
          Loading history...
        </div>
      ) : history.length === 0 ? (
        <div className="py-16 text-center rounded-2xl bg-[#0c0c0c] p-8 space-y-4">
          <h3 className="text-lg font-bold text-white">No Saved Auras Yet</h3>
          <p className="text-xs text-gray-400 max-w-xs mx-auto">
            Analyze your profile on the home page to save your aura cards here.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-black bg-white"
          >
            Create Aura
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {history.map((item) => (
            <Link
              key={item.id}
              href={`/results/${item.id}`}
              className="p-5 rounded-2xl bg-[#0c0c0c] hover:bg-[#141414] transition-all flex flex-col justify-between space-y-4 group"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-gray-500 font-mono mb-2">
                  <span>@{item.githubUsername}</span>
                  <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                </div>

                <h3 className="text-lg font-extrabold text-white group-hover:text-gray-300 transition-colors">
                  "{item.aiSummary?.archetype || 'Developer Aura'}"
                </h3>

                <p className="text-xs text-gray-400 line-clamp-2 mt-1 italic">
                  "{item.aiSummary?.tagline}"
                </p>
              </div>

              <div className="pt-3 flex items-center justify-between text-xs">
                <span className="font-semibold text-white font-mono">
                  Score: {item.aiSummary?.auraScore || 80}/99
                </span>
                <span className="flex items-center gap-1 text-gray-400 group-hover:text-white transition-colors">
                  <span>View</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
