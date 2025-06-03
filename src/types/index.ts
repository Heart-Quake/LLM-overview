// Types pour les LLM
export interface LLMProvider {
  id: string
  name: string
  vendor: string
  modelVersion: string
  isActive: boolean
}

export interface LLMResponse {
  id: string
  promptId: string
  llmProvider: string
  modelName: string
  responseText: string
  responseTime: number
  tokenCount?: number
  cost?: number
  createdAt: string
}

// Types pour les prompts
export interface Prompt {
  id: string
  text: string
  category?: string
  tags?: string // Stored as comma-separated string
  isActive: boolean
  userId: string
  createdAt: string
  updatedAt: string
  responses?: LLMResponse[]
}

// Utility function to convert tags string to array
export function tagsToArray(tags?: string): string[] {
  if (!tags) return []
  return tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0)
}

// Utility function to convert tags array to string
export function arrayToTags(tags: string[]): string {
  return tags.join(',')
}

// Types pour les marques
export interface Brand {
  id: string
  name: string
  description?: string
  userId: string
  createdAt: string
  updatedAt: string
}

export interface Competitor {
  id: string
  name: string
  description?: string
  userId: string
  createdAt: string
  updatedAt: string
}

// Types pour les mentions
export interface BrandMention {
  id: string
  brandId: string
  responseId: string
  mentionText: string
  position: number
  sentiment?: 'positive' | 'neutral' | 'negative'
  context?: string
  createdAt: string
}

export interface CompetitorMention {
  id: string
  competitorId: string
  responseId: string
  mentionText: string
  position: number
  sentiment?: 'positive' | 'neutral' | 'negative'
  context?: string
  createdAt: string
}

// Types pour les analyses
export interface VisibilityScore {
  brand: string
  totalPrompts: number
  mentions: number
  score: number
  trend: 'up' | 'down' | 'stable'
  trendValue: number
}

export interface CompetitorAnalysis {
  competitor: string
  visibilityScore: number
  avgPosition: number
  mentionRate: number
  trend: 'up' | 'down' | 'stable'
}

// Types pour les API
export interface APIResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface TestLLMRequest {
  prompt: string
  brands?: string[]
  competitors?: string[]
}

export interface TestLLMResponse {
  response: {
    text: string
    tokenCount: number
    responseTime: number
    cost?: number
  }
  analysis: {
    brandMentions: Array<{
      brand: string
      position: number
      context: string
      sentiment: string
    }>
    competitorMentions: Array<{
      competitor: string
      position: number
      context: string
      sentiment: string
    }>
  }
  timestamp: string
}

// Types pour les utilisateurs
export interface User {
  id: string
  name?: string
  email: string
  emailVerified?: string
  image?: string
  createdAt: string
  updatedAt: string
}

// Types pour les sessions NextAuth
declare module "next-auth" {
  interface Session {
    user: {
      id: string
      name?: string
      email: string
      image?: string
    }
  }
} 