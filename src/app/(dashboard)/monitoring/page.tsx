"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Monitor, TrendingUp, TrendingDown, AlertTriangle } from "lucide-react"
import CustomTooltip from "@/components/ui/Tooltip"
import InfoIcon from "@/components/ui/InfoIcon"

// Données simulées
const brandMonitoring = [
  {
    brand: "Votre Marque",
    totalPrompts: 25,
    mentions: 18,
    visibilityScore: 72,
    trend: "up",
    trendValue: 8,
    avgPosition: 2.1,
    lastMention: "Il y a 2h",
    status: "active"
  },
  {
    brand: "Concurrent A",
    totalPrompts: 25,
    mentions: 15,
    visibilityScore: 60,
    trend: "down",
    trendValue: -3,
    avgPosition: 2.8,
    lastMention: "Il y a 1h",
    status: "monitoring"
  },
  {
    brand: "Concurrent B",
    totalPrompts: 25,
    mentions: 12,
    visibilityScore: 48,
    trend: "up",
    trendValue: 5,
    avgPosition: 3.2,
    lastMention: "Il y a 4h",
    status: "monitoring"
  }
]

const alerts = [
  {
    id: 1,
    type: "warning",
    message: "Votre marque n'a pas été mentionnée dans les 5 dernières réponses",
    timestamp: "Il y a 30 min"
  },
  {
    id: 2,
    type: "info",
    message: "Concurrent A a gagné 2 positions en moyenne cette semaine",
    timestamp: "Il y a 1h"
  }
]

export default function MonitoringPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Brand Monitoring</h1>
            <p className="text-gray-600">Surveillez votre marque et vos concurrents en temps réel</p>
          </div>
          <CustomTooltip 
            content="Surveillance en temps réel de votre marque et de vos concurrents dans les réponses des modèles IA, avec alertes et métriques de performance"
            position="auto"
          >
            <InfoIcon size="lg" />
          </CustomTooltip>
        </div>
        <Button>
          <Monitor className="h-4 w-4 mr-2" />
          Lancer un scan
        </Button>
      </div>

      {/* Alertes */}
      {alerts.length > 0 && (
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <CardTitle className="flex items-center">
                <AlertTriangle className="h-5 w-5 mr-2 text-yellow-500" />
                Alertes récentes
              </CardTitle>
              <CustomTooltip 
                content="Notifications automatiques sur les changements importants de votre visibilité ou celle de vos concurrents"
                position="auto"
              >
                <InfoIcon />
              </CustomTooltip>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {alerts.map((alert) => (
                <div key={alert.id} className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{alert.message}</p>
                    <p className="text-xs text-gray-500">{alert.timestamp}</p>
                  </div>
                  <Badge variant={alert.type === "warning" ? "destructive" : "secondary"}>
                    {alert.type === "warning" ? "Attention" : "Info"}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tableau de monitoring */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <CardTitle>Tableau de bord des marques</CardTitle>
            <CustomTooltip 
              content="Comparaison détaillée des performances de visibilité entre votre marque et vos concurrents avec métriques temps réel"
              position="auto"
            >
              <InfoIcon />
            </CustomTooltip>
          </div>
          <CardDescription>
            Comparaison des performances de visibilité entre votre marque et vos concurrents
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {brandMonitoring.map((brand, index) => (
              <div key={brand.brand} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${
                      brand.status === "active" ? "bg-green-500" : "bg-blue-500"
                    }`} />
                    <h3 className="font-semibold text-lg">{brand.brand}</h3>
                    <Badge variant={brand.status === "active" ? "default" : "secondary"}>
                      {brand.status === "active" ? "Votre marque" : "Concurrent"}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`text-sm font-medium ${
                      brand.trend === "up" ? "text-green-600" : "text-red-600"
                    }`}>
                      {brand.trend === "up" ? "+" : ""}{brand.trendValue}%
                    </span>
                    {brand.trend === "up" ? (
                      <TrendingUp className="h-4 w-4 text-green-600" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-600" />
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  <div>
                    <div className="flex items-center gap-1 mb-1">
                      <p className="text-sm text-gray-600">Score de visibilité</p>
                      <CustomTooltip 
                        content="Score global calculé sur la base de la position moyenne et du taux de mention de cette marque"
                        position="auto"
                      >
                        <InfoIcon size="sm" />
                      </CustomTooltip>
                    </div>
                    <p className="text-2xl font-bold text-blue-600">{brand.visibilityScore}%</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-1 mb-1">
                      <p className="text-sm text-gray-600">Mentions</p>
                      <CustomTooltip 
                        content="Nombre de mentions de cette marque sur le total des prompts analysés"
                        position="auto"
                      >
                        <InfoIcon size="sm" />
                      </CustomTooltip>
                    </div>
                    <p className="text-lg font-semibold">{brand.mentions}/{brand.totalPrompts}</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-1 mb-1">
                      <p className="text-sm text-gray-600">Position moyenne</p>
                      <CustomTooltip 
                        content="Position moyenne de cette marque dans les réponses IA quand elle est mentionnée (1 = première position)"
                        position="auto"
                      >
                        <InfoIcon size="sm" />
                      </CustomTooltip>
                    </div>
                    <p className="text-lg font-semibold">{brand.avgPosition}</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-1 mb-1">
                      <p className="text-sm text-gray-600">Dernière mention</p>
                      <CustomTooltip 
                        content="Horodatage de la dernière fois où cette marque a été mentionnée dans une réponse IA"
                        position="auto"
                      >
                        <InfoIcon size="sm" />
                      </CustomTooltip>
                    </div>
                    <p className="text-sm text-gray-900">{brand.lastMention}</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-1 mb-1">
                      <p className="text-sm text-gray-600">Rang</p>
                      <CustomTooltip 
                        content="Classement de cette marque par rapport aux autres sur la base du score de visibilité"
                        position="auto"
                      >
                        <InfoIcon size="sm" />
                      </CustomTooltip>
                    </div>
                    <p className="text-lg font-semibold">#{index + 1}</p>
                  </div>
                </div>

                {/* Barre de progression */}
                <div className="mt-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Taux de mention</span>
                    <span>{Math.round((brand.mentions / brand.totalPrompts) * 100)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        brand.status === "active" ? "bg-blue-600" : "bg-gray-400"
                      }`}
                      style={{ width: `${(brand.mentions / brand.totalPrompts) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 