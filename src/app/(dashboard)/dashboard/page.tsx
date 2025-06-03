"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { LLMTester } from "@/components/features/LLMTester"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts"
import { TrendingUp, TrendingDown, MessageSquare, Users, BarChart3, Plus, TestTube } from "lucide-react"
import { useState } from "react"
import CustomTooltip from "@/components/ui/Tooltip"
import InfoIcon from "@/components/ui/InfoIcon"

// Données simulées pour le MVP
const visibilityData = [
  { name: "Lun", score: 65 },
  { name: "Mar", score: 72 },
  { name: "Mer", score: 68 },
  { name: "Jeu", score: 75 },
  { name: "Ven", score: 82 },
  { name: "Sam", score: 78 },
  { name: "Dim", score: 85 },
]

const competitorData = [
  { name: "Votre marque", value: 35, color: "#3b82f6" },
  { name: "Concurrent A", value: 25, color: "#ef4444" },
  { name: "Concurrent B", value: 20, color: "#f59e0b" },
  { name: "Concurrent C", value: 15, color: "#10b981" },
  { name: "Autres", value: 5, color: "#6b7280" },
]

const recentResponses = [
  {
    id: 1,
    prompt: "Quels sont les meilleurs outils de marketing digital ?",
    llm: "ChatGPT",
    mentioned: true,
    position: 2,
    timestamp: "Il y a 2h",
  },
  {
    id: 2,
    prompt: "Comment améliorer le SEO d'un site web ?",
    llm: "Claude",
    mentioned: false,
    position: null,
    timestamp: "Il y a 4h",
  },
  {
    id: 3,
    prompt: "Quelles sont les tendances du e-commerce en 2024 ?",
    llm: "Gemini",
    mentioned: true,
    position: 1,
    timestamp: "Il y a 6h",
  },
]

export default function DashboardPage() {
  const [showTester, setShowTester] = useState(false)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600">Vue d'ensemble de votre visibilité IA</p>
          </div>
          <CustomTooltip 
            content="Vue d'ensemble de votre visibilité dans les réponses des modèles d'IA avec métriques clés et tendances en temps réel"
            position="auto"
          >
            <InfoIcon />
          </CustomTooltip>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" onClick={() => setShowTester(!showTester)}>
            <TestTube className="h-4 w-4 mr-2" />
            {showTester ? "Masquer le testeur" : "Tester LLM"}
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Nouveau prompt
          </Button>
        </div>
      </div>

      {/* Testeur LLM */}
      {showTester && (
        <div className="border-2 border-blue-200 rounded-lg p-6 bg-blue-50">
          <LLMTester 
            prompt="Quels sont les meilleurs outils de marketing digital en 2024 ?"
            brands={["Votre Marque", "Mon Entreprise"]}
            competitors={["Concurrent A", "Concurrent B", "Concurrent C"]}
          />
        </div>
      )}

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="flex items-center gap-2">
              <CardTitle className="text-sm font-medium">Score de visibilité</CardTitle>
              <CustomTooltip 
                content="Score moyen de visibilité basé sur votre position dans les réponses des LLM. Plus élevé = meilleure visibilité"
                position="auto"
              >
                <InfoIcon />
              </CustomTooltip>
            </div>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600 flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                +12% depuis la semaine dernière
              </span>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="flex items-center gap-2">
              <CardTitle className="text-sm font-medium">Prompts analysés</CardTitle>
              <CustomTooltip 
                content="Pourcentage de requêtes où votre marque apparaît dans les réponses d'IA par rapport au total analysé"
                position="auto"
              >
                <InfoIcon />
              </CustomTooltip>
            </div>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600 flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                +23 cette semaine
              </span>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="flex items-center gap-2">
              <CardTitle className="text-sm font-medium">Mentions totales</CardTitle>
              <CustomTooltip 
                content="Nombre de fois où votre marque ou produits ont été mentionnés dans les réponses des modèles IA"
                position="auto"
              >
                <InfoIcon />
              </CustomTooltip>
            </div>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-red-600 flex items-center">
                <TrendingDown className="h-3 w-3 mr-1" />
                -5% depuis la semaine dernière
              </span>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="flex items-center gap-2">
              <CardTitle className="text-sm font-medium">Position moyenne</CardTitle>
              <CustomTooltip 
                content="Position moyenne de votre marque quand elle est mentionnée dans les réponses. 1.0 = toujours premier"
                position="auto"
              >
                <InfoIcon />
              </CustomTooltip>
            </div>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.3</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600 flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                Amélioration de 0.2
              </span>
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Évolution du score de visibilité */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <CardTitle>Évolution du score de visibilité</CardTitle>
              <CustomTooltip 
                content="Tendance d'évolution de votre visibilité IA par rapport à la période précédente"
                position="auto"
              >
                <InfoIcon />
              </CustomTooltip>
            </div>
            <CardDescription>Score de visibilité sur les 7 derniers jours</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={visibilityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="score" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  dot={{ fill: "#3b82f6" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Part de voix concurrentielle */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <CardTitle>Part de voix concurrentielle</CardTitle>
              <CustomTooltip 
                content="Répartition des mentions entre vous et vos concurrents dans les réponses IA pour évaluer votre position relative sur le marché"
                position="auto"
              >
                <InfoIcon />
              </CustomTooltip>
            </div>
            <CardDescription>Répartition des mentions par marque</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={competitorData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {competitorData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Réponses récentes */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <CardTitle>Réponses récentes</CardTitle>
            <CustomTooltip 
              content="Liste des dernières analyses de prompts effectuées, avec le statut de mention de votre marque et la position obtenue"
              position="auto"
            >
              <InfoIcon />
            </CustomTooltip>
          </div>
          <CardDescription>Dernières analyses de prompts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentResponses.map((response) => (
              <div key={response.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{response.prompt}</p>
                  <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                    <span>LLM: {response.llm}</span>
                    <span>{response.timestamp}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  {response.mentioned ? (
                    <div className="flex items-center space-x-2">
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                        Mentionné
                      </span>
                      <span className="text-sm text-gray-600">
                        Position {response.position}
                      </span>
                    </div>
                  ) : (
                    <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">
                      Non mentionné
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 