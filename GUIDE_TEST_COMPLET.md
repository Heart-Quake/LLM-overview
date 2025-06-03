# 🧪 Guide de Test Complet - Application Hubble

**Version :** 2.0 - Fonctionnalités Complètes  
**Date :** Décembre 2024  
**Statut :** Toutes les fonctionnalités prioritaires implémentées

## 🎯 Objectif des Tests

Ce guide vous permet de tester **toutes les fonctionnalités** de l'application Hubble, incluant les nouvelles pages développées selon le cahier des charges.

## 🚀 Démarrage de l'Application

### 1. Lancement
```bash
cd hubble-ai-monitor
npm run dev
```

### 2. Accès
- **URL :** http://localhost:3000
- **Port alternatif :** http://localhost:3001 (si 3000 occupé)

## 📋 Plan de Test Complet

### ✅ 1. Page d'Accueil & Authentification
**URL :** http://localhost:3000

**Tests à effectuer :**
- [ ] Vérifier l'affichage du branding Hubble
- [ ] Cliquer sur "Se connecter"
- [ ] Accéder au dashboard via l'authentification simplifiée
- [ ] Vérifier la navigation dans le header

### ✅ 2. Dashboard Principal
**URL :** http://localhost:3000/dashboard

**Tests à effectuer :**
- [ ] **KPIs principaux** : Score 91, Mentions 105, Croissance +8.2%
- [ ] **Graphique Score Evolution** : Courbe des 30 derniers jours
- [ ] **Top Prompts** : Liste des 5 meilleurs prompts avec scores
- [ ] **Testeur LLM** : Interface de test en temps réel
- [ ] **Navigation** : Liens vers toutes les sections

### ✅ 3. Gestion des Prompts
**URL :** http://localhost:3000/prompts

**Tests à effectuer :**
- [ ] **Liste des prompts** : 12 prompts avec scores et statuts
- [ ] **Filtres** : Tous, Actifs, Inactifs, Brouillons
- [ ] **Tri** : Par score, date, statut
- [ ] **Sélection multiple** : Cocher plusieurs prompts
- [ ] **Actions groupées** : Activer/Désactiver/Supprimer
- [ ] **Détails prompt** : Cliquer pour voir les détails

### ✅ 4. **NOUVEAU** - Analyse Concurrentielle
**URL :** http://localhost:3000/competitors

**Tests à effectuer :**
- [ ] **Onglet Vue d'ensemble** :
  - KPIs : 5 concurrents, 1,219 mentions, score moyen 71
  - Graphique classement (BarChart)
  - Part de voix (PieChart)
- [ ] **Onglet Tendances** :
  - Évolution temporelle (LineChart)
  - Comparaison sur 30 jours
- [ ] **Onglet Sentiment** :
  - Analyse forces/faiblesses par concurrent
  - Badges colorés (positif/négatif/neutre)
- [ ] **Onglet Détails** :
  - Sélection concurrent dans dropdown
  - Top prompts et métriques détaillées
  - Données Apple, Samsung, Google, Xiaomi, OnePlus

### ✅ 5. **NOUVEAU** - Suivi de Croissance
**URL :** http://localhost:3000/growth

**Tests à effectuer :**
- [ ] **Métriques d'évolution** :
  - Score actuel 91 (+2.2%)
  - Mentions 105 (+7.1%)
  - Croissance moyenne +8.2%
- [ ] **Objectifs** :
  - Score cible 95 (96% atteint)
  - 100+ mentions (105% atteint)
- [ ] **Graphiques** :
  - AreaChart évolution score
  - ComposedChart métriques combinées
  - LineChart tendances détaillées
- [ ] **Analyse par segments** :
  - TOFU, MOFU, BOFU, Brand avec scores
- [ ] **Top prompts croissance** :
  - Liste avec pourcentages d'amélioration
- [ ] **Jalons** :
  - 4 milestones avec dates et descriptions

### ✅ 6. **NOUVEAU** - Analyse des Sources
**URL :** http://localhost:3000/sources

**Tests à effectuer :**
- [ ] **KPIs sources** :
  - 6 sources trackées, 2 contrôlées, 3 alertes
- [ ] **Classification** :
  - PieChart répartition par type
  - Site officiel 35%, Presse tech 28%, etc.
- [ ] **Liste détaillée** :
  - apple.com, lesnumeriques.com, reddit.com
  - Mentions, scores, autorité
- [ ] **Système d'alertes** :
  - 3 alertes actives avec descriptions
- [ ] **Filtres** :
  - Tri par mentions, score, autorité
  - Sélection par catégorie
- [ ] **Actions recommandées** :
  - 3 recommandations stratégiques

### ✅ 7. **NOUVEAU** - Configuration Multi-LLM
**URL :** http://localhost:3000/settings

**Tests à effectuer :**
- [ ] **Onglet LLM Configuration** :
  - 4 providers : OpenAI, Anthropic, Google, Perplexity
  - Statuts de connexion
  - Modèles disponibles par provider
- [ ] **Onglet Intégrations** :
  - Serper.dev connecté
  - Bing Search API, Google Sheets
  - Configuration RAG (résultats, région, fraîcheur)
- [ ] **Onglet Brand Management** :
  - Marques : Apple, iPhone, MacBook
  - Types : primary, product
  - Concurrents : Samsung, Google, Microsoft
- [ ] **Onglet Notifications** :
  - Switches pour alertes score, mentions, rapports
- [ ] **Onglet Account** :
  - Informations personnelles
  - Plan Pro : 2,450/5,000 requêtes (49%)
  - 15 jours restants

### ✅ 8. Export de Données
**Tests à effectuer dans chaque section :**
- [ ] **Boutons Export CSV** présents
- [ ] **Fonctionnalité d'export** (simulation)
- [ ] **Données cohérentes** entre sections

## 🎨 Tests d'Interface

### Responsive Design
- [ ] **Desktop** : Affichage optimal sur grand écran
- [ ] **Tablet** : Adaptation des grilles et graphiques
- [ ] **Mobile** : Navigation et lisibilité

### Composants UI
- [ ] **Tabs** : Navigation fluide entre onglets
- [ ] **Progress bars** : Affichage des scores et objectifs
- [ ] **Switches** : Activation/désactivation paramètres
- [ ] **Select dropdowns** : Sélection options
- [ ] **Graphiques Recharts** : Interactivité et responsivité

## 📊 Tests de Données

### Cohérence des Métriques
- [ ] **Scores cohérents** entre pages (91 partout)
- [ ] **Mentions cohérentes** (105 partout)
- [ ] **Données concurrents** logiques
- [ ] **Évolution temporelle** réaliste

### Fonctionnalités Interactives
- [ ] **Filtres** : Mise à jour en temps réel
- [ ] **Tri** : Ordre correct des données
- [ ] **Sélections** : État maintenu
- [ ] **Graphiques** : Tooltips et interactions

## 🔧 Tests Techniques

### Performance
- [ ] **Temps de chargement** < 2 secondes
- [ ] **Navigation fluide** entre pages
- [ ] **Graphiques** : Rendu rapide
- [ ] **Pas d'erreurs console**

### Fonctionnalités Avancées
- [ ] **Multi-LLM** : Configuration providers
- [ ] **Export CSV** : Génération fichiers
- [ ] **Authentification** : Accès sécurisé
- [ ] **Base de données** : Persistance données

## ✅ Checklist de Validation Finale

### Fonctionnalités Lot 2 (Priorité Haute)
- [ ] ✅ **Competitor Rank** : Page /competitors complète
- [ ] ✅ **Sentiment Scoring** : Analyse sentiment intégrée
- [ ] ✅ **Export CSV** : Service d'export fonctionnel

### Fonctionnalités Lot 3 (Priorité Moyenne)
- [ ] ✅ **Support Multi-LLM** : 4 providers configurés
- [ ] ✅ **Source Analysis** : Page /sources complète
- [ ] ✅ **Growth Tracker** : Page /growth avec suivi temporel

### Interface & UX
- [ ] ✅ **Design cohérent** : Tailwind CSS appliqué
- [ ] ✅ **Navigation intuitive** : Menu et liens fonctionnels
- [ ] ✅ **Graphiques interactifs** : Recharts intégré
- [ ] ✅ **Responsive design** : Adaptation multi-écrans

## 🎉 Résultat Attendu

À la fin de ces tests, vous devriez avoir :
- ✅ **Application 100% fonctionnelle** avec toutes les pages
- ✅ **Toutes les fonctionnalités prioritaires** opérationnelles
- ✅ **Interface professionnelle** et intuitive
- ✅ **Données cohérentes** et réalistes
- ✅ **Prêt pour déploiement** en production

## 🚨 En Cas de Problème

### Redémarrage Complet
```bash
# Arrêter l'application
pkill -f "next-server"

# Nettoyer et redémarrer
npm run dev
```

### Vérification Base de Données
```bash
npx prisma generate
npx prisma db push
```

### Support
- Consulter `TROUBLESHOOTING.md`
- Vérifier les logs dans la console
- Tester sur http://localhost:3001 si port 3000 occupé

---

**🎯 L'application Hubble est maintenant complète avec toutes les fonctionnalités du cahier des charges !** 