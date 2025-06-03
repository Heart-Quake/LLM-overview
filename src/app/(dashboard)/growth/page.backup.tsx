"use client";

import React from "react";
import CustomTooltip from "@/components/ui/Tooltip";
import InfoIcon from "@/components/ui/InfoIcon";

// FICHIER DE SAUVEGARDE - VERSION FONCTIONNELLE AVEC TOOLTIPS
// Date: 3 Juin 2025
// Version stable avec 10 tooltips informatifs

export default function GrowthPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <h1 className="text-3xl font-bold text-gray-900">Suivi de Croissance</h1>
            <CustomTooltip 
              content="Suivez l'évolution de votre visibilité IA dans le temps grâce à des métriques clés et des objectifs personnalisés"
              position="bottom"
            >
              <InfoIcon size="lg" />
            </CustomTooltip>
          </div>
          <p className="text-gray-600">Analysez l'évolution de votre visibilité IA dans le temps</p>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg border">
        <div className="flex items-center gap-2 mb-4">
          <h2 className="text-xl font-semibold">Métriques Clés</h2>
          <CustomTooltip 
            content="Aperçu rapide de vos indicateurs de performance principaux avec comparaison par rapport à la période précédente"
            position="right"
          >
            <InfoIcon />
          </CustomTooltip>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium text-blue-900">Score Actuel</h3>
              <CustomTooltip 
                content="Score global de visibilité basé sur votre position moyenne dans les réponses IA. Un score plus élevé indique une meilleure visibilité"
                position="top"
              >
                <InfoIcon size="sm" className="text-blue-600" />
              </CustomTooltip>
            </div>
            <p className="text-2xl font-bold text-blue-600">91</p>
            <p className="text-sm text-green-600">+2.2% depuis la dernière période</p>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium text-green-900">Mentions</h3>
              <CustomTooltip 
                content="Nombre total de fois où votre marque a été mentionnée dans les réponses des modèles IA durant cette période"
                position="top"
              >
                <InfoIcon size="sm" className="text-green-600" />
              </CustomTooltip>
            </div>
            <p className="text-2xl font-bold text-green-600">105</p>
            <p className="text-sm text-green-600">+7.1% depuis la dernière période</p>
          </div>
          
          <div className="bg-purple-50 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium text-purple-900">Croissance</h3>
              <CustomTooltip 
                content="Taux de croissance moyen de votre visibilité IA calculé sur les dernières périodes d'analyse"
                position="top"
              >
                <InfoIcon size="sm" className="text-purple-600" />
              </CustomTooltip>
            </div>
            <p className="text-2xl font-bold text-purple-600">+8.2%</p>
            <p className="text-sm text-gray-600">Moyenne par période</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg border">
        <div className="flex items-center gap-2 mb-4">
          <h2 className="text-xl font-semibold">Objectifs de Croissance</h2>
          <CustomTooltip 
            content="Définissez et suivez vos objectifs de visibilité IA avec des indicateurs de progression en temps réel"
            position="right"
          >
            <InfoIcon />
          </CustomTooltip>
        </div>
        
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="font-medium">Score de visibilité &gt; 95</span>
                <CustomTooltip 
                  content="Objectif d'atteindre un score de visibilité supérieur à 95 points, ce qui représente une excellente présence dans les réponses IA"
                  position="top"
                >
                  <InfoIcon size="sm" />
                </CustomTooltip>
              </div>
              <span className="text-sm text-gray-600">91/95</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full" style={{width: '96%'}}></div>
            </div>
          </div>
          
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="font-medium">100+ mentions par période</span>
                <CustomTooltip 
                  content="Objectif d'obtenir au moins 100 mentions de votre marque par période d'analyse pour maintenir une présence constante"
                  position="top"
                >
                  <InfoIcon size="sm" />
                </CustomTooltip>
              </div>
              <span className="text-sm text-gray-600">105/100</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-green-600 h-2 rounded-full" style={{width: '100%'}}></div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg border">
        <div className="flex items-center gap-2 mb-4">
          <h2 className="text-xl font-semibold">Jalons Récents</h2>
          <CustomTooltip 
            content="Historique des étapes importantes atteintes dans votre parcours de croissance de visibilité IA"
            position="right"
          >
            <InfoIcon />
          </CustomTooltip>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <p className="font-medium">Score &gt; 85 atteint</p>
                <CustomTooltip 
                  content="Première fois que votre score de visibilité a dépassé le seuil des 85 points, marquant une excellente progression"
                  position="top"
                >
                  <InfoIcon size="sm" className="text-green-600" />
                </CustomTooltip>
              </div>
              <p className="text-sm text-gray-600">Avril 2024</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <p className="font-medium">Position moyenne &lt; 2.0</p>
                <CustomTooltip 
                  content="Votre marque apparaît maintenant en moyenne dans les 2 premières positions des réponses IA, un excellent indicateur de visibilité"
                  position="top"
                >
                  <InfoIcon size="sm" className="text-blue-600" />
                </CustomTooltip>
              </div>
              <p className="text-sm text-gray-600">Mai 2024</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 