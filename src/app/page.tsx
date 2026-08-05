'use me'
'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth, SignInButton } from '@clerk/nextjs'
import { Sparkles, Code2, ArrowRight, Loader2, Zap, Shield, Share2 } from 'lucide-react'
import { GithubIcon } from '@/components/GithubIcon'
import { analyzeDeveloperAction } from '@/app/actions/analysis'

const LOADING_STEPS = [
  'Fetching public repositories & language activity from GitHub...',
  'Querying LeetCode difficulty stats & acceptance rates...',
  'Connecting to NVIDIA NIM (Llama 3.3 70B Model)...',
  'Synthesizing developer personality archetype & observations...',
  'Finalizing aura card & storing analysis...',
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
      setErrorMessage('Please enter a GitHub username.')
      return
    }

    setErrorMessage(null)
    setIsAnalyzing(true)
    setLoadingStepIdx(0)

    const interval = setInterval(() => {
      setLoadingStepIdx((prev) => (prev < LOADING_STEPS.length - 1 ? prev + 1 : prev))
    }, 1200)

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
        setErrorMessage(res.error || 'Failed to complete developer aura analysis.')
      }
    } catch (err: any) {
      clearInterval(interval)
      setIsAnalyzing(false)
      setErrorMessage(err.message || 'An unexpected network error occurred.')
    }
  }

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4 py-12 md:py-20 relative">
      {/* Hero Section */}
      <div className="max-w-4xl w-full text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-semibold tracking-wide backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-pink-400" />
          <span>NVIDIA NIM (Llama 3.3 70B) AI Analyzer</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-none">
          What Is Your <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent glow-text">
            Developer Aura?
          </span>
        </h1>

        <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
          Analyze your real GitHub commit activity and LeetCode battle stats to uncover your witty AI developer archetype, fun stat observations, and lighthearted roasts.
        </p>

        {/* Input Form Box */}
        <div className="max-w-xl mx-auto mt-8">
          <form
            onSubmit={handleSubmit}
            className="p-6 md:p-8 rounded-3xl glass-panel space-y-5 shadow-2xl relative overflow-hidden"
          >
            {/* Input 1: GitHub Username */}
            <div className="space-y-2 text-left">
              <label className="text-xs font-mono font-semibold uppercase tracking-wider text-purple-300 flex items-center gap-2">
                <GithubIcon className="w-4 h-4 text-purple-400" />
                GitHub Username <span className="text-pink-400">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder="e.g. torvalds, shadcn, gaearon"
                  value={githubUsername}
                  onChange={(e) => setGithubUsername(e.target.value)}
                  disabled={isAnalyzing}
                  className="w-full bg-[#090d16]/80 border border-white/10 focus:border-purple-500 rounded-xl px-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/30 transition-all font-mono text-sm"
                />
              </div>
            </div>

            {/* Input 2: LeetCode Username (Optional) */}
            <div className="space-y-2 text-left">
              <label className="text-xs font-mono font-semibold uppercase tracking-wider text-amber-300 flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-amber-400" />
                  LeetCode Handle
                </span>
                <span className="text-[10px] text-gray-400 font-normal lowercase">(optional)</span>
              </label>
              <input
                type="text"
                placeholder="e.g. neetcode, tourist"
                value={leetcodeUsername}
                onChange={(e) => setLeetcodeUsername(e.target.value)}
                disabled={isAnalyzing}
                className="w-full bg-[#090d16]/80 border border-white/10 focus:border-amber-500 rounded-xl px-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500/30 transition-all font-mono text-sm"
              />
            </div>

            {/* Error Message Alert */}
            {errorMessage && (
              <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs text-left font-medium">
                {errorMessage}
              </div>
            )}

            {/* Submit Button or Clerk Auth Guard */}
            {isLoaded && !isSignedIn ? (
              <SignInButton mode="modal">
                <button
                  type="button"
                  className="w-full py-4 px-6 rounded-xl font-bold text-white bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 transition-all duration-300 shadow-lg shadow-purple-600/30 flex items-center justify-center gap-2 cursor-pointer group"
                >
                  <Sparkles className="w-5 h-5 text-yellow-300 group-hover:rotate-12 transition-transform" />
                  Sign In to Analyze Developer Aura
                </button>
              </SignInButton>
            ) : (
              <button
                type="submit"
                disabled={isAnalyzing}
                className="w-full py-4 px-6 rounded-xl font-bold text-white bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 transition-all duration-300 shadow-lg shadow-purple-600/30 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed group"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin text-purple-200" />
                    <span>Analyzing Profile...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 text-yellow-300 group-hover:scale-110 transition-transform" />
                    <span>Generate Developer Aura</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            )}

            {/* Loading Step Progress Banner */}
            {isAnalyzing && (
              <div className="pt-2 text-center space-y-2">
                <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-purple-500 to-pink-500 h-full transition-all duration-700"
                    style={{ width: `${((loadingStepIdx + 1) / LOADING_STEPS.length) * 100}%` }}
                  />
                </div>
                <p className="text-xs font-mono text-purple-300 animate-pulse">
                  {LOADING_STEPS[loadingStepIdx]}
                </p>
              </div>
            )}
          </form>
        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto pt-10 text-left">
          <div className="p-5 rounded-2xl glass-panel border border-white/5 space-y-2">
            <div className="w-9 h-9 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-sm">Deep GitHub Metrics</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Analyzes language breakdowns, commit timing (Night-Owl score), total stars, and top repos.
            </p>
          </div>

          <div className="p-5 rounded-2xl glass-panel border border-white/5 space-y-2">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
              <Code2 className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-sm">LeetCode Integration</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Pulls problem difficulty distribution, total solved counts, and acceptance percentages.
            </p>
          </div>

          <div className="p-5 rounded-2xl glass-panel border border-white/5 space-y-2">
            <div className="w-9 h-9 rounded-xl bg-pink-500/10 text-pink-400 flex items-center justify-center">
              <Share2 className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-sm">Shareable Result Cards</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Generates high-res screenshot-friendly aura cards with custom gradients and archetype badges.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
