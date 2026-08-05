import type { Metadata } from 'next'
import { Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google'
import Link from 'next/link'
import { ClerkProvider, SignInButton, SignUpButton, Show, UserButton } from '@clerk/nextjs'
import { GithubIcon } from '@/components/GithubIcon'
import { CodeAuraLogo } from '@/components/CodeAuraLogo'
import './globals.css'

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-product',
  weight: ['400', '500', '600', '700', '800'],
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '500', '600'],
})

export const metadata: Metadata = {
  title: 'CodeAura',
  description: 'Developer Personality & Profile Analyzer',
  icons: {
    icon: '/icon.svg',
    shortcut: '/icon.svg',
    apple: '/icon.svg',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${plusJakarta.variable} ${jetbrainsMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-black text-white font-sans relative selection:bg-white selection:text-black">
        <ClerkProvider>
          {/* Header */}
          <header className="w-full bg-black px-6 py-6">
            <div className="max-w-5xl mx-auto flex items-center justify-between">
              <Link href="/" className="flex items-center gap-2.5">
                <CodeAuraLogo className="w-7 h-7" />
                <span className="font-extrabold text-xl tracking-tight text-white font-sans">
                  CodeAura
                </span>
              </Link>

              <div className="flex items-center gap-4">
                <Show when="signed-in">
                  <Link
                    href="/history"
                    className="text-xs font-semibold text-gray-300 hover:text-white px-3.5 py-2 rounded-xl bg-[#141414] hover:bg-[#1f1f1f] transition-all font-sans"
                  >
                    My Auras
                  </Link>
                </Show>

                <a
                  href="https://github.com/nikhil-m-star/Code-Aura"
                  target="_blank"
                  rel="noreferrer"
                  className="hidden sm:flex items-center gap-1.5 text-xs text-gray-400 hover:text-white px-3 py-2 rounded-xl bg-[#141414] transition-all font-sans"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                </a>

                <div className="flex items-center gap-2">
                  <Show when="signed-out">
                    <SignInButton mode="modal">
                      <button className="text-xs font-semibold text-gray-300 hover:text-white px-3.5 py-2 rounded-xl bg-[#141414] hover:bg-[#1f1f1f] transition-all cursor-pointer font-sans">
                        Sign In
                      </button>
                    </SignInButton>
                    <SignUpButton mode="modal">
                      <button className="text-xs font-semibold text-black bg-white hover:bg-gray-200 px-4 py-2 rounded-xl transition-all cursor-pointer font-sans">
                        Get Started
                      </button>
                    </SignUpButton>
                  </Show>
                  <Show when="signed-in">
                    <UserButton
                      appearance={{
                        elements: {
                          avatarBox: 'w-8 h-8 rounded-full',
                        },
                      }}
                    />
                  </Show>
                </div>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 flex flex-col">{children}</main>

          {/* Minimal Clean Footer */}
          <footer className="py-8 px-6 text-center text-xs text-gray-500 bg-black">
            <div className="max-w-5xl mx-auto flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CodeAuraLogo className="w-4 h-4" />
                <span className="font-semibold text-gray-400 font-sans">CodeAura</span>
              </div>
              <span className="text-gray-500 text-[11px] font-sans">Developer Intelligence</span>
            </div>
          </footer>
        </ClerkProvider>
      </body>
    </html>
  )
}
