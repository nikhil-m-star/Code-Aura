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
  originalReposCount: number
  forkedReposCount: number
  originalityRatio: number // % of non-forked original repos
  topLanguage: string
  languages: { name: string; percentage: number; color: string }[]
  topTopics: string[]
  nightOwlScore: number
  timeSlot: 'Late Night (11PM-4AM)' | 'Early Bird (5AM-9AM)' | 'Day Grinder (10AM-5PM)' | 'Evening Builder (6PM-10PM)'
  recentCommitCount: number
  pullRequestCount: number
  issueCount: number
  codeComplexityScore: number
  commitKeywords: string[]
  topRepos: {
    name: string
    stars: number
    language: string | null
    description: string | null
    url: string
    isFork: boolean
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
  Kotlin: '#d946ef',
  Dart: '#00B4AB',
  Shell: '#89e051',
  Vue: '#41b883',
}

export async function fetchGitHubStats(username: string): Promise<GitHubUserStats> {
  const headers: HeadersInit = {
    Accept: 'application/vnd.github.v3+json',
    'User-Agent': 'CodeAura-App',
  }

  // Fetch User Profile, Repos, and Public Events concurrently
  const [userRes, reposRes, eventsRes] = await Promise.all([
    fetch(`https://api.github.com/users/${encodeURIComponent(username)}`, {
      headers,
      next: { revalidate: 300 },
    }),
    fetch(
      `https://api.github.com/users/${encodeURIComponent(username)}/repos?per_page=100&sort=updated`,
      {
        headers,
        next: { revalidate: 300 },
      }
    ),
    fetch(
      `https://api.github.com/users/${encodeURIComponent(username)}/events/public?per_page=100`,
      {
        headers,
        next: { revalidate: 180 },
      }
    ),
  ])

  if (!userRes.ok) {
    if (userRes.status === 404) {
      throw new Error(`GitHub user "${username}" was not found. Please check the spelling.`)
    }
    throw new Error(`Failed to fetch GitHub profile for "${username}" (HTTP ${userRes.status}).`)
  }

  const userData = await userRes.json()

  let repos = []
  if (reposRes.ok) {
    repos = await reposRes.json()
  }

  let events = []
  if (eventsRes.ok) {
    events = await eventsRes.json()
  }

  // Process Repos & Language / Topic / Fork Breakdown
  let totalStars = 0
  let totalForks = 0
  let originalReposCount = 0
  let forkedReposCount = 0

  const languageCounts: Record<string, number> = {}
  const topicMap: Record<string, number> = {}

  const processedRepos = repos.map((repo: any) => {
    totalStars += repo.stargazers_count || 0
    totalForks += repo.forks_count || 0

    if (repo.fork) {
      forkedReposCount++
    } else {
      originalReposCount++
    }

    if (repo.language) {
      languageCounts[repo.language] = (languageCounts[repo.language] || 0) + 1
    }

    if (Array.isArray(repo.topics)) {
      repo.topics.forEach((t: string) => {
        topicMap[t] = (topicMap[t] || 0) + 1
      })
    }

    return {
      name: repo.name,
      stars: repo.stargazers_count || 0,
      language: repo.language || null,
      description: repo.description || null,
      url: repo.html_url,
      isFork: Boolean(repo.fork),
    }
  })

  const originalityRatio =
    repos.length > 0 ? Math.round((originalReposCount / repos.length) * 100) : 100

  // Top Topic Badges
  const topTopics = Object.entries(topicMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([t]) => t)

  // Deep Events Analysis (Commit Velocity, PRs, Commit Message Sentiment/Keywords)
  let recentCommitCount = 0
  let pullRequestCount = 0
  let issueCount = 0
  const hourBuckets = { lateNight: 0, earlyBird: 0, dayGrinder: 0, evening: 0 }
  const keywordCounts: Record<string, number> = {}

  events.forEach((ev: any) => {
    const createdAt = new Date(ev.created_at)
    const hour = createdAt.getUTCHours()

    if (hour >= 23 || hour <= 4) hourBuckets.lateNight++
    else if (hour >= 5 && hour <= 9) hourBuckets.earlyBird++
    else if (hour >= 10 && hour <= 17) hourBuckets.dayGrinder++
    else hourBuckets.evening++

    if (ev.type === 'PushEvent') {
      recentCommitCount += ev.payload?.size || 1
      const commits = ev.payload?.commits || []
      commits.forEach((c: any) => {
        const msg = (c.message || '').toLowerCase()
        if (msg.includes('fix')) keywordCounts['bugfix'] = (keywordCounts['bugfix'] || 0) + 1
        if (msg.includes('refactor')) keywordCounts['refactor'] = (keywordCounts['refactor'] || 0) + 1
        if (msg.includes('feat') || msg.includes('add')) keywordCounts['feature'] = (keywordCounts['feature'] || 0) + 1
        if (msg.includes('wip')) keywordCounts['wip'] = (keywordCounts['wip'] || 0) + 1
        if (msg.includes('test')) keywordCounts['testing'] = (keywordCounts['testing'] || 0) + 1
      })
    } else if (ev.type === 'PullRequestEvent') {
      pullRequestCount++
    } else if (ev.type === 'IssuesEvent' || ev.type === 'IssueCommentEvent') {
      issueCount++
    }
  })

  const commitKeywords = Object.entries(keywordCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([kw]) => kw)

  const totalEventCount = events.length || 1
  const nightOwlScore = Math.round((hourBuckets.lateNight / totalEventCount) * 100)

  let timeSlot: GitHubUserStats['timeSlot'] = 'Day Grinder (10AM-5PM)'
  const maxBucket = Math.max(
    hourBuckets.lateNight,
    hourBuckets.earlyBird,
    hourBuckets.dayGrinder,
    hourBuckets.evening
  )

  if (maxBucket === hourBuckets.lateNight) timeSlot = 'Late Night (11PM-4AM)'
  else if (maxBucket === hourBuckets.earlyBird) timeSlot = 'Early Bird (5AM-9AM)'
  else if (maxBucket === hourBuckets.evening) timeSlot = 'Evening Builder (6PM-10PM)'

  // Top starred repos
  const topRepos = [...processedRepos].sort((a, b) => b.stars - a.stars).slice(0, 5)

  // Language breakdown calculation
  const totalRepoCount = Object.values(languageCounts).reduce((a, b) => a + b, 0) || 1
  const sortedLanguages = Object.entries(languageCounts).sort((a, b) => b[1] - a[1])

  const topLanguage = sortedLanguages.length > 0 ? sortedLanguages[0][0] : 'Polyglot'

  const languages = sortedLanguages.slice(0, 5).map(([name, count]) => ({
    name,
    percentage: Math.round((count / totalRepoCount) * 100),
    color: LANGUAGE_COLORS[name] || '#d946ef',
  }))

  const createdYear = new Date(userData.created_at).getFullYear()
  const currentYear = new Date().getFullYear()
  const accountAgeYears = Math.max(1, currentYear - createdYear)

  // Code Complexity Score
  const languageDiversity = Object.keys(languageCounts).length
  const codeComplexityScore = Math.min(
    99,
    Math.round(
      Math.min(40, repos.length * 0.8) +
        Math.min(30, totalStars * 1.5) +
        Math.min(20, languageDiversity * 3) +
        Math.min(10, recentCommitCount * 0.2)
    )
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
    originalReposCount,
    forkedReposCount,
    originalityRatio,
    topLanguage,
    languages,
    topTopics,
    nightOwlScore,
    timeSlot,
    recentCommitCount,
    pullRequestCount,
    issueCount,
    codeComplexityScore,
    commitKeywords,
    topRepos,
    accountAgeYears,
  }
}
