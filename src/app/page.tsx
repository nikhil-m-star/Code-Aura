'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth, SignInButton } from '@clerk/nextjs'
import { ArrowRight, Loader2, Sparkles } from 'lucide-react'
import { analyzeDeveloperAction } from '@/app/actions/analysis'

const LOADING_STEPS = [
  'Decoding GitHub commits...',
  'Probing algorithm progress...',
  'Formulating developer aura...',
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
        {/* Playful Pill Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#181818] text-purple-400 text-xs font-mono font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
          <span>Developer Personality Engine</span>
        </div>

        {/* Title */}
        <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-none">
          What Is Your <br />
          <span className="text-purple-400">Developer Aura?</span>
        </h1>

        <p className="text-gray-400 text-sm sm:text-base max-w-md mx-auto leading-relaxed">
          Uncover your witty developer archetype, fun stat observations, and lighthearted algorithm roasts.
        </p>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="mt-8 space-y-4 text-left">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-300 uppercase tracking-wider">
              GitHub Username <span className="text-purple-400">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. torvalds"
              value={githubUsername}
              onChange={(e) => setGithubUsername(e.target.value)}
              disabled={isAnalyzing}
              className="w-full bg-[#141414] focus:bg-[#1c1c1c] text-white px-4 py-3.5 rounded-2xl font-mono text-sm border-0 outline-none transition-all placeholder-gray-600"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-300 uppercase tracking-wider flex justify-between">
              <span>LeetCode Handle</span>
              <span className="text-gray-500 font-normal lowercase">(optional)</span>
            </label>
            <input
              type="text"
              placeholder="e.g. neetcode"
              value={leetcodeUsername}
              onChange={(e) => setLeetcodeUsername(e.target.value)}
              disabled={isAnalyzing}
              className="w-full bg-[#141414] focus:bg-[#1c1c1c] text-white px-4 py-3.5 rounded-2xl font-mono text-sm border-0 outline-none transition-all placeholder-gray-600"
            />
          </div>

          {errorMessage && (
            <div className="p-3.5 rounded-2xl bg-rose-950/50 text-rose-300 text-xs font-medium">
              {errorMessage}
            </div>
          )}

          {isLoaded && !isSignedIn ? (
            <SignInButton mode="modal">
              <button
                type="button"
                className="w-full py-4 px-6 rounded-2xl font-bold text-black bg-purple-400 hover:bg-purple-300 transition-all text-sm cursor-pointer shadow-lg"
              >
                Sign In to Analyze Aura
              </button>
            </SignInButton>
          ) : (
            <button
              type="submit"
              disabled={isAnalyzing}
              className="w-full py-4 px-6 rounded-2xl font-bold text-black bg-purple-400 hover:bg-purple-300 transition-all text-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 shadow-lg"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-black" />
                  <span>Analyzing Profile...</span>
                </>
              ) : (
                <>
                  <span>Generate Developer Aura</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          )}

          {isAnalyzing && (
            <p className="text-center text-xs font-mono text-purple-300 pt-2 animate-pulse">
              {LOADING_STEPS[loadingStepIdx]}
            </p>
          )}
        </form>
      </div>
    </div>
  )
}
