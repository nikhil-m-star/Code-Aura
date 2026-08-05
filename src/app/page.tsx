'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth, SignInButton } from '@clerk/nextjs'
import { ArrowRight, Loader2 } from 'lucide-react'
import { GithubIcon } from '@/components/GithubIcon'
import {
  LeetCodeLogo,
  ReactLogo,
  TypeScriptLogo,
  PythonLogo,
  PostgreSQLLogo,
  TailwindLogo,
  NextjsLogo,
  PrismaLogo,
} from '@/components/BrandLogos'
import { analyzeDeveloperAction } from '@/app/actions/analysis'

const DYNAMIC_PROCESSING_TEXTS = [
  'Processing GitHub Repositories...',
  'Analyzing Commit Velocity & Peak Coding Hours...',
  'Querying LeetCode Difficulty Stats & Acceptance Rate...',
  'Calculating Algorithmic Mastery & Radar Ratings...',
  'Formulating Developer Archetype & Roast...',
]

const REAL_BRAND_IMAGE_LOGOS = [
  {
    name: 'GitHub',
    src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg',
  },
  {
    name: 'LeetCode',
    src: 'https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/leetcode.svg',
  },
  {
    name: 'TypeScript',
    src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
  },
  {
    name: 'React',
    src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
  },
  {
    name: 'Next.js',
    src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',
  },
  {
    name: 'Python',
    src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
  },
  {
    name: 'PostgreSQL',
    src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
  },
  {
    name: 'Tailwind CSS',
    src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg',
  },
  {
    name: 'Prisma',
    src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prisma/prisma-original.svg',
  },
]

export default function HomePage() {
  const router = useRouter()
  const { isSignedIn, isLoaded } = useAuth()

  const [githubUsername, setGithubUsername] = useState('')
  const [leetcodeUsername, setLeetcodeUsername] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [processingTextIdx, setProcessingTextIdx] = useState(0)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  // Cycle dynamic processing text comfortably every 2.5 seconds
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isAnalyzing) {
      interval = setInterval(() => {
        setProcessingTextIdx((prev) => (prev + 1) % DYNAMIC_PROCESSING_TEXTS.length)
      }, 2500)
    }
    return () => clearInterval(interval)
  }, [isAnalyzing])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!githubUsername.trim()) {
      setErrorMessage('Enter a GitHub username.')
      return
    }

    setErrorMessage(null)
    setIsAnalyzing(true)
    setProcessingTextIdx(0)

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
    <div className="flex-1 flex flex-col items-center justify-center px-4 py-16 bg-black min-h-[75vh] font-sans">
      {/* LOADING STATE - SHOW ONLY DYNAMIC PROCESSING TEXT + REAL LOGOS SLIDING RIGHT TO LEFT */}
      {isAnalyzing ? (
        <div className="max-w-2xl w-full text-center space-y-10 py-12">
          {/* Dynamic Processing Text */}
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-full bg-fuchsia-500/20 text-fuchsia-400 mx-auto flex items-center justify-center animate-spin">
              <Loader2 className="w-6 h-6" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight transition-all duration-500">
              {DYNAMIC_PROCESSING_TEXTS[processingTextIdx]}
            </h2>
            <p className="text-xs text-gray-500">Building your developer aura card...</p>
          </div>

          {/* Sliding Tech Ticker Marquee with REAL Official Logo Images */}
          <div className="w-full overflow-hidden mask-fade-edges py-6 bg-[#0c0c0c] rounded-3xl">
            <div className="animate-marquee flex items-center gap-8">
              {[...REAL_BRAND_IMAGE_LOGOS, ...REAL_BRAND_IMAGE_LOGOS, ...REAL_BRAND_IMAGE_LOGOS].map(
                (item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-[#161616] shrink-0"
                  >
                    <img src={item.src} alt={item.name} className="w-5 h-5 object-contain" />
                    <span className="text-xs font-bold text-gray-200">
                      {item.name}
                    </span>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      ) : (
        /* STANDARD HOME FORM STATE */
        <div className="max-w-xl w-full text-center space-y-6">
          {/* Main Title */}
          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-none">
            What Is Your <br />
            <span className="text-fuchsia-400">Developer Aura?</span>
          </h1>

          {/* Input Form */}
          <form onSubmit={handleSubmit} className="mt-8 space-y-4 text-left">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-300 uppercase tracking-wider">
                GitHub Username <span className="text-fuchsia-400">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. torvalds"
                value={githubUsername}
                onChange={(e) => setGithubUsername(e.target.value)}
                className="w-full bg-[#141414] focus:bg-[#1c1c1c] text-white px-4 py-3.5 rounded-2xl text-sm border-0 outline-none transition-all placeholder-gray-600 font-sans"
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
                className="w-full bg-[#141414] focus:bg-[#1c1c1c] text-white px-4 py-3.5 rounded-2xl text-sm border-0 outline-none transition-all placeholder-gray-600 font-sans"
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
                  className="w-full py-4 px-6 rounded-2xl font-bold text-black bg-fuchsia-400 hover:bg-fuchsia-300 transition-all text-sm cursor-pointer shadow-lg"
                >
                  Sign In to Analyze Aura
                </button>
              </SignInButton>
            ) : (
              <button
                type="submit"
                className="w-full py-4 px-6 rounded-2xl font-bold text-black bg-fuchsia-400 hover:bg-fuchsia-300 transition-all text-sm flex items-center justify-center gap-2 cursor-pointer shadow-lg"
              >
                <span>Generate Developer Aura</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </form>
        </div>
      )}
    </div>
  )
}
