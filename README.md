# ⚡ CodeAura

<div align="center">

  <h1>CodeAura</h1>
  <p><b>AI-Powered Developer Telemetry, Personality Profiler & Interactive 3D Trading Card Generator</b></p>

  [![Next.js](https://img.shields.io/badge/Next.js-16_App_Router-black?style=for-the-badge&logo=nextdotjs)](https://nextjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v3.4-38bdf8?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)
  [![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?style=for-the-badge&logo=prisma)](https://www.prisma.io/)
  [![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-336791?style=for-the-badge&logo=postgresql)](https://www.postgresql.org/)
  [![NVIDIA NIM](https://img.shields.io/badge/NVIDIA_NIM-Llama_3.1_8B-76b900?style=for-the-badge&logo=nvidia)](https://build.nvidia.com/)
  [![Clerk](https://img.shields.io/badge/Clerk-Auth-6C47FF?style=for-the-badge&logo=clerk)](https://clerk.com/)

  <br />

  [🌐 Live Web Application](https://codeisaura.vercel.app) • [📂 GitHub Repository](https://github.com/nikhil-m-star/Code-Aura)

</div>

---

## 🌟 Overview

**CodeAura** is a full-stack web application built to analyze developer engineering telemetry, circadian coding habits, and algorithmic problem-solving mastery. By synthesizing real-time data from **GitHub's REST API** and **LeetCode's GraphQL API**, CodeAura evaluates developer commit velocity, repository originality, language diversity, code complexity, and problem-solving velocity.

Using **Meta Llama 3.1 8B via NVIDIA NIM API**, CodeAura generates hilarious developer archetypes, sharp roasts, glowing praises, PR nemesis profiles, and personalized stack recommendations. Results are presented both as a comprehensive full-page telemetry report and an **interactive 3D metallic trading card** with cursor tilt physics.

---

## ⚡ Key Capabilities

- 📊 **Dual-Platform Telemetry Pipeline**: Concurrently fetches GitHub profile metrics, repository breakdowns (original vs. forked), 100 public commit events, and LeetCode problem difficulty matrices.
- 🎴 **Interactive 3D Developer Trading Card (`AuraFutCard`)**: Custom SVG curved shield card featuring real developer metrics, tier-based metallic gradients (Gold, Silver, Bronze), and mouse-tracking 3D tilt & sheen physics (`perspective(1000px)`).
- 🧮 **Inferred Algorithmic Intelligence**: Dynamically evaluates developer problem-solving capability. Non-LeetCode open source maintainers are automatically scored based on repository code complexity and community impact rather than penalized.
- 🤖 **AI Developer Archetype & Roast Engine**: Powered by Meta Llama 3.1 8B (via NVIDIA NIM) with an intelligent, deterministic fallback rule engine.
- ⏰ **Circadian Work Window Analytics**: Classifies commit patterns into `Late Night (11PM-4AM)`, `Early Bird (5AM-9AM)`, `Day Grinder (10AM-5PM)`, or `Evening Builder (6PM-10PM)` with night-owl percentage scoring.
- 🔍 **Commit Sentiment & Keyword Extraction**: Scans commit message histories for keywords (`bugfix`, `refactor`, `feature`, `wip`, `testing`).
- 🎨 **Minimalist Bold Aesthetics**: Pitch-black base theme featuring flat solid color panels,Lucide React icons, and crisp typography (`Plus_Jakarta_Sans`).
- 🔄 **Fisheye Scaling Logo Marquee**: Smooth infinite circular technology logo marquee featuring real-time fisheye scaling during loading states.
- 📸 **One-Click High-Res Card Exports**: Export full reports or 3D trading cards directly to high-resolution PNG images via `html-to-image`.
- 🔒 **Authenticated History Vault**: Clerk authentication paired with PostgreSQL (via Prisma) to allow users to revisit saved aura cards in a personal vault.
- ⏱️ **Server-Side Rate Protection**: 8-second cooldown rate-limiting per user to prevent API quota exhaustion.

---

## 🏗️ Architecture & Data Flow

```mermaid
flowchart TD
    A[User Inputs GitHub & Optional LeetCode Handle] --> B[Next.js Server Action: analyzeDeveloperAction]
    B --> C{Clerk Auth Check & 8s Rate Limiter}
    C -- Allowed --> D[Concurrent Data Fetching]
    
    subgraph Data Pipeline
        D --> E[GitHub REST API v3]
        D --> F[LeetCode GraphQL API]
        E --> G[Process Repos, Commit Hours, Originality % & Code Complexity]
        F --> H[Process AC Submissions, Difficulty Breakdown & Algo Mastery]
    end

    G & H --> I[NVIDIA NIM API: Meta Llama 3.1 8B Instruct]
    I -- Generates --> J[AI Summary: Archetype, Roast, Praise, PR Nemesis & Stack]
    I -. Fallback Engine .-> J
    
    J --> K[Calculate Weighted 1-99 Composite Aura Score]
    K --> L[Persist Analysis in PostgreSQL via Prisma ORM]
    L --> M[Render Dynamic Results Page]
    
    subgraph Client UI
        M --> N[AuraCard: Detailed Telemetry Report]
        M --> O[AuraFutCard: 3D Tilt Metallic Trading Card]
    end
```

---

## 🧮 Weighted Aura Scoring Algorithm

CodeAura calculates a 1–99 composite Aura Score across 5 weighted telemetry axes:

$$\text{AuraScore} = 0.20(\text{Velocity}) + 0.20(\text{Clarity}) + 0.20(\text{Algorithms}) + 0.15(\text{Stamina}) + 0.25(\text{Impact})$$

### Telemetry Axis Breakdown

| Metric | Weight | Calculation Source & Formula |
| :--- | :---: | :--- |
| **Velocity** | `20%` | Commit frequency from 100 recent public events with non-linear diminishing returns curve ($0 \rightarrow 15, 5 \rightarrow 50, 20 \rightarrow 82, 50+ \rightarrow 94-99$). |
| **Clarity** | `20%` | Repository code complexity rating ($0–100$) based on language diversity, repository volume, total stars, and commit frequency. |
| **Algorithms** | `20%` | If LeetCode is linked: Easy/Medium/Hard problem distribution + acceptance rate %. <br />If LeetCode is not linked: Inferred algorithm score ($\text{Complexity} \times 0.70 + \log_{10}(\text{Stars} + 1) \times 10$). |
| **Stamina** | `15%` | Repository count + Pull Requests created + active commit streak bonuses. |
| **Impact** | `25%` | Logarithmic community reach scaling: $20 \cdot \log_{10}(\text{Stars} + 1) + 12 \cdot \log_{10}(\text{Followers} + 1) + 0.15 \cdot (\text{Originality } \%)$. |

---

## 🎴 Developer Trading Card (`AuraFutCard`)

The **Developer Trading Card** presents developer telemetry as an interactive metallic card:

- **Curved Shield Geometry**: Built using SVG paths (`viewBox="0 0 248 372"`) with double-line metallic trim borders.
- **3D Tilt Physics**: `onMouseMove` event listener calculates perspective rotation (`rotateX`, `rotateY`) and smooth return on `onMouseLeave`.
- **Dynamic Gloss Sheen**: Real-time radial light gradient (`radial-gradient`) tracking mouse coordinates.
- **Metallic Tier Schemes**:
  - 🥇 **GOLD TIER** ($\ge 85$ Aura or $1000+$ Stars): `#47370d` $\rightarrow$ `#0d0a02` deep gold metallic gradient with gold trims (`#fce085`).
  - 🥈 **SILVER TIER** ($70 - 84$ Aura): `#2c3340` $\rightarrow$ `#080a0d` slate silver metallic gradient with platinum trims (`#e2e8f0`).
  - 🥉 **BRONZE TIER** ($< 70$ Aura): `#3d2215` $\rightarrow$ `#0a0503` copper bronze metallic gradient with bronze trims (`#f59e0b`).
- **Real Metrics Displayed**: `STARS`, `REPOS`, `SOLVED`, `COMMITS`, `COMPLEXITY`, `MAIN LANG`.

---

## 🛠️ Technology Stack

| Component | Technology | Description |
| :--- | :--- | :--- |
| **Framework** | Next.js 16 (App Router) | Server Components, Server Actions, Dynamic Routes, Turbopack |
| **Language** | TypeScript 5.x | Strict Type Checking, Interface Definitions |
| **Styling** | Tailwind CSS v3.4 | Utility-First Styling, Custom Keyframes & CSS Marquees |
| **Icons & Fonts** | Lucide React + Plus Jakarta Sans | Vector SVG Icons, Custom Brand Logos, Google Web Fonts |
| **Database** | PostgreSQL | Relational Persistence for Users & Analysis Records |
| **ORM** | Prisma ORM | Type-Safe Database Schema & Query Client |
| **Authentication** | Clerk Auth | Hosted User Authentication, Middleware Route Guarding |
| **AI Model** | NVIDIA NIM API | Meta Llama 3.1 8B Instruct Model Integration |
| **Export Engine** | `html-to-image` + `canvas-confetti` | High-Resolution PNG Canvas Captures & Particle Effects |

---

## 📁 Project Directory Overview

```
CodeAura/
├── prisma/
│   └── schema.prisma             # PostgreSQL Database Models (User, Analysis)
├── public/
│   ├── favicon.svg               # Minimalist Centered Laptop SVG Favicon
│   └── favicon.ico               # ICO Format Favicon
├── src/
│   ├── app/
│   │   ├── actions/
│   │   │   └── analysis.ts       # Server Actions: analyze, getById, getUserAnalyses
│   │   ├── history/
│   │   │   └── page.tsx          # Saved Auras Vault Page (User History Grid)
│   │   ├── results/[id]/
│   │   │   └── page.tsx          # Results Page: Dual View, Tabs, Sharing, PNG Downloads
│   │   ├── favicon.ico
│   │   ├── globals.css           # Custom Animations (Marquee, Mask Edges, Keyframes)
│   │   ├── icon.svg              # Next.js Metadata SVG Icon
│   │   ├── layout.tsx            # Global Layout, Fonts, Navbar, Clerk Provider
│   │   └── page.tsx              # Homepage, Fisheye Scaling Ticker & Analysis Form
│   ├── components/
│   │   ├── AuraCard.tsx          # Detailed Developer Telemetry Report Card Component
│   │   ├── AuraFutCard.tsx       # Interactive 3D Metallic Developer Trading Card Component
│   │   ├── BrandLogos.tsx        # Inline SVG Brand Vector Logos
│   │   ├── CodeAuraLogo.tsx      # Vertically Centered CodeAura Laptop Emblem Component
│   │   └── GithubIcon.tsx        # GitHub Vector SVG Component
│   ├── lib/
│   │   ├── prisma.ts             # Prisma Client Singleton Instance
│   │   └── services/
│   │       ├── github.ts         # GitHub REST API v3 Telemetry Fetcher & Parser
│   │       ├── leetcode.ts       # LeetCode GraphQL API Fetcher & Parser
│   │       └── nvidia.ts         # NVIDIA NIM AI Summary Generator & Fallback Engine
│   └── proxy.ts                  # Clerk Middleware Authentication Router
├── next.config.ts                # Next.js Configuration
├── package.json                  # Dependencies & Scripts
├── tsconfig.json                 # TypeScript Config
└── README.md                     # Project Documentation
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: `v18.17.0` or higher
- **npm** / **yarn** / **pnpm** / **bun**
- **PostgreSQL Database** (e.g. Supabase, Neon, Railway, or local PostgreSQL server)

### 1. Clone & Install Dependencies

```bash
git clone https://github.com/nikhil-m-star/Code-Aura.git
cd Code-Aura
npm install
```

### 2. Configure Environment Variables

Create a `.env.local` file in the root directory:

```env
# Clerk Authentication Keys (from https://dashboard.clerk.com)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# PostgreSQL Connection String
DATABASE_URL="postgresql://username:password@localhost:5432/codeaura?schema=public"

# NVIDIA NIM API Key (from https://build.nvidia.com) — Optional
NVIDIA_NIM_API_KEY=nvapi-...
```

### 3. Initialize Database Schema

Push the Prisma schema to your PostgreSQL database:

```bash
npx prisma db push
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📜 Key Data Types Reference

### `GitHubUserStats`
```typescript
export interface GitHubUserStats {
  username: string
  name: string | null
  avatarUrl: string
  followers: number
  following: number
  publicRepos: number
  totalStars: number
  totalForks: number
  originalityRatio: number
  topLanguage: string
  languages: { name: string; percentage: number; color: string }[]
  nightOwlScore: number
  timeSlot: 'Late Night (11PM-4AM)' | 'Early Bird (5AM-9AM)' | 'Day Grinder (10AM-5PM)' | 'Evening Builder (6PM-10PM)'
  recentCommitCount: number
  pullRequestCount: number
  issueCount: number
  codeComplexityScore: number
  commitKeywords: string[]
}
```

### `AISummary`
```typescript
export interface AISummary {
  archetype: string
  tagline: string
  auraColor: string
  auraScore: number
  keyVibe: string
  observations: string[]
  roast: string
  praise: string
  devNemesis: string
  recommendedStack: string
  radarStats?: {
    velocity: number
    clarity: number
    algorithms: number
    stamina: number
    impact: number
  }
}
```

---

## 🌐 Deployment on Vercel

The application is optimized for deployment on Vercel:

1. Push your repository to GitHub.
2. Import the project into Vercel.
3. Set the Environment Variables (`NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`, `CLERK_SECRET_KEY`, `DATABASE_URL`, `NVIDIA_NIM_API_KEY`).
4. Set Build Command: `npx prisma generate && next build`.
5. Deploy!

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
