import { useState } from 'react'
import { TestLLMRequest, TestLLMResponse, APIResponse } from '@/types'

interface UseLLMTestReturn {
  isLoading: boolean
  error: string | null
  result: TestLLMResponse | null
  testLLM: (request: TestLLMRequest) => Promise<void>
  reset: () => void
}

export function useLLMTest(): UseLLMTestReturn {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<TestLLMResponse | null>(null)

  const testLLM = async (request: TestLLMRequest) => {
    setIsLoading(true)
    setError(null)
    setResult(null)

    try {
      const response = await fetch('/api/llm/test', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      })

      const data: APIResponse<TestLLMResponse> = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Erreur lors du test LLM')
      }

      if (data.success && data.data) {
        setResult(data.data)
      } else {
        throw new Error(data.error || 'Réponse invalide du serveur')
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur inconnue'
      setError(errorMessage)
      console.error('Erreur test LLM:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const reset = () => {
    setError(null)
    setResult(null)
    setIsLoading(false)
  }

  return {
    isLoading,
    error,
    result,
    testLLM,
    reset,
  }
} 