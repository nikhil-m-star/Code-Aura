'use client'

import React, { useEffect, useState, useRef } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import confetti from 'canvas-confetti'
import { toPng } from 'html-to-image'
import { Download, ArrowLeft, Share2, Award, FileText } from 'lucide-react'
import { getAnalysisByIdAction } from '@/app/actions/analysis'
import { AuraCard } from '@/components/AuraCard'
import { AuraFutCard } from '@/components/AuraFutCard'
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
  const [downloadingReport, setDownloadingReport] = useState(false)
  const [downloadingFut, setDownloadingFut] = useState(false)
  const [activeTab, setActiveTab] = useState<'both' | 'report' | 'card'>('both')

  const reportCardRef = useRef<HTMLDivElement>(null)
  const futCardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    async function loadAnalysis() {
      if (!id) return
      setLoading(true)
      const data = await getAnalysisByIdAction(id)
      if (data) {
        setAnalysis(data as any)
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#ffd700', '#c0c0c0', '#e2e8f0', '#ffffff'],
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

  const handleDownloadReport = async () => {
    if (!reportCardRef.current) return
    setDownloadingReport(true)
    try {
      const dataUrl = await toPng(reportCardRef.current, {
        cacheBust: true,
        quality: 1.0,
        pixelRatio: 3,
      })
      const link = document.createElement('a')
      link.download = `CodeAura-Report-${analysis?.githubUsername || 'Dev'}.png`
      link.href = dataUrl
      link.click()
    } catch (err) {
      console.error('Failed to capture report image:', err)
    } finally {
      setDownloadingReport(false)
    }
  }

  const handleDownloadFutCard = async () => {
    if (!futCardRef.current) return
    setDownloadingFut(true)
    try {
      const dataUrl = await toPng(futCardRef.current, {
        cacheBust: true,
        quality: 1.0,
        pixelRatio: 3,
        style: {
          transform: 'none',
        },
      })
      const link = document.createElement('a')
      link.download = `CodeAura-DeveloperCard-${analysis?.githubUsername || 'Dev'}.png`
      link.href = dataUrl
      link.click()
    } catch (err) {
      console.error('Failed to capture developer card image:', err)
    } finally {
      setDownloadingFut(false)
    }
  }

  if (loading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center py-20 px-4">
        <p className="text-sm font-mono text-gray-500 animate-pulse">Loading Aura Analysis & Card...</p>
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
    <div className="flex-1 flex flex-col items-center px-4 py-8 space-y-8 bg-black min-h-screen">
      {/* ─── Top Control Action Bar ─── */}
      <div className="w-full max-w-5xl flex flex-col md:flex-row items-center justify-between gap-4 bg-[#0c0c0e] p-3.5 px-5 rounded-2xl">
        <Link
          href="/"
          className="flex items-center gap-2 text-xs font-semibold text-gray-400 hover:text-white transition-all shrink-0"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Analyze Another</span>
        </Link>

        {/* View Toggle Tabs */}
        <div className="flex items-center gap-1 bg-[#141414] p-1 rounded-xl">
          <button
            onClick={() => setActiveTab('both')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'both' ? 'bg-white text-black' : 'text-gray-400 hover:text-white'
            }`}
          >
            Side-by-Side
          </button>
          <button
            onClick={() => setActiveTab('report')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'report' ? 'bg-white text-black' : 'text-gray-400 hover:text-white'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Full Report</span>
          </button>
          <button
            onClick={() => setActiveTab('card')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'card' ? 'bg-white text-black' : 'text-gray-400 hover:text-white'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>Developer Card</span>
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 flex-wrap justify-center">
          <button
            onClick={handleCopyLink}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-gray-300 bg-[#141414] hover:bg-[#1f1f1f] transition-all cursor-pointer"
          >
            {copied ? (
              <span className="text-emerald-400 font-bold">Link Copied!</span>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5" />
                <span>Share</span>
              </>
            )}
          </button>

          <button
            onClick={handleDownloadFutCard}
            disabled={downloadingFut}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-amber-300 bg-[#241d0e] hover:bg-[#332914] transition-all cursor-pointer disabled:opacity-50"
          >
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span>{downloadingFut ? 'Capturing...' : 'Download Card'}</span>
          </button>

          <button
            onClick={handleDownloadReport}
            disabled={downloadingReport}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-black bg-white hover:bg-gray-200 transition-all cursor-pointer disabled:opacity-50"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{downloadingReport ? 'Capturing...' : 'Download Report'}</span>
          </button>
        </div>
      </div>

      {/* ─── Main Content Display: Full Report & Developer Player Card ─── */}
      <div className="w-full max-w-5xl flex flex-col items-center">
        {activeTab === 'both' && (
          <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Developer Card Column */}
            <div className="lg:col-span-4 flex flex-col items-center lg:sticky lg:top-8">
              <AuraFutCard
                cardRef={futCardRef}
                github={analysis.githubStats}
                leetcode={analysis.leetcodeStats}
                ai={analysis.aiSummary}
              />
            </div>

            {/* Detailed Analysis Report Column */}
            <div className="lg:col-span-8 w-full">
              <AuraCard
                cardRef={reportCardRef}
                github={analysis.githubStats}
                leetcode={analysis.leetcodeStats}
                ai={analysis.aiSummary}
              />
            </div>
          </div>
        )}

        {activeTab === 'report' && (
          <div className="w-full max-w-3xl">
            <AuraCard
              cardRef={reportCardRef}
              github={analysis.githubStats}
              leetcode={analysis.leetcodeStats}
              ai={analysis.aiSummary}
            />
          </div>
        )}

        {activeTab === 'card' && (
          <div className="py-8 flex flex-col items-center space-y-6">
            <AuraFutCard
              cardRef={futCardRef}
              github={analysis.githubStats}
              leetcode={analysis.leetcodeStats}
              ai={analysis.aiSummary}
            />
          </div>
        )}
      </div>
    </div>
  )
}
