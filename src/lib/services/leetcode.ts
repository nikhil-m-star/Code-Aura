export interface LeetCodeUserStats {
  username: string
  totalSolved: number
  easySolved: number
  mediumSolved: number
  hardSolved: number
  acceptanceRate: number
  ranking: number | null
  contributionPoints: number
  reputation: number
  topLanguages: string[]
  hardToEasyRatio: number
  algoMasteryScore: number
}

export async function fetchLeetCodeStats(username: string): Promise<LeetCodeUserStats | null> {
  if (!username || username.trim() === '') return null

  try {
    const query = `
      query userPublicStats($username: String!) {
        matchedUser(username: $username) {
          username
          githubUrl
          twitterUrl
          linkedinUrl
          profile {
            ranking
            userAvatar
            realName
            reputation
          }
          submitStatsGlobal {
            acSubmissionNum {
              difficulty
              count
              submissions
            }
            totalSubmissionNum {
              difficulty
              count
              submissions
            }
          }
          languageProblemCount {
            languageName
            problemsSolved
          }
        }
      }
    `

    const res = await fetch('https://leetcode.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'CodeAura-App',
      },
      body: JSON.stringify({
        query,
        variables: { username: username.trim() },
      }),
      next: { revalidate: 300 },
    })

    if (!res.ok) return null

    const data = await res.json()
    const matchedUser = data.data?.matchedUser

    if (!matchedUser) return null

    const acStats = matchedUser.submitStatsGlobal?.acSubmissionNum || []
    const totalStats = matchedUser.submitStatsGlobal?.totalSubmissionNum || []

    let easySolved = 0
    let mediumSolved = 0
    let hardSolved = 0
    let totalSolved = 0

    acStats.forEach((stat: any) => {
      if (stat.difficulty === 'All') totalSolved = stat.count || 0
      if (stat.difficulty === 'Easy') easySolved = stat.count || 0
      if (stat.difficulty === 'Medium') mediumSolved = stat.count || 0
      if (stat.difficulty === 'Hard') hardSolved = stat.count || 0
    })

    let totalSubmissions = 0
    let totalAcSubmissions = 0

    totalStats.forEach((stat: any) => {
      if (stat.difficulty === 'All') totalSubmissions = stat.submissions || 0
    })
    acStats.forEach((stat: any) => {
      if (stat.difficulty === 'All') totalAcSubmissions = stat.submissions || 0
    })

    const acceptanceRate =
      totalSubmissions > 0
        ? Math.min(100, Math.round((totalAcSubmissions / totalSubmissions) * 100))
        : 65

    const topLanguages = (matchedUser.languageProblemCount || [])
      .sort((a: any, b: any) => b.problemsSolved - a.problemsSolved)
      .slice(0, 3)
      .map((l: any) => l.languageName)

    const hardToEasyRatio =
      easySolved > 0 ? Math.round((hardSolved / easySolved) * 100) : 0

    // Robust Algo Mastery Score out of 100
    const algoMasteryScore = Math.min(
      100,
      Math.round(
        Math.min(45, easySolved * 0.15 + mediumSolved * 0.5 + hardSolved * 1.8) +
          Math.min(30, (acceptanceRate / 100) * 30) +
          Math.min(25, totalSolved * 0.1)
      )
    )

    return {
      username: matchedUser.username,
      totalSolved,
      easySolved,
      mediumSolved,
      hardSolved,
      acceptanceRate,
      ranking: matchedUser.profile?.ranking || null,
      contributionPoints: 0,
      reputation: matchedUser.profile?.reputation || 0,
      topLanguages,
      hardToEasyRatio,
      algoMasteryScore,
    }
  } catch (err) {
    console.warn('LeetCode GraphQL fetch failed:', err)
    return null
  }
}
