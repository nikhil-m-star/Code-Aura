import { GitHubUserStats } from './github'
import { LeetCodeUserStats } from './leetcode'

export interface AISummary {
  archetype: string
  tagline: string
  auraColor: 'cyberpunk' | 'solar-flare' | 'emerald-matrix' | 'deep-space' | 'laser-violet'
  auraScore: number
  keyVibe: string
  observations: string[]
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
      const prompt = `You are a hilarious, observant senior tech lead doing a deep analysis of a developer. Produce a witty, highly specific developer aura analysis using these real stats:

GitHub Stats:
- Username: ${github.username}
- Top Language: ${github.topLanguage} (${github.languages.map((l) => `${l.name}: ${l.percentage}%`).join(', ')})
- Public Repos: ${github.publicRepos} | Total Stars: ${github.totalStars} | Total Forks: ${github.totalForks} | Followers: ${github.followers}
- Primary Work Window: ${github.timeSlot} (Night-owl ratio: ${github.nightOwlScore}%)
- Activity: ${github.recentCommitCount} recent commits, ${github.pullRequestCount} PRs, ${github.issueCount} issue events
- Code Complexity Rating: ${github.codeComplexityScore}/99
- Top Repos: ${github.topRepos.map((r) => `${r.name} (${r.stars}★)`).join(', ')}

LeetCode Stats: ${
        leetcode
          ? `
- Solved: ${leetcode.totalSolved} total (${leetcode.easySolved} Easy, ${leetcode.mediumSolved} Med, ${leetcode.hardSolved} Hard)
- Acceptance: ${leetcode.acceptanceRate}% | Hard-to-Easy Ratio: ${leetcode.hardToEasyRatio}% | Algo Mastery: ${leetcode.algoMasteryScore}/99
- Top Languages: ${leetcode.topLanguages.join(', ')}
`
          : 'No LeetCode profile linked (wisely avoiding DP trauma).'
      }

Output MUST be a single raw JSON object matching this exact interface:
{
  "archetype": "Creative 2-4 word dev archetype (e.g., 'Async Midnight Architect')",
  "tagline": "Witty 1-sentence summary of their dev personality",
  "auraColor": "Choose ONE: 'cyberpunk' | 'solar-flare' | 'emerald-matrix' | 'deep-space' | 'laser-violet'",
  "auraScore": 85,
  "keyVibe": "2-3 word badge",
  "observations": [
    "5 specific observations citing exact metrics (stars, top language %, night owl %, PR count, etc)"
  ],
  "roastOrPraise": "1-2 sentence roast or praise about their stack and LeetCode habits",
  "devNemesis": "Funny dev persona they would clash with in PR reviews",
  "recommendedStack": "A hilarious ideal tech stack tailored to them",
  "radarStats": {
    "velocity": 80,
    "clarity": 85,
    "algorithms": 75,
    "stamina": 90,
    "impact": 70
  }
}`

      // Using Llama-3.1-8b-instruct for ultra-fast response speed (sub-second token generation)
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
                'You are an AI code analyst that outputs pure JSON without markdown format.',
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
          if (parsed.archetype && parsed.observations && Array.isArray(parsed.observations)) {
            return parsed
          }
        }
      } else {
        console.warn(`NVIDIA NIM API HTTP ${response.status}`)
      }
    } catch (err) {
      console.warn('NVIDIA NIM AI generation fallback invoked:', err)
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

  const observations: string[] = [
    `${github.topLanguage} dominates your workflow with ${github.languages[0]?.percentage || 60}% of overall repositories.`,
    `Primary work window: ${github.timeSlot} with ${github.nightOwlScore}% late-night activity.`,
    `Code complexity rating stands at ${github.codeComplexityScore}/99 across ${github.publicRepos} repositories.`,
    github.totalStars > 0
      ? `Earned ${github.totalStars} community stars across your open-source repositories.`
      : `Active builder pushing ${github.recentCommitCount} recent commits & PRs.`,
  ]

  let roastOrPraise = ''

  if (leetcode) {
    observations.push(
      `Solved ${leetcode.totalSolved} LeetCode challenges (${leetcode.easySolved} Easy, ${leetcode.mediumSolved} Medium, ${leetcode.hardSolved} Hard).`
    )
    if (leetcode.hardSolved > 5) {
      roastOrPraise = `Algorithmic Dominance: Solved ${leetcode.hardSolved} Hard LeetCode puzzles. Interviewers end up asking YOU for advice.`
    } else {
      roastOrPraise = `Steady Solver: Maintained an acceptance rate of ${leetcode.acceptanceRate}% with an Algorithmic Mastery score of ${leetcode.algoMasteryScore}/99.`
    }
  } else {
    observations.push('Has zero public LeetCode handles attached — preserving peace of mind.')
    roastOrPraise = `Practical Builder: Skipping online puzzle grinders to actually ship code to GitHub.`
  }

  const velocity = Math.min(99, Math.max(50, github.recentCommitCount * 4 + 45))
  const clarity = Math.min(99, Math.max(55, github.codeComplexityScore))
  const algorithms = leetcode ? Math.min(99, leetcode.algoMasteryScore + 20) : 55
  const stamina = Math.min(99, Math.max(60, github.nightOwlScore + 40))
  const impact = Math.min(99, Math.max(45, github.totalStars * 4 + github.followers * 2 + 35))

  return {
    archetype,
    tagline: `Crafting software in ${github.topLanguage} during ${github.timeSlot.toLowerCase()} hours.`,
    auraColor,
    auraScore: Math.round((velocity + clarity + algorithms + stamina + impact) / 5),
    keyVibe: isNightOwl ? 'Midnight Syntax' : 'Precision Engineering',
    observations,
    roastOrPraise,
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
