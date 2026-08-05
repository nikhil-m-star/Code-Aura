'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth, SignInButton } from '@clerk/nextjs'
import { ArrowRight, Loader2, Code2, Cpu, Database, Flame, Terminal, FileCode, Layers, GitBranch } from 'lucide-react'
import { GithubIcon } from '@/components/GithubIcon'
import { analyzeDeveloperAction } from '@/app/actions/analysis'

const TECH_LOGOS = [
  { name: 'GitHub', icon: GithubIcon, color: 'text-white' },
  { name: 'LeetCode', icon: Code2, color: 'text-amber-400' },
  { name: 'TypeScript', icon: FileCode, color: 'text-blue-400' },
  { name: 'Next.js 16', icon: Cpu, color: 'text-white' },
  { name: 'React', icon: Layers, color: 'text-cyan-400' },
  { name: 'Python', icon: Terminal, color: 'text-yellow-400' },
  { name: 'PostgreSQL', icon: Database, color: 'text-indigo-400' },
  { name: 'Prisma', icon: GitBranch, color: 'text-purple-400' },
]

export default function HomePage() {
  const router = useRouter()
  const { isSignedIn, isLoaded } = useAuth()

  const [githubUsername, setGithubUsername] = useState('')
  const [leetcodeUsername, setLeetcodeUsername] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!githubUsername.trim()) {
      setErrorMessage('Enter a GitHub username.')
      return
    }

    setErrorMessage(null)
    setIsAnalyzing(true)

    try {
      const res = await analyzeDeveloperAction({
        githubUsername: githubUsername.trim(),
        leetcodeUsername: leetcodeUsername.trim() || undefined,
      })

      if (res.success && res.analysisId) {
        router.push(`/results/${res.analysisId}`)
      } else {
        setIsAnalyzing(false)
        setErrorMessage(res.error || 'Analysis failed.')
      }
    } catch (err: any) {
      setIsAnalyzing(false)
      setErrorMessage(err.message || 'Network error.')
    }
  }

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4 py-16 bg-black">
      <div className="max-w-xl w-full text-center space-y-6">
        {/* Title */}
        <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-none">
          What Is Your <br />
          <span className="text-purple-400">Developer Aura?</span>
        </h1>

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

          {/* Artistic Tech Ticker Marquee while Loading */}
          {isAnalyzing && (
            <div className="pt-6 space-y-3">
              <p className="text-center text-xs font-mono text-purple-300 animate-pulse">
                Analyzing GitHub repositories & LeetCode data...
              </p>

              {/* Right-to-Left Infinite Ticker with Faded Edges */}
              <div className="w-full overflow-hidden mask-fade-edges py-3 bg-[#0d0d0d] rounded-2xl">
                <div className="animate-marquee flex items-center gap-6">
                  {[...TECH_LOGOS, ...TECH_LOGOS, ...TECH_LOGOS].map((item, idx) => {
                    const IconComponent = item.icon
                    return (
                      <div
                        key={idx}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#161616] shrink-0"
                      >
                        <IconComponent className={`w-4 h-4 ${item.color}`} />
                        <span className="text-xs font-mono font-semibold text-gray-200">
                          {item.name}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  )
}
