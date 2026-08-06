# ⚡ CodeAura

<div align="center">

  **Developer Personality & Engineering Profile Analyzer**

  Analyze GitHub commit telemetry, repository complexity, and LeetCode algorithmic mastery to generate AI-powered developer archetypes, hilarious roasts, glowing praises, and weighted Aura scores.

  [Live Demo](https://code-aura-app.vercel.app) • [GitHub Repository](https://github.com/nikhil-m-star/Code-Aura)

</div>

---

## 🌟 Overview

**CodeAura** turns developer profiles into insightful, beautifully formatted visual intelligence cards. By synthesizing raw data from **GitHub's REST API** and **LeetCode's GraphQL API**, CodeAura evaluates developer velocity, code complexity, circadian commit patterns, and algorithmic mastery. An AI engine (powered by **Meta Llama 3.1 8B via NVIDIA NIM API**) formulates custom archetypes, witty roasts, constructive praise, and personalized tech stack recommendations.

---

## ✨ Features

- 📊 **Multi-Platform Telemetry**: Concurrently fetches public GitHub repositories, commit velocity, circadian work windows, code complexity, and LeetCode problem difficulty breakdowns.
- 🎯 **Weighted Aura Scoring**: Uses a non-linear, multi-axis algorithm (Velocity, Clarity, Algorithms, Stamina, Impact) to compute a realistic 1-99 developer Aura Score.
- 🤖 **AI-Powered Archetypes & Roasts**: Generates witty 2-4 word developer archetypes, sharp roasts, glowing praises, PR nemesis profiles, and stack recommendations.
- 🎨 **Modern Minimalist UI**: Pitch-black theme paired with vibrant flat solid color blocks, Lucide vector icons, and custom SVG logos.
- 🔄 **Dynamic Fisheye Marquee**: Features a smooth 35-second infinite circular logo ticker with interactive fisheye scaling for loading states.
- 📸 **One-Click Share & Export**: Download high-resolution PNG aura cards directly from the browser using `html-to-image`.
- 🔒 **Authenticated History Vault**: Clerk authentication powered by Server Actions and PostgreSQL (via Prisma) to save and revisit generated developer auras.
- ⏱️ **Built-in Rate Limiting**: Server-side cooldown protection to ensure fair API usage and prevent spam.

---

## 🛠️ Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Framework** | [Next.js 16 (App Router)](https://nextjs.org/) |
| **Language** | [TypeScript](https://www.typescriptlang.org/) |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) + Custom CSS Marquees |
| **Database & ORM** | [PostgreSQL](https://www.postgresql.org/) + [Prisma ORM](https://www.prisma.io/) |
| **Authentication** | [Clerk](https://clerk.com/) |
| **AI Inference** | [NVIDIA NIM API](https://build.nvidia.com/) (`meta/llama-3.1-8b-instruct`) |
| **APIs** | GitHub REST API v3 + LeetCode GraphQL API |
| **Icons** | [Lucide React](https://lucide.dev/) + Custom SVG Components |

---

## 🧮 Aura Scoring Algorithm

CodeAura's composite score avoids artificial inflation by calculating 5 distinct metrics before applying a weighted sum:

$$\text{AuraScore} = 0.20(\text{Velocity}) + 0.15(\text{Clarity}) + 0.25(\text{Algorithms}) + 0.15(\text{Stamina}) + 0.25(\text{Impact})$$

- **Velocity (20%)**: Evaluates recent commit frequency using non-linear diminishing returns.
- **Clarity (15%)**: Evaluates code complexity based on repository language diversity, total stars, and commit volume.
- **Algorithms (25%)**: Measures LeetCode problem difficulty (Easy/Medium/Hard) and acceptance rates, or defaults based on practical repository building.
- **Stamina (15%)**: Measures build consistency through public repos, pull requests, and commit frequency.
- **Impact (25%)**: Applies logarithmic scaling to community stars and follower counts ($\log_{10}(\text{Stars} + 1)$).

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: `v18.x` or higher
- **npm** / **yarn** / **pnpm** / **bun**
- **PostgreSQL Database** (e.g. Supabase, Neon, or local instance)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/nikhil-m-star/Code-Aura.git
   cd Code-Aura
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   Create a `.env.local` file in the root directory:
   ```env
   # Clerk Authentication
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
   CLERK_SECRET_KEY=sk_test_...

   # PostgreSQL Database URL
   DATABASE_URL="postgresql://user:password@localhost:5432/codeaura?schema=public"

   # NVIDIA NIM AI API Key (Optional — fallback engine included)
   NVIDIA_NIM_API_KEY=nvapi-...
   ```

4. **Synchronize database schema:**
   ```bash
   npx prisma db push
   ```

5. **Run the development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Project Structure

```
CodeAura/
├── prisma/
│   └── schema.prisma         # PostgreSQL User & Analysis Schema
├── public/
│   └── favicon.svg           # Minimal Developer Laptop Favicon
├── src/
│   ├── app/
│   │   ├── actions/          # Next.js Server Actions (analyze, history)
│   │   ├── history/          # User Saved Auras Vault Page
│   │   ├── results/[id]/     # Dynamic Shareable Result Page
│   │   ├── globals.css       # Global CSS & Marquee Animations
│   │   ├── layout.tsx        # App Shell, Font Configuration & Navbar
│   │   └── page.tsx          # Homepage & Dynamic Fisheye Marquee Loader
│   ├── components/
│   │   ├── AuraCard.tsx      # Main Color-Coded Developer Aura Card
│   │   ├── CodeAuraLogo.tsx  # Developer Laptop SVG Logo
│   │   ├── GithubIcon.tsx    # GitHub SVG Icon Component
│   │   └── BrandLogos.tsx    # Technology Stack Vector Logos
│   └── lib/
│       ├── prisma.ts         # Prisma Client Singleton
│       └── services/
│           ├── github.ts     # GitHub REST API Service & Analytics
│           ├── leetcode.ts   # LeetCode GraphQL API Service
│           └── nvidia.ts     # Llama 3.1 AI Prompt & Fallback Engine
└── README.md
```

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
