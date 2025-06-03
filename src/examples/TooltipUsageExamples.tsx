// EXEMPLES D'UTILISATION DES TOOLTIPS
// Ce fichier contient des exemples pour réutiliser facilement les tooltips dans d'autres pages

import React from "react";
import CustomTooltip from "@/components/ui/Tooltip";
import InfoIcon from "@/components/ui/InfoIcon";

// ============================================
// EXEMPLES BASIQUES
// ============================================

// Tooltip simple sur un titre
export function BasicTitleTooltip() {
  return (
    <div className="flex items-center gap-2">
      <h2 className="text-xl font-semibold">Dashboard Principal</h2>
      <CustomTooltip 
        content="Vue d'ensemble de vos performances de visibilité IA"
        position="right"
      >
        <InfoIcon />
      </CustomTooltip>
    </div>
  );
}

// Tooltip sur une métrique avec couleur personnalisée
export function MetricTooltip() {
  return (
    <div className="bg-blue-50 p-4 rounded-lg">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-medium text-blue-900">Taux de conversion</h3>
        <CustomTooltip 
          content="Pourcentage de visiteurs qui effectuent l'action souhaitée"
          position="top"
        >
          <InfoIcon size="sm" className="text-blue-600" />
        </CustomTooltip>
      </div>
      <p className="text-2xl font-bold text-blue-600">2.4%</p>
    </div>
  );
}

// ============================================
// EXEMPLES POUR DASHBOARD
// ============================================

export function DashboardExamples() {
  return (
    <div className="space-y-4">
      {/* Métriques principales */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg border">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-medium">Score Global</h3>
            <CustomTooltip 
              content="Score consolidé basé sur votre performance across tous les modèles IA"
              position="top"
            >
              <InfoIcon size="sm" />
            </CustomTooltip>
          </div>
          <p className="text-2xl font-bold">87</p>
        </div>

        <div className="bg-white p-4 rounded-lg border">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-medium">Tendance</h3>
            <CustomTooltip 
              content="Évolution de votre visibilité sur les 30 derniers jours"
              position="top"
            >
              <InfoIcon size="sm" />
            </CustomTooltip>
          </div>
          <p className="text-2xl font-bold text-green-600">+5.2%</p>
        </div>
      </div>

      {/* Section avec titre explicatif */}
      <div className="bg-white p-6 rounded-lg border">
        <div className="flex items-center gap-2 mb-4">
          <h2 className="text-xl font-semibold">Prompts les Plus Performants</h2>
          <CustomTooltip 
            content="Liste des requêtes où votre marque obtient les meilleures positions dans les réponses IA"
            position="right"
          >
            <InfoIcon />
          </CustomTooltip>
        </div>
        {/* Contenu de la section... */}
      </div>
    </div>
  );
}

// ============================================
// EXEMPLES POUR COMPETITORS
// ============================================

export function CompetitorsExamples() {
  return (
    <div className="space-y-4">
      {/* Header avec explication */}
      <div className="flex items-center gap-2 mb-6">
        <h1 className="text-3xl font-bold">Analyse Concurrentielle</h1>
        <CustomTooltip 
          content="Comparez votre performance avec vos principaux concurrents dans les réponses IA"
          position="bottom"
        >
          <InfoIcon size="lg" />
        </CustomTooltip>
      </div>

      {/* Tableau de comparaison */}
      <div className="bg-white rounded-lg border overflow-hidden">
        <div className="px-6 py-4 border-b">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold">Classement par Score</h3>
            <CustomTooltip 
              content="Classement basé sur la position moyenne de chaque marque dans les réponses des modèles IA"
              position="right"
            >
              <InfoIcon size="sm" />
            </CustomTooltip>
          </div>
        </div>
        {/* Contenu du tableau... */}
      </div>
    </div>
  );
}

// ============================================
// EXEMPLES POUR SETTINGS
// ============================================

export function SettingsExamples() {
  return (
    <div className="space-y-6">
      {/* Section de configuration */}
      <div className="bg-white p-6 rounded-lg border">
        <div className="flex items-center gap-2 mb-4">
          <h2 className="text-xl font-semibold">Configuration du Monitoring</h2>
          <CustomTooltip 
            content="Personnalisez la fréquence et les paramètres de surveillance de votre visibilité IA"
            position="right"
          >
            <InfoIcon />
          </CustomTooltip>
        </div>

        {/* Option de configuration */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <label className="font-medium">Fréquence de scan</label>
              <CustomTooltip 
                content="Définit à quelle fréquence l'analyse de votre visibilité sera effectuée automatiquement"
                position="top"
              >
                <InfoIcon size="sm" />
              </CustomTooltip>
            </div>
            <select className="border rounded px-3 py-1">
              <option>Quotidienne</option>
              <option>Hebdomadaire</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================
// EXEMPLES AVEC DIFFÉRENTES POSITIONS
// ============================================

export function PositionExamples() {
  return (
    <div className="grid grid-cols-2 gap-8 p-8">
      {/* Position TOP */}
      <div className="text-center">
        <p className="mb-4">Position TOP</p>
        <CustomTooltip 
          content="Ce tooltip apparaît au-dessus de l'élément"
          position="top"
        >
          <button className="bg-blue-500 text-white px-4 py-2 rounded">
            Hover me (TOP)
          </button>
        </CustomTooltip>
      </div>

      {/* Position BOTTOM */}
      <div className="text-center">
        <p className="mb-4">Position BOTTOM</p>
        <CustomTooltip 
          content="Ce tooltip apparaît en-dessous de l'élément"
          position="bottom"
        >
          <button className="bg-green-500 text-white px-4 py-2 rounded">
            Hover me (BOTTOM)
          </button>
        </CustomTooltip>
      </div>

      {/* Position LEFT */}
      <div className="text-center">
        <p className="mb-4">Position LEFT</p>
        <CustomTooltip 
          content="Ce tooltip apparaît à gauche de l'élément"
          position="left"
        >
          <button className="bg-purple-500 text-white px-4 py-2 rounded">
            Hover me (LEFT)
          </button>
        </CustomTooltip>
      </div>

      {/* Position RIGHT */}
      <div className="text-center">
        <p className="mb-4">Position RIGHT</p>
        <CustomTooltip 
          content="Ce tooltip apparaît à droite de l'élément"
          position="right"
        >
          <button className="bg-red-500 text-white px-4 py-2 rounded">
            Hover me (RIGHT)
          </button>
        </CustomTooltip>
      </div>
    </div>
  );
}

// ============================================
// EXEMPLES DE CONTENU LONG
// ============================================

export function LongContentExample() {
  return (
    <div className="p-8">
      <CustomTooltip 
        content="Ceci est un exemple de tooltip avec un contenu beaucoup plus long qui va automatiquement passer à la ligne et s'adapter à la largeur maximale configurée. Le texte reste lisible et bien formaté."
        position="bottom"
      >
        <button className="bg-gray-500 text-white px-4 py-2 rounded">
          Tooltip avec contenu long
        </button>
      </CustomTooltip>
    </div>
  );
}

// ============================================
// EXEMPLES AVEC DÉLAIS PERSONNALISÉS
// ============================================

export function DelayExamples() {
  return (
    <div className="flex gap-4 p-8">
      <CustomTooltip 
        content="Apparition immédiate"
        delay={0}
        position="top"
      >
        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          Délai: 0ms
        </button>
      </CustomTooltip>

      <CustomTooltip 
        content="Apparition rapide"
        delay={200}
        position="top"
      >
        <button className="bg-green-500 text-white px-4 py-2 rounded">
          Délai: 200ms
        </button>
      </CustomTooltip>

      <CustomTooltip 
        content="Apparition lente"
        delay={1000}
        position="top"
      >
        <button className="bg-red-500 text-white px-4 py-2 rounded">
          Délai: 1000ms
        </button>
      </CustomTooltip>
    </div>
  );
} 