"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download, Plus, Play, Pause, Edit, Trash2, Filter } from "lucide-react"
import { useExport } from "@/lib/export"

// Données simulées pour les prompts
const mockPrompts = [
  {
    id: 1,
    text: "Quel est le meilleur smartphone en 2024 ?",
    category: "TOFU",
    tags: "smartphone, comparaison, 2024",
    status: "active",
    mentions: 45,
    visibilityScore: 78,
    lastRun: "2024-06-02",
    createdAt: "2024-05-15"
  },
  {
    id: 2,
    text: "iPhone vs Samsung : lequel choisir ?",
    category: "MOFU",
    tags: "iPhone, Samsung, comparaison",
    status: "active",
    mentions: 38,
    visibilityScore: 82,
    lastRun: "2024-06-02",
    createdAt: "2024-05-10"
  },
  {
    id: 3,
    text: "Où acheter un iPhone au meilleur prix ?",
    category: "BOFU",
    tags: "iPhone, prix, achat",
    status: "paused",
    mentions: 23,
    visibilityScore: 65,
    lastRun: "2024-06-01",
    createdAt: "2024-05-08"
  },
  {
    id: 4,
    text: "Avis sur l'iPhone 15 Pro",
    category: "Brand",
    tags: "iPhone 15, avis, test",
    status: "active",
    mentions: 56,
    visibilityScore: 89,
    lastRun: "2024-06-02",
    createdAt: "2024-05-20"
  },
  {
    id: 5,
    text: "Problèmes courants iPhone et solutions",
    category: "Support",
    tags: "iPhone, problèmes, solutions",
    status: "draft",
    mentions: 0,
    visibilityScore: 0,
    lastRun: null,
    createdAt: "2024-06-01"
  }
]

export default function PromptsPage() {
  const [selectedPrompts, setSelectedPrompts] = useState<number[]>([])
  const [filterCategory, setFilterCategory] = useState<string>("all")
  const { exportPrompts } = useExport()

  const handleExport = () => {
    const promptsToExport = selectedPrompts.length > 0 
      ? mockPrompts.filter(prompt => selectedPrompts.includes(prompt.id))
      : mockPrompts
    
    exportPrompts(promptsToExport)
  }

  const handleSelectPrompt = (promptId: number) => {
    setSelectedPrompts(prev => 
      prev.includes(promptId) 
        ? prev.filter(id => id !== promptId)
        : [...prev, promptId]
    )
  }

  const handleSelectAll = () => {
    setSelectedPrompts(
      selectedPrompts.length === mockPrompts.length 
        ? [] 
        : mockPrompts.map(p => p.id)
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'paused': return 'bg-yellow-100 text-yellow-800'
      case 'draft': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'TOFU': return 'bg-blue-100 text-blue-800'
      case 'MOFU': return 'bg-purple-100 text-purple-800'
      case 'BOFU': return 'bg-green-100 text-green-800'
      case 'Brand': return 'bg-orange-100 text-orange-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const filteredPrompts = filterCategory === "all" 
    ? mockPrompts 
    : mockPrompts.filter(prompt => prompt.category === filterCategory)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestion des Prompts</h1>
          <p className="text-gray-600">Créez et gérez vos prompts de surveillance IA</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filtrer
          </Button>
          <Button variant="outline" size="sm" onClick={handleExport}>
            <Download className="h-4 w-4 mr-2" />
            Exporter {selectedPrompts.length > 0 ? `(${selectedPrompts.length})` : ''}
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Nouveau prompt
          </Button>
        </div>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">{mockPrompts.length}</p>
              <p className="text-sm text-gray-600">Total prompts</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">
                {mockPrompts.filter(p => p.status === 'active').length}
              </p>
              <p className="text-sm text-gray-600">Actifs</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">
                {mockPrompts.reduce((sum, p) => sum + p.mentions, 0)}
              </p>
              <p className="text-sm text-gray-600">Mentions totales</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-orange-600">
                {Math.round(mockPrompts.reduce((sum, p) => sum + p.visibilityScore, 0) / mockPrompts.length)}
              </p>
              <p className="text-sm text-gray-600">Score moyen</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtres */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium">Catégorie:</span>
              <div className="flex space-x-2">
                {['all', 'TOFU', 'MOFU', 'BOFU', 'Brand', 'Support'].map((category) => (
                  <Button
                    key={category}
                    variant={filterCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilterCategory(category)}
                  >
                    {category === 'all' ? 'Toutes' : category}
                  </Button>
                ))}
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">
                {selectedPrompts.length} sélectionné(s)
              </span>
              <Button variant="outline" size="sm" onClick={handleSelectAll}>
                {selectedPrompts.length === mockPrompts.length ? 'Désélectionner tout' : 'Sélectionner tout'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Liste des prompts */}
      <Card>
        <CardHeader>
          <CardTitle>Prompts ({filteredPrompts.length})</CardTitle>
          <CardDescription>
            Gérez vos prompts de surveillance et analysez leurs performances
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredPrompts.map((prompt) => (
              <div key={prompt.id} className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-gray-50">
                <input
                  type="checkbox"
                  checked={selectedPrompts.includes(prompt.id)}
                  onChange={() => handleSelectPrompt(prompt.id)}
                  className="h-4 w-4 text-blue-600 rounded"
                />
                
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="font-medium">{prompt.text}</h3>
                    <Badge className={getCategoryColor(prompt.category)}>
                      {prompt.category}
                    </Badge>
                    <Badge className={getStatusColor(prompt.status)}>
                      {prompt.status}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span>Tags: {prompt.tags}</span>
                    <span>•</span>
                    <span>{prompt.mentions} mentions</span>
                    <span>•</span>
                    <span>Score: {prompt.visibilityScore}</span>
                    {prompt.lastRun && (
                      <>
                        <span>•</span>
                        <span>Dernière exécution: {prompt.lastRun}</span>
                      </>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  {prompt.status === 'active' ? (
                    <Button variant="outline" size="sm">
                      <Pause className="h-4 w-4" />
                    </Button>
                  ) : (
                    <Button variant="outline" size="sm">
                      <Play className="h-4 w-4" />
                    </Button>
                  )}
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Actions en lot */}
      {selectedPrompts.length > 0 && (
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">
                {selectedPrompts.length} prompt(s) sélectionné(s)
              </span>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <Play className="h-4 w-4 mr-2" />
                  Activer
                </Button>
                <Button variant="outline" size="sm">
                  <Pause className="h-4 w-4 mr-2" />
                  Suspendre
                </Button>
                <Button variant="outline" size="sm" onClick={handleExport}>
                  <Download className="h-4 w-4 mr-2" />
                  Exporter
                </Button>
                <Button variant="outline" size="sm">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Supprimer
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
} 