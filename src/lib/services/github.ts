export interface GitHubUserStats {
  username: string
  name: string | null
  avatarUrl: string
  bio: string | null
  followers: number
  following: number
  publicRepos: number
  createdAt: string
  totalStars: number
  totalForks: number
  topLanguage: string
  languages: { name: string; percentage: number; color: string }[]
  nightOwlScore: number // percentage estimated night/late activity
  topRepos: {
    name: string
    stars: number
    language: string | null
    description: string | null
    url: string
  }[]
  accountAgeYears: number
}

const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: '#3178c6',
  JavaScript: '#f1e05a',
  Python: '#3572A5',
  Java: '#b07219',
  'C++': '#f34b7d',
  C: '#555555',
  'C#': '#178600',
  Go: '#00ADD8',
  Rust: '#dea584',
  HTML: '#e34c26',
  CSS: '#563d7c',
  PHP: '#4F5D95',
  Ruby: '#701516',
  Swift: '#F05138',
  Kotlin: '#A97BFF',
  Dart: '#00B4AB',
  Shell: '#89e051',
  Vue: '#41b883',
}

export async function fetchGitHubStats(username: string): Promise<GitHubUserStats> {
  const headers: HeadersInit = {
    Accept: 'application/vnd.github.v3+json',
    'User-Agent': 'CodeAura-App',
  }

  // Fetch User Info
  const userRes = await fetch(`https://api.github.com/users/${encodeURIComponent(username)}`, {
    headers,
    next: { revalidate: 300 },
  })

  if (!userRes.ok) {
    if (userRes.status === 404) {
      throw new Error(`GitHub user "${username}" was not found. Please check the spelling.`)
    }
    throw new Error(`Failed to fetch GitHub profile for "${username}" (HTTP ${userRes.status}).`)
  }

  const userData = await userRes.json()

  // Fetch Repos
  const reposRes = await fetch(
    `https://api.github.com/users/${encodeURIComponent(username)}/repos?per_page=100&sort=updated`,
    {
      headers,
      next: { revalidate: 300 },
    }
  )

  let repos = []
  if (reposRes.ok) {
    repos = await reposRes.json()
  }

  let totalStars = 0
  let totalForks = 0
  const languageCounts: Record<string, number> = {}
  let lateNightCount = 0

  const processedRepos = repos.map((repo: any) => {
    totalStars += repo.stargazers_count || 0
    totalForks += repo.forks_count || 0

    if (repo.language) {
      languageCounts[repo.language] = (languageCounts[repo.language] || 0) + 1
    }

    // Check last update time for night owl estimation
    if (repo.pushed_at) {
      const pushHour = new Date(repo.pushed_at).getUTCHours()
      if (pushHour >= 20 || pushHour <= 4) {
        lateNightCount++
      }
    }

    return {
      name: repo.name,
      stars: repo.stargazers_count || 0,
      language: repo.language || null,
      description: repo.description || null,
      url: repo.html_url,
    }
  })

  // Top starred repos
  const topRepos = [...processedRepos].sort((a, b) => b.stars - a.stars).slice(0, 5)

  // Language breakdown calculation
  const totalRepoCount = Object.values(languageCounts).reduce((a, b) => a + b, 0) || 1
  const sortedLanguages = Object.entries(languageCounts).sort((a, b) => b[1] - a[1])

  const topLanguage = sortedLanguages.length > 0 ? sortedLanguages[0][0] : 'Polyglot'

  const languages = sortedLanguages.slice(0, 5).map(([name, count]) => ({
    name,
    percentage: Math.round((count / totalRepoCount) * 100),
    color: LANGUAGE_COLORS[name] || '#8b5cf6',
  }))

  const createdYear = new Date(userData.created_at).getFullYear()
  const currentYear = new Date().getFullYear()
  const accountAgeYears = Math.max(1, currentYear - createdYear)

  const nightOwlScore = Math.round(
    (lateNightCount / Math.max(1, repos.length)) * 100
  )

  return {
    username: userData.login,
    name: userData.name || null,
    avatarUrl: userData.avatar_url,
    bio: userData.bio || null,
    followers: userData.followers || 0,
    following: userData.following || 0,
    publicRepos: userData.public_repos || 0,
    createdAt: userData.created_at,
    totalStars,
    totalForks,
    topLanguage,
    languages,
    nightOwlScore,
    topRepos,
    accountAgeYears,
  }
}
