'use me'
'use client'

import React, { useEffect, useState, useRef } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import confetti from 'canvas-confetti'
import { toPng } from 'html-to-image'
import { Sparkles, Copy, Check, Download, ArrowLeft, RefreshCw, Share2, AlertCircle } from 'lucide-react'
import { getAnalysisByIdAction } from '@/app/actions/analysis'
import { AuraCard } from '@/components/AuraCard'
import { GitHubUserStats } from '@/lib/services/github'
import { LeetCodeUserStats } from '@/lib/services/leetcode'
import { AISummary } from '@/lib/services/nvidia'

interface AnalysisData {
  id: string
  githubUsername: string
  leetcodeUsername: string | null
  githubStats: GitHubUserStats
  leetcodeStats: LeetCodeUserStats | null
  aiSummary: AISummary
  createdAt: string
}

export default function AnalysisResultsPage() {
  const params = useParams()
  const router = useRouter()
  const id = params?.id as string

  const [analysis, setAnalysis] = useState<AnalysisData | null>(null)
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState(false)
  const [downloading, setDownloading] = useState(false)

  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    async function loadAnalysis() {
      if (!id) return
      setLoading(true)
      const data = await getAnalysisByIdAction(id)
      if (data) {
        setAnalysis(data as any)
        // Fire confetti on load for celebratory feel!
        confetti({
          particleCount: 70,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#a855f7', '#ec4899', '#3b82f6', '#f59e0b'],
        })
      }
      setLoading(false)
    }
    loadAnalysis()
  }, [id])

  const handleCopyLink = () => {
    const shareUrl = window.location.href
    navigator.clipboard.writeText(shareUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  const handleDownloadCard = async () => {
    if (!cardRef.current) return
    setDownloading(true)
    try {
      const dataUrl = await toPng(cardRef.current, { cacheBust: true, quality: 0.95 })
      const link = document.createElement('a')
      link.download = `CodeAura-${analysis?.githubUsername || 'Developer'}.png`
      link.href = dataUrl
      link.click()
    } catch (err) {
      console.error('Failed to capture card image:', err)
    } finally {
      setDownloading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center py-20 px-4">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center animate-spin">
            <Sparkles className="w-6 h-6 text-purple-400" />
          </div>
          <p className="text-sm font-mono text-gray-400">Loading Developer Aura Analysis...</p>
        </div>
      </div>
    )
  }

  if (!analysis) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center py-20 px-4 text-center">
        <div className="w-14 h-14 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center mb-4">
          <AlertCircle className="w-7 h-7 text-rose-400" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Analysis Not Found</h2>
        <p className="text-sm text-gray-400 max-w-md mb-6">
          The developer aura record you are looking for may have been removed or does not exist.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-white bg-purple-600 hover:bg-purple-500 transition-all text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
      </div>
    )
  }

  return (
    <div className="flex-1 flex flex-col items-center px-4 py-8 md:py-12 space-y-8">
      {/* Action Bar Header */}
      <div className="w-full max-w-4xl flex flex-col sm:flex-row items-center justify-between gap-4 bg-white/5 border border-white/10 p-4 rounded-2xl backdrop-blur-xl">
        <Link
          href="/"
          className="flex items-center gap-2 text-xs font-semibold text-gray-300 hover:text-white px-3.5 py-2 rounded-xl hover:bg-white/5 transition-all"
        >
          <ArrowLeft className="w-4 h-4 text-purple-400" />
          <span>Analyze Another</span>
        </Link>

        <div className="flex items-center gap-2 flex-wrap justify-center">
          <button
            onClick={handleCopyLink}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-gray-200 bg-white/10 hover:bg-white/20 border border-white/10 transition-all cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-300">Link Copied!</span>
              </>
            ) : (
              <>
                <Share2 className="w-4 h-4 text-purple-400" />
                <span>Share Aura Link</span>
              </>
            )}
          </button>

          <button
            onClick={handleDownloadCard}
            disabled={downloading}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 transition-all shadow-md shadow-purple-600/20 cursor-pointer disabled:opacity-60"
          >
            <Download className="w-4 h-4" />
            <span>{downloading ? 'Capturing...' : 'Download Card PNG'}</span>
          </button>
        </div>
      </div>

      {/* Main Aura Card Display */}
      <AuraCard
        cardRef={cardRef}
        github={analysis.githubStats}
        leetcode={analysis.leetcodeStats}
        ai={analysis.aiSummary}
      />
    </div>
  )
}
