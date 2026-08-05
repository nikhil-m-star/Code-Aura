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
  hardToEasyRatio: number
  algoMasteryScore: number
  topLanguages: string[]
}

const LEETCODE_GRAPHQL_QUERY = `
  query getUserProfile($username: String!) {
    allQuestionsCount {
      difficulty
      count
    }
    matchedUser(username: $username) {
      username
      socialAccounts
      githubUrl
      contributions {
        points
      }
      profile {
        reputation
        ranking
      }
      submitStats {
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

export async function fetchLeetCodeStats(username: string): Promise<LeetCodeUserStats | null> {
  if (!username || !username.trim()) {
    return null
  }

  const cleanUsername = username.trim()

  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 6000)

    const res = await fetch('https://leetcode.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        Referer: `https://leetcode.com/${encodeURIComponent(cleanUsername)}/`,
      },
      body: JSON.stringify({
        query: LEETCODE_GRAPHQL_QUERY,
        variables: { username: cleanUsername },
      }),
      signal: controller.signal,
      next: { revalidate: 300 },
    })

    clearTimeout(timeoutId)

    if (!res.ok) {
      console.warn(`LeetCode API HTTP error: ${res.status}`)
      return null
    }

    const data = await res.json()

    if (!data || !data.data || !data.data.matchedUser) {
      console.warn(`LeetCode user "${cleanUsername}" not found or endpoint altered.`)
      return null
    }

    const matchedUser = data.data.matchedUser
    const submitStats = matchedUser.submitStats?.acSubmissionNum || []
    const totalSubmissions = matchedUser.submitStats?.totalSubmissionNum || []

    let easySolved = 0
    let mediumSolved = 0
    let hardSolved = 0
    let totalSolved = 0

    submitStats.forEach((item: any) => {
      if (item.difficulty === 'All') totalSolved = item.count || 0
      if (item.difficulty === 'Easy') easySolved = item.count || 0
      if (item.difficulty === 'Medium') mediumSolved = item.count || 0
      if (item.difficulty === 'Hard') hardSolved = item.count || 0
    })

    let totalSubCount = 0
    let totalAcSubCount = 0
    totalSubmissions.forEach((item: any) => {
      if (item.difficulty === 'All') {
        totalSubCount = item.submissions || 0
      }
    })
    submitStats.forEach((item: any) => {
      if (item.difficulty === 'All') {
        totalAcSubCount = item.submissions || 0
      }
    })

    const acceptanceRate =
      totalSubCount > 0 ? Math.round((totalAcSubCount / totalSubCount) * 100) : 65

    const topLanguages = (matchedUser.languageProblemCount || [])
      .sort((a: any, b: any) => (b.problemsSolved || 0) - (a.problemsSolved || 0))
      .slice(0, 3)
      .map((l: any) => l.languageName)

    const hardToEasyRatio =
      easySolved > 0 ? parseFloat(((hardSolved / easySolved) * 100).toFixed(1)) : 0

    const algoMasteryScore = Math.min(
      99,
      Math.round(easySolved * 0.15 + mediumSolved * 0.5 + hardSolved * 1.8)
    )

    return {
      username: matchedUser.username || cleanUsername,
      totalSolved,
      easySolved,
      mediumSolved,
      hardSolved,
      acceptanceRate,
      ranking: matchedUser.profile?.ranking || null,
      contributionPoints: matchedUser.contributions?.points || 0,
      reputation: matchedUser.profile?.reputation || 0,
      hardToEasyRatio,
      algoMasteryScore,
      topLanguages: topLanguages.length > 0 ? topLanguages : ['Python', 'C++'],
    }
  } catch (error) {
    console.warn(`Failed to fetch LeetCode stats for "${cleanUsername}" (gracefully handled):`, error)
    return null
  }
}
