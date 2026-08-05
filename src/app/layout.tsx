import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import Link from 'next/link'
import { ClerkProvider, SignInButton, SignUpButton, Show, UserButton } from '@clerk/nextjs'
import { Sparkles, History } from 'lucide-react'
import { GithubIcon } from '@/components/GithubIcon'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'CodeAura - AI Developer Personality & Profile Analyzer',
  description:
    'Analyze your GitHub and LeetCode activity with NVIDIA Llama 3.3 AI to discover your witty developer archetype, stat observations, and lighthearted roasts.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-[#090d16] text-gray-100 selection:bg-purple-500 selection:text-white relative overflow-x-hidden">
        <ClerkProvider>
          {/* Ambient Background Glows */}
          <div className="fixed top-0 left-1/4 -translate-x-1/2 w-[500px] h-[500px] bg-purple-600/15 rounded-full blur-[140px] pointer-events-none -z-10 animate-pulse-slow" />
          <div className="fixed top-1/3 right-10 w-[450px] h-[450px] bg-pink-600/10 rounded-full blur-[160px] pointer-events-none -z-10" />
          <div className="fixed bottom-10 left-1/3 w-[600px] h-[600px] bg-cyan-600/10 rounded-full blur-[180px] pointer-events-none -z-10" />

          {/* Navigation Header */}
          <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#090d16]/70 border-b border-white/10 px-4 lg:px-8 py-3.5">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              <Link href="/" className="flex items-center gap-2.5 group">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 via-pink-500 to-cyan-400 p-0.5 shadow-lg shadow-purple-500/20 group-hover:scale-105 transition-transform duration-300">
                  <div className="w-full h-full bg-[#090d16] rounded-[10px] flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-purple-400 group-hover:text-pink-400 transition-colors" />
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-xl tracking-tight bg-gradient-to-r from-white via-purple-200 to-pink-400 bg-clip-text text-transparent">
                    CodeAura
                  </span>
                  <span className="text-[10px] text-purple-400 font-mono tracking-widest uppercase -mt-1">
                    AI Dev Analyzer
                  </span>
                </div>
              </Link>

              <div className="flex items-center gap-3 md:gap-5">
                <Show when="signed-in">
                  <Link
                    href="/history"
                    className="flex items-center gap-1.5 text-sm font-medium text-gray-300 hover:text-white px-3 py-1.5 rounded-lg hover:bg-white/5 transition-all"
                  >
                    <History className="w-4 h-4 text-purple-400" />
                    <span>My Auras</span>
                  </Link>
                </Show>

                <a
                  href="https://github.com/nikhil-m-star/Code-Aura"
                  target="_blank"
                  rel="noreferrer"
                  className="hidden sm:flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-200 px-2.5 py-1.5 rounded-lg border border-white/5 hover:border-white/15 transition-all"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                </a>

                <div className="flex items-center gap-2 border-l border-white/10 pl-3 md:pl-4">
                  <Show when="signed-out">
                    <SignInButton mode="modal">
                      <button className="text-xs font-semibold text-gray-300 hover:text-white px-3 py-1.5 rounded-lg border border-white/10 hover:border-purple-500/50 hover:bg-purple-500/10 transition-all cursor-pointer">
                        Sign In
                      </button>
                    </SignInButton>
                    <SignUpButton mode="modal">
                      <button className="text-xs font-semibold text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 px-3.5 py-1.5 rounded-lg shadow-md shadow-purple-600/25 hover:shadow-purple-600/40 transition-all cursor-pointer">
                        Get Started
                      </button>
                    </SignUpButton>
                  </Show>
                  <Show when="signed-in">
                    <UserButton
                      appearance={{
                        elements: {
                          avatarBox: 'w-9 h-9 border border-purple-500/30 hover:scale-105 transition-transform',
                        },
                      }}
                    />
                  </Show>
                </div>
              </div>
            </div>
          </header>

          {/* Main Content Area */}
          <main className="flex-1 flex flex-col">{children}</main>

          {/* Footer */}
          <footer className="border-t border-white/5 py-6 px-4 text-center text-xs text-gray-500 bg-[#090d16]/80">
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-gray-400">CodeAura</span>
                <span>•</span>
                <span>Powered by NVIDIA NIM (Llama 3.3 70B), GitHub & LeetCode APIs</span>
              </div>
              <p className="text-gray-500">
                Built with Next.js 16, Prisma, Neon Postgres & Clerk
              </p>
            </div>
          </footer>
        </ClerkProvider>
      </body>
    </html>
  )
}
