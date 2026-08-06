import { GitHubUserStats } from './github'
import { LeetCodeUserStats } from './leetcode'

export interface AISummary {
  archetype: string
  tagline: string
  auraColor: 'cyberpunk' | 'solar-flare' | 'emerald-matrix' | 'deep-space' | 'laser-violet'
  auraScore: number
  keyVibe: string
  observations: string[]
  roast: string
  praise: string
  roastOrPraise: string
  devNemesis: string
  recommendedStack: string
  radarStats: {
    velocity: number
    clarity: number
    algorithms: number
    stamina: number
    impact: number
  }
}

export async function generateAISummary(
  github: GitHubUserStats,
  leetcode: LeetCodeUserStats | null
): Promise<AISummary> {
  const apiKey = process.env.NVIDIA_NIM_API_KEY

  if (apiKey) {
    try {
      const prompt = `Conduct a deeply analytical, articulate, and hilarious developer personality evaluation:

GitHub Data:
- Handle: @${github.username} (${github.name || 'Anonymous'})
- Languages: Primary ${github.topLanguage} (${github.languages.map((l) => `${l.name}: ${l.percentage}%`).join(', ')})
- Repositories: ${github.publicRepos} total (${github.originalityRatio}% original, ${github.forkedReposCount} forks)
- Community Impact: ${github.totalStars} stars, ${github.totalForks} forks, ${github.followers} followers
- Work Window: ${github.timeSlot} (${github.nightOwlScore}% late-night commit ratio)
- Code Complexity Score: ${github.codeComplexityScore}/100
- Recent Commit Activity: ${github.recentCommitCount} commits, ${github.pullRequestCount} PRs across ${github.topRepos.slice(0, 3).map((r) => r.name).join(', ')}

LeetCode Data: ${
        leetcode
          ? `Solved ${leetcode.totalSolved} total (${leetcode.easySolved} Easy, ${leetcode.mediumSolved} Med, ${leetcode.hardSolved} Hard) | Acceptance: ${leetcode.acceptanceRate}% | Hard Ratio: ${leetcode.hardToEasyRatio}% | Algo Rating: ${leetcode.algoMasteryScore}/100`
          : 'No LeetCode linked.'
      }

Return ONLY a raw JSON object with zero markdown syntax matching:
{
  "archetype": "Witty 2-4 word developer archetype title",
  "tagline": "Sharp 1-sentence synopsis of their dev methodology",
  "auraColor": "cyberpunk",
  "auraScore": 88,
  "keyVibe": "2-3 word badge",
  "observations": [
    "1. Detailed observation on primary language dominance (${github.topLanguage}) citing exact percentages.",
    "2. Deep analysis of commit circadian rhythm (${github.timeSlot}) and night owl ratio (${github.nightOwlScore}%).",
    "3. Technical assessment of code complexity (${github.codeComplexityScore}/100) across ${github.publicRepos} repositories.",
    "4. Open source impact analysis citing stars (${github.totalStars}) and originality ratio (${github.originalityRatio}%).",
    "5. Algorithmic problem-solving breakdown citing LeetCode stats or practical builder trade-offs."
  ],
  "roast": "2-sentence sharp, hilarious roast targeting their specific coding quirks, commit habits, or stack choices.",
  "praise": "2-sentence glowing praise celebrating their genuine engineering superpower and code impact.",
  "roastOrPraise": "1-sentence summary verdict.",
  "devNemesis": "Funny specific developer persona they would clash with in code reviews.",
  "recommendedStack": "A tailored, funny ideal tech stack recommendation.",
  "radarStats": {
    "velocity": 85,
    "clarity": 82,
    "algorithms": 78,
    "stamina": 90,
    "impact": 72
  }
}`

      const response = await fetch('https://integrate.api.nvidia.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          model: 'meta/llama-3.1-8b-instruct',
          messages: [
            {
              role: 'system',
              content:
                'You are an expert AI software lead analyst providing deep, witty, analytical profile evaluations in raw JSON format without markdown code blocks.',
            },
            {
              role: 'user',
              content: prompt,
            },
          ],
          temperature: 0.65,
          max_tokens: 650,
        }),
      })

      if (response.ok) {
        const resData = await response.json()
        const textOutput = resData.choices?.[0]?.message?.content?.trim()

        if (textOutput) {
          const jsonString = textOutput
            .replace(/^```json/g, '')
            .replace(/^```/g, '')
            .replace(/```$/g, '')
            .trim()

          const parsed = JSON.parse(jsonString) as AISummary
          if (
            parsed.archetype &&
            parsed.observations &&
            Array.isArray(parsed.observations) &&
            parsed.observations.length >= 4
          ) {
            if (!parsed.roast) parsed.roast = parsed.roastOrPraise || 'Pushes code at ungodly hours.'
            if (!parsed.praise) parsed.praise = 'Maintains impressive engineering momentum.'
            return parsed
          }
        }
      } else {
        console.warn(`AI API HTTP ${response.status}`)
      }
    } catch (err) {
      console.warn('AI generation fallback invoked:', err)
    }
  }

  return generateFallbackSummary(github, leetcode)
}

function generateFallbackSummary(
  github: GitHubUserStats,
  leetcode: LeetCodeUserStats | null
): AISummary {
  const isNightOwl = github.nightOwlScore > 30
  const isTypeScript = github.topLanguage.toLowerCase().includes('type')
  const isPython = github.topLanguage.toLowerCase().includes('python')
  const isGo = github.topLanguage.toLowerCase().includes('go')

  let archetype = 'Caffeinated Full-Stack Artisan'
  let auraColor: AISummary['auraColor'] = 'cyberpunk'

  if (isNightOwl) {
    archetype = 'Midnight Async Goblin'
    auraColor = 'deep-space'
  } else if (isTypeScript) {
    archetype = 'Strict-Type Evangelist'
    auraColor = 'laser-violet'
  } else if (isPython) {
    archetype = 'AI & Data Pipeline Wizard'
    auraColor = 'emerald-matrix'
  } else if (isGo) {
    archetype = 'Concurrency Microservice Titan'
    auraColor = 'solar-flare'
  }

  const mainLangPct = github.languages[0]?.percentage || 65

  const observations: string[] = [
    `${github.topLanguage} dominates your workflow, accounting for ${mainLangPct}% of your total repository codebase.`,
    `Primary work window identified as ${github.timeSlot}, displaying a ${github.nightOwlScore}% late-night commit ratio.`,
    `Code complexity score evaluated at ${github.codeComplexityScore}/100 across ${github.publicRepos} public repositories.`,
    github.totalStars > 0
      ? `Earned ${github.totalStars} community stars with an originality ratio of ${github.originalityRatio}% non-forked projects.`
      : `Active contributor maintaining high build velocity with ${github.recentCommitCount} recent commits and PR events.`,
  ]

  let roast = ''
  let praise = ''

  if (leetcode) {
    observations.push(
      `Solved ${leetcode.totalSolved} LeetCode challenges (${leetcode.easySolved} Easy, ${leetcode.mediumSolved} Medium, ${leetcode.hardSolved} Hard) with a ${leetcode.acceptanceRate}% acceptance rate.`
    )
    if (leetcode.hardSolved > 5) {
      roast = `Spends more time crafting complex Dynamic Programming memoization tables than interacting with human beings.`
      praise = `Algorithmic Mastermind: Conquered ${leetcode.hardSolved} Hard LeetCode problems! Technical interviewers end up asking YOU for career advice.`
    } else {
      roast = `Approaches Medium LeetCode problems like production deployments on a Friday afternoon — with intense anxiety.`
      praise = `Consistent Problem Solver: Maintained a strong ${leetcode.acceptanceRate}% acceptance accuracy with an Algorithmic Mastery rating of ${leetcode.algoMasteryScore}/100.`
    }
  } else {
    observations.push('Has zero public LeetCode handles attached — preserving peace of mind and avoiding puzzle grinding.')
    roast = `Refuses to link LeetCode because solving Two Sum for the 14th time isn't how real software gets built.`
    praise = `Pragmatic Titan: Bypasses online puzzle grinding to ship actual working full-stack applications directly to production.`
  }

  // ── Realistic score calculations ──
  // Velocity: based on commit count with diminishing returns
  const commitCount = github.recentCommitCount || 0
  const velocity = Math.min(100, Math.round(
    commitCount <= 0 ? 15 :
    commitCount <= 5 ? 20 + commitCount * 6 :
    commitCount <= 20 ? 45 + (commitCount - 5) * 2.5 :
    commitCount <= 50 ? 82 + (commitCount - 20) * 0.4 :
    94 + Math.min(6, (commitCount - 50) * 0.1)
  ))

  // Clarity: directly from code complexity score, no inflated floor
  const clarity = Math.min(100, Math.max(20, github.codeComplexityScore))

  // Algorithms: LeetCode-based, or inferred from code complexity & open-source impact if LC not linked
  const inferredAlgo = Math.min(95, Math.max(35, Math.round(github.codeComplexityScore * 0.7 + Math.min(30, Math.log10(github.totalStars + 1) * 10))))
  const algorithms = leetcode
    ? Math.min(100, Math.max(15, leetcode.algoMasteryScore))
    : inferredAlgo

  // Stamina: consistency signal from repo count + commit activity
  const repoSignal = Math.min(40, github.publicRepos * 2)
  const prSignal = Math.min(30, (github.pullRequestCount || 0) * 3)
  const stamina = Math.min(100, Math.max(10, repoSignal + prSignal + (commitCount > 10 ? 20 : commitCount > 3 ? 10 : 0)))

  // Impact: logarithmic scaling for stars and followers — 500+ stars gives high impact score
  const starScore = github.totalStars > 0 ? Math.min(55, Math.round(Math.log10(github.totalStars + 1) * 20)) : 0
  const followerScore = github.followers > 0 ? Math.min(30, Math.round(Math.log10(github.followers + 1) * 12)) : 0
  const originalityBonus = Math.round(github.originalityRatio * 0.15)
  const impact = Math.min(100, Math.max(5, starScore + followerScore + originalityBonus))

  // Composite aura: weighted average
  const rawAura = (velocity * 0.2) + (clarity * 0.2) + (algorithms * 0.2) + (stamina * 0.15) + (impact * 0.25)
  const auraScore = Math.min(99, Math.max(10, Math.round(rawAura)))

  return {
    archetype,
    tagline: `Crafting software in ${github.topLanguage} during ${github.timeSlot.toLowerCase()} hours.`,
    auraColor,
    auraScore,
    keyVibe: isNightOwl ? 'Midnight Syntax' : 'Precision Engineering',
    observations,
    roast,
    praise,
    roastOrPraise: `${roast} ${praise}`,
    devNemesis: 'The Trailing Whitespace Linter Bot',
    recommendedStack: `${github.topLanguage} + Next.js 16 + Neon Postgres + Vercel`,
    radarStats: {
      velocity,
      clarity,
      algorithms,
      stamina,
      impact,
    },
  }
}
