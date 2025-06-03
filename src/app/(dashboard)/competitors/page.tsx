"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts"
import { TrendingUp, TrendingDown, Users, Target, Download, Plus, Filter } from "lucide-react"

// Données simulées pour les concurrents
const competitorData = [
  {
    id: 1,
    name: "Apple",
    category: "Tech",
    visibilityScore: 85,
    mentions: 342,
    sentiment: "positive",
    avgPosition: 1.2,
    trend: "up",
    shareOfVoice: 28.5,
    lastMention: "2024-06-02",
    topPrompts: ["Quel est le meilleur smartphone ?", "Comparaison iPhone vs Android"],
    strengths: ["Innovation", "Design", "Écosystème"],
    weaknesses: ["Prix élevé", "Réparabilité"]
  },
  {
    id: 2,
    name: "Samsung",
    category: "Tech",
    visibilityScore: 78,
    mentions: 298,
    sentiment: "positive",
    avgPosition: 1.8,
    trend: "stable",
    shareOfVoice: 24.2,
    lastMention: "2024-06-02",
    topPrompts: ["Meilleur téléphone Android", "Galaxy vs iPhone"],
    strengths: ["Variété", "Innovation", "Prix"],
    weaknesses: ["Interface", "Mises à jour"]
  },
  {
    id: 3,
    name: "Google",
    category: "Tech",
    visibilityScore: 72,
    mentions: 256,
    sentiment: "neutral",
    avgPosition: 2.1,
    trend: "up",
    shareOfVoice: 20.8,
    lastMention: "2024-06-01",
    topPrompts: ["Pixel vs iPhone", "Meilleur appareil photo smartphone"],
    strengths: ["IA", "Appareil photo", "Android pur"],
    weaknesses: ["Disponibilité", "Hardware"]
  },
  {
    id: 4,
    name: "Xiaomi",
    category: "Tech",
    visibilityScore: 65,
    mentions: 189,
    sentiment: "positive",
    avgPosition: 2.8,
    trend: "down",
    shareOfVoice: 15.3,
    lastMention: "2024-06-01",
    topPrompts: ["Smartphone pas cher", "Meilleur rapport qualité-prix"],
    strengths: ["Prix", "Spécifications", "Innovation"],
    weaknesses: ["MIUI", "Service client"]
  },
  {
    id: 5,
    name: "OnePlus",
    category: "Tech",
    visibilityScore: 58,
    mentions: 134,
    sentiment: "neutral",
    avgPosition: 3.2,
    trend: "stable",
    shareOfVoice: 11.2,
    lastMention: "2024-05-31",
    topPrompts: ["OnePlus vs Samsung", "Smartphone gaming"],
    strengths: ["Performance", "Charge rapide", "Design"],
    weaknesses: ["Caméra", "Prix en hausse"]
  }
]

const trendData = [
  { month: "Jan", Apple: 82, Samsung: 75, Google: 68, Xiaomi: 70, OnePlus: 55 },
  { month: "Fév", Apple: 84, Samsung: 76, Google: 69, Xiaomi: 68, OnePlus: 57 },
  { month: "Mar", Apple: 83, Samsung: 77, Google: 71, Xiaomi: 66, OnePlus: 58 },
  { month: "Avr", Apple: 85, Samsung: 78, Google: 72, Xiaomi: 65, OnePlus: 58 },
  { month: "Mai", Apple: 85, Samsung: 78, Google: 72, Xiaomi: 65, OnePlus: 58 }
]

const shareOfVoiceData = competitorData.map(comp => ({
  name: comp.name,
  value: comp.shareOfVoice,
  color: comp.name === "Apple" ? "#3b82f6" : comp.name === "Samsung" ? "#10b981" : comp.name === "Google" ? "#f59e0b" : comp.name === "Xiaomi" ? "#ef4444" : "#8b5cf6"
}))

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6']

export default function CompetitorsPage() {
  const [selectedCompetitor, setSelectedCompetitor] = useState(competitorData[0])
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table')

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'bg-green-100 text-green-800'
      case 'negative': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-4 w-4 text-green-600" />
      case 'down': return <TrendingDown className="h-4 w-4 text-red-600" />
      default: return <div className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analyse Concurrentielle</h1>
          <p className="text-gray-600">Comparez votre visibilité avec vos concurrents sur les LLM</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filtrer
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Exporter
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Ajouter concurrent
          </Button>
        </div>
      </div>

      {/* KPIs Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Target className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Concurrents suivis</p>
                <p className="text-2xl font-bold text-gray-900">{competitorData.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Mentions totales</p>
                <p className="text-2xl font-bold text-gray-900">
                  {competitorData.reduce((sum, comp) => sum + comp.mentions, 0)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Score moyen</p>
                <p className="text-2xl font-bold text-gray-900">
                  {Math.round(competitorData.reduce((sum, comp) => sum + comp.visibilityScore, 0) / competitorData.length)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="h-8 w-8 bg-orange-100 rounded-full flex items-center justify-center">
                <span className="text-orange-600 font-bold">%</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Part de voix leader</p>
                <p className="text-2xl font-bold text-gray-900">
                  {Math.max(...competitorData.map(c => c.shareOfVoice))}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
          <TabsTrigger value="trends">Tendances</TabsTrigger>
          <TabsTrigger value="sentiment">Sentiment</TabsTrigger>
          <TabsTrigger value="details">Détails</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Classement des concurrents */}
            <Card>
              <CardHeader>
                <CardTitle>Classement par Score de Visibilité</CardTitle>
                <CardDescription>Performance des concurrents sur les LLM</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={competitorData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="visibilityScore" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Part de voix */}
            <Card>
              <CardHeader>
                <CardTitle>Part de Voix</CardTitle>
                <CardDescription>Répartition des mentions par concurrent</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={shareOfVoiceData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {shareOfVoiceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Tableau des concurrents */}
          <Card>
            <CardHeader>
              <CardTitle>Tableau Comparatif</CardTitle>
              <CardDescription>Vue détaillée de tous les concurrents</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Concurrent</th>
                      <th className="text-left p-2">Score</th>
                      <th className="text-left p-2">Mentions</th>
                      <th className="text-left p-2">Sentiment</th>
                      <th className="text-left p-2">Position Moy.</th>
                      <th className="text-left p-2">Part de Voix</th>
                      <th className="text-left p-2">Tendance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {competitorData.map((competitor) => (
                      <tr key={competitor.id} className="border-b hover:bg-gray-50">
                        <td className="p-2">
                          <div>
                            <div className="font-medium">{competitor.name}</div>
                            <div className="text-sm text-gray-500">{competitor.category}</div>
                          </div>
                        </td>
                        <td className="p-2">
                          <div className="flex items-center space-x-2">
                            <Progress value={competitor.visibilityScore} className="w-16" />
                            <span className="text-sm font-medium">{competitor.visibilityScore}</span>
                          </div>
                        </td>
                        <td className="p-2">{competitor.mentions}</td>
                        <td className="p-2">
                          <Badge className={getSentimentColor(competitor.sentiment)}>
                            {competitor.sentiment}
                          </Badge>
                        </td>
                        <td className="p-2">{competitor.avgPosition}</td>
                        <td className="p-2">{competitor.shareOfVoice}%</td>
                        <td className="p-2">
                          <div className="flex items-center">
                            {getTrendIcon(competitor.trend)}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Évolution des Scores de Visibilité</CardTitle>
              <CardDescription>Tendances sur les 5 derniers mois</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="Apple" stroke="#3b82f6" strokeWidth={2} />
                  <Line type="monotone" dataKey="Samsung" stroke="#10b981" strokeWidth={2} />
                  <Line type="monotone" dataKey="Google" stroke="#f59e0b" strokeWidth={2} />
                  <Line type="monotone" dataKey="Xiaomi" stroke="#ef4444" strokeWidth={2} />
                  <Line type="monotone" dataKey="OnePlus" stroke="#8b5cf6" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sentiment" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {competitorData.map((competitor) => (
              <Card key={competitor.id}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    {competitor.name}
                    <Badge className={getSentimentColor(competitor.sentiment)}>
                      {competitor.sentiment}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Forces</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {competitor.strengths.map((strength, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {strength}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Faiblesses</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {competitor.weaknesses.map((weakness, index) => (
                          <Badge key={index} variant="outline" className="text-xs bg-red-50 text-red-700">
                            {weakness}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="details" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Liste des concurrents */}
            <Card>
              <CardHeader>
                <CardTitle>Sélectionner un concurrent</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {competitorData.map((competitor) => (
                    <div
                      key={competitor.id}
                      className={`p-3 rounded-lg cursor-pointer transition-colors ${
                        selectedCompetitor.id === competitor.id
                          ? 'bg-blue-50 border-blue-200 border'
                          : 'hover:bg-gray-50'
                      }`}
                      onClick={() => setSelectedCompetitor(competitor)}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{competitor.name}</span>
                        <span className="text-sm text-gray-500">{competitor.visibilityScore}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Détails du concurrent sélectionné */}
            <div className="lg:col-span-2 space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>{selectedCompetitor.name} - Analyse Détaillée</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Score de visibilité</p>
                      <p className="text-2xl font-bold text-gray-900">{selectedCompetitor.visibilityScore}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Mentions totales</p>
                      <p className="text-2xl font-bold text-gray-900">{selectedCompetitor.mentions}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Position moyenne</p>
                      <p className="text-2xl font-bold text-gray-900">{selectedCompetitor.avgPosition}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Part de voix</p>
                      <p className="text-2xl font-bold text-gray-900">{selectedCompetitor.shareOfVoice}%</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Top Prompts</CardTitle>
                  <CardDescription>Prompts où ce concurrent performe le mieux</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {selectedCompetitor.topPrompts.map((prompt, index) => (
                      <div key={index} className="p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm">{prompt}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
} 