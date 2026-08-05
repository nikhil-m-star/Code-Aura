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
      const prompt = `Analyze this dev profile & generate a witty aura analysis JSON:
GitHub: ${github.username} | TopLang: ${github.topLanguage} (${github.languages.map((l) => `${l.name}:${l.percentage}%`).join(', ')}) | Repos: ${github.publicRepos} | Stars: ${github.totalStars} | WorkWindow: ${github.timeSlot} | NightOwl: ${github.nightOwlScore}% | Complexity: ${github.codeComplexityScore}/99
LeetCode: ${leetcode ? `Solved:${leetcode.totalSolved} (E:${leetcode.easySolved}, M:${leetcode.mediumSolved}, H:${leetcode.hardSolved}) | Acc:${leetcode.acceptanceRate}% | Mastery:${leetcode.algoMasteryScore}/99` : 'None'}

Return ONLY raw JSON matching:
{
  "archetype": "2-4 word dev title",
  "tagline": "1 sentence witty summary",
  "auraColor": "cyberpunk",
  "auraScore": 88,
  "keyVibe": "2-3 word badge",
  "observations": ["Obs 1 with stat", "Obs 2 with stat", "Obs 3 with stat", "Obs 4 with stat"],
  "roastOrPraise": "1-2 sentence roast or praise",
  "devNemesis": "Funny PR reviewer rival",
  "recommendedStack": "Ideal tech stack",
  "radarStats": { "velocity": 85, "clarity": 80, "algorithms": 75, "stamina": 90, "impact": 70 }
}`

      // Using Llama-3.1-8b-instruct for sub-second, blazing fast AI completions
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
              content: 'Output pure raw JSON without markdown.',
            },
            {
              role: 'user',
              content: prompt,
            },
          ],
          temperature: 0.6,
          max_tokens: 450,
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
