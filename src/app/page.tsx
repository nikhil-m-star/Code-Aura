'use client'

import React, { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth, SignInButton } from '@clerk/nextjs'
import { ArrowRight } from 'lucide-react'
import { analyzeDeveloperAction } from '@/app/actions/analysis'

const DYNAMIC_PROCESSING_TEXTS = [
  'Processing GitHub Repositories...',
  'Analyzing Commit Velocity & Peak Hours...',
  'Querying LeetCode Difficulty Stats...',
  'Calculating Algorithmic Mastery Ratings...',
  'Formulating Developer Archetype & Roast...',
]

const REAL_BRAND_IMAGE_LOGOS = [
  {
    name: 'GitHub',
    src: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>',
  },
  {
    name: 'Java',
    src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
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
  {
    name: 'Node.js',
    src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
  },
  {
    name: 'Docker',
    src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
  },
  {
    name: 'GraphQL',
    src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg',
  },
  {
    name: 'Rust',
    src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rust/rust-original.svg',
  },
  {
    name: 'Go',
    src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original-wordmark.svg',
  },
  {
    name: 'Redis',
    src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg',
  },
  {
    name: 'Vue',
    src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg',
  },
  {
    name: 'C++',
    src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg',
  },
  {
    name: 'Swift',
    src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swift/swift-original.svg',
  },
  {
    name: 'Kotlin',
    src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg',
  },
  {
    name: 'MongoDB',
    src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
  },
  {
    name: 'Linux',
    src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg',
  },
]

function DynamicScalingTicker({ logos }: { logos: typeof REAL_BRAND_IMAGE_LOGOS }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const itemsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    let animFrame: number

    const updateScales = () => {
      if (containerRef.current) {
        const containerRect = containerRef.current.getBoundingClientRect()
        const centerX = containerRect.left + containerRect.width / 2
        const maxDist = containerRect.width / 2

        itemsRef.current.forEach((item) => {
          if (item) {
            const itemRect = item.getBoundingClientRect()
            const itemCenter = itemRect.left + itemRect.width / 2
            const dist = Math.abs(centerX - itemCenter)
            const normDist = Math.min(1, dist / maxDist)

            // Fisheye scale: 0.65 at outer edges -> 1.40 in the center
            const scale = 1.4 - normDist * 0.75
            const opacity = 1 - normDist * 0.5

            item.style.transform = `scale(${scale})`
            item.style.opacity = `${opacity}`
          }
        })
      }
      animFrame = requestAnimationFrame(updateScales)
    }

    animFrame = requestAnimationFrame(updateScales)
    return () => cancelAnimationFrame(animFrame)
  }, [])

  // Duplicate 4 times to guarantee a seamless, unbroken, 100% infinite circular loop
  const repeatedLogos = [...logos, ...logos, ...logos, ...logos]

  return (
    <div
      ref={containerRef}
      className="w-full max-w-5xl mx-auto overflow-hidden mask-fade-edges py-16 bg-[#0a0a0a] rounded-3xl"
    >
      <div className="animate-marquee flex items-center gap-12 sm:gap-16">
        {repeatedLogos.map((item, idx) => (
          <div
            key={idx}
            ref={(el) => {
              itemsRef.current[idx] = el
            }}
            className="p-4 sm:p-5 rounded-3xl bg-[#141414] shrink-0 transition-transform duration-75 ease-out flex items-center justify-center"
          >
            <img
              src={item.src}
              alt={item.name}
              className="w-12 h-12 sm:w-16 sm:h-16 object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

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
      {/* LOADING STATE */}
      {isAnalyzing ? (
        <div className="w-full max-w-5xl text-center space-y-10 py-12">
          {/* Dynamic Processing Text */}
          <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight font-sans transition-all duration-500">
            {DYNAMIC_PROCESSING_TEXTS[processingTextIdx]}
          </h2>

          {/* Dynamic Wide Fisheye Scaling Ticker - EXPANDED TECH LOGOS */}
          <DynamicScalingTicker logos={REAL_BRAND_IMAGE_LOGOS} />
        </div>
      ) : (
        /* STANDARD HOME FORM STATE */
        <div className="max-w-xl w-full text-center space-y-6">
          {/* Main Title */}
          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-none font-sans">
            What Is Your <br />
            <span className="text-rose-500">Developer Aura?</span>
          </h1>

          {/* Input Form */}
          <form onSubmit={handleSubmit} className="mt-8 space-y-4 text-left">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-300 uppercase tracking-wider font-sans">
                GitHub Username <span className="text-rose-500">*</span>
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
              <label className="text-xs font-semibold text-gray-300 uppercase tracking-wider flex justify-between font-sans">
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
              <div className="p-3.5 rounded-2xl bg-rose-950/50 text-rose-300 text-xs font-medium font-sans">
                {errorMessage}
              </div>
            )}

            {isLoaded && !isSignedIn ? (
              <SignInButton mode="modal">
                <button
                  type="button"
                  className="w-full py-4 px-6 rounded-2xl font-bold text-white bg-rose-500 hover:bg-rose-600 transition-all text-sm cursor-pointer shadow-lg font-sans"
                >
                  Sign In to Analyze Aura
                </button>
              </SignInButton>
            ) : (
              <button
                type="submit"
                className="w-full py-4 px-6 rounded-2xl font-bold text-white bg-rose-500 hover:bg-rose-600 transition-all text-sm flex items-center justify-center gap-2 cursor-pointer shadow-lg font-sans"
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
