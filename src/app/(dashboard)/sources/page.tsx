"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Treemap } from "recharts"
import { ExternalLink, AlertTriangle, CheckCircle, Globe, FileText, MessageSquare, Download, Filter, Plus } from "lucide-react"
import CustomTooltip from "@/components/ui/Tooltip"
import InfoIcon from "@/components/ui/InfoIcon"

// Données simulées pour l'analyse des sources
const sourcesData = [
  {
    id: 1,
    url: "https://www.apple.com/iphone/",
    domain: "apple.com",
    title: "iPhone - Apple (FR)",
    category: "Site officiel",
    type: "brand",
    mentions: 156,
    trustScore: 95,
    lastCited: "2024-06-02",
    controlled: true,
    sentiment: "positive",
    topPrompts: ["Quel est le meilleur iPhone ?", "Prix iPhone 15"],
    traffic: "Très élevé",
    authority: 98
  },
  {
    id: 2,
    url: "https://www.lesnumeriques.com/telephone-portable/",
    domain: "lesnumeriques.com",
    title: "Tests smartphones - Les Numériques",
    category: "Presse tech",
    type: "media",
    mentions: 89,
    trustScore: 88,
    lastCited: "2024-06-02",
    controlled: false,
    sentiment: "neutral",
    topPrompts: ["Comparatif smartphones", "Test iPhone vs Samsung"],
    traffic: "Élevé",
    authority: 85
  },
  {
    id: 3,
    url: "https://www.reddit.com/r/iphone/",
    domain: "reddit.com",
    title: "r/iPhone - Reddit",
    category: "Forum",
    type: "forum",
    mentions: 67,
    trustScore: 72,
    lastCited: "2024-06-01",
    controlled: false,
    sentiment: "mixed",
    topPrompts: ["Avis iPhone", "Problèmes iPhone"],
    traffic: "Très élevé",
    authority: 92
  },
  {
    id: 4,
    url: "https://www.phonandroid.com/",
    domain: "phonandroid.com",
    title: "PhonAndroid - Actualités Android",
    category: "Blog tech",
    type: "blog",
    mentions: 54,
    trustScore: 78,
    lastCited: "2024-06-01",
    controlled: false,
    sentiment: "neutral",
    topPrompts: ["Android vs iPhone", "Actualités smartphones"],
    traffic: "Moyen",
    authority: 75
  },
  {
    id: 5,
    url: "https://support.apple.com/",
    domain: "support.apple.com",
    title: "Support Apple",
    category: "Support",
    type: "brand",
    mentions: 43,
    trustScore: 92,
    lastCited: "2024-05-31",
    controlled: true,
    sentiment: "neutral",
    topPrompts: ["Problème iPhone", "Réparation iPhone"],
    traffic: "Élevé",
    authority: 95
  },
  {
    id: 6,
    url: "https://www.youtube.com/watch?v=xyz",
    domain: "youtube.com",
    title: "Test iPhone 15 - YouTuber Tech",
    category: "Vidéo",
    type: "video",
    mentions: 38,
    trustScore: 65,
    lastCited: "2024-05-30",
    controlled: false,
    sentiment: "positive",
    topPrompts: ["Test iPhone 15", "Unboxing iPhone"],
    traffic: "Très élevé",
    authority: 88
  }
]

const categoryData = [
  { name: "Site officiel", value: 35, color: "#3b82f6" },
  { name: "Presse tech", value: 28, color: "#10b981" },
  { name: "Forum", value: 18, color: "#f59e0b" },
  { name: "Blog tech", value: 12, color: "#ef4444" },
  { name: "Vidéo", value: 7, color: "#8b5cf6" }
]

const trustDistribution = [
  { range: "90-100", count: 2, color: "#10b981" },
  { range: "80-89", count: 1, color: "#3b82f6" },
  { range: "70-79", count: 2, color: "#f59e0b" },
  { range: "60-69", count: 1, color: "#ef4444" }
]

const alertSources = [
  {
    url: "https://fake-news-site.com/iphone-review",
    domain: "fake-news-site.com",
    reason: "Source non fiable détectée",
    severity: "high",
    mentions: 12,
    action: "Bloquer"
  },
  {
    url: "https://competitor-blog.com/why-android-better",
    domain: "competitor-blog.com",
    reason: "Contenu concurrent négatif",
    severity: "medium",
    mentions: 8,
    action: "Surveiller"
  },
  {
    url: "https://unknown-forum.net/iphone-problems",
    domain: "unknown-forum.net",
    reason: "Source inconnue avec sentiment négatif",
    severity: "low",
    mentions: 5,
    action: "Analyser"
  }
]

export default function SourcesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [sortBy, setSortBy] = useState<'mentions' | 'trustScore' | 'authority'>('mentions')

  const filteredSources = selectedCategory === "all" 
    ? sourcesData 
    : sourcesData.filter(source => source.category === selectedCategory)

  const sortedSources = [...filteredSources].sort((a, b) => b[sortBy] - a[sortBy])

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'bg-green-100 text-green-800'
      case 'negative': return 'bg-red-100 text-red-800'
      case 'mixed': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getTrustScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600'
    if (score >= 80) return 'text-blue-600'
    if (score >= 70) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-blue-100 text-blue-800'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Analyse des Sources</h1>
            <p className="text-gray-600">Suivez les sources qui citent votre marque dans les réponses IA</p>
          </div>
          <CustomTooltip 
            content="Découvrez et analysez les sources d'information qui influencent la visibilité de votre marque dans l'IA"
            position="auto"
          >
            <InfoIcon />
          </CustomTooltip>
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
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Ajouter source
          </Button>
        </div>
      </div>

      {/* KPIs des sources */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Globe className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Sources totales</p>
                <p className="text-2xl font-bold text-gray-900">{sourcesData.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Sources contrôlées</p>
                <p className="text-2xl font-bold text-gray-900">
                  {sourcesData.filter(s => s.controlled).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <AlertTriangle className="h-8 w-8 text-orange-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Alertes actives</p>
                <p className="text-2xl font-bold text-gray-900">{alertSources.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <FileText className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Score moyen</p>
                <p className="text-2xl font-bold text-gray-900">
                  {Math.round(sourcesData.reduce((sum, s) => sum + s.trustScore, 0) / sourcesData.length)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Contenu principal */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
          <TabsTrigger value="ranking">Classement</TabsTrigger>
          <TabsTrigger value="categories">Catégories</TabsTrigger>
          <TabsTrigger value="alerts">Alertes</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Répartition par catégorie */}
            <Card>
              <CardHeader>
                <CardTitle>Répartition par Catégorie</CardTitle>
                <CardDescription>Types de sources qui citent votre marque</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Distribution des scores de confiance */}
            <Card>
              <CardHeader>
                <CardTitle>Distribution des Scores de Confiance</CardTitle>
                <CardDescription>Fiabilité des sources</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={trustDistribution}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="range" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Top sources */}
          <Card>
            <CardHeader>
              <CardTitle>Top Sources par Mentions</CardTitle>
              <CardDescription>Sources les plus citées dans les réponses IA</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {sourcesData.slice(0, 5).map((source, index) => (
                  <div key={source.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-bold text-blue-600">#{index + 1}</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-medium">{source.domain}</h3>
                          <Badge variant="outline">{source.category}</Badge>
                          {source.controlled && (
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{source.title}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{source.mentions} mentions</p>
                      <p className={`text-sm ${getTrustScoreColor(source.trustScore)}`}>
                        Score: {source.trustScore}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ranking" className="space-y-4">
          {/* Contrôles de tri */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <span className="text-sm font-medium">Trier par:</span>
                  <div className="flex space-x-2">
                    {(['mentions', 'trustScore', 'authority'] as const).map((sort) => (
                      <Button
                        key={sort}
                        variant={sortBy === sort ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSortBy(sort)}
                      >
                        {sort === 'mentions' ? 'Mentions' : 
                         sort === 'trustScore' ? 'Score de confiance' : 'Autorité'}
                      </Button>
                    ))}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium">Catégorie:</span>
                  <select 
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="border rounded px-2 py-1 text-sm"
                  >
                    <option value="all">Toutes</option>
                    <option value="Site officiel">Site officiel</option>
                    <option value="Presse tech">Presse tech</option>
                    <option value="Forum">Forum</option>
                    <option value="Blog tech">Blog tech</option>
                    <option value="Vidéo">Vidéo</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Liste des sources */}
          <Card>
            <CardHeader>
              <CardTitle>Classement Détaillé des Sources</CardTitle>
              <CardDescription>
                {filteredSources.length} source(s) - Triées par {
                  sortBy === 'mentions' ? 'nombre de mentions' : 
                  sortBy === 'trustScore' ? 'score de confiance' : 'autorité'
                }
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Source</th>
                      <th className="text-left p-2">Catégorie</th>
                      <th className="text-left p-2">Mentions</th>
                      <th className="text-left p-2">Score</th>
                      <th className="text-left p-2">Autorité</th>
                      <th className="text-left p-2">Sentiment</th>
                      <th className="text-left p-2">Contrôlée</th>
                      <th className="text-left p-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedSources.map((source, index) => (
                      <tr key={source.id} className="border-b hover:bg-gray-50">
                        <td className="p-2">
                          <div>
                            <div className="font-medium">{source.domain}</div>
                            <div className="text-sm text-gray-500 truncate max-w-xs">
                              {source.title}
                            </div>
                          </div>
                        </td>
                        <td className="p-2">
                          <Badge variant="outline">{source.category}</Badge>
                        </td>
                        <td className="p-2 font-medium">{source.mentions}</td>
                        <td className="p-2">
                          <div className="flex items-center space-x-2">
                            <Progress value={source.trustScore} className="w-16" />
                            <span className={`text-sm font-medium ${getTrustScoreColor(source.trustScore)}`}>
                              {source.trustScore}
                            </span>
                          </div>
                        </td>
                        <td className="p-2">{source.authority}</td>
                        <td className="p-2">
                          <Badge className={getSentimentColor(source.sentiment)}>
                            {source.sentiment}
                          </Badge>
                        </td>
                        <td className="p-2">
                          {source.controlled ? (
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          ) : (
                            <AlertTriangle className="h-4 w-4 text-orange-600" />
                          )}
                        </td>
                        <td className="p-2">
                          <Button variant="ghost" size="sm">
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="categories" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categoryData.map((category) => {
              const categorySources = sourcesData.filter(s => s.category === category.name)
              const avgScore = Math.round(
                categorySources.reduce((sum, s) => sum + s.trustScore, 0) / categorySources.length
              )
              
              return (
                <Card key={category.name}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      {category.name}
                      <Badge style={{ backgroundColor: category.color, color: 'white' }}>
                        {category.value}%
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Sources</span>
                        <span className="font-medium">{categorySources.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Score moyen</span>
                        <span className={`font-medium ${getTrustScoreColor(avgScore)}`}>
                          {avgScore}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Mentions totales</span>
                        <span className="font-medium">
                          {categorySources.reduce((sum, s) => sum + s.mentions, 0)}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertTriangle className="h-5 w-5 text-orange-600 mr-2" />
                Alertes Sources
              </CardTitle>
              <CardDescription>
                Sources nécessitant votre attention
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {alertSources.map((alert, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg bg-orange-50">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="font-medium">{alert.domain}</h3>
                        <Badge className={getSeverityColor(alert.severity)}>
                          {alert.severity}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">{alert.reason}</p>
                      <p className="text-sm text-gray-500 mt-1">
                        {alert.mentions} mentions détectées
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        {alert.action}
                      </Button>
                      <Button variant="ghost" size="sm">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Actions Recommandées</CardTitle>
              <CardDescription>Optimisez votre stratégie de sources</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-medium text-blue-900 mb-2">
                    Diversifier les sources contrôlées
                  </h3>
                  <p className="text-sm text-blue-700">
                    Créez du contenu sur des plateformes tierces fiables pour augmenter 
                    votre visibilité sur des sources non contrôlées.
                  </p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <h3 className="font-medium text-green-900 mb-2">
                    Surveiller les forums
                  </h3>
                  <p className="text-sm text-green-700">
                    Les discussions sur Reddit et autres forums influencent les réponses IA. 
                    Participez aux conversations pertinentes.
                  </p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <h3 className="font-medium text-purple-900 mb-2">
                    Collaborer avec la presse tech
                  </h3>
                  <p className="text-sm text-purple-700">
                    Établissez des relations avec les journalistes tech pour obtenir 
                    une couverture positive et fiable.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
} 