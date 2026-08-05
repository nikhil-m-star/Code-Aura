'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth, SignInButton } from '@clerk/nextjs'
import { ArrowRight, Loader2 } from 'lucide-react'
import { analyzeDeveloperAction } from '@/app/actions/analysis'

const LOADING_STEPS = [
  'Fetching GitHub activity...',
  'Fetching LeetCode stats...',
  'Generating AI Developer Aura...',
]

export default function HomePage() {
  const router = useRouter()
  const { isSignedIn, isLoaded } = useAuth()

  const [githubUsername, setGithubUsername] = useState('')
  const [leetcodeUsername, setLeetcodeUsername] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [loadingStepIdx, setLoadingStepIdx] = useState(0)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!githubUsername.trim()) {
      setErrorMessage('Enter a GitHub username.')
      return
    }

    setErrorMessage(null)
    setIsAnalyzing(true)
    setLoadingStepIdx(0)

    const interval = setInterval(() => {
      setLoadingStepIdx((prev) => (prev < LOADING_STEPS.length - 1 ? prev + 1 : prev))
    }, 1000)

    try {
      const res = await analyzeDeveloperAction({
        githubUsername: githubUsername.trim(),
        leetcodeUsername: leetcodeUsername.trim() || undefined,
      })

      clearInterval(interval)

      if (res.success && res.analysisId) {
        router.push(`/results/${res.analysisId}`)
      } else {
        setIsAnalyzing(false)
        setErrorMessage(res.error || 'Analysis failed.')
      }
    } catch (err: any) {
      clearInterval(interval)
      setIsAnalyzing(false)
      setErrorMessage(err.message || 'Network error.')
    }
  }

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4 py-16 bg-black">
      <div className="max-w-xl w-full text-center space-y-6">
        {/* Title */}
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Developer Aura
        </h1>

        <p className="text-gray-400 text-sm max-w-md mx-auto">
          AI personality & profile analysis based on your GitHub and LeetCode activity.
        </p>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="mt-8 space-y-4 text-left">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              GitHub Username
            </label>
            <input
              type="text"
              required
              placeholder="e.g. torvalds"
              value={githubUsername}
              onChange={(e) => setGithubUsername(e.target.value)}
              disabled={isAnalyzing}
              className="w-full bg-[#111111] focus:bg-[#161616] text-white px-4 py-3.5 rounded-xl font-mono text-sm border-0 outline-none transition-all placeholder-gray-600"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider flex justify-between">
              <span>LeetCode Handle</span>
              <span className="text-gray-600 font-normal lowercase">(optional)</span>
            </label>
            <input
              type="text"
              placeholder="e.g. neetcode"
              value={leetcodeUsername}
              onChange={(e) => setLeetcodeUsername(e.target.value)}
              disabled={isAnalyzing}
              className="w-full bg-[#111111] focus:bg-[#161616] text-white px-4 py-3.5 rounded-xl font-mono text-sm border-0 outline-none transition-all placeholder-gray-600"
            />
          </div>

          {errorMessage && (
            <div className="p-3 rounded-xl bg-rose-950/40 text-rose-300 text-xs font-medium">
              {errorMessage}
            </div>
          )}

          {isLoaded && !isSignedIn ? (
            <SignInButton mode="modal">
              <button
                type="button"
                className="w-full py-3.5 px-6 rounded-xl font-semibold text-black bg-white hover:bg-gray-200 transition-all text-sm cursor-pointer"
              >
                Sign In to Analyze
              </button>
            </SignInButton>
          ) : (
            <button
              type="submit"
              disabled={isAnalyzing}
              className="w-full py-3.5 px-6 rounded-xl font-semibold text-black bg-white hover:bg-gray-200 transition-all text-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-black" />
                  <span>Analyzing...</span>
                </>
              ) : (
                <>
                  <span>Analyze Aura</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          )}

          {isAnalyzing && (
            <p className="text-center text-xs font-mono text-gray-500 pt-2 animate-pulse">
              {LOADING_STEPS[loadingStepIdx]}
            </p>
          )}
        </form>
      </div>
    </div>
  )
}
