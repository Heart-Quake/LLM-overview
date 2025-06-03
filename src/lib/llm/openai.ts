import OpenAI from 'openai'

// Initialisation lazy d'OpenAI
let openai: OpenAI | null = null

function getOpenAIClient(): OpenAI {
  if (!openai) {
    const apiKey = process.env.OPENAI_API_KEY
    if (!apiKey) {
      throw new Error('OPENAI_API_KEY non configurée. Veuillez ajouter votre clé API dans le fichier .env.local')
    }
    openai = new OpenAI({ apiKey })
  }
  return openai
}

export interface LLMResponse {
  text: string
  tokenCount: number
  responseTime: number
  cost?: number
}

export async function queryOpenAI(prompt: string): Promise<LLMResponse> {
  const startTime = Date.now()
  
  try {
    const client = getOpenAIClient()
    const completion = await client.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 1000,
    })

    const responseTime = Date.now() - startTime
    const tokenCount = completion.usage?.total_tokens || 0
    
    // Rough cost calculation for GPT-4o (adjust based on current pricing)
    const cost = (tokenCount / 1000) * 0.03 // $0.03 per 1K tokens (approximate)

    return {
      text: completion.choices[0]?.message?.content || '',
      tokenCount,
      responseTime,
      cost,
    }
  } catch (error) {
    console.error('OpenAI API error:', error)
    throw new Error('Failed to query OpenAI')
  }
}

export async function analyzeBrandMentions(
  text: string, 
  brands: string[], 
  competitors: string[]
): Promise<{
  brandMentions: Array<{ brand: string; position: number; context: string; sentiment: string }>
  competitorMentions: Array<{ competitor: string; position: number; context: string; sentiment: string }>
}> {
  const analysisPrompt = `
Analyze the following text and identify mentions of these brands and competitors:

Brands to track: ${brands.join(', ')}
Competitors to track: ${competitors.join(', ')}

Text to analyze:
"${text}"

For each mention found, provide:
1. The exact brand/competitor name
2. Position in the text (1st mention, 2nd mention, etc.)
3. Surrounding context (the sentence containing the mention)
4. Sentiment (positive, neutral, negative)

Return the results in JSON format:
{
  "brandMentions": [
    {
      "brand": "Brand Name",
      "position": 1,
      "context": "surrounding sentence",
      "sentiment": "positive"
    }
  ],
  "competitorMentions": [
    {
      "competitor": "Competitor Name", 
      "position": 1,
      "context": "surrounding sentence",
      "sentiment": "neutral"
    }
  ]
}
`

  try {
    const client = getOpenAIClient()
    const completion = await client.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "user",
          content: analysisPrompt,
        },
      ],
      temperature: 0.1, // Low temperature for consistent analysis
      response_format: { type: "json_object" },
    })

    const result = JSON.parse(completion.choices[0]?.message?.content || '{}')
    return {
      brandMentions: result.brandMentions || [],
      competitorMentions: result.competitorMentions || [],
    }
  } catch (error) {
    console.error('Brand analysis error:', error)
    return {
      brandMentions: [],
      competitorMentions: [],
    }
  }
} 