'use client'

import React, { useEffect, useState, useRef } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import confetti from 'canvas-confetti'
import { toPng } from 'html-to-image'
import { Download, ArrowLeft, Share2 } from 'lucide-react'
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
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#ffffff', '#888888', '#aaaaaa'],
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
        <p className="text-sm font-mono text-gray-500 animate-pulse">Loading Aura...</p>
      </div>
    )
  }

  if (!analysis) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center py-20 px-4 text-center space-y-4">
        <h2 className="text-xl font-bold text-white">Analysis Not Found</h2>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-black bg-white"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
      </div>
    )
  }

  return (
    <div className="flex-1 flex flex-col items-center px-4 py-8 space-y-6 bg-black">
      {/* Action Bar */}
      <div className="w-full max-w-3xl flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#0c0c0c] p-3.5 px-5 rounded-2xl">
        <Link
          href="/"
          className="flex items-center gap-2 text-xs font-semibold text-gray-400 hover:text-white transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Analyze Another</span>
        </Link>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyLink}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-gray-300 bg-[#181818] hover:bg-[#222222] transition-all cursor-pointer"
          >
            {copied ? (
              <span className="text-white">Link Copied</span>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5" />
                <span>Share Link</span>
              </>
            )}
          </button>

          <button
            onClick={handleDownloadCard}
            disabled={downloading}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-black bg-white hover:bg-gray-200 transition-all cursor-pointer disabled:opacity-50"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{downloading ? 'Downloading...' : 'Download Card'}</span>
          </button>
        </div>
      </div>

      {/* Aura Card */}
      <AuraCard
        cardRef={cardRef}
        github={analysis.githubStats}
        leetcode={analysis.leetcodeStats}
        ai={analysis.aiSummary}
      />
    </div>
  )
}
