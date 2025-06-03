"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useLLMTest } from '@/hooks/useLLMTest'
import { Loader2, Play, RotateCcw } from 'lucide-react'

interface LLMTesterProps {
  prompt?: string
  brands?: string[]
  competitors?: string[]
}

export function LLMTester({ 
  prompt = "Quels sont les meilleurs outils de marketing digital en 2024 ?",
  brands = ["Votre Marque"],
  competitors = ["Concurrent A", "Concurrent B"]
}: LLMTesterProps) {
  const { isLoading, error, result, testLLM, reset } = useLLMTest()
  const [currentPrompt, setCurrentPrompt] = useState(prompt)

  const handleTest = () => {
    testLLM({
      prompt: currentPrompt,
      brands,
      competitors
    })
  }

  return (
    <div className="space-y-6">
      {/* Configuration du test */}
      <Card>
        <CardHeader>
          <CardTitle>Test LLM en temps réel</CardTitle>
          <CardDescription>
            Testez votre prompt et analysez les mentions de marques
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Prompt à tester
            </label>
            <textarea
              value={currentPrompt}
              onChange={(e) => setCurrentPrompt(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md resize-none"
              rows={3}
              placeholder="Entrez votre question..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Marques à surveiller
              </label>
              <div className="flex flex-wrap gap-2">
                {brands.map((brand) => (
                  <Badge key={brand} variant="default">
                    {brand}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Concurrents
              </label>
              <div className="flex flex-wrap gap-2">
                {competitors.map((competitor) => (
                  <Badge key={competitor} variant="secondary">
                    {competitor}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <div className="flex space-x-3">
            <Button 
              onClick={handleTest} 
              disabled={isLoading || !currentPrompt.trim()}
              className="flex-1"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Test en cours...
                </>
              ) : (
                <>
                  <Play className="h-4 w-4 mr-2" />
                  Tester avec GPT-4o
                </>
              )}
            </Button>

            {(result || error) && (
              <Button variant="outline" onClick={reset}>
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Erreur */}
      {error && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-red-500 rounded-full" />
              <p className="text-red-700 font-medium">Erreur</p>
            </div>
            <p className="text-red-600 mt-2">{error}</p>
          </CardContent>
        </Card>
      )}

      {/* Résultats */}
      {result && (
        <div className="space-y-4">
          {/* Réponse LLM */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Réponse GPT-4o
                <div className="flex space-x-4 text-sm text-gray-600">
                  <span>{result.response.responseTime}ms</span>
                  <span>{result.response.tokenCount} tokens</span>
                  {result.response.cost && (
                    <span>${result.response.cost.toFixed(4)}</span>
                  )}
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-900 leading-relaxed">
                  {result.response.text}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Analyse des mentions */}
          <Card>
            <CardHeader>
              <CardTitle>Analyse des mentions</CardTitle>
              <CardDescription>
                Détection automatique des marques et concurrents
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Mentions de marques */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">
                    Mentions de vos marques ({result.analysis.brandMentions.length})
                  </h4>
                  {result.analysis.brandMentions.length > 0 ? (
                    <div className="space-y-3">
                      {result.analysis.brandMentions.map((mention, index) => (
                        <div key={index} className="p-3 bg-green-50 border border-green-200 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <Badge variant="default">{mention.brand}</Badge>
                            <div className="flex items-center space-x-2">
                              <span className="text-xs text-gray-600">
                                Position {mention.position}
                              </span>
                              <Badge 
                                variant={
                                  mention.sentiment === 'positive' ? 'default' :
                                  mention.sentiment === 'negative' ? 'destructive' : 'secondary'
                                }
                              >
                                {mention.sentiment}
                              </Badge>
                            </div>
                          </div>
                          <p className="text-sm text-gray-700">
                            "{mention.context}"
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-sm">
                      Aucune mention de vos marques détectée
                    </p>
                  )}
                </div>

                {/* Mentions de concurrents */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">
                    Mentions de concurrents ({result.analysis.competitorMentions.length})
                  </h4>
                  {result.analysis.competitorMentions.length > 0 ? (
                    <div className="space-y-3">
                      {result.analysis.competitorMentions.map((mention, index) => (
                        <div key={index} className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <Badge variant="secondary">{mention.competitor}</Badge>
                            <div className="flex items-center space-x-2">
                              <span className="text-xs text-gray-600">
                                Position {mention.position}
                              </span>
                              <Badge 
                                variant={
                                  mention.sentiment === 'positive' ? 'default' :
                                  mention.sentiment === 'negative' ? 'destructive' : 'secondary'
                                }
                              >
                                {mention.sentiment}
                              </Badge>
                            </div>
                          </div>
                          <p className="text-sm text-gray-700">
                            "{mention.context}"
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-sm">
                      Aucune mention de concurrents détectée
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
} 