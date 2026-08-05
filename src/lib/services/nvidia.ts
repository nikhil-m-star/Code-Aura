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
}

export async function generateAISummary(
  github: GitHubUserStats,
  leetcode: LeetCodeUserStats | null
): Promise<AISummary> {
  const apiKey = process.env.NVIDIA_NIM_API_KEY

  if (apiKey) {
    try {
      const prompt = `You are a hilarious, witty, and deeply observant senior tech lead analyzing a developer's GitHub and LeetCode profile. Generate a fun, witty AI developer aura analysis based on these real stats:

GitHub Stats:
- Username: ${github.username}
- Top Language: ${github.topLanguage}
- All Languages: ${github.languages.map((l) => `${l.name} (${l.percentage}%)`).join(', ')}
- Public Repos: ${github.publicRepos}
- Total Stars: ${github.totalStars}
- Total Forks: ${github.totalForks}
- Followers: ${github.followers}
- Night Owl Activity Ratio: ${github.nightOwlScore}% late-night commits
- Top Repos: ${github.topRepos.map((r) => `${r.name} (${r.stars}★)`).join(', ')}

LeetCode Stats: ${
        leetcode
          ? `
- Solved: ${leetcode.totalSolved} total (${leetcode.easySolved} Easy, ${leetcode.mediumSolved} Medium, ${leetcode.hardSolved} Hard)
- Acceptance Rate: ${leetcode.acceptanceRate}%
- Top Solved Languages: ${leetcode.topLanguages.join(', ')}
`
          : 'No LeetCode profile linked (probably avoiding DP questions).'
      }

Instructions:
Respond ONLY with a valid JSON object matching this exact TypeScript structure without any markdown wrap or extra commentary:
{
  "archetype": "A creative, witty 2-4 word developer archetype name (e.g. 'Night-Owl Async Maestro', 'DP Ghosting Refactorer')",
  "tagline": "A funny 1-sentence summary of their dev style",
  "auraColor": "Choose one exact value: 'cyberpunk' or 'solar-flare' or 'emerald-matrix' or 'deep-space' or 'laser-violet'",
  "auraScore": "An integer score between 55 and 99 reflecting their overall aura",
  "keyVibe": "A 2-3 word vibe badge (e.g. 'Ship Fast, Fix Later')",
  "observations": [
    "Observation 1 mentioning real stat (e.g. repo count, top language %, night owl %)",
    "Observation 2 mentioning real stat or coding habit",
    "Observation 3 mentioning another real stat",
    "Observation 4 fun observation"
  ],
  "roastOrPraise": "A witty 1-2 sentence roast or praise about their LeetCode/GitHub habits"
}`

      const response = await fetch('https://integrate.api.nvidia.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          model: 'meta/llama-3.3-70b-instruct',
          messages: [
            {
              role: 'system',
              content:
                'You are an expert AI persona generator outputting pure raw JSON only.',
            },
            {
              role: 'user',
              content: prompt,
            },
          ],
          temperature: 0.7,
          max_tokens: 800,
        }),
      })

      if (response.ok) {
        const resData = await response.json()
        const textOutput = resData.choices?.[0]?.message?.content?.trim()

        if (textOutput) {
          // Remove any potential codeblock wrapping ```json ... ```
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
        console.warn(`NVIDIA NIM API response error HTTP ${response.status}`)
      }
    } catch (err) {
      console.warn('NVIDIA NIM AI generation failed, using intelligent rule-based fallback:', err)
    }
  }

  // Fallback Rule-Based Generation if AI key missing or endpoint unavailable
  return generateFallbackSummary(github, leetcode)
}

function generateFallbackSummary(
  github: GitHubUserStats,
  leetcode: LeetCodeUserStats | null
): AISummary {
  const isNightOwl = github.nightOwlScore > 35
  const isTypeScript = github.topLanguage.toLowerCase().includes('type')
  const isPython = github.topLanguage.toLowerCase().includes('python')
  const isHighStars = github.totalStars > 10

  let archetype = 'Caffeinated Full-Stack Artisan'
  let auraColor: AISummary['auraColor'] = 'cyberpunk'

  if (isNightOwl) {
    archetype = 'Midnight Commit Goblin'
    auraColor = 'deep-space'
  } else if (isTypeScript) {
    archetype = 'Strict-Type Evangelist'
    auraColor = 'laser-violet'
  } else if (isPython) {
    archetype = 'AI & Automation Wizard'
    auraColor = 'emerald-matrix'
  } else if (isHighStars) {
    archetype = 'Open Source Luminary'
    auraColor = 'solar-flare'
  }

  const observations: string[] = [
    `${github.topLanguage} dominates your stack with ${github.languages[0]?.percentage || 60}% of overall repositories.`,
    isNightOwl
      ? `${github.nightOwlScore}% of repo updates happen after sunset. Sleep is clearly an optional dependency.`
      : `Maintains a structured workflow across ${github.publicRepos} public repositories.`,
    github.totalStars > 0
      ? `Earned ${github.totalStars} total stars from the developer community.`
      : `Building up a portfolio with ${github.publicRepos} public code repositories.`,
  ]

  let roastOrPraise = ''

  if (leetcode) {
    observations.push(
      `Solved ${leetcode.totalSolved} LeetCode challenges (${leetcode.easySolved} Easy, ${leetcode.mediumSolved} Medium, ${leetcode.hardSolved} Hard).`
    )
    if (leetcode.hardSolved > 5) {
      roastOrPraise = `Praise: Conquered ${leetcode.hardSolved} Hard LeetCode problems! Interviewers should be interviewing you.`
    } else if (leetcode.mediumSolved > 15) {
      roastOrPraise = `Balanced Warrior: Solid grasp on Mediums (${leetcode.mediumSolved} solved), but treats Hard problems like production deployment on Friday.`
    } else {
      roastOrPraise = `Warm-Up Maestro: Cruising through Easy problems with an acceptance rate of ${leetcode.acceptanceRate}%.`
    }
  } else {
    observations.push('Has zero public LeetCode stats attached — wisely preserving peace of mind.')
    roastOrPraise = `LeetCode Stealth Mode: Skipping online algorithm puzzles to actually ship code to GitHub.`
  }

  const scoreBase = Math.min(
    98,
    Math.max(62, github.publicRepos * 2 + github.totalStars * 3 + (leetcode?.totalSolved || 15))
  )

  return {
    archetype,
    tagline: `Crafting code with ${github.topLanguage} expertise and ${github.publicRepos} projects shipped.`,
    auraColor,
    auraScore: scoreBase,
    keyVibe: isNightOwl ? 'Midnight Syntax' : 'Precision Engineering',
    observations,
    roastOrPraise,
  }
}
