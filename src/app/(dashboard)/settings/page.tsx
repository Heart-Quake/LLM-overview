"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Settings, Key, Globe, Bell, User, Shield, Zap, Plus, Trash2, Edit, CheckCircle, AlertCircle } from "lucide-react"

// Configuration des LLM
const llmProviders = [
  {
    id: "openai",
    name: "OpenAI",
    models: ["gpt-4o", "gpt-4-turbo", "gpt-3.5-turbo"],
    status: "connected",
    apiKey: "sk-...abc123",
    enabled: true,
    cost: 0.03,
    requests: 1250,
    icon: "🤖"
  },
  {
    id: "anthropic",
    name: "Anthropic",
    models: ["claude-3-opus", "claude-3-sonnet", "claude-3-haiku"],
    status: "disconnected",
    apiKey: "",
    enabled: false,
    cost: 0.00,
    requests: 0,
    icon: "🧠"
  },
  {
    id: "google",
    name: "Google",
    models: ["gemini-pro", "gemini-pro-vision"],
    status: "connected",
    apiKey: "AIza...xyz789",
    enabled: true,
    cost: 0.02,
    requests: 890,
    icon: "🔍"
  },
  {
    id: "perplexity",
    name: "Perplexity",
    models: ["pplx-7b-online", "pplx-70b-online"],
    status: "disconnected",
    apiKey: "",
    enabled: false,
    cost: 0.00,
    requests: 0,
    icon: "🌐"
  }
]

// Configuration des intégrations
const integrations = [
  {
    id: "serper",
    name: "Serper.dev",
    description: "API de recherche Google pour le RAG",
    status: "connected",
    apiKey: "ser_...def456",
    enabled: true,
    icon: "🔍"
  },
  {
    id: "bing",
    name: "Bing Search API",
    description: "API de recherche Microsoft",
    status: "disconnected",
    apiKey: "",
    enabled: false,
    icon: "🌐"
  },
  {
    id: "sheets",
    name: "Google Sheets",
    description: "Import/export de prompts",
    status: "connected",
    apiKey: "sheets_...ghi789",
    enabled: true,
    icon: "📊"
  }
]

// Marques et concurrents
const brands = [
  { id: 1, name: "Apple", type: "primary", category: "Tech", enabled: true },
  { id: 2, name: "iPhone", type: "product", category: "Tech", enabled: true },
  { id: 3, name: "MacBook", type: "product", category: "Tech", enabled: true }
]

const competitors = [
  { id: 1, name: "Samsung", category: "Tech", enabled: true },
  { id: 2, name: "Google", category: "Tech", enabled: true },
  { id: 3, name: "Microsoft", category: "Tech", enabled: false }
]

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("llm")
  const [editingBrand, setEditingBrand] = useState<number | null>(null)
  const [newBrandName, setNewBrandName] = useState("")
  
  // États pour les clés API des LLM
  const [apiKeys, setApiKeys] = useState<Record<string, string>>(() => {
    const keys: Record<string, string> = {}
    llmProviders.forEach(provider => {
      keys[provider.id] = provider.apiKey
    })
    return keys
  })

  // États pour les switches des LLM
  const [llmEnabled, setLlmEnabled] = useState<Record<string, boolean>>(() => {
    const enabled: Record<string, boolean> = {}
    llmProviders.forEach(provider => {
      enabled[provider.id] = provider.enabled
    })
    return enabled
  })

  // États pour les switches des intégrations
  const [integrationEnabled, setIntegrationEnabled] = useState<Record<string, boolean>>(() => {
    const enabled: Record<string, boolean> = {}
    integrations.forEach(integration => {
      enabled[integration.id] = integration.enabled
    })
    return enabled
  })

  // États pour les switches des marques
  const [brandEnabled, setBrandEnabled] = useState<Record<number, boolean>>(() => {
    const enabled: Record<number, boolean> = {}
    brands.forEach(brand => {
      enabled[brand.id] = brand.enabled
    })
    return enabled
  })

  const handleApiKeyChange = (providerId: string, value: string) => {
    setApiKeys(prev => ({
      ...prev,
      [providerId]: value
    }))
  }

  const handleLlmToggle = (providerId: string, checked: boolean) => {
    setLlmEnabled(prev => ({
      ...prev,
      [providerId]: checked
    }))
  }

  const handleIntegrationToggle = (integrationId: string, checked: boolean) => {
    setIntegrationEnabled(prev => ({
      ...prev,
      [integrationId]: checked
    }))
  }

  const handleBrandToggle = (brandId: number, checked: boolean) => {
    setBrandEnabled(prev => ({
      ...prev,
      [brandId]: checked
    }))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return 'bg-green-100 text-green-800'
      case 'disconnected': return 'bg-red-100 text-red-800'
      case 'error': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected': return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'disconnected': return <AlertCircle className="h-4 w-4 text-red-600" />
      default: return <AlertCircle className="h-4 w-4 text-yellow-600" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Paramètres</h1>
          <p className="text-gray-600">Configurez vos LLM, intégrations et préférences</p>
        </div>
        <Button>
          <Settings className="h-4 w-4 mr-2" />
          Sauvegarder
        </Button>
      </div>

      {/* Contenu principal */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="llm">LLM</TabsTrigger>
          <TabsTrigger value="integrations">Intégrations</TabsTrigger>
          <TabsTrigger value="brands">Marques</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="account">Compte</TabsTrigger>
        </TabsList>

        <TabsContent value="llm" className="space-y-6">
          {/* Vue d'ensemble des LLM */}
          <Card>
            <CardHeader>
              <CardTitle>Configuration des LLM</CardTitle>
              <CardDescription>
                Gérez vos fournisseurs de modèles de langage et leurs clés API
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">
                    {llmProviders.filter(p => p.status === 'connected').length}
                  </p>
                  <p className="text-sm text-gray-600">Connectés</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">
                    {llmProviders.reduce((sum, p) => sum + p.requests, 0)}
                  </p>
                  <p className="text-sm text-gray-600">Requêtes ce mois</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-purple-600">
                    ${llmProviders.reduce((sum, p) => sum + p.cost, 0).toFixed(2)}
                  </p>
                  <p className="text-sm text-gray-600">Coût total</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-orange-600">
                    {llmProviders.filter(p => llmEnabled[p.id]).length}
                  </p>
                  <p className="text-sm text-gray-600">Actifs</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Configuration détaillée des LLM */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {llmProviders.map((provider) => (
              <Card key={provider.id}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl">{provider.icon}</span>
                      <span>{provider.name}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={getStatusColor(provider.status)}>
                        {provider.status}
                      </Badge>
                      <Switch 
                        checked={llmEnabled[provider.id]} 
                        onCheckedChange={(checked) => handleLlmToggle(provider.id, checked)}
                      />
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor={`${provider.id}-key`}>Clé API</Label>
                    <div className="flex space-x-2 mt-1">
                      <Input
                        id={`${provider.id}-key`}
                        type="password"
                        value={apiKeys[provider.id] || ""}
                        onChange={(e) => handleApiKeyChange(provider.id, e.target.value)}
                        placeholder="Entrez votre clé API"
                        className="flex-1"
                      />
                      <Button variant="outline" size="sm">
                        Tester
                      </Button>
                    </div>
                  </div>

                  <div>
                    <Label>Modèle par défaut</Label>
                    <Select defaultValue={provider.models[0]}>
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {provider.models.map((model) => (
                          <SelectItem key={model} value={model}>
                            {model}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Requêtes</p>
                      <p className="font-medium">{provider.requests}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Coût</p>
                      <p className="font-medium">${provider.cost.toFixed(2)}</p>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Key className="h-4 w-4 mr-2" />
                      Configurer
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Zap className="h-4 w-4 mr-2" />
                      Tester
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="integrations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Intégrations Externes</CardTitle>
              <CardDescription>
                Connectez des services tiers pour enrichir vos analyses
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {integrations.map((integration) => (
                  <div key={integration.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="text-2xl">{integration.icon}</div>
                      <div>
                        <h3 className="font-medium">{integration.name}</h3>
                        <p className="text-sm text-gray-600">{integration.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(integration.status)}
                        <Badge className={getStatusColor(integration.status)}>
                          {integration.status}
                        </Badge>
                      </div>
                      <Switch 
                        checked={integrationEnabled[integration.id]} 
                        onCheckedChange={(checked) => handleIntegrationToggle(integration.id, checked)}
                      />
                      <Button variant="outline" size="sm">
                        Configurer
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Configuration RAG */}
          <Card>
            <CardHeader>
              <CardTitle>Configuration RAG</CardTitle>
              <CardDescription>
                Paramètres pour la recherche augmentée (RAG)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="search-results">Nombre de résultats</Label>
                  <Select defaultValue="5">
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3">3 résultats</SelectItem>
                      <SelectItem value="5">5 résultats</SelectItem>
                      <SelectItem value="10">10 résultats</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="search-region">Région de recherche</Label>
                  <Select defaultValue="fr">
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fr">France</SelectItem>
                      <SelectItem value="us">États-Unis</SelectItem>
                      <SelectItem value="uk">Royaume-Uni</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="search-freshness">Fraîcheur des résultats</Label>
                <Select defaultValue="month">
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="day">Dernières 24h</SelectItem>
                    <SelectItem value="week">Dernière semaine</SelectItem>
                    <SelectItem value="month">Dernier mois</SelectItem>
                    <SelectItem value="year">Dernière année</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="brands" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Marques principales */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Marques Surveillées
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Ajouter
                  </Button>
                </CardTitle>
                <CardDescription>
                  Marques et produits à surveiller dans les réponses IA
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {brands.map((brand) => (
                    <div key={brand.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Switch 
                          checked={brandEnabled[brand.id]} 
                          onCheckedChange={(checked) => handleBrandToggle(brand.id, checked)}
                        />
                        <div>
                          <p className="font-medium">{brand.name}</p>
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline" className="text-xs">
                              {brand.type}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {brand.category}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Concurrents */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Concurrents
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Ajouter
                  </Button>
                </CardTitle>
                <CardDescription>
                  Concurrents à surveiller pour comparaison
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {competitors.map((competitor) => (
                    <div key={competitor.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Switch 
                          checked={competitor.enabled} 
                          onCheckedChange={() => {}}
                        />
                        <div>
                          <p className="font-medium">{competitor.name}</p>
                          <Badge variant="outline" className="text-xs">
                            {competitor.category}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Configuration avancée */}
          <Card>
            <CardHeader>
              <CardTitle>Configuration Avancée</CardTitle>
              <CardDescription>
                Paramètres de détection et d'analyse des mentions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="sensitivity">Sensibilité de détection</Label>
                  <Select defaultValue="medium">
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Faible (exact match)</SelectItem>
                      <SelectItem value="medium">Moyenne (variations)</SelectItem>
                      <SelectItem value="high">Élevée (synonymes)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="language">Langue principale</Label>
                  <Select defaultValue="fr">
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fr">Français</SelectItem>
                      <SelectItem value="en">Anglais</SelectItem>
                      <SelectItem value="es">Espagnol</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="aliases">Alias et variantes</Label>
                <Textarea
                  id="aliases"
                  placeholder="Entrez les alias séparés par des virgules (ex: iPhone, iPhone 15, iPhone Pro)"
                  className="mt-1"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Préférences de Notification</CardTitle>
              <CardDescription>
                Configurez quand et comment recevoir les alertes
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Alertes de changement</h3>
                    <p className="text-sm text-gray-600">
                      Notifications quand votre score de visibilité change significativement
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Rapports hebdomadaires</h3>
                    <p className="text-sm text-gray-600">
                      Résumé de vos performances envoyé chaque lundi
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Alertes concurrentielles</h3>
                    <p className="text-sm text-gray-600">
                      Notifications quand un concurrent gagne en visibilité
                    </p>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Nouvelles sources détectées</h3>
                    <p className="text-sm text-gray-600">
                      Alertes quand de nouvelles sources citent votre marque
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>

              <div className="pt-6 border-t">
                <Label htmlFor="notification-email">Email pour notifications</Label>
                <Input
                  id="notification-email"
                  type="email"
                  defaultValue="user@example.com"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="notification-frequency">Fréquence des alertes</Label>
                <Select defaultValue="immediate">
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="immediate">Immédiate</SelectItem>
                    <SelectItem value="hourly">Toutes les heures</SelectItem>
                    <SelectItem value="daily">Quotidienne</SelectItem>
                    <SelectItem value="weekly">Hebdomadaire</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="account" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Informations du Compte</CardTitle>
              <CardDescription>
                Gérez vos informations personnelles et préférences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="first-name">Prénom</Label>
                  <Input
                    id="first-name"
                    defaultValue="John"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="last-name">Nom</Label>
                  <Input
                    id="last-name"
                    defaultValue="Doe"
                    className="mt-1"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  defaultValue="john.doe@example.com"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="company">Entreprise</Label>
                <Input
                  id="company"
                  defaultValue="Mon Entreprise"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="timezone">Fuseau horaire</Label>
                <Select defaultValue="europe/paris">
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="europe/paris">Europe/Paris</SelectItem>
                    <SelectItem value="america/new_york">America/New_York</SelectItem>
                    <SelectItem value="asia/tokyo">Asia/Tokyo</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="pt-6">
                <div className="flex space-x-2">
                  <Button>Sauvegarder les modifications</Button>
                  <Button variant="outline">Annuler</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-red-600">Zone de Danger</CardTitle>
              <CardDescription>
                Actions irréversibles sur votre compte
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between p-4 border border-red-200 rounded-lg bg-red-50">
                <div>
                  <h3 className="font-medium text-red-900">Supprimer le compte</h3>
                  <p className="text-sm text-red-700">
                    Supprime définitivement votre compte et toutes vos données
                  </p>
                </div>
                <Button variant="destructive">
                  Supprimer
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
} 