import { NextRequest, NextResponse } from 'next/server'
import { queryOpenAI, analyzeBrandMentions } from '@/lib/llm/openai'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
    }

    const { prompt, brands = [], competitors = [] } = await request.json()

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt requis' }, { status: 400 })
    }

    // Requête au LLM
    const llmResponse = await queryOpenAI(prompt)

    // Analyse des mentions de marques
    const analysis = await analyzeBrandMentions(
      llmResponse.text,
      brands,
      competitors
    )

    return NextResponse.json({
      success: true,
      data: {
        response: llmResponse,
        analysis,
        timestamp: new Date().toISOString(),
      }
    })

  } catch (error) {
    console.error('Erreur API LLM:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la requête LLM' },
      { status: 500 }
    )
  }
} 