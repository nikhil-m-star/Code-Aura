'use server'

import { auth, currentUser } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'
import { fetchGitHubStats } from '@/lib/services/github'
import { fetchLeetCodeStats } from '@/lib/services/leetcode'
import { generateAISummary, AISummary } from '@/lib/services/nvidia'

export interface AnalyzeInput {
  githubUsername: string
  leetcodeUsername?: string
}

export interface AnalyzeResponse {
  success: boolean
  analysisId?: string
  error?: string
}

export async function analyzeDeveloperAction(input: AnalyzeInput): Promise<AnalyzeResponse> {
  try {
    const { userId: clerkId } = await auth()

    if (!clerkId) {
      return {
        success: false,
        error: 'Please sign in to generate your developer aura analysis.',
      }
    }

    const clerkUser = await currentUser()
    const primaryEmail =
      clerkUser?.emailAddresses?.find(
        (e) => e.id === clerkUser.primaryEmailAddressId
      )?.emailAddress || clerkUser?.emailAddresses?.[0]?.emailAddress || null

    // Ensure User exists in DB
    const dbUser = await prisma.user.upsert({
      where: { clerkId },
      update: { email: primaryEmail },
      create: {
        clerkId,
        email: primaryEmail,
      },
    })

    // Rate Limit Check: 1 analysis per 8 seconds per user
    const recentAnalysis = await prisma.analysis.findFirst({
      where: { userId: dbUser.id },
      orderBy: { createdAt: 'desc' },
    })

    if (recentAnalysis) {
      const secondsSinceLast = (Date.now() - new Date(recentAnalysis.createdAt).getTime()) / 1000
      if (secondsSinceLast < 8) {
        return {
          success: false,
          error: `Please wait ${Math.ceil(8 - secondsSinceLast)} seconds before generating another aura.`,
        }
      }
    }

    const ghUsername = input.githubUsername.trim()
    const lcUsername = input.leetcodeUsername?.trim() || ''

    if (!ghUsername) {
      return { success: false, error: 'GitHub username is required.' }
    }

    // Concurrent fetching: GitHub mandatory, LeetCode optional with graceful catch
    const [githubStats, leetcodeStats] = await Promise.all([
      fetchGitHubStats(ghUsername),
      lcUsername ? fetchLeetCodeStats(lcUsername) : Promise.resolve(null),
    ])

    // Generate AI Summary via NVIDIA NIM Llama model
    const aiSummary = await generateAISummary(githubStats, leetcodeStats)

    // Save Analysis to PostgreSQL DB
    const analysisRecord = await prisma.analysis.create({
      data: {
        userId: dbUser.id,
        githubUsername: githubStats.username,
        leetcodeUsername: leetcodeStats ? leetcodeStats.username : lcUsername || null,
        githubStats: githubStats as any,
        leetcodeStats: leetcodeStats ? (leetcodeStats as any) : null,
        aiSummary: aiSummary as any,
      },
    })

    return {
      success: true,
      analysisId: analysisRecord.id,
    }
  } catch (err: any) {
    console.error('Error in analyzeDeveloperAction:', err)
    return {
      success: false,
      error: err.message || 'An unexpected error occurred during profile analysis.',
    }
  }
}

export async function getAnalysisByIdAction(id: string) {
  try {
    const analysis = await prisma.analysis.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            clerkId: true,
            email: true,
          },
        },
      },
    })

    if (!analysis) return null

    return {
      id: analysis.id,
      githubUsername: analysis.githubUsername,
      leetcodeUsername: analysis.leetcodeUsername,
      githubStats: analysis.githubStats as unknown as import('@/lib/services/github').GitHubUserStats,
      leetcodeStats: analysis.leetcodeStats
        ? (analysis.leetcodeStats as unknown as import('@/lib/services/leetcode').LeetCodeUserStats)
        : null,
      aiSummary: analysis.aiSummary as unknown as AISummary,
      createdAt: analysis.createdAt.toISOString(),
      isOwner: false,
    }
  } catch (error) {
    console.error('Error in getAnalysisByIdAction:', error)
    return null
  }
}

export async function getUserAnalysesAction() {
  try {
    const { userId: clerkId } = await auth()
    if (!clerkId) return []

    const dbUser = await prisma.user.findUnique({
      where: { clerkId },
      include: {
        analyses: {
          orderBy: { createdAt: 'desc' },
          take: 20,
        },
      },
    })

    if (!dbUser) return []

    return dbUser.analyses.map((a) => ({
      id: a.id,
      githubUsername: a.githubUsername,
      leetcodeUsername: a.leetcodeUsername,
      aiSummary: a.aiSummary as unknown as AISummary,
      createdAt: a.createdAt.toISOString(),
    }))
  } catch (error) {
    console.error('Error in getUserAnalysesAction:', error)
    return []
  }
}
